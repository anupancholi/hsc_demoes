"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createInventoryItem, updateInventoryItem } from "@/lib/actions/inventory"
import { useToast } from "@/hooks/use-toast"

interface InventoryFormProps {
  item?: any
  onSuccess?: () => void
}

export function InventoryForm({ item, onSuccess }: InventoryFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    category: item?.category || "",
    quantity: item?.quantity || "",
    unit: item?.unit || "",
    warehouse_id: item?.warehouse_id || "",
    min_quantity: item?.min_quantity || "",
    external_id: item?.external_id || "",
    external_source: item?.external_source || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        quantity: Number.parseFloat(formData.quantity),
        min_quantity: formData.min_quantity ? Number.parseFloat(formData.min_quantity) : undefined,
      }

      if (item) {
        await updateInventoryItem(item.id, data)
        toast({ title: "Inventory item updated successfully" })
      } else {
        await createInventoryItem(data)
        toast({ title: "Inventory item created successfully" })
      }

      onSuccess?.()
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save inventory item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Food, Medical, Shelter"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Current Stock</Label>
          <Input
            id="quantity"
            type="number"
            step="0.01"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="e.g., kg, boxes, liters"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="min_quantity">Minimum Stock Level (optional)</Label>
        <Input
          id="min_quantity"
          type="number"
          step="0.01"
          value={formData.min_quantity}
          onChange={(e) => setFormData({ ...formData, min_quantity: e.target.value })}
          placeholder="Alert when stock falls below this"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="external_source">External Source (optional)</Label>
          <Input
            id="external_source"
            value={formData.external_source}
            onChange={(e) => setFormData({ ...formData, external_source: e.target.value })}
            placeholder="e.g., Amazon, eBay"
          />
        </div>

        <div>
          <Label htmlFor="external_id">External ID (optional)</Label>
          <Input
            id="external_id"
            value={formData.external_id}
            onChange={(e) => setFormData({ ...formData, external_id: e.target.value })}
            placeholder="Product ID from external source"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : item ? "Update Item" : "Add Item"}
        </Button>
        {onSuccess && (
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
