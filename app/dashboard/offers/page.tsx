"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMyOffers, deleteOffer } from "@/lib/actions/offers"
import { Plus, MapPin, Calendar, Trash2, Edit, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    setLoading(true)
    const result = await getMyOffers()
    if (result.success) {
      setOffers(result.data || [])
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to load offers",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return

    const result = await deleteOffer(id)
    if (result.success) {
      toast({
        title: "Success",
        description: "Offer deleted successfully",
      })
      loadOffers()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete offer",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "reserved":
        return "bg-orange-100 text-orange-800"
      case "fulfilled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Offers</h1>
          <p className="text-gray-600 mt-1">Manage your humanitarian aid offerings</p>
        </div>
        <Link href="/dashboard/offers/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Offer
          </Button>
        </Link>
      </div>

      {offers.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No offers yet</h3>
            <p className="text-gray-500 mb-6">Create your first offer to help those in need</p>
            <Link href="/dashboard/offers/new">
              <Button>Create Your First Offer</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{offer.title}</h3>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {offer.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Package className="w-4 h-4 mr-2" />
                        Quantity: {offer.quantity} {offer.unit}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(offer.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {offer.tags && offer.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {offer.tags.map((tag: string, idx: number) => (
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
                      onClick={() => router.push(`/dashboard/offers/${offer.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(offer.id)}>
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
