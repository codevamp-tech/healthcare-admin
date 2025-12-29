"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CreateAppointmentDialog({ children }: any) {
  const [open, setOpen] = useState(false)
  const [patientId, setPatientId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [doctor, setDoctor] = useState("")
  const [visitType, setVisitType] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    console.log("[v0] Creating appointment:", {
      patientId,
      date,
      time,
      doctor,
      visitType,
      notes,
    })
    setOpen(false)
    setPatientId("")
    setDate("")
    setTime("")
    setDoctor("")
    setVisitType("")
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Appointment</DialogTitle>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor</Label>
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger id="doctor">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Sharma">Dr. Sharma</SelectItem>
                <SelectItem value="Dr. Singh">Dr. Singh</SelectItem>
                <SelectItem value="Dr. Verma">Dr. Verma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="visitType">Visit Type</Label>
            <Select value={visitType} onValueChange={setVisitType}>
              <SelectTrigger id="visitType">
                <SelectValue placeholder="Select visit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Initial Consultation">Initial Consultation</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Post-Surgery">Post-Surgery</SelectItem>
                <SelectItem value="Check-up">Check-up</SelectItem>
                <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions or notes..."
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Appointment</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
