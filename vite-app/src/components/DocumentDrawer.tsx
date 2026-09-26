import { useState, useMemo } from "react"
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
import { Separator } from "@/components/ui/separator"
import {
  X,
  Volume2,
  VolumeX,
  Globe,
  FileCheck,
  Sparkles,
  BookOpen,
  Database,
  BookmarkPlus,
  Check,
  ShieldCheck,
  Copy,
  CheckCheck,
  Maximize2,
  Minimize2,
  Search,
  ChevronLeft,
  ChevronRight,
  BookMarked,
} from "lucide-react"
import { COMPLETE_ARCHIVAL_DOCUMENTS } from "@/data/fullDocumentTexts"
import { speakText, stopSpeech } from "@/utils/speech"
import { sfx } from "@/utils/soundEffects"

export interface ArchiveDocument {
  id: string
  title: string
  year: number
  category: string
  volume: string
  source: string
  pages: number
  language: string
  image: string
  imageCaption: string
  summary: string
  fullText: string
  translations?: Record<string, string>
  tags: string[]
}

interface DocumentDrawerProps {
  document: ArchiveDocument | null
  isOpen: boolean
  onClose: () => void
  currentLanguage: string
  onChangeLanguage: (lang: string) => void
  isInDossier?: boolean
  onToggleDossier?: (doc: ArchiveDocument) => void
}

type DrawerTab = "text" | "summary" | "metadata"

