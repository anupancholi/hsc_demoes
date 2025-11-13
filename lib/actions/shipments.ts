"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { ShipmentStatus } from "@/lib/supabase/types"

export async function createShipment(data: {
  match_id?: string
  origin?: string
  destination?: string
  eta?: string
  carrier?: string
  tracking_code?: string
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || !["logistics", "admin"].includes(profile.role)) {
    throw new Error("Only logistics or admin can create shipments")
  }

  const { data: shipment, error } = await supabase
    .from("shipments")
    .insert({
      logistics_id: user.id,
      ...data,
      status: "created",
      tracking: {},
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/shipments")
  return shipment
}

export async function updateShipment(
  id: string,
  data: {
    origin?: string
    destination?: string
    eta?: string
    status?: ShipmentStatus
    carrier?: string
    tracking_code?: string
    tracking?: Record<string, any>
  },
) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: shipment, error } = await supabase.from("shipments").update(data).eq("id", id).select().single()

  if (error) throw error

  revalidatePath("/dashboard/shipments")
  return shipment
}

export async function getShipments(filters?: {
  status?: ShipmentStatus
  match_id?: string
}) {
  const supabase = await getSupabaseServerClient()

  let query = supabase
    .from("shipments")
    .select(`
      *,
      matches(
        *,
        needs(title, profiles(full_name)),
        offers(title, profiles(full_name))
      ),
      profiles(full_name)
    `)
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.match_id) {
    query = query.eq("match_id", filters.match_id)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getShipmentById(id: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("shipments")
    .select(`
      *,
      matches(
        *,
        needs(*, profiles(full_name), orgs(name)),
        offers(*, profiles(full_name), orgs(name))
      ),
      profiles(full_name)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function addShipmentEvent(
  shipmentId: string,
  event: {
    type: "status" | "location" | "delay" | "note"
    status?: ShipmentStatus
    lat?: number
    lon?: number
    city?: string
    country?: string
    occurred_at: string
    raw?: Record<string, any>
  },
) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("shipment_events")
    .insert({
      shipment_id: shipmentId,
      ...event,
    })
    .select()
    .single()

  if (error) throw error

  if (event.status) {
    await updateShipment(shipmentId, { status: event.status })
  }

  revalidatePath(`/dashboard/shipments/${shipmentId}`)
  return data
}

export async function getShipmentEvents(shipmentId: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("shipment_events")
    .select("*")
    .eq("shipment_id", shipmentId)
    .order("occurred_at", { ascending: false })

  if (error) throw error
  return data
}
