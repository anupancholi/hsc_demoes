"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeedForm } from "@/components/forms/need-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Heart, Truck, Warehouse, Settings, FileText } from "lucide-react"
import Link from "next/link"

const formTypes = [
  {
    id: "registration",
    title: "Registration",
    description: "Organization & volunteer registration",
    icon: Users,
    color: "indigo",
  },
  {
    id: "general",
    title: "General Needs",
    description: "Food, clothing, medicine",
    icon: Heart,
    color: "emerald",
  },
  {
    id: "volunteer",
    title: "Volunteer Coordination",
    description: "Volunteer needs with skill matching",
    icon: Users,
    color: "amber",
  },
  {
    id: "transportation",
    title: "Transportation",
    description: "Truck, air, sea, rail logistics",
    icon: Truck,
    color: "blue",
  },
  {
    id: "warehousing",
    title: "Warehousing",
    description: "Storage and distribution",
    icon: Warehouse,
    color: "green",
  },
  {
    id: "equipment",
    title: "Equipment",
    description: "Forklifts, generators, machinery",
    icon: Settings,
    color: "orange",
  },
  {
    id: "expertise",
    title: "Expertise",
    description: "Professional consultation",
    icon: Users,
    color: "purple",
  },
  {
    id: "case-management",
    title: "Case Management",
    description: "Site visits, damage assessment",
    icon: FileText,
    color: "red",
  },
]

export default function NewNeedPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  if (!selectedType) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/needs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Needs
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Need</h1>
          <p className="text-gray-600 mt-1">Select the type of need you want to create</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card
                key={type.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg group"
                onClick={() => setSelectedType(type.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br from-${type.color}-100 to-${type.color}-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-10 h-10 text-${type.color}-600`} />
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription className="text-sm">{type.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => setSelectedType(null)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create {formTypes.find((t) => t.id === selectedType)?.title} Need</CardTitle>
          <CardDescription>Submit a new aid request to find matching suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <NeedForm formType={selectedType} />
        </CardContent>
      </Card>
    </div>
  )
}
