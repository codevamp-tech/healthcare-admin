"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Activity, Clock } from "lucide-react"
import { DiagnosisChart } from "@/components/diagnosis-chart"
import { RecentPatientsTable } from "@/components/recent-patients-table"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <main className="flex-1 ml-64">
        <div className="container py-8 px-8">
          <PageHeader title="Dashboard" description="Overview of your healthcare system" showSearch />

          {/* Metric Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/patients")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2,847</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/patients")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">New Patients</CardTitle>
                <Activity className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">156</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/patients")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
                <FileText className="h-4 w-4 text-chart-3" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">8,493</div>
                <p className="text-xs text-muted-foreground mt-1">Across all diagnoses</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/imaging")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Imaging</CardTitle>
                <Clock className="h-4 w-4 text-chart-5" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">23</div>
                <p className="text-xs text-muted-foreground mt-1">Requires review</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tables */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <DiagnosisChart />

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Knee Osteoarthritis</span>
                    <span className="text-sm font-bold text-foreground">287</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-chart-1" style={{ width: "35%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Lumbar Disc Herniation</span>
                    <span className="text-sm font-bold text-foreground">245</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-chart-2" style={{ width: "30%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Rotator Cuff Tear</span>
                    <span className="text-sm font-bold text-foreground">156</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-chart-3" style={{ width: "19%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Cervical Spondylosis</span>
                    <span className="text-sm font-bold text-foreground">128</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-chart-4" style={{ width: "16%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Patients */}
          <RecentPatientsTable />
        </div>
      </main>
    </div>
  )
}
