"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Truck,
  Warehouse,
  Settings,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  TrendingUp,
  Activity,
} from "lucide-react"

interface DashboardOverviewProps {
  user: any
  needs: any[]
  offers: any[]
  matches: any[]
}

export function DashboardOverview({ user, needs, offers, matches }: DashboardOverviewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "matched":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (category: string) => {
    if (category?.includes("transport")) return <Truck className="w-4 h-4" />
    if (category?.includes("warehouse")) return <Warehouse className="w-4 h-4" />
    if (category?.includes("equipment")) return <Settings className="w-4 h-4" />
    return <Activity className="w-4 h-4" />
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.profile?.full_name || "User"}!</h2>
        <p className="text-gray-600">Manage your humanitarian logistics coordination from your dashboard.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="needs">My Needs</TabsTrigger>
          <TabsTrigger value="offers">My Offers</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Needs</p>
                    <p className="text-3xl font-bold text-blue-600">{needs.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available Offers</p>
                    <p className="text-3xl font-bold text-green-600">{offers.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Matches</p>
                    <p className="text-3xl font-bold text-purple-600">{matches.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Role</p>
                    <p className="text-xl font-bold text-orange-600 capitalize">{user.profile?.role || "Member"}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Submit new needs or offers to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/dashboard/needs/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                    <Plus className="w-6 h-6 text-blue-600" />
                    <span>Create Need</span>
                  </Button>
                </Link>
                <Link href="/dashboard/offers/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                    <Plus className="w-6 h-6 text-green-600" />
                    <span>Create Offer</span>
                  </Button>
                </Link>
                <Link href="/dashboard/matches">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                    <Users className="w-6 h-6 text-purple-600" />
                    <span>View Matches</span>
                  </Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                    <Settings className="w-6 h-6 text-orange-600" />
                    <span>Settings</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Items */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Needs</CardTitle>
              </CardHeader>
              <CardContent>
                {needs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No needs yet. Create your first need!</p>
                ) : (
                  <div className="space-y-4">
                    {needs.slice(0, 3).map((need) => (
                      <div key={need.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(need.category)}
                          <div>
                            <p className="font-medium text-sm">{need.title}</p>
                            <p className="text-xs text-gray-500">{need.location}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(need.status)}>{need.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Offers</CardTitle>
              </CardHeader>
              <CardContent>
                {offers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No offers yet. Create your first offer!</p>
                ) : (
                  <div className="space-y-4">
                    {offers.slice(0, 3).map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(offer.category)}
                          <div>
                            <p className="font-medium text-sm">{offer.title}</p>
                            <p className="text-xs text-gray-500">{offer.location}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Needs Tab */}
        <TabsContent value="needs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">My Needs</h3>
            <Link href="/dashboard/needs/new">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Need
              </Button>
            </Link>
          </div>

          {needs.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">No needs yet. Create your first need to get started!</p>
                <Link href="/dashboard/needs/new">
                  <Button>Create Your First Need</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {needs.map((need) => (
                <Card key={need.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(need.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{need.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{need.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {need.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(need.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(need.status)}>{need.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">My Offers</h3>
            <Link href="/dashboard/offers/new">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Offer
              </Button>
            </Link>
          </div>

          {offers.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">No offers yet. Create your first offer to get started!</p>
                <Link href="/dashboard/offers/new">
                  <Button>Create Your First Offer</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {offers.map((offer) => (
                <Card key={offer.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(offer.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{offer.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {offer.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(offer.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Matches Tab */}
        <TabsContent value="matches" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Potential Matches</h3>
          </div>

          {matches.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No matches yet. Create needs or offers to find matches!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {matches.map((match) => (
                <Card key={match.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Match Score: {match.match_score}%</h4>
                      <Badge className="bg-green-100 text-green-800">{match.status}</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Need:</p>
                        <p className="text-gray-600">{match.need_id}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Offer:</p>
                        <p className="text-gray-600">{match.offer_id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
