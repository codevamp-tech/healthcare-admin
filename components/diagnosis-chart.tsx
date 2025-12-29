"use client"

import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { diagnosisData } from "@/lib/data"

const chartConfig = {
  count: {
    label: "Patients",
  },
  "Knee Osteoarthritis": {
    label: "Knee Osteoarthritis",
    color: "hsl(var(--chart-1))",
  },
  "Lumbar Disc Herniation": {
    label: "Lumbar Disc Herniation",
    color: "hsl(var(--chart-2))",
  },
  "Rotator Cuff Tear": {
    label: "Rotator Cuff Tear",
    color: "hsl(var(--chart-3))",
  },
  "Cervical Spondylosis": {
    label: "Cervical Spondylosis",
    color: "hsl(var(--chart-4))",
  },
  "Ankle Fracture": {
    label: "Ankle Fracture",
    color: "hsl(var(--chart-5))",
  },
  "Meniscal Tear": {
    label: "Meniscal Tear",
    color: "hsl(var(--chart-6))",
  },
  Tendinitis: {
    label: "Tendinitis",
    color: "hsl(var(--chart-7))",
  },
  "Hip Dysplasia": {
    label: "Hip Dysplasia",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig

export function DiagnosisChart() {
  const totalPatients = diagnosisData.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnosis Distribution</CardTitle>
        <CardDescription>Patient count by orthopedic condition</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={diagnosisData} dataKey="count" nameKey="name" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalPatients.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Total Patients
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
