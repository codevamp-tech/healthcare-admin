"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export function ImagingStudies() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const imagingStudies = [
    {
      id: 1,
      title: "X-Ray",
      date: "Dec 18, 2024",
      image: "/knee-xray-ortho.jpg",
      description: "Knee X-Ray - AP and lateral views showing knee osteoarthritis",
    },
    {
      id: 2,
      title: "MRI Scan",
      date: "Dec 19, 2024",
      image: "/lumbar-spine-mri-ortho.jpg",
      description: "Lumbar Spine MRI - Cross-sectional imaging",
    },
    {
      id: 3,
      title: "CT Scan",
      date: "Dec 20, 2024",
      image: "/cervical-ct-ortho.jpg",
      description: "Cervical Spine CT - High-resolution imaging",
    },
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Imaging Studies</CardTitle>
          <CardDescription>X-rays, CT scans, MRI, and ultrasound imaging</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {imagingStudies.map((study) => (
              <div key={study.id} className="rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors">
                <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                  <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                </div>
                <p className="font-medium text-foreground">{study.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{study.date}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 bg-transparent"
                  onClick={() => setSelectedImage(study.id)}
                >
                  View Image
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedImage && (
        <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{imagingStudies.find((s) => s.id === selectedImage)?.title}</DialogTitle>
              <DialogDescription>{imagingStudies.find((s) => s.id === selectedImage)?.description}</DialogDescription>
            </DialogHeader>
            <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
              <Image
                src={imagingStudies.find((s) => s.id === selectedImage)?.image || ""}
                alt={imagingStudies.find((s) => s.id === selectedImage)?.title || ""}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
