"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building, CheckCircle, MapPin, Users, Shield, Brain } from "lucide-react"

export default function OrganizationRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    organizationType: "",
    organizationName: "",
    ein: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    // Geographic Intelligence Fields
    country: "",
    state: "",
    city: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    serviceRadius: "",
    // AI & Predictive Fields
    organizationSize: "",
    annualBudget: "",
    primaryFocus: "",
    secondaryFocus: "",
    operationalCapacity: "",
    responseTimeCapability: "",
    // Risk Assessment
    riskTolerance: "",
    insuranceCoverage: "",
    certifications: "",
    // Predictive Modeling
    historicalVolume: "",
    seasonalPatterns: "",
    growthProjection: "",
    // Additional Intelligence
    technologyCapability: "",
    dataSharing: false,
    emergencyResponse: false,
    multiLanguage: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Organization registration submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/registration">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Registration
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Organization Registration</h1>
                  <p className="text-xs text-gray-600">AI-Enhanced Registration Form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl">Organization Registration</CardTitle>
              <CardDescription>
                Register your organization with AI-powered profiling and geographic intelligence
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="border-gray-200 focus:border-indigo-500"
                        required
                      />
                      {formData.fullName && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizationType">Organization Type *</Label>
                      <Select
                        value={formData.organizationType}
                        onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-indigo-500">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="donor">Donor</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                          <SelectItem value="npo">NPO</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="government">Government Agency</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="association">Association</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.organizationType && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        className="border-gray-200 focus:border-indigo-500"
                        required
                      />
                      {formData.organizationName && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ein">EIN (if applicable)</Label>
                      <Input
                        id="ein"
                        value={formData.ein}
                        onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                        className="border-gray-200 focus:border-indigo-500"
                        placeholder="XX-XXXXXXX"
                      />
                      {formData.ein && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-gray-200 focus:border-indigo-500"
                        required
                      />
                      {formData.email && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="border-gray-200 focus:border-indigo-500"
                        required
                      />
                      {formData.contactNumber && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                    </div>
                  </div>
                </div>

                {/* Geographic Intelligence */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold">Geographic Intelligence</h3>
                    <Badge className="bg-green-100 text-green-800">AI-Enhanced</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-green-500">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="mx">Mexico</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="border-gray-200 focus:border-green-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="border-gray-200 focus:border-green-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="border-gray-200 focus:border-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceRadius">Service Radius (miles)</Label>
                      <Select
                        value={formData.serviceRadius}
                        onValueChange={(value) => setFormData({ ...formData, serviceRadius: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-green-500">
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 miles</SelectItem>
                          <SelectItem value="25">25 miles</SelectItem>
                          <SelectItem value="50">50 miles</SelectItem>
                          <SelectItem value="100">100 miles</SelectItem>
                          <SelectItem value="250">250 miles</SelectItem>
                          <SelectItem value="500">500 miles</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* AI & Predictive Intelligence */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">AI & Predictive Intelligence</h3>
                    <Badge className="bg-purple-100 text-purple-800">Smart Matching</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizationSize">Organization Size</Label>
                      <Select
                        value={formData.organizationSize}
                        onValueChange={(value) => setFormData({ ...formData, organizationSize: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-purple-500">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-1000">201-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annualBudget">Annual Budget Range</Label>
                      <Select
                        value={formData.annualBudget}
                        onValueChange={(value) => setFormData({ ...formData, annualBudget: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-purple-500">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-100k">Under $100K</SelectItem>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                          <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                          <SelectItem value="10m+">$10M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryFocus">Primary Focus Area</Label>
                      <Select
                        value={formData.primaryFocus}
                        onValueChange={(value) => setFormData({ ...formData, primaryFocus: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-purple-500">
                          <SelectValue placeholder="Select primary focus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disaster-relief">Disaster Relief</SelectItem>
                          <SelectItem value="food-security">Food Security</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="housing">Housing</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="community-development">Community Development</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responseTimeCapability">Response Time Capability</Label>
                      <Select
                        value={formData.responseTimeCapability}
                        onValueChange={(value) => setFormData({ ...formData, responseTimeCapability: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-purple-500">
                          <SelectValue placeholder="Select response time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (0-4 hours)</SelectItem>
                          <SelectItem value="same-day">Same Day (4-24 hours)</SelectItem>
                          <SelectItem value="next-day">Next Day (24-48 hours)</SelectItem>
                          <SelectItem value="weekly">Weekly (2-7 days)</SelectItem>
                          <SelectItem value="monthly">Monthly (1-4 weeks)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Advanced Capabilities */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Advanced Capabilities</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="technologyCapability">Technology Capability Level</Label>
                      <Select
                        value={formData.technologyCapability}
                        onValueChange={(value) => setFormData({ ...formData, technologyCapability: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-blue-500">
                          <SelectValue placeholder="Select tech level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (Email, Phone)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (CRM, Basic Analytics)</SelectItem>
                          <SelectItem value="advanced">Advanced (API Integration, Real-time Data)</SelectItem>
                          <SelectItem value="expert">Expert (AI/ML, Custom Systems)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications & Accreditations</Label>
                      <Textarea
                        id="certifications"
                        value={formData.certifications}
                        onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                        className="border-gray-200 focus:border-blue-500"
                        placeholder="List relevant certifications, licenses, or accreditations..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Additional Capabilities</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dataSharing"
                          checked={formData.dataSharing}
                          onCheckedChange={(checked) => setFormData({ ...formData, dataSharing: checked as boolean })}
                        />
                        <Label htmlFor="dataSharing" className="text-sm">
                          Data Sharing for Analytics
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emergencyResponse"
                          checked={formData.emergencyResponse}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, emergencyResponse: checked as boolean })
                          }
                        />
                        <Label htmlFor="emergencyResponse" className="text-sm">
                          24/7 Emergency Response
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="multiLanguage"
                          checked={formData.multiLanguage}
                          onCheckedChange={(checked) => setFormData({ ...formData, multiLanguage: checked as boolean })}
                        />
                        <Label htmlFor="multiLanguage" className="text-sm">
                          Multi-language Support
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold">Security & Authentication</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="border-gray-200 focus:border-red-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="border-gray-200 focus:border-red-500"
                        required
                      />
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password === formData.confirmPassword && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                        )}
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3"
                  >
                    Register Organization
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 py-3 bg-transparent"
                    onClick={() => console.log("Save as draft")}
                  >
                    Save as Draft
                  </Button>
                  <Link href="/demo/registration">
                    <Button variant="ghost" className="flex-1 py-3">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
