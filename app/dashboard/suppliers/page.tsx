"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, Star, ShoppingCart } from "lucide-react"

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock marketplace data - will be replaced with real API integration
  const marketplaceItems = [
    {
      id: "1",
      title: "Emergency Medical Supplies Kit",
      description: "Complete first aid kit with bandages, antiseptics, and medical tools",
      price: "$149.99",
      source: "Amazon",
      rating: 4.5,
      inStock: true,
      image: "/medical-kit.png",
    },
    {
      id: "2",
      title: "Portable Water Filtration System",
      description: "High-capacity water purifier for emergency situations",
      price: "$89.99",
      source: "eBay",
      rating: 4.8,
      inStock: true,
      image: "/water-filter-kitchen.png",
    },
    {
      id: "3",
      title: "Emergency Food Supply (30 Days)",
      description: "Long-term storage emergency food rations for disaster relief",
      price: "$299.99",
      source: "Amazon",
      rating: 4.6,
      inStock: true,
      image: "/emergency-food.jpg",
    },
    {
      id: "4",
      title: "Solar Power Generator",
      description: "Portable solar generator for off-grid power supply",
      price: "$599.99",
      source: "Amazon",
      rating: 4.7,
      inStock: false,
      image: "/solar-generator.jpg",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Marketplace Suppliers</h1>
        <p className="text-gray-600 mt-1">Browse offerings from external suppliers (Amazon, eBay, and more)</p>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for supplies, equipment, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="border-0 shadow-lg bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <ShoppingCart className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">External Marketplace Integration</h3>
              <p className="text-sm text-gray-600">
                Browse and compare offerings from trusted suppliers like Amazon and eBay. Items shown here are available
                for purchase through external platforms. API integration coming soon for real-time inventory and
                pricing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Items */}
      <div className="grid md:grid-cols-2 gap-6">
        {marketplaceItems.map((item) => (
          <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.source}
                        </Badge>
                        {item.inStock ? (
                          <Badge className="bg-green-100 text-green-800 text-xs">In Stock</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 text-xs">Out of Stock</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">{item.price}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                        {item.rating}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on {item.source}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
