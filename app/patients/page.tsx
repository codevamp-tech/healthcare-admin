"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { mockPatients } from "@/lib/data"
import Link from "next/link"
import { AddPatientDialog } from "@/components/add-patient-dialog"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [diagnosisFilter, setDiagnosisFilter] = useState("all")
  const [reportTypeFilter, setReportTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter patients
  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)

    const matchesDiagnosis = diagnosisFilter === "all" || patient.diagnosis === diagnosisFilter
    const matchesReportType = reportTypeFilter === "all" || patient.reportType === reportTypeFilter

    return matchesSearch && matchesDiagnosis && matchesReportType
  })

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="flex-1">
      <div className="container py-8 px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Patients</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage and view patient records</p>
          </div>
          <AddPatientDialog>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </AddPatientDialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <div className="flex flex-col gap-4 mt-4 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, ID, or phone..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <Select value={diagnosisFilter} onValueChange={setDiagnosisFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Diagnosis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Diagnoses</SelectItem>
                    <SelectItem value="Knee Osteoarthritis">Knee Osteoarthritis</SelectItem>
                    <SelectItem value="Lumbar Disc Herniation">Lumbar Disc Herniation</SelectItem>
                    <SelectItem value="Rotator Cuff Tear">Rotator Cuff Tear</SelectItem>
                    <SelectItem value="Cervical Spondylosis">Cervical Spondylosis</SelectItem>
                    <SelectItem value="Ankle Fracture">Ankle Fracture</SelectItem>
                    <SelectItem value="Meniscal Tear">Meniscal Tear</SelectItem>
                    <SelectItem value="Tendinitis">Tendinitis</SelectItem>
                    <SelectItem value="Hip Dysplasia">Hip Dysplasia</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={reportTypeFilter} onValueChange={setReportTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="X-Ray">X-Ray</SelectItem>
                    <SelectItem value="MRI">MRI</SelectItem>
                    <SelectItem value="CT-Scan">CT-Scan</SelectItem>
                    <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                    <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                    <SelectItem value="Surgical Notes">Surgical Notes</SelectItem>
                    <SelectItem value="Prescription">Prescription</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Results count */}
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPatients.length)} of{" "}
              {filteredPatients.length} results
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPatients.length > 0 ? (
                    paginatedPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-mono text-sm font-medium">{patient.id}</TableCell>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell className="text-muted-foreground">{patient.gender}</TableCell>
                        <TableCell className="text-muted-foreground">{patient.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{patient.diagnosis}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{patient.doctor}</TableCell>
                        <TableCell className="text-muted-foreground">{patient.lastVisit}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/patients/${patient.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                        No patients found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
