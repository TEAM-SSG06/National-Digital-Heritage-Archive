import { useState, useEffect, type ComponentType } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Search,
  Network,
  Clock,
  Mic,
  Sparkles,
  MonitorPlay,
  FolderKanban,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { getTranslation } from "@/utils/translations"
import { sfx } from "@/utils/soundEffects"

export type NavTab = "overview" | "search" | "timeline" | "graph" | "audio" | "scholar"

interface HeaderProps {
  activeTab: NavTab
  onSelectTab: (tab: NavTab) => void
  currentLanguage: string
  onChangeLanguage: (lang: string) => void
  onTriggerKioskMode?: () => void
  onOpenDossier?: () => void
  dossierCount?: number
}

export function Header({
  activeTab,
  onSelectTab,
  currentLanguage,
  onChangeLanguage,
  onTriggerKioskMode,
  onOpenDossier,
  dossierCount = 0,
}: HeaderProps) {
  const t = getTranslation(currentLanguage)
  const [soundOn, setSoundOn] = useState(() => sfx.isEnabled())

  // Global Zoom level (default 90% as requested)
  const [zoomPercent, setZoomPercent] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("daic_ui_zoom")
      return saved ? parseInt(saved, 10) : 90
    }
    return 90
  })

  useEffect(() => {
    if (typeof document !== "undefined") {
      ;(document.documentElement.style as any).zoom = `${zoomPercent}%`
      localStorage.setItem("daic_ui_zoom", zoomPercent.toString())
    }
  }, [zoomPercent])

  const handleZoomOut = () => {
    sfx.playNavClick()
    setZoomPercent((prev) => Math.max(70, prev - 5))
  }

  const handleZoomIn = () => {
    sfx.playNavClick()
    setZoomPercent((prev) => Math.min(120, prev + 5))
  }

  const handleResetZoom = () => {
    sfx.playNavClick()
    setZoomPercent(90)
  }

  const navItems: { id: NavTab; label: string; icon: ComponentType<{ className?: string }> }[] = [
    { id: "overview",  label: t.navOverview,  icon: BookOpen },
    { id: "search",    label: t.navSearch,    icon: Search   },
    { id: "timeline",  label: t.navTimeline,  icon: Clock    },
    { id: "graph",     label: t.navGraph,     icon: Network  },
    { id: "audio",     label: t.navAudio,     icon: Mic      },
    { id: "scholar",   label: t.navScholar,   icon: Sparkles },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 lg:gap-8 px-4 py-2.5 sm:px-6">

        {/* Brand Identity */}
        <div
          className="flex cursor-pointer items-center gap-2.5 shrink-0"
          onClick={() => onSelectTab("overview")}
        >
          <Avatar className="size-8 sm:size-9 border border-primary/20 shadow-2xs shrink-0">
            <AvatarImage src="/images/ambedkar-portrait.jpg" alt="Dr. B. R. Ambedkar" className="object-cover" />
            <AvatarFallback className="text-[10px]">BRA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-foreground">
                {t.brandTitle}
              </span>
              <Badge variant="outline" className="text-[9px] uppercase font-mono tracking-widest px-1.5 py-0 rounded-sm">
                {t.brandBadge}
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap leading-none mt-0.5">
              {t.brandSubtitle}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-0.5 rounded-full border border-border bg-muted/40 p-1 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  sfx.playNavClick()
                  onSelectTab(item.id)
                }}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className="size-3 shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Audio Effects Mute / Unmute Toggle */}
          <button
            onClick={() => {
              const next = sfx.toggle()
              setSoundOn(next)
              if (next) sfx.playNavClick()
            }}
            className={`flex items-center gap-1 h-7 px-2 rounded-md border text-[11px] font-mono transition-colors ${
              soundOn
                ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                : "border-border bg-background text-muted-foreground hover:bg-muted"
            }`}
            title={soundOn ? "Tactile Sound Effects Enabled (Click to Mute)" : "Sound Effects Muted (Click to Unmute)"}
            aria-label={soundOn ? "Mute Sound Effects" : "Enable Sound Effects"}
          >
            {soundOn ? <Volume2 className="size-3 text-primary shrink-0" /> : <VolumeX className="size-3 text-muted-foreground shrink-0" />}
            <span className="hidden xl:inline">{soundOn ? "SFX On" : "SFX Muted"}</span>
          </button>

          {/* Compiled Dossier Action */}
          {onOpenDossier && (
            <button
              onClick={() => {
                sfx.playSwoosh("open")
                onOpenDossier()
              }}
              className={`flex items-center gap-1.5 h-7 px-2.5 rounded-md border text-[11px] font-mono font-medium transition-all ${
                dossierCount > 0
                  ? "border-primary bg-primary/10 text-primary font-semibold shadow-2xs hover:bg-primary/15"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
              title="View Compiled Research Dossier & Generate Mobile QR"
            >
              <FolderKanban className="size-3 text-primary shrink-0" />
              <span className="hidden sm:inline">{t.dossierButton}</span>
              {dossierCount > 0 && (
                <span className="size-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                  {dossierCount}
                </span>
              )}
            </button>
          )}

          {/* UI Zoom Controls */}
          <div
            className="flex items-center border border-border rounded-md bg-background h-7 px-1 text-[11px] font-mono shadow-2xs gap-0.5"
            title="Adjust UI Zoom Level"
          >
            <button
              onClick={handleZoomOut}
              className="size-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Zoom Out UI"
              aria-label="Zoom Out"
            >
              <ZoomOut className="size-3" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1 text-[10px] font-semibold text-foreground hover:text-primary transition-colors"
              title="Reset to 90% Zoom"
            >
              {zoomPercent}%
            </button>
            <button
              onClick={handleZoomIn}
              className="size-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Zoom In UI"
              aria-label="Zoom In"
            >
              <ZoomIn className="size-3" />
            </button>
          </div>

          {/* Language Selector */}
          <select
            value={currentLanguage}
            onChange={(e) => {
              sfx.playNavClick()
              onChangeLanguage(e.target.value)
            }}
            className="h-7 rounded-md border border-border bg-background px-2 text-[11px] font-medium text-foreground shadow-2xs focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            aria-label="Select Language"
          >
            <option value="english">English</option>
            <option value="hindi">हिन्दी (Hindi)</option>
            <option value="marathi">मराठी (Marathi)</option>
            <option value="tamil">தமிழ் (Tamil)</option>
          </select>

          {/* Kiosk Attract Mode */}
          {onTriggerKioskMode && (
            <button
              onClick={() => {
                sfx.playNavClick()
                onTriggerKioskMode()
              }}
              className="hidden sm:flex items-center gap-1 h-7 px-2 rounded-md border border-border bg-background text-[11px] font-mono font-medium text-muted-foreground shadow-2xs hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap"
              title="Activate Museum Kiosk Attract Mode Screensaver"
            >
              <MonitorPlay className="size-3 text-amber-500 shrink-0" />
              <span>{t.kioskButton}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden overflow-x-auto border-t border-border px-3 py-1.5 gap-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-3" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </header>
  )
}
