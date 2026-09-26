import { useState, useRef, useEffect, Fragment, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  BookOpen,
  Search,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Layers,
  List,
  Columns,
} from "lucide-react"
import { SideScrollIndicator } from "./SideScrollIndicator"
import { getLocalizedMilestone } from "@/data/timelineTranslations"
import { getTranslation } from "@/utils/translations"
import { speakText, stopSpeech } from "@/utils/speech"
import { sfx } from "@/utils/soundEffects"

export interface TimelineMilestone {
  id: string
  year: number
  date: string
  title: string
  location: string
  era: string
  eraLabel: string
  category: string
  decade: string
  image: string
  description: string
  quote?: string
  impact?: string
  relatedDocId?: string
  relatedType?: "document" | "audio"
  badge?: string
}

interface TimelineSectionProps {
  milestones: TimelineMilestone[]
  onOpenDocument: (docId: string) => void
  currentLanguage?: string
  isActiveSection?: boolean
}

export function TimelineSection({
  milestones,
  onOpenDocument,
  currentLanguage = "english",
  isActiveSection = true,
}: TimelineSectionProps) {
  const t = getTranslation(currentLanguage)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeEra, setActiveEra] = useState("all")
  const [selectedDecade, setSelectedDecade] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [layoutMode, setLayoutMode] = useState<"timelinejs" | "stream" | "chronicle">("timelinejs")
  const [zoomLevel, setZoomLevel] = useState(0.8)
  const [isAudioTourActive, setIsAudioTourActive] = useState(false)

  const tapeViewportRef = useRef<HTMLDivElement>(null)

  // Reset state when leaving timeline section
  useEffect(() => {
    if (!isActiveSection) {
      setCurrentIndex(0)
      setActiveEra("all")
      setSelectedDecade("all")
      setSearchQuery("")
    }
  }, [isActiveSection])

  // Era definition mapping with full localization
  const eras = [
    { key: "all", label: t.eraAll },
    { key: "early-life", label: t.eraEarly, start: 1891, end: 1912, bg: "bg-slate-600" },
    { key: "education", label: t.eraEducation, start: 1913, end: 1923, bg: "bg-sky-600" },
    { key: "civil-rights", label: t.eraCivil, start: 1924, end: 1936, bg: "bg-emerald-600" },
    { key: "labour-governance", label: t.eraLabour, start: 1937, end: 1946, bg: "bg-amber-600" },
    { key: "constitution", label: t.eraConstitution, start: 1947, end: 1950, bg: "bg-indigo-600" },
    { key: "legacy", label: t.eraLegacy, start: 1951, end: 1956, bg: "bg-purple-600" },
  ]

  const decades = ["all", "1890s", "1900s", "1910s", "1920s", "1930s", "1940s", "1950s"]

  // Filter logic
  const filteredMilestones = milestones.filter((item) => {
    const matchesEra = activeEra === "all" || item.era === activeEra
    const matchesDecade = selectedDecade === "all" || item.decade === selectedDecade
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.year.toString().includes(q)

    return matchesEra && matchesDecade && matchesQuery
  })

  // Safe current milestone (localized)
  const rawActiveMilestone = filteredMilestones[currentIndex] || filteredMilestones[0] || null
  const activeMilestone = rawActiveMilestone
    ? getLocalizedMilestone(rawActiveMilestone, currentLanguage)
    : null

  const goTo = (index: number) => {
    if (index >= 0 && index < filteredMilestones.length) {
      setCurrentIndex(index)
      sfx.playMilestoneSelect()
      if (navigator.vibrate) navigator.vibrate(10)
    }
  }

  // Synchronize lower chrono-tape scroll to active milestone
  useEffect(() => {
    if (!tapeViewportRef.current || !activeMilestone) return
    const tape = tapeViewportRef.current
    const activePin = tape.querySelector(`[data-index="${currentIndex}"]`) as HTMLElement
    if (activePin) {
      const targetScroll = activePin.offsetLeft - tape.clientWidth / 2 + activePin.clientWidth / 2
      tape.scrollTo({ left: targetScroll, behavior: "smooth" })
    }
  }, [currentIndex, activeMilestone, zoomLevel])

  // Narrate current milestone with natural neural voice engine
  const narrateMilestone = (item: TimelineMilestone) => {
    const text = `In the year ${item.year}, at ${item.location}. ${item.title}. ${item.description}${
      item.quote ? ` Dr. Ambedkar stated: "${item.quote}"` : ""
    }${ item.impact ? ` Historical significance: ${item.impact}` : "" }`
    speakText(text, currentLanguage)
  }

  // Audio Chronicle Tour Autoplay
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isAudioTourActive && activeMilestone) {
      narrateMilestone(activeMilestone)
      timer = setTimeout(() => {
        if (currentIndex < filteredMilestones.length - 1) {
          setCurrentIndex((prev) => prev + 1)
        } else {
          setIsAudioTourActive(false)
        }
      }, 12000)
    } else {
      stopSpeech()
    }
    return () => clearTimeout(timer)
  }, [isAudioTourActive, currentIndex, filteredMilestones.length])

  // Calculate year position on Chrono-tape with wide, spacious track
  const startYear = 1890
  const endYear = 1956
  const totalYears = endYear - startYear
  // 5200px minimum width guarantees generous horizontal space for all years & era labels
  const baseTrackWidth = Math.max(5200, filteredMilestones.length * 260) * zoomLevel

  const getYearX = (year: number) => {
    return ((year - startYear) / totalYears) * (baseTrackWidth - 200) + 100
  }

  // Dynamic anti-collision layout calculation to eliminate marker clustering & text overlaps
  const milestonePlacements = useMemo(() => {
    const minSpacing = 76 // Minimum 76px horizontal clearance between milestone centers
    const tierOffsets = [24, 90, 156, 222] // 4 widely spaced vertical tiers (66px separation)
    const placements: { x: number; topPx: number; yearX: number }[] = []

    filteredMilestones.forEach((item, idx) => {
      const yearX = getYearX(item.year)
      let finalX = yearX
      if (idx > 0) {
        const prevX = placements[idx - 1].x
        if (finalX < prevX + minSpacing) {
          finalX = prevX + minSpacing
        }
      }
      const topPx = tierOffsets[idx % 4]
      placements.push({ x: finalX, topPx, yearX })
    })

    return placements
  }, [filteredMilestones, zoomLevel, baseTrackWidth])

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Timeline Masthead */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
              {t.timelineBadge}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t.timelineTitle}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {t.timelineDesc}
          </p>
        </div>

        {/* Metric Badges */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-card shadow-xs min-w-24">
            <span className="font-serif text-2xl font-bold text-foreground">20</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">{t.metricMilestones}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-card shadow-xs min-w-24">
            <span className="font-serif text-2xl font-bold text-foreground">6</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">{t.metricEras}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-border bg-card shadow-xs min-w-24">
            <span className="font-serif text-2xl font-bold text-foreground">65</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">{t.metricYears}</span>
          </div>
        </div>
      </div>

      {/* Controls Deck */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 shadow-xs backdrop-blur-xs">
        {/* Era Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {eras.map((era) => (
            <button
              key={era.key}
              onClick={() => {
                setActiveEra(era.key)
                setCurrentIndex(0)
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
                activeEra === era.key
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>

        {/* Search, Audio Tour, and Layout Mode Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-border/60">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.timelineSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentIndex(0)
              }}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Audio Tour Button */}
            <Button
              variant={isAudioTourActive ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAudioTourActive(!isAudioTourActive)}
              className="h-9 gap-1.5 text-xs"
            >
              {isAudioTourActive ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {isAudioTourActive ? t.audioTourPlaying : t.audioTourStart}
            </Button>

            {/* 3-Way Layout Switcher */}
            <div className="flex items-center rounded-lg border border-border bg-muted/60 p-1">
              <button
                onClick={() => setLayoutMode("timelinejs")}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-all ${
                  layoutMode === "timelinejs" ? "bg-background text-foreground font-semibold shadow-xs" : "text-muted-foreground"
                }`}
                title="TimelineJS Dual-Deck"
              >
                <Columns className="size-3.5" />
                <span className="hidden md:inline">{t.stageAndTape}</span>
              </button>
              <button
                onClick={() => setLayoutMode("stream")}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-all ${
                  layoutMode === "stream" ? "bg-background text-foreground font-semibold shadow-xs" : "text-muted-foreground"
                }`}
                title="Continuous Cards Stream"
              >
                <Layers className="size-3.5" />
                <span className="hidden md:inline">{t.streamView}</span>
              </button>
              <button
                onClick={() => setLayoutMode("chronicle")}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-all ${
                  layoutMode === "chronicle" ? "bg-background text-foreground font-semibold shadow-xs" : "text-muted-foreground"
                }`}
                title="Museum Chronicle Spine"
              >
                <List className="size-3.5" />
                <span className="hidden md:inline">{t.chronicleView}</span>
              </button>
            </div>

            {/* Timeline Tape Zoom Controls */}
            {layoutMode === "timelinejs" && (
              <div className="flex items-center rounded-lg border border-border bg-muted/60 p-1 text-xs gap-0.5">
                <button
                  onClick={() => {
                    sfx.playNavClick()
                    setZoomLevel((prev) => Math.max(0.5, parseFloat((prev - 0.1).toFixed(2))))
                  }}
                  className="px-1.5 py-0.5 rounded hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                  title="Zoom Out Timeline Tape"
                >
                  <ZoomOut className="size-3" />
                </button>
                <span className="px-1 font-mono text-[10px] font-semibold text-muted-foreground">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => {
                    sfx.playNavClick()
                    setZoomLevel((prev) => Math.min(1.4, parseFloat((prev + 0.1).toFixed(2))))
                  }}
                  className="px-1.5 py-0.5 rounded hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                  title="Zoom In Timeline Tape"
                >
                  <ZoomIn className="size-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Decade Ruler Quick Jump */}
        <div className="flex items-center gap-2 pt-1 border-t border-border/40">
          <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider font-semibold">
            {t.decadeLabel}
          </span>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {decades.map((dec) => (
              <button
                key={dec}
                onClick={() => {
                  setSelectedDecade(dec)
                  setCurrentIndex(0)
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedDecade === dec
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {dec === "all" ? t.allDecades : dec.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW 1: FLAGSHIP TIMELINEJS DUAL-DECK */}
      {layoutMode === "timelinejs" && activeMilestone && (
        <div className="flex flex-col gap-6">
          {/* Slide Affordance & Kinetic Cue Banner */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-2">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-primary animate-ping" />
              <span className="font-semibold text-foreground">Interactive Stage</span>
              <span>•</span>
              <span>Swipe horizontally or use pedals to slide milestones</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] bg-muted px-3 py-1 rounded-full text-foreground/80 font-medium border border-border/60">
              <span>‹ Slide 20 Milestones ›</span>
            </div>
          </div>

          {/* Upper Deck: Multimedia Story Stage */}
          <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm overflow-hidden min-h-[460px] flex items-center">
            {/* Nav Pedals */}
            <Button
              variant="outline"
              size="icon"
              disabled={currentIndex === 0}
              onClick={() => goTo(currentIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full border-border bg-background/80 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all z-20"
              aria-label="Previous Milestone"
            >
              <ChevronLeft className="size-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={currentIndex === filteredMilestones.length - 1}
              onClick={() => goTo(currentIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full border-border bg-background/80 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all z-20"
              aria-label="Next Milestone"
            >
              <ChevronRight className="size-6" />
            </Button>

            {/* Slide Content with Motion Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full px-8 md:px-14"
              >
                {/* Photo Column */}
                <div className="lg:col-span-5 relative group">
                  <div className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-md aspect-4/3 sm:aspect-square max-h-[380px] w-full">
                    <img
                      src={activeMilestone.image}
                      alt={activeMilestone.title}
                      className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-xs font-bold shadow-md">
                        {activeMilestone.year}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-background/90 text-foreground font-mono text-xs font-semibold backdrop-blur-md shadow-xs">
                        {activeMilestone.eraLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                      Milestone {currentIndex + 1} of {filteredMilestones.length} • {activeMilestone.decade}
                    </span>
                    <Badge variant="outline" className="font-mono text-xs uppercase">
                      {activeMilestone.category}
                    </Badge>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                    {activeMilestone.title}
                  </h2>

                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mt-2">
                    <span>📅 {activeMilestone.date}</span>
                    <span>•</span>
                    <span>📍 {activeMilestone.location}</span>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {activeMilestone.description}
                  </p>

                  {/* Pullquote */}
                  {activeMilestone.quote && (
                    <div className="mt-4 pl-4 border-l-2 border-primary/40 bg-muted/30 py-2.5 pr-3 rounded-r-lg">
                      <p className="font-serif italic text-sm text-foreground/80 leading-relaxed">
                        “{activeMilestone.quote}”
                      </p>
                    </div>
                  )}

                  {/* Impact Tag */}
                  {activeMilestone.impact && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-amber-500 font-bold">⚡</span>
                      <span className="font-mono text-xs text-muted-foreground font-medium">
                        {activeMilestone.impact}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => narrateMilestone(activeMilestone)}
                      className="gap-1.5 text-xs h-9"
                    >
                      <Volume2 className="size-3.5" />
                      {t.narrateBtn}
                    </Button>

                    {activeMilestone.relatedDocId && (
                      <Button
                        size="sm"
                        onClick={() => onOpenDocument(activeMilestone.relatedDocId!)}
                        className="gap-1.5 text-xs h-9 font-semibold"
                      >
                        <BookOpen className="size-3.5" />
                        {t.viewDocBtn}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Lower Deck: Synchronized Chrono-Tape */}
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1 pb-2 border-b border-border/60">
              <span className="flex items-center gap-1.5 font-medium">
                <span>👆</span> {t.tapeHint}
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.25))}
                  title="Zoom Out"
                >
                  <ZoomOut className="size-3.5" />
                </Button>
                <span className="font-mono text-[11px] min-w-10 text-center font-semibold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.25))}
                  title="Zoom In"
                >
                  <ZoomIn className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Scrollable Chrono-Tape Viewport with Edge Affordance Controls */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => {
                  if (tapeViewportRef.current) {
                    tapeViewportRef.current.scrollBy({ left: -280, behavior: "smooth" })
                  }
                }}
                className="absolute left-0 top-0 bottom-0 z-20 w-8 flex items-center justify-center bg-gradient-to-r from-card via-card/80 to-transparent text-muted-foreground hover:text-foreground opacity-75 group-hover:opacity-100 transition-opacity"
                title="Scroll Left on Chrono-Tape"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div
                ref={tapeViewportRef}
                className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-thin py-6 px-6 min-h-[470px]"
              >
                <div
                  className="relative h-[440px] min-h-[440px] transition-[width] duration-300"
                  style={{ width: `${baseTrackWidth}px` }}
                >
                {/* 1. Era Color Bands – fully readable ribbons with zero cut-off */}
                <div className="relative h-8 rounded-lg flex shadow-xs gap-1">
                  {eras
                    .filter((e) => e.start && e.end)
                    .map((era) => {
                      const xStart = getYearX(era.start!)
                      const xEnd = getYearX(Math.min(endYear, era.end! + 0.95))
                      const width = Math.max(80, xEnd - xStart)
                      return (
                        <div
                          key={era.key}
                          onClick={() => {
                            const idx = filteredMilestones.findIndex((m) => m.era === era.key)
                            if (idx !== -1) goTo(idx)
                          }}
                          className={`absolute top-0 h-full flex items-center px-3 text-[11px] font-mono font-bold text-white rounded-md cursor-pointer whitespace-nowrap hover:brightness-110 hover:shadow-md transition-all shadow-2xs z-10 ${era.bg}`}
                          style={{ left: `${xStart}px`, width: `${width}px` }}
                          title={`Jump to ${era.label}`}
                        >
                          <span className="whitespace-nowrap overflow-visible drop-shadow-xs">{era.label}</span>
                        </div>
                      )
                    })}
                </div>

                {/* 2. Ruler & Decade Markers */}
                <div className="relative h-8 border-b-2 border-border mt-1">
                  {Array.from({ length: totalYears + 1 }).map((_, i) => {
                    const yr = startYear + i
                    if (yr % 2 !== 0 && yr !== 1956) return null
                    const x = getYearX(yr)
                    const isDecade = yr % 10 === 0 || yr === 1956
                    return (
                      <Fragment key={yr}>
                        <div
                          className={`absolute bottom-0 -translate-x-1/2 w-px bg-border ${
                            isDecade ? "h-3 bg-muted-foreground/60 w-0.5" : "h-1.5"
                          }`}
                          style={{ left: `${x}px` }}
                        />
                        {isDecade && (
                          <span
                            className="absolute top-1 -translate-x-1/2 font-mono text-[10px] font-bold text-muted-foreground"
                            style={{ left: `${x}px` }}
                          >
                            {yr}
                          </span>
                        )}
                      </Fragment>
                    )
                  })}
                </div>

                {/* 3. Milestone Marker Flags – collision-free layout with vertical guides */}
                <div className="relative h-[340px] mt-4">
                  {filteredMilestones.map((item, idx) => {
                    const placement = milestonePlacements[idx] || { x: getYearX(item.year), topPx: 10, yearX: getYearX(item.year) }
                    const { x, topPx } = placement
                    const isCurrent = idx === currentIndex

                    return (
                      <Fragment key={item.id}>
                        {/* Vertical dotted connector line from ruler to marker */}
                        <div
                          className="absolute pointer-events-none w-px border-l border-dashed border-border/80 transition-all"
                          style={{
                            left: `${x}px`,
                            top: 0,
                            height: `${topPx + 14}px`,
                            opacity: isCurrent ? 0.9 : 0.4,
                          }}
                        />

                        {/* Interactive Milestone Pin */}
                        <div
                          data-index={idx}
                          onClick={() => goTo(idx)}
                          className={`absolute -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 select-none group ${
                            isCurrent ? "scale-110 z-30" : "z-10 hover:scale-105 hover:z-20"
                          }`}
                          style={{ left: `${x}px`, top: `${topPx}px` }}
                          title={`${item.year}: ${item.title}`}
                        >
                          {/* Avatar Thumbnail */}
                          <div
                            className={`size-9 rounded-full overflow-hidden border-2 shadow-sm transition-all bg-muted ${
                              isCurrent
                                ? "border-primary ring-4 ring-primary/25 shadow-md"
                                : "border-background group-hover:border-primary/50"
                            }`}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="size-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* Year pill */}
                          <span
                            className={`mt-1 rounded px-2 py-0.5 font-mono text-[10px] font-bold shadow-xs whitespace-nowrap transition-colors ${
                              isCurrent
                                ? "bg-primary text-primary-foreground font-extrabold"
                                : "bg-slate-800 text-white group-hover:bg-slate-700"
                            }`}
                          >
                            {item.year}
                          </span>

                          {/* Badge/Title Label – shown for active, and on hover */}
                          <span
                            className={`mt-0.5 max-w-28 text-center text-[10px] font-medium leading-tight line-clamp-1 transition-opacity ${
                              isCurrent
                                ? "text-primary font-bold opacity-100"
                                : "text-muted-foreground opacity-75 group-hover:opacity-100"
                            }`}
                          >
                            {item.badge || item.title.slice(0, 16)}
                          </span>
                        </div>
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            </div>

              <button
                type="button"
                onClick={() => {
                  if (tapeViewportRef.current) {
                    tapeViewportRef.current.scrollBy({ left: 280, behavior: "smooth" })
                  }
                }}
                className="absolute right-0 top-0 bottom-0 z-20 w-8 flex items-center justify-center bg-gradient-to-l from-card via-card/80 to-transparent text-muted-foreground hover:text-foreground opacity-75 group-hover:opacity-100 transition-opacity"
                title="Scroll Right on Chrono-Tape"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CONTINUOUS CARDS STREAM */}
      {layoutMode === "stream" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMilestones.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative rounded-lg overflow-hidden border border-border aspect-16/9 mb-4">
                  <img src={item.image} alt={item.title} className="size-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-primary-foreground font-mono text-xs font-bold">
                    {item.year}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-1">
                  <span>{item.decade}</span>
                  <span>📍 {item.location}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => narrateMilestone(item)}
                  className="h-7 text-xs gap-1"
                >
                  <Volume2 className="size-3" />
                  {t.narrateBtn}
                </Button>
                {item.relatedDocId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenDocument(item.relatedDocId!)}
                    className="h-7 text-xs"
                  >
                    {t.viewDocBtn}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: MUSEUM CHRONICLE SPINE */}
      {layoutMode === "chronicle" && (
        <div className="relative pl-6 md:pl-8 border-l-2 border-border/80 space-y-8 my-4">
          {filteredMilestones.map((item) => (
            <div key={item.id} className="relative group">
              {/* Spine Node Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 size-4 rounded-full border-2 border-primary bg-background shadow-xs group-hover:bg-primary transition-colors" />

              <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-primary">
                      {item.year}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      • {item.date} • 📍 {item.location}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono">
                    {item.eraLabel}
                  </Badge>
                </div>

                <h3 className="font-serif text-xl font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                  {item.description}
                </p>

                {item.quote && (
                  <div className="mt-3 pl-3 border-l-2 border-primary/30 italic text-xs text-muted-foreground">
                    “{item.quote}”
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => narrateMilestone(item)}
                    className="h-8 text-xs gap-1.5"
                  >
                    <Volume2 className="size-3.5" />
                    {t.narrateBtn}
                  </Button>
                  {item.relatedDocId && (
                    <Button
                      size="sm"
                      onClick={() => onOpenDocument(item.relatedDocId!)}
                      className="h-8 text-xs gap-1.5"
                    >
                      <BookOpen className="size-3.5" />
                      {t.viewDocBtn}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Persistent Side Scroll Indicator / Spine Scrubber on Right Edge (ONLY in Timeline) */}
      {isActiveSection && (
        <SideScrollIndicator
          milestones={filteredMilestones.map((m) => getLocalizedMilestone(m, currentLanguage))}
          currentIndex={currentIndex}
          onSelectIndex={goTo}
        />
      )}
    </div>
  )
}
