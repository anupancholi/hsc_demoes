import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ArrowLeft, Heart, ClipboardList, AlertTriangle } from "lucide-react"

export default function CaseManagementDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Case Management</h1>
                  <p className="text-xs text-gray-600">Site Assessment & Tracking</p>
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
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
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
          <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-100">
            <FileText className="w-4 h-4 mr-2" />
            Case Management System
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Site Assessment & Case Tracking</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive case management system for disaster response, site assessments, and damage tracking with 33
            detailed fields for complete documentation.
          </p>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {/* Case Assessment Form */}
            <Link href="/demo/case-management/assessment">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
                <CardHeader className="text-center pb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <ClipboardList className="w-12 h-12 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl">Site Assessment Form</CardTitle>
                  <CardDescription className="text-base">
                    Complete damage assessment and case documentation with 33 comprehensive fields
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                        Required Fields (10)
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Case Number</li>
                        <li>• Initial Site Visit Date</li>
                        <li>• Full Name & Mobile Number</li>
                        <li>• Site Type & Address</li>
                        <li>• County & Property Owner</li>
                        <li>• House Status & Priority Level</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-orange-600" />
                        Optional Fields (23)
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Demographics & Family Info</li>
                        <li>• Damage Assessment Details</li>
                        <li>• Infrastructure Status</li>
                        <li>• Environmental Hazards</li>
                        <li>• Follow-up & Assignment</li>
                        <li>• Additional Notes</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-100 text-red-800">33 Total Fields</Badge>
                      <span className="text-sm text-gray-600">Complete Assessment Tool</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Case Management</h3>
                <p className="text-gray-600 mb-6">
                  Our comprehensive case management system enables detailed site assessments, damage tracking, and
                  coordinated response efforts for disaster recovery operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                      Start Assessment
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
