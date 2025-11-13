import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Warehouse, Settings, Users, MapPin, ArrowRight, Globe, Shield, Zap } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/impact-matrix-logo.jpeg"
                alt="ImpactMatrix"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-brand-navy hover:bg-blue-800 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-blue-50 text-brand-navy border-brand-blue hover:bg-blue-50">
            <Globe className="w-4 h-4 mr-2" />
            World-Class Humanitarian Logistics
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Connect Aid Organizations
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-blue">
              With Supply Chain Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            ImpactMatrix facilitates bidirectional matching of humanitarian needs and offers across transportation,
            warehousing, equipment, and expertise - inspired by ALAN but expanded for global impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-brand-navy hover:bg-blue-800 text-white">
                Start Helping Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white bg-transparent"
              >
                View Demo Forms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-navy mb-4">Platform Capabilities</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with humanitarian logistics best practices and digital transformation principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-brand-blue" />
                </div>
                <CardTitle className="text-brand-navy">AI-Powered Matching</CardTitle>
                <CardDescription>
                  Intelligent algorithms match needs with offers based on location, category, and capacity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-brand-blue" />
                </div>
                <CardTitle className="text-brand-navy">Geospatial Mapping</CardTitle>
                <CardDescription>
                  Real-time visualization of needs and offers with integrated mapping solutions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-brand-blue" />
                </div>
                <CardTitle className="text-brand-navy">Verified Network</CardTitle>
                <CardDescription>
                  Document verification and transparency features ensure trusted partnerships
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Forms Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-navy mb-4">Demo Forms</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive form system for humanitarian logistics coordination
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/demo/transportation">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md hover:border-brand-blue">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-brand-blue" />
                  </div>
                  <CardTitle className="text-lg text-brand-navy">Transportation</CardTitle>
                  <CardDescription>Truck, air, sea, rail logistics coordination</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/demo/warehouse">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md hover:border-brand-blue">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Warehouse className="w-8 h-8 text-brand-blue" />
                  </div>
                  <CardTitle className="text-lg text-brand-navy">Warehousing</CardTitle>
                  <CardDescription>Storage, distribution, and inventory management</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/demo/equipment">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md hover:border-brand-blue">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-brand-blue" />
                  </div>
                  <CardTitle className="text-lg text-brand-navy">Equipment</CardTitle>
                  <CardDescription>Forklifts, generators, specialized machinery</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/demo/expertise">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md hover:border-brand-blue">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-brand-blue" />
                  </div>
                  <CardTitle className="text-lg text-brand-navy">Expertise</CardTitle>
                  <CardDescription>Professional consultation and coordination</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/impact-matrix-logo.jpeg"
                  alt="ImpactMatrix"
                  width={120}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-blue-200">
                Connecting humanitarian aid organizations with supply chain solutions worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <Link href="/demo" className="hover:text-white transition-colors">
                    Demo Forms
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Categories</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <Link href="/demo/transportation" className="hover:text-white transition-colors">
                    Transportation
                  </Link>
                </li>
                <li>
                  <Link href="/demo/warehouse" className="hover:text-white transition-colors">
                    Warehousing
                  </Link>
                </li>
                <li>
                  <Link href="/demo/equipment" className="hover:text-white transition-colors">
                    Equipment
                  </Link>
                </li>
                <li>
                  <Link href="/demo/expertise" className="hover:text-white transition-colors">
                    Expertise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2025 ImpactMatrix. Built for humanitarian impact.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
