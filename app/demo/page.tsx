import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Warehouse, Settings, Users, Heart, ArrowLeft, FileText, Plus } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ImpactMatrix</h1>
                  <p className="text-xs text-gray-600">Demo Forms</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            <FileText className="w-4 h-4 mr-2" />
            Interactive Demo Forms
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Form System</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the comprehensive form system designed for humanitarian logistics coordination. Each category
            supports both Need requests and Offer submissions.
          </p>
        </div>
      </section>

      {/* Forms Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {/* Registration Forms */}
            <Link href="/demo/registration">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">Registration</CardTitle>
                  <CardDescription className="text-sm">
                    Organization & volunteer registration with AI profiling
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Organization Form</span>
                      <Plus className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Volunteer Form</span>
                      <Plus className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* General Needs & Offers */}
            <Link href="/demo/general-needs-offers">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-10 h-10 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">General Needs & Offers</CardTitle>
                  <CardDescription className="text-sm">Food, clothing, medicine with AI matching</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Needs Form</span>
                      <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Offers Form</span>
                      <Plus className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Volunteer Coordination */}
            <Link href="/demo/volunteer-coordination">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">Volunteer Coordination</CardTitle>
                  <CardDescription className="text-sm">Volunteer needs & offers with skill matching</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Volunteer Needs</span>
                      <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Volunteer Offers</span>
                      <Plus className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Transportation */}
            <Link href="/demo/transportation">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Truck className="w-10 h-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Transportation</CardTitle>
                  <CardDescription className="text-sm">Truck, air, sea, rail logistics coordination</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Need Form</span>
                      <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Offer Form</span>
                      <Plus className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Warehousing */}
            <Link href="/demo/warehouse">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Warehouse className="w-10 h-10 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Warehousing</CardTitle>
                  <CardDescription className="text-sm">Storage, distribution, and inventory management</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Need Form</span>
                      <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Offer Form</span>
                      <Plus className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Equipment */}
            <Link href="/demo/equipment">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Settings className="w-10 h-10 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Equipment</CardTitle>
                  <CardDescription className="text-sm">Forklifts, generators, specialized machinery</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Need Form</span>
                      <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Offer Form</span>
                      <Plus className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Expertise */}
            <Link href="/demo/expertise">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Expertise</CardTitle>
                  <CardDescription className="text-sm">Professional consultation and coordination</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Need Form</span>
                      <Plus className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Offer Form</span>
                      <Plus className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Case Management */}
            <Link href="/demo/case-management">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-10 h-10 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Case Management</CardTitle>
                  <CardDescription className="text-sm">Site visits, damage assessment, case tracking</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Assessment Form</span>
                      <Plus className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">33 Fields</span>
                      <Badge className="text-xs bg-red-100 text-red-800">Complete</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Create your account to access the full platform with real-time matching, geospatial mapping, and
                  comprehensive logistics coordination tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Create Account
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
