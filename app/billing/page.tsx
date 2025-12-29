"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Clock, Plus } from "lucide-react"
import { CreateInvoiceDialog } from "@/components/create-invoice-dialog"

// Mock billing data
const mockBillingRecords = [
  {
    id: "INV001",
    patientName: "Rajesh Kumar",
    patientId: "P001",
    amount: "₹5,000",
    date: "2024-12-15",
    service: "X-Ray & Consultation",
    status: "Paid",
  },
  {
    id: "INV002",
    patientName: "Priya Nair",
    patientId: "P002",
    amount: "₹15,000",
    date: "2024-12-18",
    service: "MRI Scan",
    status: "Paid",
  },
  {
    id: "INV003",
    patientName: "Arjun Patel",
    patientId: "P003",
    amount: "₹8,500",
    date: "2024-12-19",
    service: "Consultation & Report",
    status: "Pending",
  },
  {
    id: "INV004",
    patientName: "Meera Gupta",
    patientId: "P004",
    amount: "₹12,000",
    date: "2024-12-20",
    service: "CT-Scan & Analysis",
    status: "Paid",
  },
]

const billingTrendData = [
  { day: "Mon", revenue: 45000 },
  { day: "Tue", revenue: 52000 },
  { day: "Wed", revenue: 38000 },
  { day: "Thu", revenue: 61000 },
  { day: "Fri", revenue: 55000 },
  { day: "Sat", revenue: 42000 },
  { day: "Sun", revenue: 35000 },
]

const monthlyBillingData = [
  { month: "Jan", revenue: 425000 },
  { month: "Feb", revenue: 485000 },
  { month: "Mar", revenue: 512000 },
  { month: "Apr", revenue: 478000 },
  { month: "May", revenue: 541000 },
  { month: "Jun", revenue: 495000 },
  { month: "Jul", revenue: 563000 },
  { month: "Aug", revenue: 524000 },
  { month: "Sep", revenue: 481000 },
  { month: "Oct", revenue: 548000 },
  { month: "Nov", revenue: 532000 },
  { month: "Dec", revenue: 475000 },
]

const yearlyBillingData = [
  { year: "2020", revenue: 4500000 },
  { year: "2021", revenue: 5200000 },
  { year: "2022", revenue: 6100000 },
  { year: "2023", revenue: 6800000 },
  { year: "2024", revenue: 6200000 },
]

const revenueBreakdown = [
  { name: "Paid", value: 430000 },
  { name: "Pending", value: 45000 },
]

const COLORS = ["#10b981", "#f97316"]

export default function BillingPage() {
  const [timeFilter, setTimeFilter] = useState<"day" | "month" | "year">("day")
  const [selectedStat, setSelectedStat] = useState<"revenue" | "outstanding" | "invoices" | null>(null)

  const getChartData = () => {
    if (timeFilter === "month") return monthlyBillingData
    if (timeFilter === "year") return yearlyBillingData
    return billingTrendData
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <main className="flex-1 ml-64">
        <div className="container py-8 px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage invoices and patient billing</p>
          </div>

          {/* Billing Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedStat("revenue")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹4,75,000</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedStat("outstanding")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                  ₹45,000
                </div>
                <p className="text-xs text-muted-foreground mt-1">Pending payment</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedStat("invoices")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  186
                </div>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Billing Trends</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={timeFilter === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter("day")}
                >
                  Day
                </Button>
                <Button
                  variant={timeFilter === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter("month")}
                >
                  Month
                </Button>
                <Button
                  variant={timeFilter === "year" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter("year")}
                >
                  Year
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeFilter === "day" ? "day" : timeFilter === "month" ? "month" : "year"} />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Billing Records Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Invoices</CardTitle>
              <CreateInvoiceDialog>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </CreateInvoiceDialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBillingRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-mono text-sm font-medium">{record.id}</TableCell>
                        <TableCell className="font-medium">{record.patientName}</TableCell>
                        <TableCell className="font-mono text-sm">{record.patientId}</TableCell>
                        <TableCell>{record.service}</TableCell>
                        <TableCell className="font-semibold">{record.amount}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              record.status === "Paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                            }
                          >
                            {record.status}
                          </Badge>
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
    </div>
  )
}
