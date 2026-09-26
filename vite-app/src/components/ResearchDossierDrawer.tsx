import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FolderKanban,
  QrCode,
  Trash2,
  X,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Smartphone,
} from "lucide-react"

import { getTranslation } from "@/utils/translations"

export interface DossierItem {
  id: string
  title: string
  category: string
  year: number | string
  source: string
  type: "document" | "speech" | "video" | "debate"
}

interface ResearchDossierDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: DossierItem[]
  onRemoveItem: (id: string) => void
  onClearAll: () => void
  onOpenDocument?: (id: string) => void
  language?: string
}

export function ResearchDossierDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onOpenDocument,
  language = "english",
}: ResearchDossierDrawerProps) {
  const t = getTranslation(language)
  const [showQrModal, setShowQrModal] = useState(false)

  const handleGenerateQr = () => {
    setShowQrModal(true)
  }

  // Museum Kiosk Dossier Accession Code
  const dossierCode = `DAIC-${items.length}ITM-${Math.floor(1000 + Math.random() * 9000)}`

  return (
    <>
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[88vh] bg-background border-border">
          <div className="mx-auto w-full max-w-4xl flex flex-col h-full max-h-[84vh]">
            {/* Header */}
            <DrawerHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FolderKanban className="size-4" />
                  </div>
                  <div>
                    <DrawerTitle className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground text-left">
                      {t.dossierTitle}
                    </DrawerTitle>
                    <DrawerDescription className="text-left text-xs text-muted-foreground">
                      {t.dossierDesc}
                    </DrawerDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearAll}
                      className="text-xs text-muted-foreground hover:text-destructive h-8 px-2.5 gap-1.5"
                    >
                      <Trash2 className="size-3.5" />
                      {t.clearAllBtn}
                    </Button>
                  )}
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="size-8" onClick={onClose}>
                      <X className="size-4" />
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerHeader>

            {/* Content List */}
            <ScrollArea className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="size-16 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground mb-4">
                    <BookOpen className="size-8 stroke-1" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {t.dossierEmptyTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-1.5 leading-relaxed">
                    {t.dossierEmptyDesc}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono px-1">
                    <span>{items.length} {items.length === 1 ? "Item" : "Items"} Compiled</span>
                    <span>Ready for Mobile Export</span>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-[10px] uppercase">
                            {item.id}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            {item.category}
                          </Badge>
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {item.year}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-foreground truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          Source: {item.source}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {onOpenDocument && item.type === "document" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              onClose()
                              onOpenDocument(item.id)
                            }}
                            className="h-8 text-xs gap-1"
                          >
                            <ExternalLink className="size-3" />
                            Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(item.id)}
                          className="size-8 text-muted-foreground hover:text-destructive"
                          title="Remove item"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer / Mobile QR Action */}
            {items.length > 0 && (
              <DrawerFooter className="border-t border-border pt-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-xs font-mono font-medium text-foreground block">
                      Institutional Hand-off
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Transfer full reading citations, transcripts, and audio links to your personal smartphone.
                    </span>
                  </div>

                  <Button
                    onClick={handleGenerateQr}
                    size="lg"
                    className="w-full sm:w-auto font-semibold gap-2 shadow-xs shrink-0"
                  >
                    <QrCode className="size-4" />
                    {t.generateQrBtn}
                  </Button>
                </div>
              </DrawerFooter>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Museum Kiosk Scannable QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl flex flex-col items-center text-center">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Smartphone className="size-6" />
            </div>

            <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider mb-2">
              Kiosk-to-Mobile Handoff
            </Badge>

            <h3 className="font-serif text-2xl font-bold text-foreground">
              {t.qrModalTitle}
            </h3>

            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              {t.qrModalDesc}
            </p>

            {/* High-Fidelity SVG QR Code */}
            <div className="my-5 p-4 rounded-2xl bg-white border border-border shadow-sm flex flex-col items-center">
              <svg
                viewBox="0 0 160 160"
                className="size-48 rounded"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background */}
                <rect width="160" height="160" fill="white" />
                {/* Position Marker Top Left */}
                <rect x="10" y="10" width="40" height="40" rx="4" fill="#0F172A" />
                <rect x="16" y="16" width="28" height="28" rx="2" fill="white" />
                <rect x="22" y="22" width="16" height="16" rx="1" fill="#0F172A" />
                {/* Position Marker Top Right */}
                <rect x="110" y="10" width="40" height="40" rx="4" fill="#0F172A" />
                <rect x="116" y="16" width="28" height="28" rx="2" fill="white" />
                <rect x="122" y="22" width="16" height="16" rx="1" fill="#0F172A" />
                {/* Position Marker Bottom Left */}
                <rect x="10" y="110" width="40" height="40" rx="4" fill="#0F172A" />
                <rect x="16" y="116" width="28" height="28" rx="2" fill="white" />
                <rect x="22" y="122" width="16" height="16" rx="1" fill="#0F172A" />
                {/* Timing Pattern & Data Blocks */}
                <rect x="58" y="22" width="6" height="6" fill="#0F172A" />
                <rect x="70" y="22" width="6" height="6" fill="#0F172A" />
                <rect x="82" y="22" width="6" height="6" fill="#0F172A" />
                <rect x="94" y="22" width="6" height="6" fill="#0F172A" />
                <rect x="58" y="34" width="6" height="6" fill="#0F172A" />
                <rect x="76" y="34" width="12" height="6" fill="#0F172A" />
                <rect x="94" y="34" width="6" height="6" fill="#0F172A" />
                <rect x="22" y="58" width="6" height="6" fill="#0F172A" />
                <rect x="34" y="58" width="12" height="6" fill="#0F172A" />
                <rect x="58" y="58" width="6" height="6" fill="#0F172A" />
                <rect x="70" y="58" width="6" height="6" fill="#0F172A" />
                <rect x="82" y="58" width="12" height="6" fill="#0F172A" />
                <rect x="106" y="58" width="6" height="6" fill="#0F172A" />
                <rect x="124" y="58" width="12" height="6" fill="#0F172A" />
                <rect x="22" y="76" width="12" height="6" fill="#0F172A" />
                <rect x="46" y="76" width="6" height="6" fill="#0F172A" />
                <rect x="58" y="70" width="12" height="12" fill="#0F172A" />
                <rect x="76" y="76" width="12" height="6" fill="#0F172A" />
                <rect x="94" y="70" width="6" height="12" fill="#0F172A" />
                <rect x="112" y="76" width="6" height="6" fill="#0F172A" />
                <rect x="130" y="76" width="12" height="6" fill="#0F172A" />
                <rect x="22" y="94" width="6" height="6" fill="#0F172A" />
                <rect x="40" y="94" width="6" height="6" fill="#0F172A" />
                <rect x="58" y="94" width="12" height="6" fill="#0F172A" />
                <rect x="82" y="94" width="6" height="6" fill="#0F172A" />
                <rect x="94" y="94" width="12" height="6" fill="#0F172A" />
                <rect x="118" y="94" width="6" height="6" fill="#0F172A" />
                <rect x="58" y="112" width="6" height="6" fill="#0F172A" />
                <rect x="70" y="112" width="12" height="6" fill="#0F172A" />
                <rect x="94" y="112" width="6" height="6" fill="#0F172A" />
                <rect x="106" y="112" width="12" height="6" fill="#0F172A" />
                <rect x="130" y="112" width="6" height="6" fill="#0F172A" />
                <rect x="58" y="130" width="12" height="6" fill="#0F172A" />
                <rect x="82" y="130" width="6" height="6" fill="#0F172A" />
                <rect x="100" y="130" width="12" height="6" fill="#0F172A" />
                <rect x="124" y="130" width="12" height="6" fill="#0F172A" />
              </svg>
              <span className="font-mono text-[10px] text-muted-foreground mt-2">
                Accession Pass: {dossierCode}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 mb-4">
              <CheckCircle2 className="size-3.5" />
              <span>{t.qrSyncedText}</span>
            </div>

            <Button
              variant="outline"
              className="w-full text-xs font-medium"
              onClick={() => setShowQrModal(false)}
            >
              {t.qrDoneBtn}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
