"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Plus, Edit, Trash2, Check } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Address {
  id: string
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  province: string
  postalCode: string
  phone: string
  isDefault: boolean
}

export default function AddressesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    isDefault: false,
  })

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin")
      return
    }
    fetchAddresses()
  }, [session])

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/user/addresses")
      if (response.ok) {
        const data = await response.json()
        setAddresses(data.addresses || [])
      }
    } catch (error) {
      console.error("Error fetching addresses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingAddress
        ? `/api/user/addresses/${editingAddress.id}`
        : "/api/user/addresses"
      const method = editingAddress ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingAddress ? "Address updated!" : "Address added!")
        setDialogOpen(false)
        resetForm()
        fetchAddresses()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save address")
        
        // If it's a 400 error with address limit message, don't close dialog
        if (response.status === 400) {
          // Keep dialog open so user can see the error
        } else {
          setDialogOpen(false)
        }
      }
    } catch (error) {
      console.error("Error saving address:", error)
      toast.error("An error occurred")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return

    try {
      const response = await fetch(`/api/user/addresses/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Address deleted!")
        fetchAddresses()
      } else {
        toast.error("Failed to delete address")
      }
    } catch (error) {
      console.error("Error deleting address:", error)
      toast.error("An error occurred")
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/user/addresses/${id}/default`, {
        method: "POST",
      })

      if (response.ok) {
        toast.success("Default address updated!")
        fetchAddresses()
      } else {
        toast.error("Failed to set default address")
      }
    } catch (error) {
      console.error("Error setting default address:", error)
      toast.error("An error occurred")
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    })
    setEditingAddress(null)
  }

  const openEditDialog = (address: Address) => {
    setEditingAddress(address)
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      address1: address.address1,
      address2: address.address2 || "",
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      phone: address.phone,
      isDefault: address.isDefault,
    })
    setDialogOpen(true)
  }

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ]

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">My Addresses</h1>
            <p className="text-lg text-muted-foreground">
              Manage your shipping addresses
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} disabled={addresses.length >= 4}>
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </DialogTitle>
                <DialogDescription>
                  {editingAddress
                    ? "Update your address details"
                    : addresses.length >= 4
                    ? "Maximum of 4 addresses allowed. Delete an existing address to add a new one."
                    : "Add a new shipping address to your account"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input
                    id="address1"
                    value={formData.address1}
                    onChange={(e) =>
                      setFormData({ ...formData, address1: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                  <Input
                    id="address2"
                    value={formData.address2}
                    onChange={(e) =>
                      setFormData({ ...formData, address2: e.target.value })
                    }
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Province</Label>
                    <select
                      id="province"
                      value={formData.province}
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+27 12 345 6789"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) =>
                      setFormData({ ...formData, isDefault: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isDefault" className="cursor-pointer">
                    Set as default address
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1" disabled={!editingAddress && addresses.length >= 4}>
                    {editingAddress ? "Update Address" : "Add Address"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading your addresses...</p>
          </div>
        ) : addresses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No addresses yet</h3>
              <p className="text-muted-foreground mb-6">
                Add your first address to get started
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {address.isDefault && (
                        <Badge variant="default" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">
                      {address.firstName} {address.lastName}
                    </p>
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {address.city}, {address.province} {address.postalCode}
                    </p>
                    <p className="text-muted-foreground">{address.phone}</p>
                  </div>
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Set as Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

