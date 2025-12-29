"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Eye, X, Plus } from "lucide-react"
import { CreateLabResultDialog } from "@/components/create-lab-result-dialog"

const mockLabReports: { [key: string]: any } = {
  LAB001: {
    testName: "Blood Count (CBC)",
    date: "2024-12-20",
    description: "Complete blood count test",
    values: [
      { name: "WBC", result: "7.2", unit: "K/uL", normalRange: "4.5-11.0" },
      { name: "RBC", result: "4.8", unit: "M/uL", normalRange: "4.5-5.5" },
      { name: "Hemoglobin", result: "14.2", unit: "g/dL", normalRange: "13.5-17.5" },
      { name: "Hematocrit", result: "42%", unit: "%", normalRange: "41-53" },
      { name: "Platelets", result: "245", unit: "K/uL", normalRange: "150-400" },
    ],
    interpretation: "All values within normal range. No abnormalities detected.",
  },
  LAB002: {
    testName: "Metabolic Panel",
    date: "2024-12-21",
    description: "Comprehensive metabolic panel including glucose, electrolytes, and kidney function",
    values: [
      { name: "Glucose", result: "95", unit: "mg/dL", normalRange: "70-100" },
      { name: "Sodium", result: "138", unit: "mEq/L", normalRange: "135-145" },
      { name: "Potassium", result: "4.1", unit: "mEq/L", normalRange: "3.5-5.0" },
      { name: "Creatinine", result: "0.9", unit: "mg/dL", normalRange: "0.7-1.3" },
      { name: "BUN", result: "18", unit: "mg/dL", normalRange: "7-20" },
    ],
    interpretation: "Metabolic parameters normal. Kidney and liver function adequate.",
  },
  LAB003: {
    testName: "Thyroid Function Test",
    date: "2024-12-22",
    description: "TSH and thyroid hormone levels",
    values: [
      { name: "TSH", result: "Pending", unit: "mIU/L", normalRange: "0.4-4.0" },
      { name: "T3", result: "Pending", unit: "ng/dL", normalRange: "80-200" },
      { name: "T4", result: "Pending", unit: "ng/dL", normalRange: "4.5-12" },
    ],
    interpretation: "Test results pending. Expected completion by 2024-12-23.",
  },
  LAB004: {
    testName: "Lipid Panel",
    date: "2024-12-19",
    description: "Cholesterol and triglyceride levels",
    values: [
      { name: "Total Cholesterol", result: "220", unit: "mg/dL", normalRange: "<200" },
      { name: "LDL", result: "145", unit: "mg/dL", normalRange: "<100" },
      { name: "HDL", result: "38", unit: "mg/dL", normalRange: ">40" },
      { name: "Triglycerides", result: "180", unit: "mg/dL", normalRange: "<150" },
    ],
    interpretation: "Borderline high cholesterol and triglycerides. Dietary modifications recommended.",
  },
}

// Mock lab results data
const mockLabResults = [
  {
    id: "LAB001",
    patientName: "Rajesh Kumar",
    patientId: "P001",
    testName: "Blood Count",
    date: "2024-12-20",
    status: "Complete",
    result: "Normal",
  },
  {
    id: "LAB002",
    patientName: "Priya Nair",
    patientId: "P002",
    testName: "Metabolic Panel",
    date: "2024-12-21",
    status: "Complete",
    result: "Normal",
  },
  {
    id: "LAB003",
    patientName: "Arjun Patel",
    patientId: "P003",
    testName: "Thyroid Function",
    date: "2024-12-22",
    status: "Pending",
    result: "Awaiting",
  },
  {
    id: "LAB004",
    patientName: "Meera Gupta",
    patientId: "P004",
    testName: "Lipid Panel",
    date: "2024-12-19",
    status: "Complete",
    result: "Borderline",
  },
]

export default function LabResultsPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const filteredResults = mockLabResults.filter((result) => {
    if (filterStatus === "completed") return result.status === "Complete"
    if (filterStatus === "pending") return result.status === "Pending"
    return true
  })

  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <main className="flex-1 ml-64">
        <div className="container py-8 px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Lab Results</h1>
            <p className="mt-1 text-sm text-muted-foreground">View and manage patient laboratory test results</p>
          </div>

          {/* Lab Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => setFilterStatus("all")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setFilterStatus("completed")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">328</div>
                <p className="text-xs text-muted-foreground mt-1">Results available</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setFilterStatus("pending")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">14</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting results</p>
              </CardContent>
            </Card>
          </div>

          {/* Lab Results Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Lab Results</CardTitle>
              <CreateLabResultDialog>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Lab Result
                </Button>
              </CreateLabResultDialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.patientName}</TableCell>
                        <TableCell className="font-mono text-sm">{result.patientId}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {result.testName}
                          </div>
                        </TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              result.status === "Complete"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }
                          >
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{result.result}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedReport(result.id)}
                              title="View Report"
                            >
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
      </main>

      {selectedReport && mockLabReports[selectedReport] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 sticky top-0 bg-background border-b">
              <CardTitle>{mockLabReports[selectedReport].testName}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Test Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Test Name</p>
                      <p className="font-medium">{mockLabReports[selectedReport].testName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{mockLabReports[selectedReport].date}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Description</p>
                      <p className="font-medium">{mockLabReports[selectedReport].description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Test Results</h3>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Normal Range</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockLabReports[selectedReport].values.map((value: any, idx: number) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{value.name}</TableCell>
                            <TableCell>{value.result}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{value.unit}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{value.normalRange}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Interpretation</h3>
                  <p className="text-sm text-muted-foreground">{mockLabReports[selectedReport].interpretation}</p>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedReport(null)}>
                    Close
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
