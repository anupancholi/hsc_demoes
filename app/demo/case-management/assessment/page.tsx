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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Heart,
  CheckCircle,
  AlertTriangle,
  FileText,
  Calendar,
  MapPin,
  User,
  Home,
  Droplets,
  TreePine,
  BracketsIcon as Bridge,
  Mountain,
} from "lucide-react"

export default function CaseAssessmentForm() {
  const [formData, setFormData] = useState({})
  const [validatedFields, setValidatedFields] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (value && !validatedFields.includes(field)) {
      setValidatedFields((prev) => [...prev, field])
    }
  }

  const FieldIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center space-x-2">{children}</div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/case-management">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Case Management
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Site Assessment</h1>
                  <p className="text-xs text-gray-600">Case Management Form</p>
                </div>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800">
              <FileText className="w-4 h-4 mr-2" />
              33 Fields
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 mr-3 text-red-600" />
                Site Assessment & Case Documentation
              </CardTitle>
              <CardDescription className="text-base">
                Complete this comprehensive form to document site conditions, damage assessment, and case details for
                disaster response coordination.
              </CardDescription>
            </CardHeader>
          </Card>

          <form className="space-y-8">
            {/* Required Fields Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Required Information
                </CardTitle>
                <CardDescription>Essential fields that must be completed for case processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Case & Visit Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FieldIcon>
                      <FileText className="w-4 h-4 text-red-600" />
                      <Label htmlFor="caseNumber">Case Number *</Label>
                      {validatedFields.includes("caseNumber") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="caseNumber"
                      placeholder="e.g., CASE-2024-001"
                      onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldIcon>
                      <Calendar className="w-4 h-4 text-red-600" />
                      <Label htmlFor="visitDate">Initial Site Visit Date *</Label>
                      {validatedFields.includes("visitDate") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="visitDate"
                      type="date"
                      onChange={(e) => handleInputChange("visitDate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FieldIcon>
                      <User className="w-4 h-4 text-red-600" />
                      <Label htmlFor="fullName">Full Name *</Label>
                      {validatedFields.includes("fullName") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="fullName"
                      placeholder="Enter full name"
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldIcon>
                      <User className="w-4 h-4 text-red-600" />
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      {validatedFields.includes("mobile") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="mobile"
                      placeholder="(555) 123-4567"
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                    />
                  </div>
                </div>

                {/* Location Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FieldIcon>
                      <Home className="w-4 h-4 text-red-600" />
                      <Label htmlFor="siteType">Site Type *</Label>
                      {validatedFields.includes("siteType") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Select onValueChange={(value) => handleInputChange("siteType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select site type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                        <SelectItem value="public">Public Facility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <FieldIcon>
                      <MapPin className="w-4 h-4 text-red-600" />
                      <Label htmlFor="county">County *</Label>
                      {validatedFields.includes("county") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="county"
                      placeholder="Enter county name"
                      onChange={(e) => handleInputChange("county", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldIcon>
                    <MapPin className="w-4 h-4 text-red-600" />
                    <Label htmlFor="address">Address *</Label>
                    {validatedFields.includes("address") && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </FieldIcon>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address"
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>

                {/* Property & Status */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FieldIcon>
                      <User className="w-4 h-4 text-red-600" />
                      <Label htmlFor="propertyOwner">Property Owner *</Label>
                      {validatedFields.includes("propertyOwner") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="propertyOwner"
                      placeholder="Property owner name"
                      onChange={(e) => handleInputChange("propertyOwner", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldIcon>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <Label htmlFor="priorityLevel">Priority Level *</Label>
                      {validatedFields.includes("priorityLevel") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Select onValueChange={(value) => handleInputChange("priorityLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldIcon>
                    <Home className="w-4 h-4 text-red-600" />
                    <Label htmlFor="houseStatus">House Status *</Label>
                    {validatedFields.includes("houseStatus") && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </FieldIcon>
                  <Select onValueChange={(value) => handleInputChange("houseStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select house status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="habitable">Habitable</SelectItem>
                      <SelectItem value="uninhabitable">Uninhabitable</SelectItem>
                      <SelectItem value="partially-damaged">Partially Damaged</SelectItem>
                      <SelectItem value="destroyed">Destroyed</SelectItem>
                      <SelectItem value="under-assessment">Under Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Optional Fields Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <FileText className="w-5 h-5 mr-2" />
                  Additional Information
                </CardTitle>
                <CardDescription>Optional fields for comprehensive case documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Update & Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FieldIcon>
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <Label htmlFor="updateDate">Update Date</Label>
                      {validatedFields.includes("updateDate") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="updateDate"
                      type="date"
                      onChange={(e) => handleInputChange("updateDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldIcon>
                      <User className="w-4 h-4 text-orange-600" />
                      <Label htmlFor="email">Email Address</Label>
                      {validatedFields.includes("email") && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </FieldIcon>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                {/* Demographics */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Demographics & Family Information</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="otherDemographic">Other Demographic</Label>
                      <Input
                        id="otherDemographic"
                        placeholder="Additional demographic info"
                        onChange={(e) => handleInputChange("otherDemographic", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="childrenAtHome">Children at Home</Label>
                      <Input
                        id="childrenAtHome"
                        type="number"
                        placeholder="Number of children"
                        onChange={(e) => handleInputChange("childrenAtHome", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disabledIndividuals">Disabled Individuals at Home</Label>
                      <Input
                        id="disabledIndividuals"
                        type="number"
                        placeholder="Number of disabled individuals"
                        onChange={(e) => handleInputChange("disabledIndividuals", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Damage Assessment */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Damage Assessment</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FieldIcon>
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="homeContamination">Home Contamination</Label>
                      </FieldIcon>
                      <Select onValueChange={(value) => handleInputChange("homeContamination", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contamination level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="minor">Minor</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldIcon>
                        <TreePine className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="fallenTreesHome">Fallen Trees - Home</Label>
                      </FieldIcon>
                      <RadioGroup onValueChange={(value) => handleInputChange("fallenTreesHome", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="treesHomeYes" />
                          <Label htmlFor="treesHomeYes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="treesHomeNo" />
                          <Label htmlFor="treesHomeNo">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FieldIcon>
                        <TreePine className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="fallenTreesWoods">Fallen Trees - Woods</Label>
                      </FieldIcon>
                      <RadioGroup onValueChange={(value) => handleInputChange("fallenTreesWoods", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="treesWoodsYes" />
                          <Label htmlFor="treesWoodsYes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="treesWoodsNo" />
                          <Label htmlFor="treesWoodsNo">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <FieldIcon>
                        <Droplets className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="floodInterior">Flood: Interior Level</Label>
                      </FieldIcon>
                      <Input
                        id="floodInterior"
                        placeholder="e.g., 2 feet"
                        onChange={(e) => handleInputChange("floodInterior", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FieldIcon>
                      <Droplets className="w-4 h-4 text-orange-600" />
                      <Label htmlFor="floodExterior">Flood: Exterior Level</Label>
                    </FieldIcon>
                    <Input
                      id="floodExterior"
                      placeholder="e.g., 3 feet"
                      onChange={(e) => handleInputChange("floodExterior", e.target.value)}
                    />
                  </div>
                </div>

                {/* Infrastructure Status */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Infrastructure Status</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FieldIcon>
                        <Droplets className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="waterFunctionality">Water Functionality</Label>
                      </FieldIcon>
                      <Select onValueChange={(value) => handleInputChange("waterFunctionality", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select water status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="functional">Functional</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                          <SelectItem value="non-functional">Non-Functional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldIcon>
                        <Home className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="sewageFunctionality">Sewage Functionality</Label>
                      </FieldIcon>
                      <Select onValueChange={(value) => handleInputChange("sewageFunctionality", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sewage status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="functional">Functional</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                          <SelectItem value="non-functional">Non-Functional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <FieldIcon>
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="drivewayStatus">Driveway Status</Label>
                      </FieldIcon>
                      <Select onValueChange={(value) => handleInputChange("drivewayStatus", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clear">Clear</SelectItem>
                          <SelectItem value="blocked">Blocked</SelectItem>
                          <SelectItem value="damaged">Damaged</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldIcon>
                        <Bridge className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="bridgeStatus">Bridge Status</Label>
                      </FieldIcon>
                      <Select onValueChange={(value) => handleInputChange("bridgeStatus", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="functional">Functional</SelectItem>
                          <SelectItem value="damaged">Damaged</SelectItem>
                          <SelectItem value="destroyed">Destroyed</SelectItem>
                          <SelectItem value="n/a">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <FieldIcon>
                        <Bridge className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="culvertStatus">Culvert Status</Label>
                      </FieldIcon>
                      <Select onValueChange={(value) => handleInputChange("culvertStatus", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="functional">Functional</SelectItem>
                          <SelectItem value="blocked">Blocked</SelectItem>
                          <SelectItem value="damaged">Damaged</SelectItem>
                          <SelectItem value="n/a">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Environmental Hazards */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Environmental Hazards</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FieldIcon>
                        <Droplets className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="nearbyCreek">Nearby Creek/River(s)</Label>
                      </FieldIcon>
                      <Input
                        id="nearbyCreek"
                        placeholder="Name of nearby water bodies"
                        onChange={(e) => handleInputChange("nearbyCreek", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldIcon>
                        <Mountain className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="nearbyLandslide">Nearby Landslide(s)</Label>
                      </FieldIcon>
                      <RadioGroup onValueChange={(value) => handleInputChange("nearbyLandslide", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="landslideYes" />
                          <Label htmlFor="landslideYes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="landslideNo" />
                          <Label htmlFor="landslideNo">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Assignment & Follow-up */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Assignment & Follow-up</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FieldIcon>
                        <User className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="assignedTo">Assigned To</Label>
                      </FieldIcon>
                      <Input
                        id="assignedTo"
                        placeholder="Assigned team member"
                        onChange={(e) => handleInputChange("assignedTo", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldIcon>
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="followUpDate">Follow Up Date</Label>
                      </FieldIcon>
                      <Input
                        id="followUpDate"
                        type="date"
                        onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FieldIcon>
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <Label htmlFor="assistanceNeeded">Assistance Needed</Label>
                    </FieldIcon>
                    <Textarea
                      id="assistanceNeeded"
                      placeholder="Describe specific assistance required"
                      onChange={(e) => handleInputChange("assistanceNeeded", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldIcon>
                      <FileText className="w-4 h-4 text-orange-600" />
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                    </FieldIcon>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Any additional observations or notes"
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    Submit Assessment
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Link href="/demo/case-management">
                    <Button variant="ghost">Cancel</Button>
                  </Link>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Fields marked with * are required. All information is securely stored and used for disaster response
                  coordination.
                </p>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
