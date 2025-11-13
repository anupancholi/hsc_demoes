"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Truck, Heart, ArrowLeft, CheckCircle, MapPin, Calendar, Settings } from "lucide-react"

export default function TransportationOfferPage() {
  const [formData, setFormData] = useState({
    crisisFocus: "",
    transportationType: "",
    capacity: "",
    availabilityStartDate: "",
    availabilityEndDate: "",
    serviceArea: "",
    donatedOrPaid: "",
    rateDetails: "",
    additionalCapabilities: "",
  })

  const [validatedFields, setValidatedFields] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (value.trim() && !validatedFields.includes(field)) {
      setValidatedFields((prev) => [...prev, field])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transportation Offer submitted:", formData)
    alert("Transportation Offer form submitted successfully!")
  }

  const isFieldValidated = (field: string) => validatedFields.includes(field)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/transportation">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Transportation
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Transportation Offer</h1>
                  <p className="text-xs text-gray-600">Provide Logistics Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-green-50">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-700">Transportation Offer Form</CardTitle>
                <p className="text-gray-600">Provide transportation services for humanitarian efforts</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Service Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-blue-600" />
                      Service Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="crisisFocus">Crisis Focus *</Label>
                      <div className="relative">
                        <Input
                          id="crisisFocus"
                          placeholder="Crises you can support (e.g., Natural disasters, Emergency response)"
                          value={formData.crisisFocus}
                          onChange={(e) => handleInputChange("crisisFocus", e.target.value)}
                          className={isFieldValidated("crisisFocus") ? "pr-10" : ""}
                          required
                        />
                        {isFieldValidated("crisisFocus") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="transportationType">Type of Transportation *</Label>
                        <Select
                          value={formData.transportationType}
                          onValueChange={(value) => handleInputChange("transportationType", value)}
                        >
                          <SelectTrigger className={isFieldValidated("transportationType") ? "pr-10" : ""}>
                            <SelectValue placeholder="Select transportation mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="air">Air</SelectItem>
                            <SelectItem value="sea">Sea</SelectItem>
                            <SelectItem value="rail">Rail</SelectItem>
                            <SelectItem value="drone">Drone</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {isFieldValidated("transportationType") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity *</Label>
                        <div className="relative">
                          <Input
                            id="capacity"
                            placeholder="e.g., 20-ton truck, 40ft container, 500kg drone"
                            value={formData.capacity}
                            onChange={(e) => handleInputChange("capacity", e.target.value)}
                            className={isFieldValidated("capacity") ? "pr-10" : ""}
                            required
                          />
                          {isFieldValidated("capacity") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      Availability
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="availabilityStartDate">Available From *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="availabilityStartDate"
                            type="date"
                            value={formData.availabilityStartDate}
                            onChange={(e) => handleInputChange("availabilityStartDate", e.target.value)}
                            className={`pl-10 ${isFieldValidated("availabilityStartDate") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("availabilityStartDate") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availabilityEndDate">Available Until *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="availabilityEndDate"
                            type="date"
                            value={formData.availabilityEndDate}
                            onChange={(e) => handleInputChange("availabilityEndDate", e.target.value)}
                            className={`pl-10 ${isFieldValidated("availabilityEndDate") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("availabilityEndDate") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceArea">Service Area *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="serviceArea"
                          placeholder="Postal codes/regions where you operate (e.g., Northeast US, EU, Global)"
                          value={formData.serviceArea}
                          onChange={(e) => handleInputChange("serviceArea", e.target.value)}
                          className={`pl-10 ${isFieldValidated("serviceArea") ? "pr-10" : ""}`}
                          required
                        />
                        {isFieldValidated("serviceArea") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-orange-600" />
                      Service Terms
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="donatedOrPaid">Service Terms *</Label>
                      <Select
                        value={formData.donatedOrPaid}
                        onValueChange={(value) => handleInputChange("donatedOrPaid", value)}
                      >
                        <SelectTrigger className={isFieldValidated("donatedOrPaid") ? "pr-10" : ""}>
                          <SelectValue placeholder="Select service terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donated">Donated (Free)</SelectItem>
                          <SelectItem value="paid">Paid Service</SelectItem>
                          <SelectItem value="negotiable">Negotiable</SelectItem>
                        </SelectContent>
                      </Select>
                      {isFieldValidated("donatedOrPaid") && (
                        <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                      )}
                    </div>

                    {formData.donatedOrPaid === "paid" && (
                      <div className="space-y-2">
                        <Label htmlFor="rateDetails">Rate Details</Label>
                        <div className="relative">
                          <Input
                            id="rateDetails"
                            placeholder="e.g., $2.50/mile, $500/day, $1000/shipment"
                            value={formData.rateDetails}
                            onChange={(e) => handleInputChange("rateDetails", e.target.value)}
                            className={isFieldValidated("rateDetails") ? "pr-10" : ""}
                          />
                          {isFieldValidated("rateDetails") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Capabilities */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="additionalCapabilities">Additional Capabilities</Label>
                      <Textarea
                        id="additionalCapabilities"
                        placeholder="e.g., Hazmat handling, GPS tracking, temperature control, expedited service, cross-border clearance"
                        value={formData.additionalCapabilities}
                        onChange={(e) => handleInputChange("additionalCapabilities", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-12"
                    >
                      Submit Transportation Offer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
