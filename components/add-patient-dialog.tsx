"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddPatientDialog({ children }: any) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    diagnosis: "",
    doctor: "",
    laterality: "",
    severity: "",
    reportType: "",
    reportFile: null,
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log("[v0] Adding patient:", formData)
    setOpen(false)
    setStep(1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Patient - Step {step} of 3</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <h3 className="font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <h3 className="font-semibold">Medical Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Select value={formData.diagnosis} onValueChange={(v) => setFormData({ ...formData, diagnosis: v })}>
                  <SelectTrigger id="diagnosis">
                    <SelectValue placeholder="Select diagnosis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Knee Osteoarthritis">Knee Osteoarthritis</SelectItem>
                    <SelectItem value="Lumbar Disc Herniation">Lumbar Disc Herniation</SelectItem>
                    <SelectItem value="Rotator Cuff Tear">Rotator Cuff Tear</SelectItem>
                    <SelectItem value="Cervical Spondylosis">Cervical Spondylosis</SelectItem>
                    <SelectItem value="Ankle Fracture">Ankle Fracture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Attending Doctor</Label>
                <Select value={formData.doctor} onValueChange={(v) => setFormData({ ...formData, doctor: v })}>
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
                <Label htmlFor="laterality">Laterality</Label>
                <Select value={formData.laterality} onValueChange={(v) => setFormData({ ...formData, laterality: v })}>
                  <SelectTrigger id="laterality">
                    <SelectValue placeholder="Select side" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Right">Right</SelectItem>
                    <SelectItem value="Left">Left</SelectItem>
                    <SelectItem value="Bilateral">Bilateral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select value={formData.severity} onValueChange={(v) => setFormData({ ...formData, severity: v })}>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mild">Mild</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <h3 className="font-semibold">Initial Reports (Optional)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={formData.reportType} onValueChange={(v) => setFormData({ ...formData, reportType: v })}>
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="X-Ray">X-Ray</SelectItem>
                    <SelectItem value="MRI">MRI</SelectItem>
                    <SelectItem value="CT-Scan">CT-Scan</SelectItem>
                    <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Upload Report</Label>
                <Input id="file" type="file" accept=".pdf,.jpg,.png,.dcm" />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          {step > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 3 ? <Button onClick={handleNext}>Next</Button> : <Button onClick={handleSubmit}>Add Patient</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
