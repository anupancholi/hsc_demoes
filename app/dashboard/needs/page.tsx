"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMyNeeds, deleteNeed } from "@/lib/actions/needs"
import { Plus, MapPin, Calendar, Trash2, Edit, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NeedsPage() {
  const [needs, setNeeds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadNeeds()
  }, [])

  const loadNeeds = async () => {
    setLoading(true)
    const result = await getMyNeeds()
    if (result.success) {
      setNeeds(result.data || [])
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to load needs",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this need?")) return

    const result = await deleteNeed(id)
    if (result.success) {
      toast({
        title: "Success",
        description: "Need deleted successfully",
      })
      loadNeeds()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete need",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "matched":
        return "bg-green-100 text-green-800"
      case "fulfilled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Needs</h1>
          <p className="text-gray-600 mt-1">Manage your humanitarian aid requests</p>
        </div>
        <Link href="/dashboard/needs/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Need
          </Button>
        </Link>
      </div>

      {needs.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No needs yet</h3>
            <p className="text-gray-500 mb-6">Create your first need to start receiving offers from suppliers</p>
            <Link href="/dashboard/needs/new">
              <Button>Create Your First Need</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {needs.map((need) => (
            <Card key={need.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{need.title}</h3>
                      <Badge className={getStatusColor(need.status)}>{need.status}</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{need.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {need.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Package className="w-4 h-4 mr-2" />
                        Quantity: {need.quantity} {need.unit}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(need.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {need.tags && need.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {need.tags.map((tag: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => router.push(`/dashboard/needs/${need.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(need.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
