"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertTriangle, Upload, CheckCircle, MapPin, Brain, Globe } from "lucide-react"
import Image from "next/image"

const categoryMapping = {
  "fire-fighting": {
    name: "🔥 Fire Fighting",
    subcategories: [
      { value: "breathing-apparatus-compressor", label: "Breathing Apparatus-Compressor" },
      { value: "breathing-apparatus-self-contained", label: "Breathing Apparatus Self Contained" },
      { value: "dry-chemical-powder", label: "Dry Chemical Powder" },
      { value: "fire-fighting-foam", label: "Fire Fighting Foam" },
      { value: "abc-type-extinguisher", label: "ABC Type Extinguisher" },
      { value: "co2-type-extinguisher", label: "CO2 Type Extinguisher" },
      { value: "fire-tender", label: "Fire Tender" },
      { value: "rescue-tender", label: "Rescue Tender" },
      { value: "extension-ladder", label: "Extension Ladder" },
      { value: "fire-approach-suit", label: "Suit-Fire Approach" },
      { value: "helmets", label: "Helmets" },
      { value: "gloves", label: "Gloves" },
      { value: "boots", label: "Boots" },
      { value: "respiratory-masks", label: "Respiratory Masks" },
    ],
  },
  "flood-rescue": {
    name: "🌊 Flood Rescue",
    subcategories: [
      { value: "rescue-boats", label: "Rescue Boats" },
      { value: "life-jackets", label: "Life Jackets" },
      { value: "water-pumps", label: "Water Pumps" },
      { value: "sandbags", label: "Sandbags" },
      { value: "rescue-ropes", label: "Rescue Ropes" },
      { value: "waterproof-equipment", label: "Waterproof Equipment" },
      { value: "emergency-rafts", label: "Emergency Rafts" },
      { value: "diving-equipment", label: "Diving Equipment" },
    ],
  },
  "health-services": {
    name: "🏥 Health Services",
    subcategories: [
      { value: "anti-snake-venom", label: "Anti Snake Venom" },
      { value: "vaccines", label: "Vaccines" },
      { value: "antibiotics", label: "Antibiotics" },
      { value: "iv-fluids", label: "IV Fluids" },
      { value: "covid-treatments", label: "COVID-19 Treatments" },
      { value: "oxygen-supplies", label: "Oxygen Supplies" },
      { value: "blood-products", label: "Blood Products" },
      { value: "first-aid-kits", label: "First Aid Kits" },
      { value: "surgical-care-supplies", label: "Surgical Care Supplies" },
      { value: "defibrillator", label: "Defibrillator" },
      { value: "mechanical-ventilators", label: "Mechanical Ventilators" },
      { value: "mobile-hospital", label: "Mobile-Hospital" },
      { value: "mobile-medical-van", label: "Mobile-Medical Van" },
    ],
  },
  "nuclear-biological-chemical": {
    name: "☢️ Nuclear Biological and Chemical",
    subcategories: [
      { value: "hazmat-suits", label: "Hazmat Suits" },
      { value: "gas-masks", label: "Gas Masks" },
      { value: "decontamination-equipment", label: "Decontamination Equipment" },
      { value: "radiation-detectors", label: "Radiation Detectors" },
      { value: "chemical-neutralizers", label: "Chemical Neutralizers" },
      { value: "protective-clothing", label: "Protective Clothing" },
    ],
  },
  "search-rescue": {
    name: "🔍 Search and Rescue",
    subcategories: [
      { value: "search-dogs", label: "Search Dogs" },
      { value: "thermal-cameras", label: "Thermal Cameras" },
      { value: "rescue-equipment", label: "Rescue Equipment" },
      { value: "communication-devices", label: "Communication Devices" },
      { value: "gps-equipment", label: "GPS Equipment" },
      { value: "climbing-gear", label: "Climbing Gear" },
    ],
  },
  food: {
    name: "🍞 Food & Nutrition",
    subcategories: [
      { value: "canned-goods", label: "Canned Goods" },
      { value: "drinking-water", label: "Drinking Water" },
      { value: "dry-food-staples", label: "Dry Food-Staples" },
      { value: "infant-food-formula", label: "Infant Food Formula" },
      { value: "basic-food-products", label: "Basic Food Products" },
      { value: "nutrient-dense-foods", label: "Nutrient-Dense Foods" },
      { value: "ready-to-eat-meals", label: "Ready-to-Eat Meals (MREs)" },
      { value: "high-energy-biscuits", label: "High-Energy Biscuits" },
      { value: "therapeutic-foods", label: "Therapeutic Foods" },
      { value: "food-supplements", label: "Food Supplements" },
    ],
  },
  wash: {
    name: "💧 WASH (Water, Sanitation, Hygiene)",
    subcategories: [
      { value: "water-purification-systems", label: "Water Purification Systems" },
      { value: "hygiene-kits", label: "Hygiene Kits" },
      { value: "portable-toilets", label: "Portable Toilets" },
      { value: "soap-sanitizers", label: "Soap and Sanitizers" },
      { value: "water-storage-containers", label: "Water Storage Containers" },
      { value: "water-testing-kits", label: "Water Testing Kits" },
      { value: "sewage-treatment", label: "Sewage Treatment Equipment" },
    ],
  },
  shelter: {
    name: "🏕️ Shelter",
    subcategories: [
      { value: "emergency-shelter-kits", label: "Emergency Shelter Kits" },
      { value: "tarpaulin", label: "Tarpaulin" },
      { value: "plastic-sheeting", label: "Plastic Sheeting" },
      { value: "tent-family", label: "Family Tents" },
      { value: "temporary-housing", label: "Temporary Housing Units" },
      { value: "insulation-materials", label: "Insulation Materials" },
    ],
  },
  transportation: {
    name: "🚛 Transportation",
    subcategories: [
      { value: "heavy-truck", label: "Heavy Truck" },
      { value: "ambulance", label: "Ambulance" },
      { value: "water-tanker", label: "Water Tanker" },
      { value: "fuel-diesel-petrol", label: "Fuel (Diesel/Petrol)" },
      { value: "cargo-vehicles", label: "Cargo Vehicles" },
      { value: "emergency-vehicles", label: "Emergency Vehicles" },
    ],
  },
  medical: {
    name: "💊 Medical",
    subcategories: [
      { value: "prescription-medications", label: "Prescription Medications" },
      { value: "medical-devices", label: "Medical Devices" },
      { value: "surgical-instruments", label: "Surgical Instruments" },
      { value: "diagnostic-equipment", label: "Diagnostic Equipment" },
      { value: "medical-supplies", label: "Medical Supplies" },
      { value: "rehabilitation-equipment", label: "Rehabilitation Equipment" },
    ],
  },
  education: {
    name: "📚 Education",
    subcategories: [
      { value: "school-supplies", label: "School Supplies" },
      { value: "textbooks", label: "Textbooks" },
      { value: "educational-technology", label: "Educational Technology" },
      { value: "teacher-training", label: "Teacher Training Materials" },
      { value: "learning-kits", label: "Learning Kits" },
    ],
  },
  protection: {
    name: "🛡️ Protection",
    subcategories: [
      { value: "child-protection", label: "Child Protection Services" },
      { value: "gender-based-violence", label: "GBV Prevention" },
      { value: "legal-assistance", label: "Legal Assistance" },
      { value: "psychosocial-support", label: "Psychosocial Support" },
      { value: "security-services", label: "Security Services" },
    ],
  },
  other: {
    name: "❓ Other",
    subcategories: [{ value: "other-specify", label: "Other (Please Specify)" }],
  },
}

