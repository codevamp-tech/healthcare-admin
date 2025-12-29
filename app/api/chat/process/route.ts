import { mockPatients } from "@/lib/data"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const message = formData.get("message") as string
    const files = formData.getAll("file_0") || []

    // Mock response for file upload and patient extraction
    if (files.length > 0 || message.toLowerCase().includes("upload")) {
      return NextResponse.json({
        uploaded: {
          fileName: "medical_report.pdf",
          type: "MRI",
        },
        extracted: {
          name: "John Doe",
          phone: "+91-9876543220",
          diagnosis: "Lumbar Disc Herniation",
        },
        patients: [
          {
            id: "P009",
            name: "John Doe",
            phone: "+91-9876543220",
            diagnosis: "Lumbar Disc Herniation",
            found: false,
            reports: ["Lumbar_MRI_Report.pdf"],
            matchedData: {
              "Study Type": "Lumbar Spine MRI",
              Diagnosis: "Lumbar Disc Herniation",
              Severity: "Moderate",
              Recommendation: "Conservative treatment with PT",
            },
          },
        ],
        mapped: {
          count: 1,
          patientId: "P009",
        },
      })
    }

    // Mock response for patient queries
    if (message.toLowerCase().includes("spine") || message.toLowerCase().includes("spine injury")) {
      const spinePatients = mockPatients.filter(
        (p) =>
          p.diagnosis.toLowerCase().includes("spine") ||
          p.diagnosis.toLowerCase().includes("disc") ||
          p.diagnosis.toLowerCase().includes("cervical"),
      )

      return NextResponse.json({
        query: message,
        queryResults: spinePatients,
      })
    }

    // Default response
    return NextResponse.json({
      message: "Query processed",
      queryResults: [],
    })
  } catch (error) {
    console.error("Chat processing error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
