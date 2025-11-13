"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createShipment } from "@/lib/actions/shipments"

interface ShipmentFormProps {
  matchId: string
  needId: string
  offerId: string
}

export function ShipmentForm({ matchId, needId, offerId }: ShipmentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      match_id: matchId,
      need_id: needId,
      offer_id: offerId,
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      estimated_delivery: formData.get("estimated_delivery") as string,
      tracking_number: formData.get("tracking_number") as string,
      carrier: formData.get("carrier") as string,
      notes: formData.get("notes") as string,
    }

    const result = await createShipment(data)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Shipment created successfully",
      })
      router.push("/dashboard/shipments")
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Shipment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input id="origin" name="origin" placeholder="Origin location" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" name="destination" placeholder="Destination location" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Input id="carrier" name="carrier" placeholder="Shipping carrier" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tracking_number">Tracking Number</Label>
              <Input id="tracking_number" name="tracking_number" placeholder="Tracking number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
            <Input id="estimated_delivery" name="estimated_delivery" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Additional notes..." rows={3} />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Shipment"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
