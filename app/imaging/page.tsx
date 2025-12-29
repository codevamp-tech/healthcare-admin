"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { FileImage, AlertCircle, CheckCircle2, Eye, Download, Maximize2, FileText } from "lucide-react"

interface ImagingStudy {
  id: string
  patientId: string
  patientName: string
  studyType: string
  bodyPart: string
  modality: "X-Ray" | "CT" | "MRI" | "Ultrasound"
  date: string
  month: string
  year: string
  aiFlag?: "Normal" | "Abnormal" | "Requires Review"
  thumbnail: string
}

const mockImagingStudies: ImagingStudy[] = [
  {
    id: "IMG001",
    patientId: "P002",
    patientName: "Sarah Patel",
    studyType: "Lumbar Spine MRI",
    bodyPart: "Lumbar Spine",
    modality: "MRI",
    date: "2024-12-18",
    month: "Dec",
    year: "2024",
    aiFlag: "Abnormal",
    thumbnail: "/lumbar-spine-mri-ortho.jpg",
  },
  {
    id: "IMG002",
    patientId: "P001",
    patientName: "John Kumar",
    studyType: "Knee X-Ray (AP & Lateral)",
    bodyPart: "Knee",
    modality: "X-Ray",
    date: "2024-12-15",
    month: "Dec",
    year: "2024",
    aiFlag: "Normal",
    thumbnail: "/knee-xray-ortho.jpg",
  },
  {
    id: "IMG003",
    patientId: "P003",
    patientName: "Raj Malhotra",
    studyType: "Shoulder X-Ray",
    bodyPart: "Shoulder",
    modality: "X-Ray",
    date: "2024-12-19",
    month: "Dec",
    year: "2024",
    aiFlag: "Requires Review",
    thumbnail: "/shoulder-xray-ortho.jpg",
  },
  {
    id: "IMG004",
    patientId: "P004",
    patientName: "Priya Reddy",
    studyType: "Cervical Spine CT",
    bodyPart: "Cervical Spine",
    modality: "CT",
    date: "2024-12-20",
    month: "Dec",
    year: "2024",
    aiFlag: "Abnormal",
    thumbnail: "/cervical-ct-ortho.jpg",
  },
  {
    id: "IMG005",
    patientId: "P005",
    patientName: "Amit Gupta",
    studyType: "Ankle X-Ray",
    bodyPart: "Ankle",
    modality: "X-Ray",
    date: "2024-12-14",
    month: "Dec",
    year: "2024",
    aiFlag: "Normal",
    thumbnail: "/ankle-xray-ortho.jpg",
  },
  {
    id: "IMG006",
    patientId: "P002",
    patientName: "Sarah Patel",
    studyType: "Hip Ultrasound",
    bodyPart: "Hip",
    modality: "Ultrasound",
    date: "2024-11-28",
    month: "Nov",
    year: "2024",
    aiFlag: "Normal",
    thumbnail: "/hip-ultrasound-ortho.jpg",
  },
]

