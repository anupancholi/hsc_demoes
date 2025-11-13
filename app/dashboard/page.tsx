import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/profile"
import { getMyNeeds } from "@/lib/actions/needs"
import { getMyOffers } from "@/lib/actions/offers"
import { getMyMatches } from "@/lib/actions/matches"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default async function DashboardPage() {
  const userData = await getCurrentUser()

  if (!userData) {
    redirect("/login")
  }

  const [needs, offers, matches] = await Promise.all([
    getMyNeeds().catch(() => []),
    getMyOffers().catch(() => []),
    getMyMatches().catch(() => []),
  ])

  return <DashboardOverview user={userData} needs={needs} offers={offers} matches={matches} />
}
