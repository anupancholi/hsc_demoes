import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, ArrowLeft, Plus, FileText, Brain } from "lucide-react"

export default function ExpertiseDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Expertise Forms</h1>
                  <p className="text-xs text-gray-600">Professional Consultation</p>
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
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-purple-600" />
          </div>
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
            <Brain className="w-4 h-4 mr-2" />
            Professional Expertise
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Expertise Forms</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect humanitarian organizations with professional expertise in supply chain planning, logistics
            coordination, inventory management, and risk assessment for effective crisis response.
          </p>
        </div>
      </section>

      {/* Forms Selection */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Expertise Need Form */}
            <Link href="/demo/expertise/need">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-700">Expertise Need</CardTitle>
                  <CardDescription className="text-base">
                    Request professional expertise for humanitarian operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-green-600" />
                      Crisis coordination planning
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Brain className="w-4 h-4 mr-2 text-green-600" />
                      Specialized knowledge areas
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-green-600" />
                      Expert quantity and duration
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Submit Expertise Need</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Expertise Offer Form */}
            <Link href="/demo/expertise/offer">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-blue-700">Expertise Offer</CardTitle>
                  <CardDescription className="text-base">
                    Provide professional expertise for humanitarian efforts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-blue-600" />
                      Professional skills and experience
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Brain className="w-4 h-4 mr-2 text-blue-600" />
                      Specialized certifications
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      Service area and availability
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Submit Expertise Offer</Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Expertise Coordination</h3>
                <p className="text-gray-600 mb-6">
                  Our expertise forms connect humanitarian organizations with professional consultants specializing in
                  supply chain planning, logistics coordination, inventory management, risk assessment, and crisis
                  response strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Join Platform
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button variant="outline">View All Forms</Button>
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