export default function ImagingPage() {
  const [modalityFilter, setModalityFilter] = useState("all")
  const [bodyPartFilter, setBodyPartFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<ImagingStudy | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showReport, setShowReport] = useState(false)

  const filteredStudies = mockImagingStudies.filter((study) => {
    const matchesModality = modalityFilter === "all" || study.modality === modalityFilter
    const matchesBodyPart = bodyPartFilter === "all" || study.bodyPart === bodyPartFilter
    const matchesYear = yearFilter === "all" || study.year === yearFilter
    return matchesModality && matchesBodyPart && matchesYear
  })

  const openImageView = (study: ImagingStudy) => {
    setSelectedImage(study)
    setIsDialogOpen(true)
  }

  const getAiFlagColor = (flag?: string) => {
    switch (flag) {
      case "Normal":
        return "bg-chart-3/10 text-chart-3 border-chart-3/30"
      case "Abnormal":
        return "bg-destructive/10 text-destructive border-destructive/30"
      case "Requires Review":
        return "bg-chart-5/10 text-chart-5 border-chart-5/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getAiFlagIcon = (flag?: string) => {
    switch (flag) {
      case "Normal":
        return <CheckCircle2 className="h-4 w-4" />
      case "Abnormal":
      case "Requires Review":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <main className="flex-1">
      <div className="container py-8 px-8">
        <PageHeader title="Documents & Imaging" description="Browse and manage orthopedic imaging studies" />

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Select value={modalityFilter} onValueChange={setModalityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Modality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modalities</SelectItem>
                  <SelectItem value="X-Ray">X-Ray</SelectItem>
                  <SelectItem value="CT">CT Scan</SelectItem>
                  <SelectItem value="MRI">MRI</SelectItem>
                  <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bodyPartFilter} onValueChange={setBodyPartFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Body Part" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Body Parts</SelectItem>
                  <SelectItem value="Knee">Knee</SelectItem>
                  <SelectItem value="Lumbar Spine">Lumbar Spine</SelectItem>
                  <SelectItem value="Cervical Spine">Cervical Spine</SelectItem>
                  <SelectItem value="Shoulder">Shoulder</SelectItem>
                  <SelectItem value="Ankle">Ankle</SelectItem>
                  <SelectItem value="Hip">Hip</SelectItem>
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredStudies.length} imaging {filteredStudies.length === 1 ? "study" : "studies"}
            </div>
          </CardContent>
        </Card>

        {/* Grid */}
        {filteredStudies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  className="relative aspect-square bg-muted group cursor-pointer"
                  onClick={() => openImageView(study)}
                >
                  <img
                    src={study.thumbnail || "/placeholder.svg"}
                    alt={study.studyType}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      <Maximize2 className="h-4 w-4 mr-2" />
                      View Full Size
                    </Button>
                  </div>
                  {study.aiFlag && (
                    <Badge
                      variant="outline"
                      className={`absolute top-3 right-3 ${getAiFlagColor(study.aiFlag)} flex items-center gap-1`}
                    >
                      {getAiFlagIcon(study.aiFlag)}
                      {study.aiFlag}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{study.studyType}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{study.patientName}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{study.modality}</Badge>
                    <Badge variant="outline">{study.bodyPart}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{study.date}</span>
                    <span className="font-mono">{study.id}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => openImageView(study)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-24 text-center">
              <FileImage className="h-20 w-20 mx-auto text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Imaging Studies Found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Image View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedImage?.studyType}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              {!showReport ? (
                <div className="relative aspect-[16/10] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedImage.thumbnail || "/placeholder.svg"}
                    alt={selectedImage.studyType}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-6 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-lg mb-4">Radiology Report</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Clinical History:</p>
                      <p className="text-foreground mt-1">
                        Patient presents with chronic pain in the {selectedImage.bodyPart.toLowerCase()} region.
                        Previous conservative treatment with limited improvement.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium text-muted-foreground">Technique:</p>
                      <p className="text-foreground mt-1">
                        {selectedImage.modality} imaging of the {selectedImage.bodyPart.toLowerCase()} was performed
                        using standard protocols.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium text-muted-foreground">Findings:</p>
                      <p className="text-foreground mt-1">
                        {selectedImage.aiFlag === "Abnormal"
                          ? `Abnormal findings consistent with degenerative changes. Moderate to severe structural abnormalities noted in the ${selectedImage.bodyPart.toLowerCase()}.`
                          : selectedImage.aiFlag === "Requires Review"
                            ? `Equivocal findings requiring clinical correlation. Further evaluation recommended to determine clinical significance.`
                            : `No acute abnormalities detected. Normal anatomical structures visualized in the ${selectedImage.bodyPart.toLowerCase()}.`}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium text-muted-foreground">Impression:</p>
                      <p className="text-foreground mt-1">
                        {selectedImage.aiFlag === "Abnormal"
                          ? "Significant pathology identified. Recommend orthopedic consultation for treatment planning."
                          : selectedImage.aiFlag === "Requires Review"
                            ? "Clinical correlation recommended. Follow-up imaging may be warranted."
                            : "Normal study. No acute findings requiring immediate intervention."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Patient</p>
                  <p className="text-base font-semibold text-foreground">{selectedImage.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Study ID</p>
                  <p className="text-base font-mono text-foreground">{selectedImage.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Modality</p>
                  <Badge variant="outline">{selectedImage.modality}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Body Part</p>
                  <Badge variant="outline">{selectedImage.bodyPart}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                  <p className="text-base text-foreground">{selectedImage.date}</p>
                </div>
                {selectedImage.aiFlag && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">AI Analysis</p>
                    <Badge
                      variant="outline"
                      className={`${getAiFlagColor(selectedImage.aiFlag)} flex items-center gap-1 w-fit`}
                    >
                      {getAiFlagIcon(selectedImage.aiFlag)}
                      {selectedImage.aiFlag}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setShowReport(!showReport)}>
                  <FileText className="h-4 w-4 mr-2" />
                  {showReport ? "View Image" : "View Report"}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
