"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Offer, OfferStatus } from "@/lib/supabase/types"

export async function createOffer(data: {
  title: string
  description?: string
  category_id?: number
  max_quantity?: number
  unit: string
  country?: string
  city?: string
  available_from?: string
  tags?: string[]
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase.from("profiles").select("id, org_id, role").eq("id", user.id).single()

  if (!profile || profile.role !== "supplier") {
    throw new Error("Only suppliers can create offers")
  }

  const { data: offer, error } = await supabase
    .from("offers")
    .insert({
      supplier_id: user.id,
      org_id: profile.org_id,
      ...data,
      status: "draft",
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/offers")
  return offer
}

export async function updateOffer(id: string, data: Partial<Offer>) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: offer, error } = await supabase
    .from("offers")
    .update(data)
    .eq("id", id)
    .eq("supplier_id", user.id)
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/offers")
  return offer
}

export async function deleteOffer(id: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase.from("offers").delete().eq("id", id).eq("supplier_id", user.id)

  if (error) throw error

  revalidatePath("/dashboard/offers")
}

export async function getOffers(filters?: {
  status?: OfferStatus
  category_id?: number
  country?: string
}) {
  const supabase = await getSupabaseServerClient()

  let query = supabase
    .from("offers")
    .select("*, categories(name), profiles(full_name), orgs(name)")
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.category_id) {
    query = query.eq("category_id", filters.category_id)
  }
  if (filters?.country) {
    query = query.eq("country", filters.country)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getOfferById(id: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("offers")
    .select("*, categories(name), profiles(full_name), orgs(name)")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export { getOfferById as getOffer }

export async function publishOffer(id: string) {
  return updateOffer(id, { status: "open" })
}

export async function getMyOffers(filters?: {
  status?: OfferStatus
  category_id?: number
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  let query = supabase
    .from("offers")
    .select("*, categories(name), profiles(full_name), orgs(name)")
    .eq("supplier_id", user.id)
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.category_id) {
    query = query.eq("category_id", filters.category_id)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
