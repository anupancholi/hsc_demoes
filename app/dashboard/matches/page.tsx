"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getMyMatches, updateMatchStatus } from "@/lib/actions/matches"
import { CheckCircle, XCircle, TrendingUp, MapPin, Package, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    loadMatches()
  }, [])

  const loadMatches = async () => {
    setLoading(true)
    const result = await getMyMatches()
    if (result.success) {
      setMatches(result.data || [])
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to load matches",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleAccept = async (matchId: string) => {
    const result = await updateMatchStatus(matchId, "accepted")
    if (result.success) {
      toast({
        title: "Success",
        description: "Match accepted successfully",
      })
      loadMatches()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to accept match",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (matchId: string) => {
    const result = await updateMatchStatus(matchId, "rejected")
    if (result.success) {
      toast({
        title: "Success",
        description: "Match rejected",
      })
      loadMatches()
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to reject match",
        variant: "destructive",
      })
    }
  }

  const handleCreateShipment = (match: any) => {
    router.push(`/dashboard/shipments/new?matchId=${match.id}&needId=${match.need_id}&offerId=${match.offer_id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Matches</h1>
        <p className="text-gray-600 mt-1">Review and manage potential matches between needs and offers</p>
      </div>

      {matches.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h3>
            <p className="text-gray-500">Matches will appear here when needs and offers are compatible</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Match Score: {match.match_score}%</h3>
                      <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {match.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleAccept(match.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => handleReject(match.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {match.status === "accepted" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleCreateShipment(match)}
                      >
                        <Truck className="w-4 h-4 mr-1" />
                        Create Shipment
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Need</h4>
                    <p className="text-sm text-gray-700 mb-2">{match.need?.title}</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {match.need?.location}
                      </div>
                      <div className="flex items-center">
                        <Package className="w-3 h-3 mr-1" />
                        {match.need?.quantity} {match.need?.unit}
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Offer</h4>
                    <p className="text-sm text-gray-700 mb-2">{match.offer?.title}</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {match.offer?.location}
                      </div>
                      <div className="flex items-center">
                        <Package className="w-3 h-3 mr-1" />
                        {match.offer?.quantity} {match.offer?.unit}
                      </div>
                    </div>
                  </div>
                </div>

                {match.match_details && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Match Details:</span> {JSON.stringify(match.match_details)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
