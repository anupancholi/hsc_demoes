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
import { Settings, Heart, ArrowLeft, CheckCircle, MapPin, Calendar } from "lucide-react"

export default function EquipmentOfferPage() {
  const [formData, setFormData] = useState({
    equipmentType: "",
    descriptionQuantities: "",
    availabilityStartDate: "",
    availabilityEndDate: "",
    serviceArea: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Equipment Offer submitted:", formData)
    alert("Equipment Offer form submitted successfully!")
  }

  const isFieldValidated = (field: string) => validatedFields.includes(field)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/equipment">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Equipment
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Equipment Offer</h1>
                  <p className="text-xs text-gray-600">Provide Equipment</p>
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
              <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-orange-50">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-700">Equipment Offer Form</CardTitle>
                <p className="text-gray-600">Provide specialized equipment for humanitarian efforts</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Equipment Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-blue-600" />
                      Equipment Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="equipmentType">Equipment Type *</Label>
                      <Select
                        value={formData.equipmentType}
                        onValueChange={(value) => handleInputChange("equipmentType", value)}
                      >
                        <SelectTrigger className={isFieldValidated("equipmentType") ? "pr-10" : ""}>
                          <SelectValue placeholder="Select equipment category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forklifts">Forklifts</SelectItem>
                          <SelectItem value="generators">Generators</SelectItem>
                          <SelectItem value="pallet-jacks">Pallet Jacks</SelectItem>
                          <SelectItem value="cranes">Cranes</SelectItem>
                          <SelectItem value="vehicles">Vehicles</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {isFieldValidated("equipmentType") && (
                        <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descriptionQuantities">Description & Quantities *</Label>
                      <div className="relative">
                        <Textarea
                          id="descriptionQuantities"
                          placeholder="Specifications, available units, capacities, and condition details"
                          value={formData.descriptionQuantities}
                          onChange={(e) => handleInputChange("descriptionQuantities", e.target.value)}
                          className={isFieldValidated("descriptionQuantities") ? "pr-10" : ""}
                          rows={4}
                          required
                        />
                        {isFieldValidated("descriptionQuantities") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
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
                          placeholder="Where equipment can be delivered (in-person or remote support)"
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
                        placeholder="e.g., Maintenance included, operator training provided, certifications, delivery options"
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
                      className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 px-12"
                    >
                      Submit Equipment Offer
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
