import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Plus, Minus } from "lucide-react"

export default function GeneralNeedsOffersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
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
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">General Needs & Offers</h1>
                  <p className="text-xs text-gray-600">Food, Clothing, Medicine & More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            <Heart className="w-4 h-4 mr-2" />
            Humanitarian Aid Platform
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Connect Needs with Resources</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered matching system for food, clothing, medicine, and essential supplies with geographic intelligence
            and predictive analytics.
          </p>
        </div>
      </section>

      {/* Forms Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/demo/general-needs-offers/needs">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Minus className="w-12 h-12 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Submit a Need</CardTitle>
                  <CardDescription className="text-base">
                    Request essential supplies, food, clothing, medicine, or volunteer assistance with AI-powered
                    matching
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Priority Levels</span>
                      <Badge className="text-xs bg-red-100 text-red-800">Emergency Support</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Geographic Matching</span>
                      <Badge className="text-xs bg-green-100 text-green-800">AI-Powered</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Real-time Tracking</span>
                      <Badge className="text-xs bg-blue-100 text-blue-800">Live Updates</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/demo/general-needs-offers/offers">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group h-full">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Plus className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Make an Offer</CardTitle>
                  <CardDescription className="text-base">
                    Donate supplies, offer services, or provide resources with intelligent distribution optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Donation Types</span>
                      <Badge className="text-xs bg-blue-100 text-blue-800">Multiple Options</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Impact Tracking</span>
                      <Badge className="text-xs bg-purple-100 text-purple-800">Analytics</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tax Benefits</span>
                      <Badge className="text-xs bg-green-100 text-green-800">Automated</Badge>
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
