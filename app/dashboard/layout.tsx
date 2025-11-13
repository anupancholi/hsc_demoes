import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/profile"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userData = await getCurrentUser()

  if (!userData) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={userData} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
