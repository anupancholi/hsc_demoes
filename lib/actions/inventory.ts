"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createWarehouse(data: {
  name: string
  address?: string
  country?: string
  city?: string
  provider: string
  provider_ref?: string
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase.from("profiles").select("org_id, role").eq("id", user.id).single()

  if (!profile?.org_id || !["supplier", "admin"].includes(profile.role)) {
    throw new Error("Only suppliers or admins can create warehouses")
  }

  const { data: warehouse, error } = await supabase
    .from("warehouses")
    .insert({
      org_id: profile.org_id,
      ...data,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath("/dashboard/inventory")
  return warehouse
}

export async function getWarehouses() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase.from("profiles").select("org_id").eq("id", user.id).single()

  const { data, error } = await supabase
    .from("warehouses")
    .select("*")
    .eq("org_id", profile?.org_id)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createInventoryItem(data: {
  warehouse_id: string
  sku?: string
  title: string
  category_id?: number
  quantity: number
  unit: string
  attributes?: Record<string, any>
  provider_ref?: string
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: item, error } = await supabase.from("inventory_items").insert(data).select().single()

  if (error) throw error

  revalidatePath("/dashboard/inventory")
  return item
}

export async function updateInventoryItem(
  id: string,
  data: {
    quantity?: number
    title?: string
    attributes?: Record<string, any>
  },
) {
  const supabase = await getSupabaseServerClient()

  const { data: item, error } = await supabase.from("inventory_items").update(data).eq("id", id).select().single()

  if (error) throw error

  revalidatePath("/dashboard/inventory")
  return item
}

export async function getInventoryItems(warehouseId?: string) {
  const supabase = await getSupabaseServerClient()

  let query = supabase
    .from("inventory_items")
    .select("*, warehouses(name), categories(name)")
    .order("created_at", { ascending: false })

  if (warehouseId) {
    query = query.eq("warehouse_id", warehouseId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function deleteInventoryItem(id: string) {
  const supabase = await getSupabaseServerClient()

  const { error } = await supabase.from("inventory_items").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/dashboard/inventory")
}

export async function getInventoryItem(id: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*, warehouses(name), categories(name)")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}
