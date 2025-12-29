"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CreatePrescriptionDialog({ children }: any) {
  const [open, setOpen] = useState(false)
  const [patientId, setPatientId] = useState("")
  const [medication, setMedication] = useState("")
  const [dosage, setDosage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [duration, setDuration] = useState("")
  const [instructions, setInstructions] = useState("")

  const handleSubmit = () => {
    console.log("[v0] Creating prescription:", {
      patientId,
      medication,
      dosage,
      quantity,
      duration,
      instructions,
    })
    setOpen(false)
    setPatientId("")
    setMedication("")
    setDosage("")
    setQuantity("")
    setDuration("")
    setInstructions("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Prescription</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger id="patientId">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="P001">P001 - Rajesh Kumar</SelectItem>
                <SelectItem value="P002">P002 - Priya Nair</SelectItem>
                <SelectItem value="P003">P003 - Arjun Patel</SelectItem>
                <SelectItem value="P004">P004 - Meera Gupta</SelectItem>
                <SelectItem value="P005">P005 - Vikram Desai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="medication">Medication Name</Label>
            <Input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="e.g., Ibuprofen 400mg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 1 tablet twice daily"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 30"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 week">1 Week</SelectItem>
                <SelectItem value="2 weeks">2 Weeks</SelectItem>
                <SelectItem value="1 month">1 Month</SelectItem>
                <SelectItem value="3 months">3 Months</SelectItem>
                <SelectItem value="6 months">6 Months</SelectItem>
                <SelectItem value="1 year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g., Take with food, avoid dairy products..."
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Prescription</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
