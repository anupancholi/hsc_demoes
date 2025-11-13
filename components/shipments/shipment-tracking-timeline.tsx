"use client"

import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { CheckCircle2, MapPin, AlertCircle, FileText, Circle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TrackingEvent {
  id: number
  type: "status" | "location" | "delay" | "note"
  status?: string
  city?: string
  country?: string
  lat?: number
  lon?: number
  occurred_at: string
  raw?: Record<string, any>
  created_at: string
}

interface ShipmentTrackingTimelineProps {
  shipmentId: string
  initialEvents: TrackingEvent[]
}

export function ShipmentTrackingTimeline({ shipmentId, initialEvents }: ShipmentTrackingTimelineProps) {
  const [events, setEvents] = useState<TrackingEvent[]>(initialEvents)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`shipment-events-${shipmentId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "shipment_events",
          filter: `shipment_id=eq.${shipmentId}`,
        },
        (payload) => {
          console.log("[v0] New tracking event received:", payload)
          setEvents((prev) => [payload.new as TrackingEvent, ...prev])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [shipmentId])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "status":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "location":
        return <MapPin className="w-5 h-5 text-blue-600" />
      case "delay":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      case "note":
        return <FileText className="w-5 h-5 text-gray-600" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getEventLabel = (event: TrackingEvent) => {
    if (event.type === "status" && event.status) {
      return event.status.replace("_", " ").toUpperCase()
    }
    if (event.type === "location" && (event.city || event.country)) {
      return `${event.city || ""}${event.city && event.country ? ", " : ""}${event.country || ""}`
    }
    if (event.type === "delay") {
      return "Delay Reported"
    }
    if (event.type === "note") {
      return "Note Added"
    }
    return event.type
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No tracking events yet</p>
        <p className="text-sm">Events will appear here in real-time as they occur</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">{getEventIcon(event.type)}</div>
            {index < events.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
          </div>

          {/* Event content */}
          <div className="flex-1 pb-8">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="capitalize">
                {event.type}
              </Badge>
              <span className="text-sm text-gray-500">{new Date(event.occurred_at).toLocaleString()}</span>
            </div>
            <p className="font-medium">{getEventLabel(event)}</p>
            {event.raw && Object.keys(event.raw).length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {JSON.stringify(event.raw).substring(0, 100)}
                {JSON.stringify(event.raw).length > 100 ? "..." : ""}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
