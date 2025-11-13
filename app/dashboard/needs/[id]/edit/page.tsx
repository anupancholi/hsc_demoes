import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getNeed } from "@/lib/actions/needs"
import { NeedForm } from "@/components/forms/need-form"

export default async function EditNeedPage({
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

  const result = await getNeed(params.id)

  if (result.error || !result.data) {
    redirect("/dashboard/needs")
  }

  return (
    <div className="container mx-auto py-8">
      <NeedForm initialData={result.data} />
    </div>
  )
}
