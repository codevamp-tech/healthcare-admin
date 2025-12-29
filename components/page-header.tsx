"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { mockPatients, mockReports } from "@/lib/data"
import { useRouter } from "next/navigation"
import { FileText, User } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  showSearch?: boolean
}

export function PageHeader({ title, description, showSearch = false }: PageHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const patients = mockPatients
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5)
        .map((p) => ({ type: "patient", data: p }))

      const reports = mockReports
        .filter(
          (r) =>
            r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.type.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5)
        .map((r) => ({ type: "report", data: r }))

      setSearchResults([...patients, ...reports])
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchTerm])

  const handleResultClick = (result: any) => {
    if (result.type === "patient") {
      router.push(`/patients/${result.data.id}`)
    }
    setShowResults(false)
    setSearchTerm("")
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {showSearch && (
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients, diagnoses, reports..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
            />
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-accent cursor-pointer border-b border-border last:border-0"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.type === "patient" ? (
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{result.data.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {result.data.id} • {result.data.diagnosis}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-chart-3" />
                        <div>
                          <p className="font-medium text-foreground">{result.data.name}</p>
                          <p className="text-xs text-muted-foreground">{result.data.type}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
