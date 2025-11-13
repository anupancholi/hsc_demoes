"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Plus,
  Truck,
  Warehouse,
  Settings,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Bell,
  User,
  LogOut,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for demonstration
  const mockSubmissions = {
    needs: [
      {
        id: 1,
        type: "Transportation",
        title: "Emergency Medical Supply Transport",
        status: "Active",
        location: "Haiti",
        date: "2025-01-15",
        matches: 3,
      },
      {
        id: 2,
        type: "Warehouse",
        title: "Temporary Storage for Relief Supplies",
        status: "Matched",
        location: "Philippines",
        date: "2025-01-10",
        matches: 1,
      },
    ],
    offers: [
      {
        id: 3,
        type: "Equipment",
        title: "Generator and Power Equipment",
        status: "Available",
        location: "Global",
        date: "2025-01-12",
        matches: 2,
      },
      {
        id: 4,
        type: "Expertise",
        title: "Supply Chain Planning Consultation",
        status: "In Progress",
        location: "Remote",
        date: "2025-01-08",
        matches: 1,
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800"
      case "Matched":
        return "bg-green-100 text-green-800"
      case "Available":
        return "bg-purple-100 text-purple-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Transportation":
        return <Truck className="w-4 h-4" />
      case "Warehouse":
        return <Warehouse className="w-4 h-4" />
      case "Equipment":
        return <Settings className="w-4 h-4" />
      case "Expertise":
        return <Users className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ImpactMatrix</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
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
                      <p className="text-3xl font-bold text-blue-600">2</p>
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
                      <p className="text-3xl font-bold text-green-600">2</p>
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
                      <p className="text-3xl font-bold text-purple-600">7</p>
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
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-3xl font-bold text-orange-600">85%</p>
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
                  <Link href="/demo/transportation">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                      <Truck className="w-6 h-6 text-blue-600" />
                      <span>Transportation</span>
                    </Button>
                  </Link>
                  <Link href="/demo/warehouse">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                      <Warehouse className="w-6 h-6 text-green-600" />
                      <span>Warehouse</span>
                    </Button>
                  </Link>
                  <Link href="/demo/equipment">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                      <Settings className="w-6 h-6 text-orange-600" />
                      <span>Equipment</span>
                    </Button>
                  </Link>
                  <Link href="/demo/expertise">
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                      <Users className="w-6 h-6 text-purple-600" />
                      <span>Expertise</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates on your submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New match found for Emergency Medical Supply Transport</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">New Match</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Warehouse storage request successfully matched</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Equipment offer pending review</p>
                      <p className="text-sm text-gray-600">3 days ago</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Needs Tab */}
          <TabsContent value="needs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">My Needs</h3>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Need
              </Button>
            </div>

            <div className="grid gap-6">
              {mockSubmissions.needs.map((need) => (
                <Card key={need.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(need.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{need.title}</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {need.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {need.date}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {need.matches} matches
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(need.status)}>{need.status}</Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">My Offers</h3>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Offer
              </Button>
            </div>

            <div className="grid gap-6">
              {mockSubmissions.offers.map((offer) => (
                <Card key={offer.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(offer.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{offer.title}</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {offer.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {offer.date}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {offer.matches} matches
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Potential Matches</h3>
              <Button variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                Refresh Matches
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>AI-Powered Matching</CardTitle>
                <CardDescription>
                  Our intelligent system has found potential matches based on location, category, and requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Emergency Medical Supply Transport</h4>
                      <Badge className="bg-green-100 text-green-800">95% Match</Badge>
                    </div>
                    <Progress value={95} className="mb-4" />
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Your Need:</p>
                        <p className="text-gray-600">Transportation from Port-au-Prince to Cap-Haïtien</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Matched Offer:</p>
                        <p className="text-gray-600">Truck transport service available in Haiti region</p>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept Match
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        Decline
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Supply Chain Planning Consultation</h4>
                      <Badge className="bg-blue-100 text-blue-800">87% Match</Badge>
                    </div>
                    <Progress value={87} className="mb-4" />
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Your Offer:</p>
                        <p className="text-gray-600">Remote supply chain planning expertise</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Matched Need:</p>
                        <p className="text-gray-600">Logistics coordination for disaster response</p>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Accept Match
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
