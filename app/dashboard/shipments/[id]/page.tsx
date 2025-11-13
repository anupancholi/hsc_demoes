import { getShipmentById, getShipmentEvents } from "@/lib/actions/shipments"
import { ShipmentTrackingTimeline } from "@/components/shipments/shipment-tracking-timeline"
import { AddTrackingEventForm } from "@/components/shipments/add-tracking-event-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Package, Truck, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ShipmentDetailPage({ params }: { params: { id: string } }) {
  const shipment = await getShipmentById(params.id)
  const events = await getShipmentEvents(params.id)

  if (!shipment) {
    notFound()
  }

  const statusColors = {
    created: "bg-gray-100 text-gray-800",
    in_transit: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shipment Tracking</h1>
        <p className="text-gray-600">Track your shipment in real-time</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Shipment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Shipment Details</CardTitle>
            <CardDescription>Basic information about this shipment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <Badge className={statusColors[shipment.status as keyof typeof statusColors]}>
                {shipment.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Origin</p>
                <p className="text-sm text-gray-600">{shipment.origin || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Destination</p>
                <p className="text-sm text-gray-600">{shipment.destination || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Carrier</p>
                <p className="text-sm text-gray-600">{shipment.carrier || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Tracking Code</p>
                <p className="text-sm text-gray-600 font-mono">{shipment.tracking_code || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-sm text-gray-600">
                  {shipment.eta ? new Date(shipment.eta).toLocaleDateString() : "Not specified"}
                </p>
              </div>
            </div>

            {shipment.profiles && (
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Logistics Provider</p>
                  <p className="text-sm text-gray-600">{shipment.profiles.full_name}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Match Details */}
        {shipment.matches && (
          <Card>
            <CardHeader>
              <CardTitle>Match Details</CardTitle>
              <CardDescription>Need and offer information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Need</p>
                <p className="font-medium">{shipment.matches.needs?.title}</p>
                <p className="text-sm text-gray-600">Requested by: {shipment.matches.needs?.profiles?.full_name}</p>
                {shipment.matches.needs?.orgs && (
                  <p className="text-sm text-gray-600">Organization: {shipment.matches.needs.orgs.name}</p>
                )}
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Offer</p>
                <p className="font-medium">{shipment.matches.offers?.title}</p>
                <p className="text-sm text-gray-600">Supplied by: {shipment.matches.offers?.profiles?.full_name}</p>
                {shipment.matches.offers?.orgs && (
                  <p className="text-sm text-gray-600">Organization: {shipment.matches.offers.orgs.name}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Tracking Event */}
      <Card>
        <CardHeader>
          <CardTitle>Add Tracking Event</CardTitle>
          <CardDescription>Record a new event for this shipment</CardDescription>
        </CardHeader>
        <CardContent>
          <AddTrackingEventForm shipmentId={params.id} />
        </CardContent>
      </Card>

      {/* Tracking Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Tracking Timeline</CardTitle>
          <CardDescription>Real-time updates and event history</CardDescription>
        </CardHeader>
        <CardContent>
          <ShipmentTrackingTimeline shipmentId={params.id} initialEvents={events} />
        </CardContent>
      </Card>
    </div>
  )
}
