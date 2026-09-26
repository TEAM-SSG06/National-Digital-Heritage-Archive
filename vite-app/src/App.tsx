import { useState, useRef, useEffect, type ComponentType } from "react"
import { Header, type NavTab } from "@/components/Header"
import { OverviewPane } from "@/components/OverviewPane"
import { TimelineSection, type TimelineMilestone } from "@/components/TimelineSection"
import { SearchPane } from "@/components/SearchPane"
import { KnowledgeGraphPane } from "@/components/KnowledgeGraphPane"
import { AudioVaultPane } from "@/components/AudioVaultPane"
import { AiScholarPane } from "@/components/AiScholarPane"
import { DocumentDrawer, type ArchiveDocument } from "@/components/DocumentDrawer"
import { ResearchDossierDrawer, type DossierItem } from "@/components/ResearchDossierDrawer"
import { KioskScreensaver } from "@/components/KioskScreensaver"
import { ARCHIVE_DATA } from "@/data/archiveData"
import { motion } from "framer-motion"
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Search,
  Clock,
  Network,
  Mic,
  Sparkles,
  Compass,
  Pin,
  PinOff,
} from "lucide-react"
import { getTranslation } from "@/utils/translations"
import { sfx, initGlobalTypingSounds } from "@/utils/soundEffects"

