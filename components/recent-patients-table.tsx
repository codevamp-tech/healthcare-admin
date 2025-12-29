import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { mockPatients } from "@/lib/data"
import Link from "next/link"

export function RecentPatientsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
        <CardDescription>Latest patient visits and registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPatients.slice(0, 5).map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-mono text-sm">{patient.id}</TableCell>
                <TableCell className="font-medium">{patient.name}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
