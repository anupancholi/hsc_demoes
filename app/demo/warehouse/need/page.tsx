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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Warehouse, Heart, ArrowLeft, CheckCircle, MapPin, Calendar, Package } from "lucide-react"

export default function WarehouseNeedPage() {
  const [formData, setFormData] = useState({
    crisisName: "",
    distributionPlan: "",
    warehousingCategory: "",
    desiredLocation: "",
    arrivalDate: "",
    durationNeeded: "",
    needLaborers: "",
    spaceRequirements: "",
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
    console.log("Warehouse Need submitted:", formData)
    alert("Warehouse Need form submitted successfully!")
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
                  <h1 className="text-xl font-bold text-gray-900">Warehouse Need</h1>
                  <p className="text-xs text-gray-600">Request Storage Space</p>
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
              <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Warehouse className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-700">Warehouse Need Form</CardTitle>
                <p className="text-gray-600">Request warehouse storage for humanitarian supplies</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Crisis Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-green-600" />
                      Crisis Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="crisisName">Crisis Name *</Label>
                      <div className="relative">
                        <Input
                          id="crisisName"
                          placeholder="Specific crisis or ongoing efforts"
                          value={formData.crisisName}
                          onChange={(e) => handleInputChange("crisisName", e.target.value)}
                          className={isFieldValidated("crisisName") ? "pr-10" : ""}
                          required
                        />
                        {isFieldValidated("crisisName") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="distributionPlan">Distribution Plan *</Label>
                      <div className="relative">
                        <Textarea
                          id="distributionPlan"
                          placeholder="How items will be distributed and who benefits"
                          value={formData.distributionPlan}
                          onChange={(e) => handleInputChange("distributionPlan", e.target.value)}
                          className={isFieldValidated("distributionPlan") ? "pr-10" : ""}
                          rows={4}
                          required
                        />
                        {isFieldValidated("distributionPlan") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Storage Requirements */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Warehouse className="w-5 h-5 mr-2 text-blue-600" />
                      Storage Requirements
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="warehousingCategory">Warehousing Category *</Label>
                        <Select
                          value={formData.warehousingCategory}
                          onValueChange={(value) => handleInputChange("warehousingCategory", value)}
                        >
                          <SelectTrigger className={isFieldValidated("warehousingCategory") ? "pr-10" : ""}>
                            <SelectValue placeholder="Select storage type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short-term">Short-Term Storage</SelectItem>
                            <SelectItem value="long-term">Long-Term Storage</SelectItem>
                            <SelectItem value="temperature-controlled">Temperature-Controlled</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {isFieldValidated("warehousingCategory") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="desiredLocation">Desired Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="desiredLocation"
                            placeholder="Preferred area (postal code/region)"
                            value={formData.desiredLocation}
                            onChange={(e) => handleInputChange("desiredLocation", e.target.value)}
                            className={`pl-10 ${isFieldValidated("desiredLocation") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("desiredLocation") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="spaceRequirements">Space Requirements *</Label>
                      <div className="relative">
                        <Input
                          id="spaceRequirements"
                          placeholder="e.g., 5000 sq ft, 200 pallet slots, 10 containers"
                          value={formData.spaceRequirements}
                          onChange={(e) => handleInputChange("spaceRequirements", e.target.value)}
                          className={isFieldValidated("spaceRequirements") ? "pr-10" : ""}
                          required
                        />
                        {isFieldValidated("spaceRequirements") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline & Labor */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      Timeline & Labor
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="arrivalDate">Arrival Date *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="arrivalDate"
                            type="date"
                            value={formData.arrivalDate}
                            onChange={(e) => handleInputChange("arrivalDate", e.target.value)}
                            className={`pl-10 ${isFieldValidated("arrivalDate") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("arrivalDate") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="durationNeeded">Duration Needed *</Label>
                        <div className="relative">
                          <Input
                            id="durationNeeded"
                            placeholder="e.g., 2 weeks, 3 months, 1 year"
                            value={formData.durationNeeded}
                            onChange={(e) => handleInputChange("durationNeeded", e.target.value)}
                            className={isFieldValidated("durationNeeded") ? "pr-10" : ""}
                            required
                          />
                          {isFieldValidated("durationNeeded") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Need Laborers? *</Label>
                      <RadioGroup
                        value={formData.needLaborers}
                        onValueChange={(value) => handleInputChange("needLaborers", value)}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="laborers-yes" />
                          <Label htmlFor="laborers-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="laborers-no" />
                          <Label htmlFor="laborers-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="e.g., Security needs, special handling requirements, access restrictions"
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
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-12"
                    >
                      Submit Warehouse Need
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
