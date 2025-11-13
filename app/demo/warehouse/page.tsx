import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Warehouse, Heart, ArrowLeft, Plus, FileText, Users } from "lucide-react"

export default function WarehouseDemoPage() {
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
                  <h1 className="text-xl font-bold text-gray-900">Warehouse Forms</h1>
                  <p className="text-xs text-gray-600">Storage & Distribution</p>
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
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Warehouse className="w-10 h-10 text-green-600" />
          </div>
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            <Warehouse className="w-4 h-4 mr-2" />
            Warehouse Management
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Warehouse Forms</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Coordinate warehouse storage needs and offers for humanitarian logistics. Connect organizations requiring
            storage with warehouse operators providing space and services.
          </p>
        </div>
      </section>

      {/* Forms Selection */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Warehouse Need Form */}
            <Link href="/demo/warehouse/need">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-700">Warehouse Need</CardTitle>
                  <CardDescription className="text-base">
                    Request warehouse storage for humanitarian supplies
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-green-600" />
                      Distribution planning details
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Warehouse className="w-4 h-4 mr-2 text-green-600" />
                      Storage requirements & duration
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-green-600" />
                      Labor and space specifications
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Submit Warehouse Need</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Warehouse Offer Form */}
            <Link href="/demo/warehouse/offer">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Warehouse className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-blue-700">Warehouse Offer</CardTitle>
                  <CardDescription className="text-base">
                    Provide warehouse storage services for humanitarian efforts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-blue-600" />
                      Available space and capabilities
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Warehouse className="w-4 h-4 mr-2 text-blue-600" />
                      Climate control and security features
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      Service area and availability
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Submit Warehouse Offer</Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Warehouse Coordination</h3>
                <p className="text-gray-600 mb-6">
                  Our warehouse forms connect organizations needing storage space with warehouse operators offering
                  facilities. Features include climate control, security, labor support, and inventory management
                  capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
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