export function DocumentDrawer({
  document,
  isOpen,
  onClose,
  currentLanguage,
  onChangeLanguage,
  isInDossier = false,
  onToggleDossier,
}: DocumentDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>("text")
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base")
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif")
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number | "all">("all")
  const [searchFilter, setSearchFilter] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [isNarrating, setIsNarrating] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!document) return null

  // Fetch complete unabridged multi-section manuscript if available
  const completeDoc = COMPLETE_ARCHIVAL_DOCUMENTS[document.id] || null

  const translatedSnippet =
    currentLanguage !== "english" && document.translations && document.translations[currentLanguage]
      ? document.translations[currentLanguage]
      : null

  // Active section resolution
  const activeSections = useMemo(() => {
    if (!completeDoc) return []
    if (selectedSectionIdx === "all") return completeDoc.sections
    return [completeDoc.sections[selectedSectionIdx as number]].filter(Boolean)
  }, [completeDoc, selectedSectionIdx])

  // Filtered by search keyword
  const displayedSections = useMemo(() => {
    if (!searchFilter.trim()) return activeSections
    const q = searchFilter.toLowerCase()
    return activeSections.filter((sec) => {
      const matchEn = sec.title.toLowerCase().includes(q) || sec.content.toLowerCase().includes(q)
      const matchHi = (sec.titleHi && sec.titleHi.includes(q)) || (sec.contentHi && sec.contentHi.includes(q))
      return matchEn || matchHi
    })
  }, [activeSections, searchFilter])

  // Audio narration handler
  const handleToggleNarrate = () => {
    sfx.playNavClick()
    if (isNarrating) {
      stopSpeech()
      setIsNarrating(false)
    } else {
      setIsNarrating(true)
      let textToRead = ""
      if (completeDoc && activeSections.length > 0) {
        const sec = activeSections[0]
        textToRead = currentLanguage === "hindi" ? (sec.contentHi || sec.content) : sec.content
      } else {
        textToRead = translatedSnippet || document.summary
      }

      speakText(
        textToRead,
        currentLanguage,
        () => setIsNarrating(false),
        0.92
      )
    }
  }

  // Copy to clipboard
  const handleCopyText = () => {
    sfx.playNavClick()
    let fullContent = ""
    if (completeDoc) {
      fullContent = completeDoc.sections
        .map((s) => {
          const t = currentLanguage === "hindi" ? s.titleHi : s.title
          const c = currentLanguage === "hindi" ? s.contentHi : s.content
          return `${s.number}: ${t}\n\n${c}`
        })
        .join("\n\n---\n\n")
    } else {
      fullContent = document.fullText
    }

    navigator.clipboard.writeText(fullContent)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2500)
  }

  // Font size CSS class mapping
  const fontSizeClass = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed sm:text-[17px] sm:leading-8",
    lg: "text-lg leading-loose sm:text-xl sm:leading-9",
    xl: "text-xl leading-loose sm:text-2xl sm:leading-10",
  }[fontSize]

  const fontFamilyClass = fontFamily === "serif" ? "font-serif" : "font-sans"

  // Pre-computed AI Key Insights based on the document
  const aiKeyTakeaways = [
    {
      title: "Core Constitutional & Social Thesis",
      content:
        document.id === "DOC-001"
          ? "Argues that political democracy is unsustainable without social democracy. Denounces caste-based segregation as lethal to public conscience."
          : document.id === "DOC-002"
          ? "Positions Article 32 as non-negotiable. Without judicial writs directly accessible to citizens, Fundamental Rights become dead letters."
          : document.id === "DOC-003"
          ? "Advocated a gold bullion standard with controlled paper currency to eliminate exchange volatility, laying the structural blueprint for the RBI."
          : "Emphasizes that civil liberties and natural rights take precedence over majoritarian consensus and traditional orthodoxy.",
    },
    {
      title: "Impact on Contemporary India",
      content:
        document.id === "DOC-001"
          ? "Informed affirmative action jurisprudence and anti-discrimination legislation in independent India."
          : document.id === "DOC-002"
          ? "Remains the most invoked constitutional provision in the Supreme Court of India for protecting individual liberties."
          : document.id === "DOC-003"
          ? "Formed the bedrock of central banking statutory legislation (Reserve Bank of India Act, 1934)."
          : "Catalyzed grassroots civil rights assertion and public resource access across Indian states.",
    },
    {
      title: "Quotable Maxim",
      content:
        document.id === "DOC-001"
          ? "“Democracy is not merely a form of Government. It is primarily a mode of associated living, of conjoint communicated experience.”"
          : document.id === "DOC-002"
          ? "“It is the very soul of the Constitution and the very heart of it.”"
          : document.id === "DOC-003"
          ? "“Sound monetary policy is the bedrock of national prosperity.”"
          : "“Life should be great rather than long.”",
    },
  ]

  // Dublin Core & National Archives Metadata
  const metadataRows = [
    { label: "DC.Identifier", value: `DAIC-ARC-${document.id}-IND` },
    { label: "DC.Title", value: document.title },
    { label: "DC.Creator", value: "Dr. Bhimrao Ramji Ambedkar, M.A., Ph.D., D.Sc., Barrister-at-Law" },
    { label: "DC.Date", value: `${document.year}-CE` },
    { label: "DC.Type", value: "Primary Text / Constitutional Record / Complete Treatise" },
    { label: "DC.Format", value: "Text/Monograph (Digitized PDF/A-1b Standard & Semantic XML)" },
    { label: "Preservation Tier", value: "Level 4 (Air-gapped Master Cold Storage & Cloud Mirrored)" },
    { label: "Accession Repository", value: "DAIC Central Vault & National Archives of India (NAI)" },
    { label: "SHA-256 Checksum", value: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { label: "Licensing Status", value: "Public Domain / National Heritage Open Educational Asset" },
  ]

  const displayTitle =
    currentLanguage === "hindi" && completeDoc
      ? completeDoc.titleHi
      : document.title

  const displaySource =
    currentLanguage === "hindi" && completeDoc
      ? completeDoc.sourceHi
      : document.source

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent
        className={`bg-background border-border transition-all duration-300 ${
          isFullscreen ? "h-[98vh] max-h-[98vh]" : "max-h-[94vh]"
        }`}
      >
        <div
          className={`mx-auto w-full flex flex-col h-full transition-all duration-300 ${
            isFullscreen ? "max-w-6xl max-h-[94vh]" : "max-w-4xl max-h-[90vh]"
          }`}
        >
          {/* Header */}
          <DrawerHeader className="border-b border-border pb-3 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="font-mono text-[11px] uppercase">
                  {document.id}
                </Badge>
                <Badge variant="secondary" className="text-[11px]">
                  {document.category}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {currentLanguage === "hindi" ? "वर्ष" : "Year"}: {document.year} • {document.volume}
                </span>
                {completeDoc && (
                  <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/30 bg-primary/5">
                    {currentLanguage === "hindi"
                      ? `संपूर्ण मूल पाठ • ${completeDoc.totalWordCount.toLocaleString()} शब्द`
                      : `Complete Unabridged Text • ${completeDoc.totalWordCount.toLocaleString()} words`}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Fullscreen Reader Mode Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    sfx.playNavClick()
                    setIsFullscreen((prev) => !prev)
                  }}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Reader Mode"}
                >
                  {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                </Button>

                {onToggleDossier && (
                  <Button
                    variant={isInDossier ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      sfx.playDossierSuccess()
                      onToggleDossier(document)
                    }}
                    className="h-8 text-xs font-semibold gap-1.5 shadow-2xs"
                  >
                    {isInDossier ? (
                      <>
                        <Check className="size-3.5" />
                        <span>{currentLanguage === "hindi" ? "संकलन में शामिल" : "In Dossier"}</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="size-3.5 text-primary" />
                        <span>{currentLanguage === "hindi" ? "संग्रह में जोड़ें" : "Add to Dossier"}</span>
                      </>
                    )}
                  </Button>
                )}

                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => {
                      sfx.playSwoosh("close")
                      stopSpeech()
                      onClose()
                    }}
                  >
                    <X className="size-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DrawerClose>
              </div>
            </div>

            <DrawerTitle className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-2 text-left">
              {displayTitle}
            </DrawerTitle>
            <DrawerDescription className="text-left text-xs sm:text-sm text-muted-foreground mt-0.5">
              {currentLanguage === "hindi" ? "स्रोत" : "Source"}: {displaySource} ({document.pages} {currentLanguage === "hindi" ? "पृष्ठ" : "Pages"})
            </DrawerDescription>

            {/* Navigation Tabs inside Drawer */}
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/60">
              <button
                onClick={() => {
                  sfx.playNavClick()
                  setActiveTab("text")
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "text"
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <BookOpen className="size-3.5" />
                <span>{currentLanguage === "hindi" ? "संपूर्ण मूल पांडुलिपि पाठ" : "Complete Manuscript Text"}</span>
              </button>

              <button
                onClick={() => {
                  sfx.playNavClick()
                  setActiveTab("summary")
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "summary"
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Sparkles className="size-3.5" />
                <span>{currentLanguage === "hindi" ? "एआई शोध सारांश (६० सेकंड)" : "AI Key Summary (60s TL;DR)"}</span>
              </button>

              <button
                onClick={() => {
                  sfx.playNavClick()
                  setActiveTab("metadata")
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "metadata"
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Database className="size-3.5" />
                <span>{currentLanguage === "hindi" ? "अभिलेखीय मेटाडेटा व संरक्षण" : "Archival Metadata & Preservation"}</span>
              </button>
            </div>
          </DrawerHeader>

          {/* Scrollable Content Body */}
          <ScrollArea className="flex-1 overflow-y-auto px-6 py-4">
            {/* TAB 1: Complete Manuscript & Reader */}
            {activeTab === "text" && (
              <div className="flex flex-col gap-6">
                {/* Exhibit Photo & Historical Context Banner */}
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-muted/40 p-4 rounded-2xl border border-border">
                  <img
                    src={document.image}
                    alt={document.title}
                    className="size-32 rounded-xl object-cover border border-border shadow-xs shrink-0"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                      {currentLanguage === "hindi" ? "राष्ट्रीय अभिलेखागार संरक्षित प्रति" : "National Archival Preservation Copy"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 italic leading-relaxed">
                      {document.imageCaption}
                    </p>
                    {completeDoc && (
                      <p className="text-xs text-foreground/80 mt-2 leading-relaxed bg-background/80 p-2.5 rounded-lg border border-border/60">
                        <strong>{currentLanguage === "hindi" ? "ऐतिहासिक पृष्ठभूमि:" : "Historical Context:"}</strong>{" "}
                        {currentLanguage === "hindi" ? completeDoc.historicalContextHi : completeDoc.historicalContext}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Button
                        variant={isNarrating ? "default" : "outline"}
                        size="sm"
                        onClick={handleToggleNarrate}
                        className="h-8 text-xs gap-1.5"
                      >
                        {isNarrating ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                        <span>
                          {isNarrating
                            ? (currentLanguage === "hindi" ? "वाचन रोकें" : "Stop Narration")
                            : (currentLanguage === "hindi" ? "भाषण/ग्रंथ का वाचन सुनें" : "Listen Narration")}
                        </span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyText}
                        className="h-8 text-xs gap-1.5"
                      >
                        {isCopied ? <CheckCheck className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                        <span>
                          {isCopied
                            ? (currentLanguage === "hindi" ? "कॉपी हो गया!" : "Copied!")
                            : (currentLanguage === "hindi" ? "संपूर्ण पाठ कॉपी करें" : "Copy Full Text")}
                        </span>
                      </Button>

                      <Badge variant="outline" className="text-[10px] font-mono gap-1 text-emerald-600">
                        <FileCheck className="size-3" />
                        {currentLanguage === "hindi" ? "प्रमाणित प्राथमिक स्रोत" : "Verified Primary Source"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* ADVANCED READING TOOLBAR */}
                <div className="p-3.5 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
                  {/* Language switch */}
                  <div className="flex items-center gap-1.5">
                    <Globe className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-xs font-medium text-foreground mr-1">
                      {currentLanguage === "hindi" ? "भाषा:" : "Language:"}
                    </span>
                    {(["english", "hindi", "marathi", "tamil"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          sfx.playNavClick()
                          onChangeLanguage(lang)
                        }}
                        className={`px-2.5 py-1 text-xs rounded-md capitalize font-medium transition-colors ${
                          currentLanguage === lang
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {lang === "hindi" ? "हिन्दी" : lang === "marathi" ? "मराठी" : lang === "tamil" ? "தமிழ்" : "English"}
                      </button>
                    ))}
                  </div>

                  {/* Typography & Reading Controls */}
                  <div className="flex items-center gap-2 justify-end">
                    {/* Font Family switch */}
                    <div className="flex items-center border border-border rounded-lg overflow-hidden text-xs">
                      <button
                        onClick={() => {
                          sfx.playNavClick()
                          setFontFamily("serif")
                        }}
                        className={`px-2.5 py-1 transition-colors font-serif ${
                          fontFamily === "serif" ? "bg-muted font-bold text-foreground" : "text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        Serif
                      </button>
                      <button
                        onClick={() => {
                          sfx.playNavClick()
                          setFontFamily("sans")
                        }}
                        className={`px-2.5 py-1 transition-colors font-sans ${
                          fontFamily === "sans" ? "bg-muted font-bold text-foreground" : "text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        Sans
                      </button>
                    </div>

                    {/* Font size buttons */}
                    <div className="flex items-center border border-border rounded-lg overflow-hidden text-xs">
                      <button
                        onClick={() => {
                          sfx.playNavClick()
                          setFontSize("sm")
                        }}
                        className={`px-2 py-1 ${fontSize === "sm" ? "bg-muted font-bold" : "text-muted-foreground"}`}
                        title="Small font"
                      >
                        A-
                      </button>
                      <button
                        onClick={() => {
                          sfx.playNavClick()
                          setFontSize("base")
                        }}
                        className={`px-2 py-1 ${fontSize === "base" ? "bg-muted font-bold" : "text-muted-foreground"}`}
                        title="Medium font"
                      >
                        A
                      </button>
                      <button
                        onClick={() => {
                          sfx.playNavClick()
                          setFontSize("lg")
                        }}
                        className={`px-2 py-1 ${fontSize === "lg" ? "bg-muted font-bold" : "text-muted-foreground"}`}
                        title="Large font"
                      >
                        A+
                      </button>
                      <button
                        onClick={() => {
                          sfx.playNavClick()
                          setFontSize("xl")
                        }}
                        className={`px-2 py-1 ${fontSize === "xl" ? "bg-muted font-bold" : "text-muted-foreground"}`}
                        title="Extra Large font"
                      >
                        A++
                      </button>
                    </div>
                  </div>
                </div>

                {/* MULTI-SECTION / CHAPTER JUMPER (if complete document) */}
                {completeDoc && completeDoc.sections.length > 1 && (
                  <div className="flex flex-col gap-2 bg-muted/20 p-3 rounded-2xl border border-border/80">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                        <BookMarked className="size-3.5 text-primary" />
                        {currentLanguage === "hindi" ? "अध्याय / अनुभाग चयन:" : "Sections & Chapters:"}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {completeDoc.sections.length} {currentLanguage === "hindi" ? "अनुभाग उपलब्ध" : "Sections available"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => {
                          sfx.playNavClick()
                          setSelectedSectionIdx("all")
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                          selectedSectionIdx === "all"
                            ? "bg-primary text-primary-foreground font-bold shadow-xs"
                            : "bg-muted/80 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {currentLanguage === "hindi" ? "📖 संपूर्ण ग्रंथ पढ़ें (सभी अनुभाग)" : "📖 Read Complete Text (All Sections)"}
                      </button>

                      {completeDoc.sections.map((sec, idx) => (
                        <button
                          key={sec.id}
                          onClick={() => {
                            sfx.playNavClick()
                            setSelectedSectionIdx(idx)
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                            selectedSectionIdx === idx
                              ? "bg-primary text-primary-foreground font-bold shadow-xs"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {sec.number}
                        </button>
                      ))}
                    </div>

                    {/* In-document keyword search */}
                    <div className="relative mt-1">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={currentLanguage === "hindi" ? "इस दस्तावेज के भीतर शब्द खोजें..." : "Search keyword in this manuscript..."}
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}

                {/* PRIMARY TEXT DISPLAY AREA */}
                <div className="flex flex-col gap-6">
                  {completeDoc ? (
                    displayedSections.map((sec) => {
                      const secTitle = currentLanguage === "hindi" ? sec.titleHi : sec.title
                      const secContent = currentLanguage === "hindi" ? (sec.contentHi || sec.content) : sec.content

                      return (
                        <article
                          key={sec.id}
                          className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-col gap-4"
                        >
                          <div className="border-b border-border/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                                {sec.number}
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                                {secTitle}
                              </h3>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                sfx.playNavClick()
                                speakText(secContent, currentLanguage, undefined, 0.92)
                              }}
                              className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground self-start sm:self-auto shrink-0"
                            >
                              <Volume2 className="size-3" />
                              <span>{currentLanguage === "hindi" ? "यह अनुभाग सुनें" : "Read Section"}</span>
                            </Button>
                          </div>

                          <div
                            className={`${fontFamilyClass} ${fontSizeClass} text-foreground/90 space-y-4 text-justify leading-relaxed`}
                          >
                            {secContent.split("\n\n").map((paragraph, pIdx) => (
                              <p key={pIdx}>{paragraph}</p>
                            ))}
                          </div>
                        </article>
                      )
                    })
                  ) : (
                    /* Fallback to single fullText */
                    <article className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-col gap-4">
                      <div
                        className={`${fontFamilyClass} ${fontSizeClass} text-foreground/90 space-y-4 leading-relaxed`}
                      >
                        {document.fullText.split("\n\n").map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </article>
                  )}

                  {/* Single section navigation controls */}
                  {completeDoc && selectedSectionIdx !== "all" && (
                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedSectionIdx === 0}
                        onClick={() => {
                          sfx.playNavClick()
                          setSelectedSectionIdx((prev) => (prev === "all" ? 0 : Math.max(0, prev - 1)))
                        }}
                        className="text-xs gap-1.5"
                      >
                        <ChevronLeft className="size-3.5" />
                        <span>{currentLanguage === "hindi" ? "पिछला अनुभाग" : "Previous Section"}</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          sfx.playNavClick()
                          setSelectedSectionIdx("all")
                        }}
                        className="text-xs"
                      >
                        {currentLanguage === "hindi" ? "सभी अनुभाग देखें" : "View All Sections"}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={selectedSectionIdx === completeDoc.sections.length - 1}
                        onClick={() => {
                          sfx.playNavClick()
                          setSelectedSectionIdx((prev) =>
                            prev === "all" ? 0 : Math.min(completeDoc.sections.length - 1, prev + 1)
                          )
                        }}
                        className="text-xs gap-1.5"
                      >
                        <span>{currentLanguage === "hindi" ? "अगला अनुभाग" : "Next Section"}</span>
                        <ChevronRight className="size-3.5" />
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Archival Metadata Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-muted-foreground font-mono mr-1">
                    {currentLanguage === "hindi" ? "टैग:" : "Tags:"}
                  </span>
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: AI Key Summary & Insights */}
            {activeTab === "summary" && (
              <div className="flex flex-col gap-5 py-2">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                  <Sparkles className="size-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {currentLanguage === "hindi"
                        ? "एआई अभिलेखीय विश्लेषण • ६० सेकंड का सार संक्षेप"
                        : "AI Archival Synthesis • 60-Second Visitor Breakdown"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {currentLanguage === "hindi"
                        ? "संग्रहालय आगंतुकों एवं शोधार्थियों हेतु प्राथमिक पांडुलिपि से तैयार किया गया सार।"
                        : "Synthesized from primary manuscripts for fast comprehension by museum visitors and students."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {aiKeyTakeaways.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border bg-card shadow-2xs hover:border-primary/30 transition-colors"
                    >
                      <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
                        {currentLanguage === "hindi" ? `बिंदु ०${idx + 1}` : `Point 0${idx + 1}`} • {item.title}
                      </span>
                      <p className="mt-2 text-sm text-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-border bg-muted/30">
                  <h5 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    {currentLanguage === "hindi" ? "संवैधानिक चेतना संदर्भ" : "Constitutional Awareness Check"}
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {currentLanguage === "hindi"
                      ? "यह दस्तावेज़ DAIC केंद्रीय अभिलेखागार में स्तर-१ मूलभूत साहित्य के अंतर्गत वर्गीकृत है। यह समता, संघवाद और मानवाधिकारों पर भारत के सर्वोच्च न्यायालय के ४५ से अधिक ऐतिहासिक निर्णयों में उद्धृत किया गया है।"
                      : "This document is categorized under Tier-1 Fundamental Literature in the DAIC archive. It has been cited in over 45 Supreme Court of India landmark judgments on equality, federalism, and human rights."}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Metadata & Preservation */}
            {activeTab === "metadata" && (
              <div className="flex flex-col gap-5 py-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                  <span>
                    Digitally Preserved under ISO 14721 (Open Archival Information System - OAIS) standard.
                  </span>
                </div>

                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="bg-muted/60 px-4 py-2.5 border-b border-border font-mono text-xs font-semibold text-foreground">
                    Dublin Core (DC) Metadata & Conservation Tagging
                  </div>
                  <div className="divide-y divide-border">
                    {metadataRows.map((row, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center px-4 py-2.5 text-xs gap-1 sm:gap-4">
                        <span className="font-mono text-muted-foreground w-40 shrink-0 font-medium">
                          {row.label}
                        </span>
                        <span className="font-mono text-foreground break-all">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <DrawerFooter className="border-t border-border pt-3 shrink-0">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-mono text-muted-foreground">
                Dublin Core: DC.Identifier:{document.id} • {currentLanguage === "hindi" ? "सत्यापित डिजिटल अभिलेख" : "Verified Digital Asset"}
              </span>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    sfx.playSwoosh("close")
                    stopSpeech()
                    onClose()
                  }}
                >
                  {currentLanguage === "hindi" ? "बंद करें" : "Dismiss"}
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
