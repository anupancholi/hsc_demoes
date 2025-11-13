import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Heart, ArrowLeft, Plus, FileText, Users } from "lucide-react"

export default function TransportationDemoPage() {
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
                  <h1 className="text-xl font-bold text-gray-900">Transportation Forms</h1>
                  <p className="text-xs text-gray-600">Logistics Coordination</p>
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
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-blue-600" />
          </div>
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Truck className="w-4 h-4 mr-2" />
            Transportation Logistics
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Transportation Forms</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Coordinate transportation needs and offers across truck, air, sea, rail, and drone logistics. Connect aid
            organizations with transportation providers.
          </p>
        </div>
      </section>

      {/* Forms Selection */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Transportation Need Form */}
            <Link href="/demo/transportation/need">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-700">Transportation Need</CardTitle>
                  <CardDescription className="text-base">
                    Request transportation support for humanitarian logistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-green-600" />
                      Crisis coordination details
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck className="w-4 h-4 mr-2 text-green-600" />
                      Transportation mode selection
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-green-600" />
                      Recipient and contact information
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Submit Transportation Need</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Transportation Offer Form */}
            <Link href="/demo/transportation/offer">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Truck className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-blue-700">Transportation Offer</CardTitle>
                  <CardDescription className="text-base">
                    Provide transportation services for humanitarian efforts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-blue-600" />
                      Service capabilities and capacity
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck className="w-4 h-4 mr-2 text-blue-600" />
                      Available transportation modes
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      Service area and availability
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Submit Transportation Offer</Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transportation Coordination</h3>
                <p className="text-gray-600 mb-6">
                  Our transportation forms facilitate coordination between aid organizations needing logistics support
                  and transportation providers offering services across multiple modes including truck, air, sea, rail,
                  and drone operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
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
