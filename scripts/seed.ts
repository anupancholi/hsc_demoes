import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function seed() {
  console.log("Starting seed...")

  // Insert categories
  const categories = ["Water", "Food", "Medicine", "Shelter", "Hygiene", "Power", "Communications"]

  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .insert(categories.map((name) => ({ name })))
    .select()

  if (categoryError) {
    console.error("Error inserting categories:", categoryError)
    return
  }
  console.log("Categories inserted:", categoryData.length)

  // Insert tracking providers
  const providers = [
    { id: "mock", name: "Mock Provider" },
    { id: "easypost", name: "EasyPost" },
    { id: "shippo", name: "Shippo" },
    { id: "aftership", name: "AfterShip" },
  ]

  const { error: providerError } = await supabase.from("tracking_providers").insert(providers)

  if (providerError) {
    console.error("Error inserting providers:", providerError)
  }

  // Create organizations
  const orgs = [
    { name: "Red Cross International", type: "ngo", country: "USA", city: "New York" },
    { name: "Global Aid Corp", type: "business", country: "UK", city: "London" },
    { name: "FEMA", type: "government", country: "USA", city: "Washington DC" },
  ]

  const { data: orgData, error: orgError } = await supabase.from("orgs").insert(orgs).select()

  if (orgError) {
    console.error("Error inserting orgs:", orgError)
    return
  }
  console.log("Organizations inserted:", orgData.length)

  // Create test users
  const users = [
    {
      email: "admin@humanitarian.org",
      password: "admin123",
      role: "admin",
      full_name: "Admin User",
      org_id: orgData[0].id,
    },
    {
      email: "ngo@redcross.org",
      password: "ngo123",
      role: "ngo",
      full_name: "Jane NGO Worker",
      org_id: orgData[0].id,
    },
    {
      email: "business@globalaid.com",
      password: "business123",
      role: "business",
      full_name: "John Business",
      org_id: orgData[1].id,
    },
    {
      email: "donor@fema.gov",
      password: "donor123",
      role: "donor",
      full_name: "Mike Donor",
      org_id: orgData[2].id,
    },
  ]

  for (const user of users) {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
    })

    if (authError) {
      console.error(`Error creating user ${user.email}:`, authError)
      continue
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      org_id: user.org_id,
      role: user.role,
      full_name: user.full_name,
    })

    if (profileError) {
      console.error(`Error creating profile for ${user.email}:`, profileError)
    } else {
      console.log(`User created: ${user.email}`)
    }
  }

  // Get user IDs for creating needs/offers
  const { data: profiles } = await supabase.from("profiles").select("*")
  const ngoUser = profiles?.find((p) => p.role === "ngo")
  const businessUser = profiles?.find((p) => p.role === "business")

  if (!ngoUser || !businessUser) {
    console.error("Could not find ngo or business profiles")
    return
  }

  // Create warehouse
  const { data: warehouseData } = await supabase
    .from("warehouses")
    .insert({
      org_id: orgData[1].id,
      name: "Main Distribution Center",
      address: "123 Supply St",
      country: "UK",
      city: "London",
      provider: "internal",
    })
    .select()
    .single()

  if (warehouseData) {
    // Create inventory items
    const inventoryItems = [
      { title: "Water Bottles (24-pack)", category_id: categoryData[0].id, quantity: 500, unit: "pack" },
      { title: "Emergency Food Rations", category_id: categoryData[1].id, quantity: 300, unit: "box" },
      { title: "First Aid Kits", category_id: categoryData[2].id, quantity: 150, unit: "kit" },
      { title: "Emergency Blankets", category_id: categoryData[3].id, quantity: 400, unit: "unit" },
    ]

    await supabase.from("inventory_items").insert(
      inventoryItems.map((item) => ({
        ...item,
        warehouse_id: warehouseData.id,
        sku: `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      })),
    )
    console.log("Inventory items created")
  }

  // Create needs
  const needs = [
    {
      requester_id: ngoUser.id,
      org_id: ngoUser.org_id,
      title: "Urgent: Clean Water Supply",
      description: "Need 1000 liters of clean drinking water for disaster relief",
      category_id: categoryData[0].id,
      quantity: 1000,
      unit: "liter",
      country: "Haiti",
      city: "Port-au-Prince",
      status: "open",
      needed_by: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      tags: ["urgent", "disaster-relief"],
      form_type: "transportation",
    },
    {
      requester_id: ngoUser.id,
      org_id: ngoUser.org_id,
      title: "Medical Supplies for Clinic",
      description: "First aid kits and basic medical supplies needed",
      category_id: categoryData[2].id,
      quantity: 50,
      unit: "kit",
      country: "Kenya",
      city: "Nairobi",
      status: "open",
      needed_by: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      tags: ["medical", "clinic"],
      form_type: "equipment",
    },
  ]

  const { data: needsData } = await supabase.from("needs").insert(needs).select()
  console.log("Needs created:", needsData?.length)

  // Create offers
  const offers = [
    {
      supplier_id: businessUser.id,
      org_id: businessUser.org_id,
      title: "Bottled Water - Bulk Supply",
      description: "Clean bottled water available for immediate shipment",
      category_id: categoryData[0].id,
      max_quantity: 2000,
      unit: "liter",
      country: "USA",
      city: "Miami",
      status: "open",
      available_from: new Date().toISOString().split("T")[0],
      tags: ["water", "bulk"],
      form_type: "transportation",
    },
    {
      supplier_id: businessUser.id,
      org_id: businessUser.org_id,
      title: "Medical Kits - WHO Standard",
      description: "WHO-standard first aid and medical kits",
      category_id: categoryData[2].id,
      max_quantity: 100,
      unit: "kit",
      country: "UK",
      city: "London",
      status: "open",
      available_from: new Date().toISOString().split("T")[0],
      tags: ["medical", "who-standard"],
      form_type: "equipment",
    },
  ]

  const { data: offersData } = await supabase.from("offers").insert(offers).select()
  console.log("Offers created:", offersData?.length)

  // Create sample matches
  if (needsData && offersData && needsData.length > 0 && offersData.length > 0) {
    const matches = [
      {
        need_id: needsData[0].id,
        offer_id: offersData[0].id,
        score: 0.85,
        status: "proposed",
      },
      {
        need_id: needsData[1].id,
        offer_id: offersData[1].id,
        score: 0.92,
        status: "proposed",
      },
    ]

    await supabase.from("matches").insert(matches)
    console.log("Matches created:", matches.length)
  }

  console.log("Seed completed successfully!")
  console.log("\nTest Credentials:")
  console.log("Admin: admin@humanitarian.org / admin123")
  console.log("NGO: ngo@redcross.org / ngo123")
  console.log("Business: business@globalaid.com / business123")
  console.log("Donor: donor@fema.gov / donor123")
}

seed().catch(console.error)
