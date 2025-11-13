"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { MatchStatus } from "@/lib/supabase/types"

export async function createMatch(needId: string, offerId: string, score: number) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: match, error } = await supabase
    .from("matches")
    .insert({
      need_id: needId,
      offer_id: offerId,
      score,
      status: "proposed",
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/matches")
  return match
}

export async function updateMatchStatus(id: string, status: MatchStatus) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: match, error } = await supabase.from("matches").update({ status }).eq("id", id).select().single()

  if (error) throw error

  if (status === "accepted") {
    await supabase.from("needs").update({ status: "matched" }).eq("id", match.need_id)
    await supabase.from("offers").update({ status: "matched" }).eq("id", match.offer_id)
  }

  revalidatePath("/dashboard/matches")
  return match
}

export async function getMatches(filters?: {
  status?: MatchStatus
  need_id?: string
  offer_id?: string
}) {
  const supabase = await getSupabaseServerClient()

  let query = supabase
    .from("matches")
    .select(`
      *,
      needs(*, profiles(full_name), orgs(name)),
      offers(*, profiles(full_name), orgs(name))
    `)
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.need_id) {
    query = query.eq("need_id", filters.need_id)
  }
  if (filters?.offer_id) {
    query = query.eq("offer_id", filters.offer_id)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getMatchById(id: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      needs(*, profiles(full_name), orgs(name)),
      offers(*, profiles(full_name), orgs(name))
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function acceptMatch(id: string) {
  return updateMatchStatus(id, "accepted")
}

export async function rejectMatch(id: string) {
  return updateMatchStatus(id, "rejected")
}

export async function getMyMatches(filters?: {
  status?: MatchStatus
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  let query = supabase
    .from("matches")
    .select(`
      *,
      needs!inner(*, profiles(full_name), orgs(name)),
      offers!inner(*, profiles(full_name), orgs(name))
    `)
    .or(`needs.requester_id.eq.${user.id},offers.supplier_id.eq.${user.id}`)
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
