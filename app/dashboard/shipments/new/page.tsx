import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ShipmentForm } from "@/components/forms/shipment-form"

export default async function NewShipmentPage({
  searchParams,
}: {
  searchParams: { matchId?: string; needId?: string; offerId?: string }
}) {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { matchId, needId, offerId } = searchParams

  if (!matchId || !needId || !offerId) {
    redirect("/dashboard/matches")
  }

  return (
    <div className="container mx-auto py-8">
      <ShipmentForm matchId={matchId} needId={needId} offerId={offerId} />
    </div>
  )
}
