"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Eye, X } from "lucide-react"

// Mock medical records data
const mockMedicalRecords = [
  {
    id: "MR001",
    patientName: "Rajesh Kumar",
    patientId: "P001",
    recordType: "Medical History",
    date: "2024-12-15",
    doctor: "Dr. Sharma",
    status: "Active",
    summary:
      "58-year-old male with Knee Osteoarthritis. Presents with chronic knee pain, swelling, and stiffness. Moderate degenerative changes noted on imaging. Treatment plan includes physical therapy and anti-inflammatory medications.",
  },
  {
    id: "MR002",
    patientName: "Priya Nair",
    patientId: "P002",
    recordType: "Surgical Report",
    date: "2024-12-18",
    doctor: "Dr. Singh",
    status: "Active",
    summary:
      "42-year-old female with Lumbar Disc Herniation. MRI shows posterolateral disc herniation at L4-L5 with neural compression. Pre-operative assessment completed. Microdiscectomy recommended.",
  },
  {
    id: "MR003",
    patientName: "Arjun Patel",
    patientId: "P003",
    recordType: "Discharge Summary",
    date: "2024-12-19",
    doctor: "Dr. Verma",
    status: "Active",
    summary:
      "35-year-old male with Rotator Cuff Tear. Right shoulder MRI confirms full-thickness rotator cuff tear. Patient discharged with physical therapy protocol and pain management plan.",
  },
  {
    id: "MR004",
    patientName: "Meera Gupta",
    patientId: "P004",
    recordType: "Progress Notes",
    date: "2024-12-20",
    doctor: "Dr. Sharma",
    status: "Active",
    summary:
      "67-year-old female with Cervical Spondylosis. CT scan shows degenerative changes with osteophyte formation at C5-C6. Conservative management ongoing with good compliance to physical therapy.",
  },
  {
    id: "MR005",
    patientName: "Vikram Desai",
    patientId: "P005",
    recordType: "Treatment Plan",
    date: "2024-12-14",
    doctor: "Dr. Singh",
    status: "Archived",
    summary:
      "45-year-old male with Ankle Fracture. Left ankle Weber B fracture with minimal displacement. Conservative treatment with immobilization and progressive weight-bearing protocol.",
  },
]

export default function MedicalRecordsPage() {
  const [selectedRecord, setSelectedRecord] = useState<(typeof mockMedicalRecords)[0] | null>(null)

  return (
    <main className="flex-1">
      <div className="container py-8 px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Medical Records</h1>
          <p className="mt-1 text-sm text-muted-foreground">Access and manage patient medical records</p>
        </div>

        {/* Records Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground mt-1">All records</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">2,756</div>
              <p className="text-xs text-muted-foreground mt-1">Currently accessible</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Archived</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">91</div>
              <p className="text-xs text-muted-foreground mt-1">In archive</p>
            </CardContent>
          </Card>
        </div>

        {/* Medical Records Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Record Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMedicalRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-sm font-medium">{record.id}</TableCell>
                      <TableCell className="font-medium">{record.patientName}</TableCell>
                      <TableCell className="font-mono text-sm">{record.patientId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {record.recordType}
                        </div>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            record.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(record)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Medical History Summary</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patient Information</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Patient Name</p>
                    <p className="font-semibold">{selectedRecord.patientName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Patient ID</p>
                    <p className="font-semibold">{selectedRecord.patientId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Record Type</p>
                    <p className="font-semibold">{selectedRecord.recordType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Doctor</p>
                    <p className="font-semibold">{selectedRecord.doctor}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medical Summary</p>
                <p className="mt-2 text-sm leading-relaxed">{selectedRecord.summary}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
