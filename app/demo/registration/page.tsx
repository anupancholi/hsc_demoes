import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, Heart, ArrowLeft, UserPlus } from "lucide-react"

export default function RegistrationDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Demo
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Registration Forms</h1>
                  <p className="text-xs text-gray-600">Organization & Volunteer Registration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
            <UserPlus className="w-4 h-4 mr-2" />
            Registration System
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Network</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Register your organization or volunteer profile with AI-powered matching and geographic intelligence.
          </p>
        </div>
      </section>

      {/* Registration Options */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/demo/registration/organization">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Building className="w-12 h-12 text-indigo-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Organization Registration</CardTitle>
                  <CardDescription className="text-base">
                    Register your business, NGO, NPO, or government agency with comprehensive organizational profiling
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Organization Types</span>
                      <Badge className="text-xs bg-indigo-100 text-indigo-800">6 Types</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">EIN Verification</span>
                      <Badge className="text-xs bg-green-100 text-green-800">Automated</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">AI Profiling</span>
                      <Badge className="text-xs bg-purple-100 text-purple-800">Smart</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/demo/registration/volunteer">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Heart className="w-12 h-12 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Volunteer Registration</CardTitle>
                  <CardDescription className="text-base">
                    Register as an individual or group volunteer with skill matching and availability tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Skill Matching</span>
                      <Badge className="text-xs bg-purple-100 text-purple-800">AI-Powered</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Insurance Tracking</span>
                      <Badge className="text-xs bg-blue-100 text-blue-800">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Availability</span>
                      <Badge className="text-xs bg-green-100 text-green-800">Real-time</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
