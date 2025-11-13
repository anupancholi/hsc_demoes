import { Suspense } from "react"
import { getShipments } from "@/lib/actions/shipments"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Package, MapPin, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

async function ShipmentsContent() {
  const { data: shipments, error } = await getShipments()

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Error loading shipments: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!shipments || shipments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Truck className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No shipments found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {shipments.map((shipment) => (
        <Card key={shipment.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Shipment #{shipment.id.slice(0, 8)}
                </CardTitle>
                <CardDescription>Match ID: {shipment.match_id.slice(0, 8)}</CardDescription>
              </div>
              <Badge
                variant={
                  shipment.status === "delivered"
                    ? "default"
                    : shipment.status === "in_transit"
                      ? "secondary"
                      : shipment.status === "pending"
                        ? "outline"
                        : "destructive"
                }
              >
                {shipment.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Origin:</span>
                  <span className="text-muted-foreground">{shipment.origin_location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Destination:</span>
                  <span className="text-muted-foreground">{shipment.destination_location}</span>
                </div>
              </div>
              <div className="space-y-2">
                {shipment.estimated_delivery && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Est. Delivery:</span>
                    <span className="text-muted-foreground">
                      {new Date(shipment.estimated_delivery).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {shipment.tracking_number && (
                  <div className="text-sm">
                    <span className="font-medium">Tracking:</span>{" "}
                    <span className="text-muted-foreground">{shipment.tracking_number}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                View Details
              </Button>
              <Button size="sm" variant="outline">
                Track Shipment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shipments</h1>
        <p className="text-muted-foreground">Track and manage all shipments</p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <ShipmentsContent />
      </Suspense>
    </div>
  )
}
