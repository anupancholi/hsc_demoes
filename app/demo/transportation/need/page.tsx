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
import { Truck, Heart, ArrowLeft, CheckCircle, MapPin, Calendar, Package } from "lucide-react"

export default function TransportationNeedPage() {
  const [formData, setFormData] = useState({
    crisisName: "",
    pointOfContact: "",
    donatedOrPaid: "",
    fromWhomElseRequested: "",
    endRecipient: "",
    transportationType: "",
    originLocation: "",
    destinationLocation: "",
    hasDockOrigin: "",
    hasDockDestination: "",
    itemPackaging: "",
    quantitiesVolumes: "",
    pickupDate: "",
    deliveryDate: "",
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
    console.log("Transportation Need submitted:", formData)
    alert("Transportation Need form submitted successfully!")
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
                  <h1 className="text-xl font-bold text-gray-900">Transportation Need</h1>
                  <p className="text-xs text-gray-600">Request Logistics Support</p>
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
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-700">Transportation Need Form</CardTitle>
                <p className="text-gray-600">Request transportation support for humanitarian logistics</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Crisis Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-green-600" />
                      Crisis Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
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
                        <Label htmlFor="pointOfContact">Point of Contact *</Label>
                        <div className="relative">
                          <Input
                            id="pointOfContact"
                            placeholder="Contact person name"
                            value={formData.pointOfContact}
                            onChange={(e) => handleInputChange("pointOfContact", e.target.value)}
                            className={isFieldValidated("pointOfContact") ? "pr-10" : ""}
                            required
                          />
                          {isFieldValidated("pointOfContact") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Donated or Paid? *</Label>
                      <RadioGroup
                        value={formData.donatedOrPaid}
                        onValueChange={(value) => handleInputChange("donatedOrPaid", value)}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="donated" id="donated" />
                          <Label htmlFor="donated">Donated</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paid" id="paid" />
                          <Label htmlFor="paid">Paid</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="either" id="either" />
                          <Label htmlFor="either">Either</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endRecipient">End Recipient *</Label>
                      <div className="relative">
                        <Input
                          id="endRecipient"
                          placeholder="Who will receive the items (e.g., affected community)"
                          value={formData.endRecipient}
                          onChange={(e) => handleInputChange("endRecipient", e.target.value)}
                          className={isFieldValidated("endRecipient") ? "pr-10" : ""}
                          required
                        />
                        {isFieldValidated("endRecipient") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Transportation Details */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-blue-600" />
                      Transportation Details
                    </h3>

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

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="originLocation">Origin Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="originLocation"
                            placeholder="Pickup point (postal code/address)"
                            value={formData.originLocation}
                            onChange={(e) => handleInputChange("originLocation", e.target.value)}
                            className={`pl-10 ${isFieldValidated("originLocation") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("originLocation") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="destinationLocation">Destination Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="destinationLocation"
                            placeholder="Delivery point (postal code/address)"
                            value={formData.destinationLocation}
                            onChange={(e) => handleInputChange("destinationLocation", e.target.value)}
                            className={`pl-10 ${isFieldValidated("destinationLocation") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("destinationLocation") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Has Dock at Origin? *</Label>
                        <RadioGroup
                          value={formData.hasDockOrigin}
                          onValueChange={(value) => handleInputChange("hasDockOrigin", value)}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="dock-origin-yes" />
                            <Label htmlFor="dock-origin-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="dock-origin-no" />
                            <Label htmlFor="dock-origin-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Has Dock at Destination? *</Label>
                        <RadioGroup
                          value={formData.hasDockDestination}
                          onValueChange={(value) => handleInputChange("hasDockDestination", value)}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="dock-dest-yes" />
                            <Label htmlFor="dock-dest-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="dock-dest-no" />
                            <Label htmlFor="dock-dest-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-orange-600" />
                      Cargo Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="itemPackaging">Item Packaging *</Label>
                      <div className="relative">
                        <Textarea
                          id="itemPackaging"
                          placeholder="How items are packed (e.g., pallets, boxes, containers)"
                          value={formData.itemPackaging}
                          onChange={(e) => handleInputChange("itemPackaging", e.target.value)}
                          className={isFieldValidated("itemPackaging") ? "pr-10" : ""}
                          rows={3}
                          required
                        />
                        {isFieldValidated("itemPackaging") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantitiesVolumes">Quantities/Volumes *</Label>
                      <div className="relative">
                        <Input
                          id="quantitiesVolumes"
                          placeholder="e.g., Number of pallets, weight in tons, cubic meters"
                          value={formData.quantitiesVolumes}
                          onChange={(e) => handleInputChange("quantitiesVolumes", e.target.value)}
                          className={isFieldValidated("quantitiesVolumes") ? "pr-10" : ""}
                          required
                        />
                        {isFieldValidated("quantitiesVolumes") && (
                          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      Timeline
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="pickupDate">Pickup Date *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="pickupDate"
                            type="date"
                            value={formData.pickupDate}
                            onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                            className={`pl-10 ${isFieldValidated("pickupDate") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("pickupDate") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryDate">Delivery Date *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="deliveryDate"
                            type="date"
                            value={formData.deliveryDate}
                            onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                            className={`pl-10 ${isFieldValidated("deliveryDate") ? "pr-10" : ""}`}
                            required
                          />
                          {isFieldValidated("deliveryDate") && (
                            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any special requirements (e.g., temperature-controlled, hazmat, security needs)"
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
                      Submit Transportation Need
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
