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
import { ArrowLeft, Gift, CheckCircle, MapPin, Brain, Globe, Upload } from "lucide-react"
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

export default function GeneralOffersPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
                  <h1 className="text-xl font-bold text-gray-900">Make an Offer</h1>
                  <p className="text-xs text-gray-600">Donate Supplies & Resources</p>
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
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl mb-2">Submit Your Offer</CardTitle>
              <p className="text-gray-600">AI-powered distribution optimization with impact tracking</p>
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
              {/* Donor Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">1</span>
                  </div>
                  <h3 className="text-lg font-semibold">Donor Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">Name *</Label>
                    <Input id="donorName" placeholder="Your name or organization" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Contact Information *</Label>
                    <Input id="contactInfo" placeholder="Phone number or email" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>
              </div>

              {/* Offer Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">2</span>
                  </div>
                  <h3 className="text-lg font-semibold">Offer Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Primary Category *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="offerType">Product/Offer Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select offer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="donation">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Donation (Free)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="commercial">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>Commercial (Full Price)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="discounted">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span>Discounted Pricing</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="nonprofit">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span>Non-Profit Pricing</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="barter">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>Barter/Exchange</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of your offer, including specifications, condition, quality standards, certifications, and any special notes..."
                    rows={4}
                  />
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Available *</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" />
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
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
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">🆕 New</SelectItem>
                        <SelectItem value="excellent">⭐ Excellent</SelectItem>
                        <SelectItem value="good">✅ Good</SelectItem>
                        <SelectItem value="fair">⚠️ Fair</SelectItem>
                        <SelectItem value="damaged">🔧 Damaged/Repairable</SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiration">Expiration Date</Label>
                    <Input id="expiration" type="date" />
                    <p className="text-xs text-gray-500">If applicable</p>
                  </div>
                </div>
              </div>

              {/* Location & Shipping */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">3</span>
                  </div>
                  <h3 className="text-lg font-semibold">Location & Shipping</h3>
                  <Badge className="bg-blue-100 text-blue-800">Geographic Intelligence</Badge>
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
                    <p className="text-xs text-gray-500">For precise pickup location</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryRadius">Delivery Radius</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How far will you deliver?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickup-only">Pickup Only</SelectItem>
                        <SelectItem value="local">Local (0-25 km)</SelectItem>
                        <SelectItem value="regional">Regional (25-100 km)</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="shippingCosts">Shipping Costs</Label>
                    <Input id="shippingCosts" placeholder="Enter shipping costs or 'Free'" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingPaidBy">Shipping Paid By *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select who pays" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="offeror">Offeror (Me)</SelectItem>
                        <SelectItem value="recipient">Recipient</SelectItem>
                        <SelectItem value="shared">Shared Cost</SelectItem>
                        <SelectItem value="negotiable">Negotiable</SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>
              </div>

              {/* AI Impact Analytics */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600">4</span>
                  </div>
                  <h3 className="text-lg font-semibold">AI Impact Analytics</h3>
                  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                    Smart Distribution
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Estimated Value (USD)</Label>
                    <Input id="estimatedValue" type="number" placeholder="Estimated monetary value" />
                    <p className="text-xs text-gray-500">Helps AI calculate impact metrics</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetBeneficiaries">Target Beneficiaries</Label>
                    <Input id="targetBeneficiaries" type="number" placeholder="Number of people this can help" />
                    <p className="text-xs text-gray-500">AI prioritizes based on reach</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredRecipients">Preferred Recipients</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Who should receive this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Qualified Recipient</SelectItem>
                        <SelectItem value="ngos">NGOs/Non-Profits Only</SelectItem>
                        <SelectItem value="government">Government Agencies</SelectItem>
                        <SelectItem value="individuals">Individuals in Need</SelectItem>
                        <SelectItem value="schools">Schools/Educational</SelectItem>
                        <SelectItem value="healthcare">Healthcare Facilities</SelectItem>
                        <SelectItem value="emergency">Emergency Responders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgencyLevel">Urgency Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How urgent is distribution?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (0-24 hours)</SelectItem>
                        <SelectItem value="urgent">Urgent (1-3 days)</SelectItem>
                        <SelectItem value="soon">Soon (1 week)</SelectItem>
                        <SelectItem value="flexible">Flexible (1 month)</SelectItem>
                        <SelectItem value="no-rush">No Rush</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">5</span>
                  </div>
                  <h3 className="text-lg font-semibold">Additional Options</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anonymous" />
                    <Label htmlFor="anonymous">Make this an anonymous donation</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="taxReceipt" />
                    <Label htmlFor="taxReceipt">Tax receipt required</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="partialQuantity" />
                    <Label htmlFor="partialQuantity">Allow partial quantity requests</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="impactReports" />
                    <Label htmlFor="impactReports">Request impact reports from recipients</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">🟢 Available</SelectItem>
                        <SelectItem value="partial">🟡 Partially Fulfilled</SelectItem>
                        <SelectItem value="fulfilled">✅ Fulfilled</SelectItem>
                        <SelectItem value="expired">🔴 Expired</SelectItem>
                        <SelectItem value="reserved">🔒 Reserved</SelectItem>
                      </SelectContent>
                    </Select>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUpload">Upload Images/Videos/Documents</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4, PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  Submit Offer
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
