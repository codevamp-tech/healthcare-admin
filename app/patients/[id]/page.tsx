import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Mail, Calendar, FileText, Download, ExternalLink, ArrowLeft } from "lucide-react"
import { mockPatients, mockReports } from "@/lib/data"
import { ImagingStudies } from "@/components/imaging-studies"
import Link from "next/link"
import { AddReportDialog } from "@/components/add-report-dialog"
import { ScheduleVisitDialog } from "@/components/schedule-visit-dialog"
import { ViewReportDialog } from "@/components/view-report-dialog"

export default async function PatientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const patient = mockPatients.find((p) => p.id === id)
  const patientReports = mockReports.filter((r) => r.patientId === id)

  if (!patient) {
    return (
      <main className="flex-1">
        <div className="container py-8 px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">Patient Not Found</h2>
            <p className="text-muted-foreground mb-4">The patient you're looking for doesn't exist.</p>
            <Link href="/patients">
              <Button>Back to Patients</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Group reports by type
  const reportsByType = patientReports.reduce(
    (acc, report) => {
      if (!acc[report.type]) {
        acc[report.type] = []
      }
      acc[report.type].push(report)
      return acc
    },
    {} as Record<string, typeof patientReports>,
  )

  return (
    <main className="flex-1">
      <div className="container py-8 px-8">
        {/* Back button */}
        <Link href="/patients">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{patient.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="font-mono">
                  {patient.id}
                </Badge>
                <Badge>{patient.diagnosis}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <AddReportDialog patientId={patient.id} patientName={patient.name}>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Report
                </Button>
              </AddReportDialog>
              <ScheduleVisitDialog patientId={patient.id} patientName={patient.name}>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Visit
                </Button>
              </ScheduleVisitDialog>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visits">Visits & Appointments</TabsTrigger>
            <TabsTrigger value="reports">Medical Reports</TabsTrigger>
            <TabsTrigger value="imaging">Imaging</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="text-base font-medium text-foreground">{patient.name}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age & Gender</p>
                      <p className="text-base font-medium text-foreground">
                        {patient.age} years • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="text-base font-medium text-foreground">{patient.phone}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-base font-medium text-foreground">
                        {patient.name.toLowerCase().replace(" ", ".")}@email.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Primary Diagnosis</p>
                    <Badge className="text-sm">{patient.diagnosis}</Badge>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Attending Doctor</p>
                    <p className="text-base font-medium text-foreground">{patient.doctor}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Last Visit</p>
                    <p className="text-base font-medium text-foreground">{patient.lastVisit}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Known Allergies</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="destructive">Penicillin</Badge>
                      <Badge variant="destructive">NSAIDs</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Orthopedic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Side Affected</p>
                    <p className="text-base font-medium text-foreground">{patient.laterality || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Severity</p>
                    <Badge variant="outline">{patient.severity || "Not specified"}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Date of Injury/Onset</p>
                    <p className="text-base font-medium text-foreground">{patient.injuryDate || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Surgery Status</p>
                    <Badge variant={patient.surgeryRequired ? "destructive" : "secondary"}>
                      {patient.surgeryRequired ? "Surgery Required" : "Conservative Treatment"}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Physical Therapy</p>
                  <Badge variant={patient.physicalTherapy ? "default" : "secondary"}>
                    {patient.physicalTherapy ? "Active" : "Not scheduled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visits & Appointments Tab */}
          <TabsContent value="visits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>Past appointments and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg border border-border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">Orthopedic Checkup</p>
                          <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">with {patient.doctor}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Orthopedic examination and assessment. Physical therapy progress reviewed.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Reports</CardTitle>
                <CardDescription>Imaging and diagnostic reports organized by type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(reportsByType).map(([type, reports]) => (
                  <div key={type}>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{type}</h3>
                    <div className="space-y-2">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="h-16 w-16 rounded bg-muted flex items-center justify-center flex-shrink-0">
                              <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground">{report.name}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <span>{report.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ViewReportDialog report={report}>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </ViewReportDialog>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {patientReports.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No medical reports found for this patient</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Imaging Tab */}
          <TabsContent value="imaging" className="space-y-6">
            <ImagingStudies />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
