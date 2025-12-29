"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CreateLabResultDialog({ children }: any) {
  const [open, setOpen] = useState(false)
  const [patientId, setPatientId] = useState("")
  const [testName, setTestName] = useState("")
  const [testType, setTestType] = useState("")
  const [status, setStatus] = useState("Completed")
  const [notes, setNotes] = useState("")
  const [reportFile, setReportFile] = useState<File | null>(null)

  const handleSubmit = () => {
    console.log("[v0] Creating lab result:", {
      patientId,
      testName,
      testType,
      status,
      notes,
      reportFile: reportFile?.name,
    })
    setOpen(false)
    setPatientId("")
    setTestName("")
    setTestType("")
    setStatus("Completed")
    setNotes("")
    setReportFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Lab Result</DialogTitle>
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
            <Label htmlFor="testName">Test Name</Label>
            <Input
              id="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="e.g., Complete Blood Count"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testType">Test Type</Label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger id="testType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blood Test">Blood Test</SelectItem>
                  <SelectItem value="Urine Test">Urine Test</SelectItem>
                  <SelectItem value="X-Ray">X-Ray</SelectItem>
                  <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                  <SelectItem value="ECG">ECG</SelectItem>
                  <SelectItem value="CT Scan">CT Scan</SelectItem>
                  <SelectItem value="MRI">MRI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload Report</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.jpg,.png,.dcm"
              onChange={(e) => setReportFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Test findings or observations..."
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Lab Result</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
