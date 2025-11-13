"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { createMatch } from "./matches"

interface MatchScore {
  needId: string
  offerId: string
  score: number
  reasons: string[]
}

export async function findMatches(needId: string): Promise<MatchScore[]> {
  const supabase = await getSupabaseServerClient()

  const { data: need, error: needError } = await supabase.from("needs").select("*").eq("id", needId).single()

  if (needError || !need) throw new Error("Need not found")

  const { data: offers, error: offersError } = await supabase.from("offers").select("*").eq("status", "open")

  if (offersError) throw offersError

  const matches: MatchScore[] = []

  for (const offer of offers || []) {
    let score = 0
    const reasons: string[] = []

    if (need.category_id === offer.category_id) {
      score += 40
      reasons.push("Same category")
    }

    if (need.country === offer.country) {
      score += 20
      reasons.push("Same country")
      if (need.city === offer.city) {
        score += 10
        reasons.push("Same city")
      }
    }

    if (offer.max_quantity && need.quantity) {
      if (offer.max_quantity >= need.quantity) {
        score += 20
        reasons.push("Sufficient quantity")
      } else {
        score += 10
        reasons.push("Partial quantity available")
      }
    }

    const needTags = need.tags || []
    const offerTags = offer.tags || []
    const commonTags = needTags.filter((tag) => offerTags.includes(tag))
    if (commonTags.length > 0) {
      score += Math.min(10, commonTags.length * 3)
      reasons.push(`${commonTags.length} matching tags`)
    }

    if (score > 30) {
      matches.push({
        needId: need.id,
        offerId: offer.id,
        score,
        reasons,
      })
    }
  }

  return matches.sort((a, b) => b.score - a.score)
}

export async function autoMatch(needId: string) {
  const matches = await findMatches(needId)

  if (matches.length === 0) {
    return { success: false, message: "No suitable matches found" }
  }

  const bestMatch = matches[0]
  const match = await createMatch(bestMatch.needId, bestMatch.offerId, bestMatch.score)

  return {
    success: true,
    match,
    score: bestMatch.score,
    reasons: bestMatch.reasons,
  }
}

export async function batchAutoMatch() {
  const supabase = await getSupabaseServerClient()

  const { data: needs, error } = await supabase.from("needs").select("id").eq("status", "open")

  if (error) throw error

  const results = []

  for (const need of needs || []) {
    try {
      const result = await autoMatch(need.id)
      results.push({ needId: need.id, ...result })
    } catch (error) {
      results.push({ needId: need.id, success: false, error: String(error) })
    }
  }

  return results
}
