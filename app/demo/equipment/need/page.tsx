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
import { Settings, Heart, ArrowLeft, CheckCircle, MapPin, Calendar, Package } from "lucide-react"

export default function EquipmentNeedPage() {
  const [formData, setFormData] = useState({
    crisisName: "",
    distributionPlan: "",
    equipmentType: "",
    descriptionQuantities: "",
    estimatedDateNeeded: "",
    location: "",
    duration: "",
    intendedUse: "",
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
    console.log("Equipment Need submitted:", formData)
    alert("Equipment Need form submitted successfully!")
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
                  <h1 className="text-xl font-bold text-gray-900">Equipment Need</h1>
                  <p className="text-xs text-gray-600">Request Equipment</p>
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
              <CardHeader className="text-center bg-gradient-to-r from-green-50 to-orange-50">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-700">Equipment Need Form</CardTitle>
                <p className="text-gray-600">Request specialized equipment for humanitarian operations</p>
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
                          placeholder="How equipment will be used and who benefits"
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

                  {/* Equipment Specifications */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-orange-600" />
                      Equipment Specifications
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
                          placeholder="Details, capacities, environment requirements, and quantities needed"
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

                    <div className="space-y-2">
                      <Label htmlFor="intendedUse">Intended Use *</Label>
                      <div className="relative">
                        <Textarea
                          id="intendedUse"
                          placeholder="How the equipment will be used in your operations"
                          value={formData.intendedUse}
                          onChange={(e) => handleInputChange("intendedUse", e.target.value)}
                          className={isFieldValidated("intendedUse") ? "pr-10" : ""}
                          rows={3}
                          required
                        />
                        {isFieldValidated("intendedUse") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location & Timeline */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      Location & Timeline
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            placeholder="Usage area (postal code/region)"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            className={`pl-10 ${isFieldValidated("location") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("location") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="estimatedDateNeeded">Estimated Date Needed *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="estimatedDateNeeded"
                            type="date"
                            value={formData.estimatedDateNeeded}
                            onChange={(e) => handleInputChange("estimatedDateNeeded", e.target.value)}
                            className={`pl-10 ${isFieldValidated("estimatedDateNeeded") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("estimatedDateNeeded") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <div className="relative">
                        <Input
                          id="duration"
                          placeholder="How long equipment is needed (e.g., 2 weeks, 3 months)"
                          value={formData.duration}
                          onChange={(e) => handleInputChange("duration", e.target.value)}
                          className={isFieldValidated("duration") ? "pr-10" : ""}
                          required
                        />
                        {isFieldValidated("duration") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any special requirements, operator training needs, maintenance considerations"
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
                      className="bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 px-12"
                    >
                      Submit Equipment Need
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
