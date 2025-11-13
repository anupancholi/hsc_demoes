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
import { Checkbox } from "@/components/ui/checkbox"
import { Warehouse, Heart, ArrowLeft, CheckCircle, MapPin, Calendar, Settings } from "lucide-react"

export default function WarehouseOfferPage() {
  const [formData, setFormData] = useState({
    warehouseLocation: "",
    availableSpace: "",
    capabilities: [] as string[],
    availabilityStartDate: "",
    availabilityEndDate: "",
    donatedOrPaid: "",
    additionalInfo: "",
  })

  const [validatedFields, setValidatedFields] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (value.trim() && !validatedFields.includes(field)) {
      setValidatedFields((prev) => [...prev, field])
    }
  }

  const handleCapabilityChange = (capability: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: checked ? [...prev.capabilities, capability] : prev.capabilities.filter((c) => c !== capability),
    }))
    if (checked && !validatedFields.includes("capabilities")) {
      setValidatedFields((prev) => [...prev, "capabilities"])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Warehouse Offer submitted:", formData)
    alert("Warehouse Offer form submitted successfully!")
  }

  const isFieldValidated = (field: string) => validatedFields.includes(field)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/warehouse">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Warehouse
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Warehouse Offer</h1>
                  <p className="text-xs text-gray-600">Provide Storage Services</p>
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
                  <Warehouse className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-700">Warehouse Offer Form</CardTitle>
                <p className="text-gray-600">Provide warehouse storage services for humanitarian efforts</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Facility Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Warehouse className="w-5 h-5 mr-2 text-blue-600" />
                      Facility Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="warehouseLocation">Warehouse Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="warehouseLocation"
                            placeholder="Postal code/address of warehouse"
                            value={formData.warehouseLocation}
                            onChange={(e) => handleInputChange("warehouseLocation", e.target.value)}
                            className={`pl-10 ${isFieldValidated("warehouseLocation") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("warehouseLocation") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availableSpace">Available Space *</Label>
                        <div className="relative">
                          <Input
                            id="availableSpace"
                            placeholder="e.g., 10,000 sq ft, 500 pallet positions"
                            value={formData.availableSpace}
                            onChange={(e) => handleInputChange("availableSpace", e.target.value)}
                            className={isFieldValidated("availableSpace") ? "pr-10" : ""}
                            required
                          />
                          {isFieldValidated("availableSpace") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Capabilities *</Label>
                      <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg">
                        {[
                          "Temperature-Controlled",
                          "Labor Support",
                          "Forklifts",
                          "Security",
                          "Loading Docks",
                          "24/7 Access",
                        ].map((capability) => (
                          <div key={capability} className="flex items-center space-x-2">
                            <Checkbox
                              id={capability}
                              checked={formData.capabilities.includes(capability)}
                              onCheckedChange={(checked) => handleCapabilityChange(capability, checked as boolean)}
                            />
                            <Label htmlFor={capability} className="text-sm">
                              {capability}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {isFieldValidated("capabilities") && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Capabilities selected
                        </div>
                      )}
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
                  </div>

                  {/* Service Terms */}
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
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="e.g., Capacity limits, special handling capabilities, insurance coverage, certifications"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
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
                      Submit Warehouse Offer
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
