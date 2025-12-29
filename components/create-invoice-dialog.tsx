"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CreateInvoiceDialog({ children }: any) {
  const [open, setOpen] = useState(false)
  const [patientId, setPatientId] = useState("")
  const [invoiceType, setInvoiceType] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    console.log("[v0] Creating invoice:", {
      patientId,
      invoiceType,
      amount,
      description,
      notes,
    })
    setOpen(false)
    setPatientId("")
    setInvoiceType("")
    setAmount("")
    setDescription("")
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
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
            <Label htmlFor="invoiceType">Invoice Type</Label>
            <Select value={invoiceType} onValueChange={setInvoiceType}>
              <SelectTrigger id="invoiceType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hospital Services">Hospital Services</SelectItem>
                <SelectItem value="Lab Tests">Lab Tests</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Imaging">Imaging</SelectItem>
                <SelectItem value="Surgery">Surgery</SelectItem>
                <SelectItem value="Medication">Medication</SelectItem>
                <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 5000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., CT Scan - Knee"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional details or payment terms..."
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Invoice</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
