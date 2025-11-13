import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getInventoryItem } from "@/lib/actions/inventory"
import { InventoryForm } from "@/components/forms/inventory-form"

export default async function EditInventoryPage({
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

  const result = await getInventoryItem(params.id)

  if (result.error || !result.data) {
    redirect("/dashboard/inventory")
  }

  return (
    <div className="container mx-auto py-8">
      <InventoryForm initialData={result.data} />
    </div>
  )
}