// ─── App‑level section list with Icons & Numbers ─────────────────────────────
const APP_SECTIONS: {
  id: NavTab
  label: string
  num: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { id: "overview",  label: "Overview",       num: "01", icon: BookOpen },
  { id: "search",    label: "Search",         num: "02", icon: Search   },
  { id: "timeline",  label: "Timeline",       num: "03", icon: Clock    },
  { id: "graph",     label: "Knowledge Map",  num: "04", icon: Network  },
  { id: "audio",     label: "Audio & Video",  num: "05", icon: Mic      },
  { id: "scholar",   label: "AI Scholar",     num: "06", icon: Sparkles },
]

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("overview")
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [isKioskActive, setIsKioskActive] = useState<boolean>(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>("english")
  const t = getTranslation(currentLanguage)

  const sectionLabels: Record<NavTab, string> = {
    overview: t.navOverview,
    search: t.navSearch,
    timeline: t.navTimeline,
    graph: t.navGraph,
    audio: t.navAudio,
    scholar: t.navScholar,
  }

  // Visitor Compiled Research Dossier State
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false)
  const [dossierItems, setDossierItems] = useState<DossierItem[]>([
    {
      id: "DOC-002",
      title: "Constituent Assembly Speech on Article 32 (Right to Remedies)",
      category: "Constituent Assembly Debates",
      year: 1948,
      source: "Constituent Assembly of India, New Delhi",
      type: "document",
    },
    {
      id: "AUD-001",
      title: "Constituent Assembly Final Address (Grammar of Anarchy)",
      category: "Audio Speech",
      year: "1949",
      source: "Adoption of the Constitution, New Delhi",
      type: "speech",
    },
  ])

  // Side slider hover & pin states for ubiquitous section switcher
  const [isDockHovered, setIsDockHovered] = useState(false)
  const [isDockPinned, setIsDockPinned] = useState(false)

  const sectionRefs = useRef<Record<NavTab, HTMLElement | null>>({
    overview: null,
    search: null,
    timeline: null,
    graph: null,
    audio: null,
    scholar: null,
  })

  // Initialize global acoustic typing sounds
  useEffect(() => {
    const cleanup = initGlobalTypingSounds()
    return cleanup
  }, [])

  const handleOpenDocument = (docId: string) => {
    sfx.playSwoosh("open")
    setSelectedDocId(docId)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    sfx.playSwoosh("close")
    setIsDrawerOpen(false)
  }

  const selectedDocument: ArchiveDocument | null =
    (ARCHIVE_DATA.documents as ArchiveDocument[]).find((d) => d.id === selectedDocId) || null

  const handleToggleDossierItem = (item: DossierItem) => {
    setDossierItems((prev) => {
      const exists = prev.some((d) => d.id === item.id)
      if (exists) {
        sfx.playNavClick()
        return prev.filter((d) => d.id !== item.id)
      } else {
        sfx.playDossierSuccess()
        return [...prev, item]
      }
    })
  }

  const handleToggleDocDossier = (doc: ArchiveDocument) => {
    handleToggleDossierItem({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      year: doc.year,
      source: doc.source,
      type: "document",
    })
  }

  const isNavigatingRef = useRef(false)
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Navigate to a section by scrolling the section's ref into view
  const navigateTo = (tab: NavTab) => {
    sfx.playNavClick()
    setActiveTab(tab)
    isNavigatingRef.current = true
    if (navTimerRef.current) clearTimeout(navTimerRef.current)

    const el = sectionRefs.current[tab]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    navTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false
    }, 1000)
  }

  // Robust scroll listener to keep activeTab in sync with the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return

      // Use a point in the upper-middle of viewport as reference
      const viewportAnchor = window.scrollY + window.innerHeight * 0.35

      for (let i = 0; i < APP_SECTIONS.length; i++) {
        const { id } = APP_SECTIONS[i]
        const el = sectionRefs.current[id]
        if (el) {
          const top = el.offsetTop - 120
          const bottom = top + el.offsetHeight
          if (viewportAnchor >= top && viewportAnchor < bottom) {
            setActiveTab(id)
            return
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Run once on mount in case already scrolled
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (navTimerRef.current) clearTimeout(navTimerRef.current)
    }
  }, [])

  const activeIndex = APP_SECTIONS.findIndex((s) => s.id === activeTab)
  const dossierIds = dossierItems.map((d) => d.id)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={navigateTo}
        currentLanguage={currentLanguage}
        onChangeLanguage={setCurrentLanguage}
        onTriggerKioskMode={() => setIsKioskActive(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        dossierCount={dossierItems.length}
      />

      {/* ── Always-Accessible Section Switcher (Hover to Slide Out, Click to Pin) ── */}
      <aside
        onMouseEnter={() => setIsDockHovered(true)}
        onMouseLeave={() => setIsDockHovered(false)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none flex items-center"
        aria-label="Section navigation slider"
      >
        {/* Protruding Tactile Tab Handle (Always visible on left edge when not pinned/hovered) */}
        {!(isDockHovered || isDockPinned) && (
          <div
            onClick={() => {
              sfx.playNavClick()
              setIsDockPinned(true)
            }}
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-r-2xl border-2 border-l-0 border-primary/40 bg-white/95 shadow-2xl backdrop-blur-md cursor-pointer hover:bg-primary/10 hover:border-primary transition-all group ring-2 ring-primary/10"
            title="Hover or click to open museum section switcher"
          >
            <Compass className="size-4 text-primary animate-spin" style={{ animationDuration: "12s" }} />
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary/90"
              style={{ writingMode: "vertical-rl" }}
            >
              {t.sectionsTabLabel}
            </span>
            <span className="size-5 rounded-full bg-primary text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-xs">
              0{activeIndex + 1}
            </span>
            <ChevronRight className="size-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}

        {/* Full Expanded Floating Dock */}
        {(isDockHovered || isDockPinned) && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 8 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border-2 border-primary/40 bg-white/98 shadow-2xl backdrop-blur-md ring-4 ring-primary/15"
          >
            {/* Header: Title and Pin Toggle */}
            <div className="flex items-center justify-between w-full px-1.5 py-1 mb-0.5 border-b border-border/80">
              <div className="flex items-center gap-1 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
                <Compass className="size-3.5 text-primary animate-spin" style={{ animationDuration: "12s" }} />
                <span>{t.sectionsTabLabel}</span>
              </div>
              <button
                onClick={() => {
                  sfx.playNavClick()
                  setIsDockPinned(!isDockPinned)
                }}
                className={`p-1 rounded-md transition-colors ${
                  isDockPinned
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                title={isDockPinned ? "Unpin dock (auto-collapse)" : "Pin dock open permanently"}
              >
                {isDockPinned ? <PinOff className="size-3" /> : <Pin className="size-3" />}
              </button>
            </div>

            {/* Up Button */}
            <button
              disabled={activeIndex <= 0}
              onClick={() => navigateTo(APP_SECTIONS[activeIndex - 1].id)}
              className="flex size-7 items-center justify-center rounded-lg bg-muted/60 text-foreground hover:bg-primary hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xs"
              title="Previous Section"
            >
              <ChevronUp className="size-3.5" />
            </button>

            {/* Section Item Nodes */}
            <div className="flex flex-col items-center gap-1.5 py-1">
              {APP_SECTIONS.map((section) => {
                const isActive = activeTab === section.id
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      navigateTo(section.id)
                      if (!isDockPinned) setIsDockHovered(false)
                    }}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all w-40 text-left ${
                      isActive
                        ? "bg-primary text-primary-foreground font-bold shadow-md ring-2 ring-primary/30"
                        : "bg-muted/70 text-muted-foreground hover:bg-primary/15 hover:text-primary"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="font-mono text-[10px] opacity-75">{section.num}</span>
                    <span className="text-xs font-semibold truncate flex-1">{sectionLabels[section.id]}</span>
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-emerald-300 shrink-0 animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Down Button */}
            <button
              disabled={activeIndex >= APP_SECTIONS.length - 1}
              onClick={() => navigateTo(APP_SECTIONS[activeIndex + 1].id)}
              className="flex size-7 items-center justify-center rounded-lg bg-muted/60 text-foreground hover:bg-primary hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xs"
              title="Next Section"
            >
              <ChevronDown className="size-3.5" />
            </button>

            {/* Step Counter Badge */}
            <div className="font-mono text-[10px] font-bold text-muted-foreground pt-1 border-t border-border/80 w-full text-center">
              0{activeIndex + 1} / 0{APP_SECTIONS.length}
            </div>
          </motion.div>
        )}
      </aside>

      {/* ── Main content – full-page sections with architectural museum pavilions ── */}
      <main className="flex-1 w-full flex flex-col">
        {APP_SECTIONS.map(({ id, num }, idx) => {
          const sectionThemes: Record<NavTab, { bg: string; border: string }> = {
            overview: {
              bg: "bg-white",
              border: "",
            },
            search: {
              bg: "bg-slate-50/80",
              border: "border-t-4 border-slate-300/80 shadow-inner",
            },
            timeline: {
              bg: "bg-amber-50/20",
              border: "border-t-4 border-amber-400/50 shadow-xs",
            },
            graph: {
              bg: "bg-slate-50/70",
              border: "border-t-4 border-emerald-400/50 shadow-xs",
            },
            audio: {
              bg: "bg-zinc-50",
              border: "border-t-4 border-purple-400/50 shadow-xs",
            },
            scholar: {
              bg: "bg-gradient-to-b from-primary/5 via-background to-primary/10",
              border: "border-t-4 border-primary/40 shadow-xs",
            },
          }

          const theme = sectionThemes[id]

          return (
            <div key={id} className={`w-full ${theme.bg} ${theme.border} transition-colors`}>
              {/* Grand Architectural Exhibition Hall Separator */}
              {idx > 0 && (
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-border/90" />
                    </div>
                    <div className="relative flex items-center gap-3 px-6 py-2 rounded-full border-2 border-primary/30 bg-background shadow-md">
                      <span className="size-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                        {t.exhibitHallLabel} {num} · {sectionLabels[id]}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground border-l border-border pl-2">
                        {t.pavilionLabel} 0{idx + 1} / 0{APP_SECTIONS.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <section
                id={`section-${id}`}
                ref={(el) => {
                  sectionRefs.current[id] = el
                }}
                className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col"
              >
                {/* Pavilion Breadcrumb Header */}
                <div className="flex items-center justify-between border-b border-border/70 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-mono text-[11px] font-bold">
                      {num}
                    </div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {sectionLabels[id]} {t.pavilionLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                    <span>
                      {t.hallOfLabel.replace("{current}", String(idx + 1)).replace("{total}", String(APP_SECTIONS.length))}
                    </span>
                    {idx > 0 && (
                      <button
                        onClick={() => navigateTo(APP_SECTIONS[idx - 1].id)}
                        className="ml-2 px-2 py-0.5 rounded hover:bg-muted text-foreground transition-colors flex items-center gap-0.5"
                        title="Go to Previous Section"
                      >
                        <ChevronUp className="size-3" />
                        <span>{t.prevBtn}</span>
                      </button>
                    )}
                    {idx < APP_SECTIONS.length - 1 && (
                      <button
                        onClick={() => navigateTo(APP_SECTIONS[idx + 1].id)}
                        className="px-2 py-0.5 rounded hover:bg-muted text-foreground transition-colors flex items-center gap-0.5"
                        title="Go to Next Section"
                      >
                        <span>{t.nextBtn}</span>
                        <ChevronDown className="size-3" />
                      </button>
                    )}
                  </div>
                </div>

                {id === "overview" && (
                  <OverviewPane
                    onNavigate={navigateTo}
                    onOpenDocument={handleOpenDocument}
                    currentLanguage={currentLanguage}
                    onToggleDossierItem={handleToggleDossierItem}
                    dossierIds={dossierIds}
                  />
                )}
                {id === "search" && (
                  <SearchPane
                    documents={ARCHIVE_DATA.documents as ArchiveDocument[]}
                    onOpenDocument={handleOpenDocument}
                    currentLanguage={currentLanguage}
                  />
                )}
                {id === "timeline" && (
                  <TimelineSection
                    milestones={ARCHIVE_DATA.timeline as TimelineMilestone[]}
                    onOpenDocument={handleOpenDocument}
                    currentLanguage={currentLanguage}
                    isActiveSection={activeTab === "timeline"}
                  />
                )}
                {id === "graph" && (
                  <KnowledgeGraphPane
                    onOpenDocument={handleOpenDocument}
                    currentLanguage={currentLanguage}
                  />
                )}
                {id === "audio" && (
                  <AudioVaultPane
                    onToggleDossierItem={handleToggleDossierItem}
                    dossierIds={dossierIds}
                    currentLanguage={currentLanguage}
                  />
                )}
                {id === "scholar" && (
                  <AiScholarPane currentLanguage={currentLanguage} />
                )}
              </section>
            </div>
          )
        })}
      </main>

      {/* Document Drawer */}
      <DocumentDrawer
        document={selectedDocument}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        currentLanguage={currentLanguage}
        onChangeLanguage={setCurrentLanguage}
        isInDossier={selectedDocument ? dossierIds.includes(selectedDocument.id) : false}
        onToggleDossier={handleToggleDocDossier}
      />

      {/* Research Dossier Drawer & QR Handoff */}
      <ResearchDossierDrawer
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        items={dossierItems}
        onRemoveItem={(id) => setDossierItems((prev) => prev.filter((d) => d.id !== id))}
        onClearAll={() => setDossierItems([])}
        onOpenDocument={handleOpenDocument}
        language={currentLanguage}
      />

      {/* Kiosk Screensaver */}
      <KioskScreensaver
        manualTrigger={isKioskActive}
        onDismissManual={() => {
          setIsKioskActive(false)
          navigateTo("overview")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-2">
          <p className="font-medium text-foreground">
            {t.footerText}
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Typography: Plus Jakarta Sans · Newsreader Optical Serif · JetBrains Mono · Powered by React 19 &amp; shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
