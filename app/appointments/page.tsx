"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateAppointmentDialog } from "@/components/create-appointment-dialog"

// Mock appointment data
const mockAppointments = [
  {
    id: "APT001",
    patientName: "Rajesh Kumar",
    patientId: "P001",
    date: "2024-12-25",
    time: "10:00 AM",
    doctor: "Dr. Sharma",
    type: "Follow-up",
    status: "Scheduled",
    phone: "+91-9876543210",
  },
  {
    id: "APT002",
    patientName: "Priya Nair",
    patientId: "P002",
    date: "2024-12-26",
    time: "2:30 PM",
    doctor: "Dr. Singh",
    type: "Post-Surgery",
    status: "Scheduled",
    phone: "+91-9876543211",
  },
  {
    id: "APT003",
    patientName: "Arjun Patel",
    patientId: "P003",
    date: "2024-12-27",
    time: "11:15 AM",
    doctor: "Dr. Verma",
    type: "Initial Consultation",
    status: "Confirmed",
    phone: "+91-9876543212",
  },
  {
    id: "APT004",
    patientName: "Meera Gupta",
    patientId: "P004",
    date: "2024-12-28",
    time: "3:45 PM",
    doctor: "Dr. Sharma",
    type: "Check-up",
    status: "Scheduled",
    phone: "+91-9876543213",
  },
]

export default function AppointmentsPage() {
  return (
    <main className="flex-1">
      <div className="container py-8 px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Appointments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Schedule and manage patient appointments</p>
        </div>

        {/* Appointment Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">18</div>
              <p className="text-xs text-muted-foreground mt-1">Upcoming</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">6</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Upcoming Appointments</CardTitle>
            <CreateAppointmentDialog>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Create Appointment
              </Button>
            </CreateAppointmentDialog>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAppointments.map((apt) => (
                    <TableRow key={apt.id}>
                      <TableCell className="font-medium">{apt.patientName}</TableCell>
                      <TableCell className="font-mono text-sm">{apt.patientId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {apt.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {apt.time}
                        </div>
                      </TableCell>
                      <TableCell>{apt.doctor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{apt.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">{apt.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
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
  )
}
