export type Role =
  | "admin"
  | "business"
  | "donor"
  | "ngo"
  | "npo"
  | "volunteer"
  | "government"
  | "school"
  | "hospital"
  | "association"
  | "academia"
export type NeedStatus = "draft" | "open" | "matched" | "fulfilled" | "cancelled"
export type OfferStatus = "draft" | "open" | "matched" | "fulfilled" | "cancelled"
export type MatchStatus = "proposed" | "accepted" | "rejected" | "cancelled"
export type ShipmentStatus = "created" | "in_transit" | "delivered" | "cancelled"
export type TrackingEventType = "status" | "location" | "delay" | "note"
export type FormType = "transportation" | "warehousing" | "equipment" | "expertise"

export interface Profile {
  id: string
  org_id: string | null
  role: Role
  full_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Org {
  id: string
  name: string
  type: "ngo" | "corporate" | "gov" | "other"
  country: string | null
  city: string | null
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
}

export interface Need {
  id: string
  requester_id: string | null
  org_id: string | null
  title: string
  description: string | null
  category_id: number | null
  quantity: number | null
  unit: string
  country: string | null
  city: string | null
  status: NeedStatus
  needed_by: string | null
  tags: string[]
  form_type: FormType | null
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  supplier_id: string | null
  org_id: string | null
  title: string
  description: string | null
  category_id: number | null
  max_quantity: number | null
  unit: string
  country: string | null
  city: string | null
  status: OfferStatus
  available_from: string | null
  tags: string[]
  form_type: FormType | null
  created_at: string
  updated_at: string
}

export interface Match {
  id: string
  need_id: string
  offer_id: string
  score: number
  status: MatchStatus
  created_at: string
  updated_at: string
}

export interface Shipment {
  id: string
  match_id: string | null
  logistics_id: string | null
  origin: string | null
  destination: string | null
  eta: string | null
  status: ShipmentStatus
  carrier: string | null
  tracking_code: string | null
  tracking: Record<string, any>
  created_at: string
  updated_at: string
}

export interface ShipmentEvent {
  id: number
  shipment_id: string
  type: TrackingEventType
  status: ShipmentStatus | null
  lat: number | null
  lon: number | null
  city: string | null
  country: string | null
  occurred_at: string
  raw: Record<string, any>
  created_at: string
}

export interface Warehouse {
  id: string
  org_id: string
  name: string
  address: string | null
  country: string | null
  city: string | null
  provider: string
  provider_ref: string | null
  created_at: string
  updated_at: string
}

export interface InventoryItem {
  id: string
  warehouse_id: string
  sku: string | null
  title: string
  category_id: number | null
  quantity: number
  unit: string
  attributes: Record<string, any>
  provider_ref: string | null
  created_at: string
  updated_at: string
}
