"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Need, NeedStatus } from "@/lib/supabase/types"

export async function createNeed(data: {
  title: string
  description?: string
  category_id?: number
  quantity?: number
  unit: string
  country?: string
  city?: string
  needed_by?: string
  tags?: string[]
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase.from("profiles").select("id, org_id, role").eq("id", user.id).single()

  if (!profile || profile.role !== "requester") {
    throw new Error("Only requesters can create needs")
  }

  const { data: need, error } = await supabase
    .from("needs")
    .insert({
      requester_id: user.id,
      org_id: profile.org_id,
      ...data,
      status: "draft",
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/needs")
  return need
}

export async function updateNeed(id: string, data: Partial<Need>) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: need, error } = await supabase
    .from("needs")
    .update(data)
    .eq("id", id)
    .eq("requester_id", user.id)
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/needs")
  return need
}

export async function deleteNeed(id: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase.from("needs").delete().eq("id", id).eq("requester_id", user.id)

  if (error) throw error

  revalidatePath("/dashboard/needs")
}

export async function getNeeds(filters?: {
  status?: NeedStatus
  category_id?: number
  country?: string
}) {
  const supabase = await getSupabaseServerClient()

  let query = supabase
    .from("needs")
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

export async function getNeedById(id: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("needs")
    .select("*, categories(name), profiles(full_name), orgs(name)")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function publishNeed(id: string) {
  return updateNeed(id, { status: "open" })
}

export async function getMyNeeds(filters?: {
  status?: NeedStatus
  category_id?: number
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  let query = supabase
    .from("needs")
    .select("*, categories(name), profiles(full_name), orgs(name)")
    .eq("requester_id", user.id)
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

export { getNeedById as getNeed }
