import { Suspense } from "react"
import { getAllProfiles } from "@/lib/actions/profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Shield, Building } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

async function AdminContent() {
  const { data: profiles, error } = await getAllProfiles()

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">Error loading users: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!profiles || profiles.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No users found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {profiles.map((profile) => (
        <Card key={profile.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {profile.role === "admin" && <Shield className="h-5 w-5" />}
                  {profile.full_name || "Unnamed User"}
                </CardTitle>
                <CardDescription>{profile.email}</CardDescription>
              </div>
              <Badge
                variant={
                  profile.role === "admin"
                    ? "default"
                    : profile.role === "supplier"
                      ? "secondary"
                      : profile.role === "logistics"
                        ? "outline"
                        : "secondary"
                }
              >
                {profile.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {profile.org_id && (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Organization ID: {profile.org_id.slice(0, 8)}</span>
                </div>
              )}
              {profile.phone && (
                <div className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  <span className="text-muted-foreground">{profile.phone}</span>
                </div>
              )}
              <div className="text-sm">
                <span className="font-medium">Joined:</span>{" "}
                <span className="text-muted-foreground">{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
              <div className="pt-2 flex gap-2">
                <Button size="sm" variant="outline">
                  Edit Role
                </Button>
                <Button size="sm" variant="outline">
                  View Activity
                </Button>
                <Button size="sm" variant="destructive">
                  Suspend
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users and system settings</p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
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
        <AdminContent />
      </Suspense>
    </div>
  )
}
