"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCurrentUser() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*, orgs(*)").eq("id", user.id).single()

  return { user, profile }
}

export async function updateProfile(data: {
  full_name?: string
  phone?: string
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile, error } = await supabase.from("profiles").update(data).eq("id", user.id).select().single()

  if (error) throw error

  revalidatePath("/dashboard/profile")
  return profile
}

export async function getCategories() {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) throw error
  return data
}

export async function getAllProfiles() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: "Unauthorized" }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    return { data: null, error: "Forbidden: Admin access required" }
  }

  const { data, error } = await supabase.from("profiles").select("*, orgs(*)").order("created_at", { ascending: false })

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}
