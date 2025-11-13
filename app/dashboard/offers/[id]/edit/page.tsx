import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getOffer } from "@/lib/actions/offers"
import { OfferForm } from "@/components/forms/offer-form"

export default async function EditOfferPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const result = await getOffer(params.id)

  if (result.error || !result.data) {
    redirect("/dashboard/offers")
  }

  return (
    <div className="container mx-auto py-8">
      <OfferForm initialData={result.data} />
    </div>
  )
}