export default function GeneralNeedsPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")

  const getSubcategories = () => {
    if (!selectedCategory || !categoryMapping[selectedCategory as keyof typeof categoryMapping]) {
      return []
    }
    return categoryMapping[selectedCategory as keyof typeof categoryMapping].subcategories
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedSubcategory("") // Reset subcategory when category changes
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/general-needs-offers">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Needs & Offers
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/impact-matrix-logo.jpeg"
                  alt="ImpactMatrix"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Submit a Need</h1>
                  <p className="text-xs text-gray-600">Request Essential Supplies & Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl mb-2">Submit Your Need Request</CardTitle>
              <p className="text-gray-600">AI-powered matching with geographic intelligence and priority routing</p>
              <div className="flex justify-center space-x-4 mt-4">
                <Badge className="bg-purple-100 text-purple-800">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">
                  <MapPin className="w-3 h-3 mr-1" />
                  Geo-Intelligence
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  <Globe className="w-3 h-3 mr-1" />
                  Global Network
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient/NGO Name *</Label>
                    <Input id="recipientName" placeholder="Organization or individual name" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Contact Information *</Label>
                    <Input id="contactInfo" placeholder="Phone number or email" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>
              </div>

              {/* Need Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <h3 className="text-lg font-semibold">Need Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="needType">Primary Category *</Label>
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Object.entries(categoryMapping).map(([key, category]) => (
                          <SelectItem key={key} value={key}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subCategory">Sub Category *</Label>
                    <Select
                      value={selectedSubcategory}
                      onValueChange={setSelectedSubcategory}
                      disabled={!selectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={selectedCategory ? "Select sub category" : "Select primary category first"}
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {getSubcategories().map((subcategory) => (
                          <SelectItem key={subcategory.value} value={subcategory.value}>
                            {subcategory.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="priorityLevel">Priority Level *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Critical - Life Threatening</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span>High - Urgent Need</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>Medium - Important</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="low">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Low - When Available</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="needType">Type of Need *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">🚨 Emergency Need</SelectItem>
                        <SelectItem value="ongoing">🔄 Ongoing Need</SelectItem>
                        <SelectItem value="seasonal">🌍 Seasonal Need</SelectItem>
                        <SelectItem value="project">📋 Project-Based</SelectItem>
                        <SelectItem value="preparedness">🛡️ Disaster Preparedness</SelectItem>
                        <SelectItem value="recovery">🔧 Recovery & Rehabilitation</SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description of Need *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of what you need, including specifications, quantities, technical requirements, quality standards, and any special conditions..."
                    rows={4}
                  />
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Needed *</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit of Measurement</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                        <SelectItem value="pallets">Pallets</SelectItem>
                        <SelectItem value="tons">Tons</SelectItem>
                        <SelectItem value="people">People</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Timeline</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="When needed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (0-24 hours)</SelectItem>
                        <SelectItem value="urgent">Urgent (1-3 days)</SelectItem>
                        <SelectItem value="soon">Soon (1 week)</SelectItem>
                        <SelectItem value="flexible">Flexible (1 month)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Geographic & AI Intelligence */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">3</span>
                  </div>
                  <h3 className="text-lg font-semibold">Location & Intelligence</h3>
                  <Badge className="bg-purple-100 text-purple-800">AI-Powered</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <SelectItem value="us">🇺🇸 United States</SelectItem>
                        <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                        <SelectItem value="mx">🇲🇽 Mexico</SelectItem>
                        <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                        <SelectItem value="de">🇩🇪 Germany</SelectItem>
                        <SelectItem value="fr">🇫🇷 France</SelectItem>
                        <SelectItem value="jp">🇯🇵 Japan</SelectItem>
                        <SelectItem value="au">🇦🇺 Australia</SelectItem>
                        <SelectItem value="in">🇮🇳 India</SelectItem>
                        <SelectItem value="br">🇧🇷 Brazil</SelectItem>
                        <SelectItem value="za">🇿🇦 South Africa</SelectItem>
                        <SelectItem value="ng">🇳🇬 Nigeria</SelectItem>
                        <SelectItem value="ke">🇰🇪 Kenya</SelectItem>
                        <SelectItem value="ph">🇵🇭 Philippines</SelectItem>
                        <SelectItem value="bd">🇧🇩 Bangladesh</SelectItem>
                        <SelectItem value="other">🌍 Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input id="state" placeholder="Enter state or province" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Enter city" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                    <Input id="zipCode" placeholder="Enter zip/postal code" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="coordinates">GPS Coordinates (Optional)</Label>
                    <Input id="coordinates" placeholder="Latitude, Longitude" />
                    <p className="text-xs text-gray-500">For precise location targeting</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceRadius">Service Radius</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Delivery radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local (0-25 km)</SelectItem>
                        <SelectItem value="regional">Regional (25-100 km)</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* AI Predictive Analytics */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600">4</span>
                  </div>
                  <h3 className="text-lg font-semibold">AI Predictive Analytics</h3>
                  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">Smart Matching</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="populationAffected">Population Affected</Label>
                    <Input id="populationAffected" type="number" placeholder="Number of people affected" />
                    <p className="text-xs text-gray-500">Helps AI prioritize and scale response</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vulnerableGroups">Vulnerable Groups</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vulnerable groups" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="children">Children (0-18)</SelectItem>
                        <SelectItem value="elderly">Elderly (65+)</SelectItem>
                        <SelectItem value="disabled">People with Disabilities</SelectItem>
                        <SelectItem value="pregnant">Pregnant/Lactating Women</SelectItem>
                        <SelectItem value="refugees">Refugees/IDPs</SelectItem>
                        <SelectItem value="minorities">Ethnic Minorities</SelectItem>
                        <SelectItem value="multiple">Multiple Groups</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="disasterType">Disaster/Crisis Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select disaster type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="hurricane">Hurricane/Cyclone</SelectItem>
                        <SelectItem value="wildfire">Wildfire</SelectItem>
                        <SelectItem value="drought">Drought</SelectItem>
                        <SelectItem value="conflict">Armed Conflict</SelectItem>
                        <SelectItem value="pandemic">Pandemic/Health Emergency</SelectItem>
                        <SelectItem value="economic">Economic Crisis</SelectItem>
                        <SelectItem value="technological">Technological Disaster</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="climateRisk">Climate Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="extreme">Extreme Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="moderate">Moderate Risk</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">5</span>
                  </div>
                  <h3 className="text-lg font-semibold">Additional Options</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="shippingCost" />
                    <Label htmlFor="shippingCost">Willing to cover shipping costs</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="partialFulfillment" />
                    <Label htmlFor="partialFulfillment">Accept partial fulfillment</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="alternativeItems" />
                    <Label htmlFor="alternativeItems">Open to alternative/substitute items</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">🟢 Open</SelectItem>
                        <SelectItem value="partially-fulfilled">🟡 Partially Fulfilled</SelectItem>
                        <SelectItem value="fulfilled">✅ Fulfilled</SelectItem>
                        <SelectItem value="closed">🔴 Closed</SelectItem>
                        <SelectItem value="on-hold">⏸️ On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUpload">Upload Images/Videos/Documents</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4, PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
                  Submit Need Request
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save as Draft
                </Button>
                <Button variant="ghost" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
