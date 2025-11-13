import { Suspense } from "react"
import { getInventoryItems } from "@/lib/actions/inventory"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Plus, AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

async function InventoryContent() {
  const { data: items, error } = await getInventoryItems()

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Error loading inventory: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!items || items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No inventory items found</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{item.name}</span>
              {item.quantity_available < 10 && <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />}
            </CardTitle>
            <CardDescription>SKU: {item.sku}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available:</span>
                <span className="font-medium">{item.quantity_available}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reserved:</span>
                <span className="font-medium">{item.quantity_reserved}</span>
              </div>
              {item.unit_cost && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Unit Cost:</span>
                  <span className="font-medium">${item.unit_cost}</span>
                </div>
              )}
              {item.warehouse_location && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Location:</span> <span>{item.warehouse_location}</span>
                </div>
              )}
              <div className="pt-2 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Adjust Stock
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">Manage your inventory items</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <InventoryContent />
      </Suspense>
    </div>
  )
}
