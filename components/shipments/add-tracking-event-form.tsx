"use client"

import type React from "react"

import { useState } from "react"
import { addShipmentEvent } from "@/lib/actions/shipments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddTrackingEventFormProps {
  shipmentId: string
}

export function AddTrackingEventForm({ shipmentId }: AddTrackingEventFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [eventType, setEventType] = useState<"status" | "location" | "delay" | "note">("status")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data: any = {
      type: eventType,
      occurred_at: new Date().toISOString(),
    }

    if (eventType === "status") {
      data.status = formData.get("status")
    } else if (eventType === "location") {
      data.city = formData.get("city")
      data.country = formData.get("country")
      const lat = formData.get("lat")
      const lon = formData.get("lon")
      if (lat) data.lat = Number.parseFloat(lat as string)
      if (lon) data.lon = Number.parseFloat(lon as string)
    } else if (eventType === "delay" || eventType === "note") {
      const note = formData.get("note")
      if (note) data.raw = { note }
    }

    try {
      await addShipmentEvent(shipmentId, data)
      toast({
        title: "Event added",
        description: "Tracking event has been recorded successfully",
      })
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tracking event",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="eventType">Event Type</Label>
        <Select value={eventType} onValueChange={(value: any) => setEventType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="status">Status Update</SelectItem>
            <SelectItem value="location">Location Update</SelectItem>
            <SelectItem value="delay">Delay</SelectItem>
            <SelectItem value="note">Note</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {eventType === "status" && (
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" required>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {eventType === "location" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="New York" />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" placeholder="USA" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lat">Latitude (optional)</Label>
              <Input id="lat" name="lat" type="number" step="any" placeholder="40.7128" />
            </div>
            <div>
              <Label htmlFor="lon">Longitude (optional)</Label>
              <Input id="lon" name="lon" type="number" step="any" placeholder="-74.0060" />
            </div>
          </div>
        </>
      )}

      {(eventType === "delay" || eventType === "note") && (
        <div>
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" name="note" placeholder="Enter details..." required />
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Event"}
      </Button>
    </form>
  )
}
