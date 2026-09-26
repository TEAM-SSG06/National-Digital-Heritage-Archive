import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, ZoomIn, ZoomOut, RotateCcw, Copy, Check, ShieldCheck } from "lucide-react"

export function OcrPane() {
  const [zoom, setZoom] = useState(1.0)
  const [copied, setCopied] = useState(false)

  const sampleManuscript = {
    id: "MAN-001",
    title: "Drafting Committee Constitutional Note on Article 32",
    date: "November 4, 1948",
    origin: "Constituent Assembly of India Secretariat",
    image: "/images/ambedkar-delhi-1948.jpg",
    confidence: "98.4%",
    extractedText: `If I was asked to name any particular article in this Constitution as the most important — an article without which this Constitution would be a nullity — I could not refer to any other article except this one.

It is the very soul of the Constitution and the very heart of it and I am glad that the House has realized its importance.

The fundamental rights conferred by Part III cannot be rendered illusory. By providing a constitutional remedy through Writs of Habeas Corpus, Mandamus, Prohibition, Quo Warranto and Certiorari, we ensure that individual liberty is guarded against state high-handedness.`,
    metadata: {
      archivalId: "DAIC-CAD-1948-032",
      preservationStatus: "High-Resolution Archival Scan",
      format: "Original Typewritten Draft with Handwritten Margin Notes",
      dublinCore: "DC.Title: Article 32 Note; DC.Creator: Dr. B. R. Ambedkar; DC.Date: 1948-11-04",
    },
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleManuscript.extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Manuscript Optical Character Recognition (OCR) Inspector
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Dual-view archival inspection comparing high-resolution primary scanned drafts against extracted text.
        </p>
      </div>

      {/* Header Info Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {sampleManuscript.id}
          </Badge>
          <span className="font-serif font-bold text-foreground">
            {sampleManuscript.title}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            • {sampleManuscript.date}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs gap-1 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-3.5" />
            OCR Confidence: {sampleManuscript.confidence}
          </Badge>
          <span className="text-xs font-mono text-muted-foreground">
            ID: {sampleManuscript.metadata.archivalId}
          </span>
        </div>
      </div>

      {/* Dual Column Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Scanned Archival Image */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
              <FileText className="size-4" />
              Scanned Primary Document
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
                title="Zoom Out"
              >
                <ZoomOut className="size-3.5" />
              </Button>
              <span className="font-mono text-xs min-w-8 text-center">{Math.round(zoom * 100)}%</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => setZoom((z) => Math.min(2.0, z + 0.2))}
                title="Zoom In"
              >
                <ZoomIn className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => setZoom(1.0)}
                title="Reset Zoom"
              >
                <RotateCcw className="size-3.5" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30 aspect-4/3 flex items-center justify-center">
            <img
              src={sampleManuscript.image}
              alt={sampleManuscript.title}
              className="size-full object-cover transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          <p className="text-[11px] font-mono text-muted-foreground italic text-center">
            {sampleManuscript.metadata.format}
          </p>
        </div>

        {/* Right Column: Extracted Machine Text */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Extracted Machine Transcript
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs gap-1.5"
            >
              {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
              {copied ? "Copied" : "Copy Text"}
            </Button>
          </div>

          <ScrollArea className="h-[360px] p-4 rounded-xl border border-border bg-background">
            <div className="space-y-4 font-serif text-base text-foreground/90 leading-relaxed">
              {sampleManuscript.extractedText.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 rounded-lg bg-muted/40 border border-border/80 text-[11px] font-mono text-muted-foreground flex flex-col gap-1">
            <span><strong>Dublin Core:</strong> {sampleManuscript.metadata.dublinCore}</span>
            <span><strong>Status:</strong> {sampleManuscript.metadata.preservationStatus}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
