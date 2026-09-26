import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown, Compass } from "lucide-react"

export interface SpineMilestone {
  id: string
  year: number
  title: string
  eraLabel: string
}

interface SideScrollIndicatorProps {
  milestones: SpineMilestone[]
  currentIndex: number
  onSelectIndex: (index: number) => void
}

export function SideScrollIndicator({
  milestones,
  currentIndex,
  onSelectIndex,
}: SideScrollIndicatorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (milestones.length === 0) return null

  const activeMilestone = milestones[currentIndex] || milestones[0]

  return (
    <aside
      className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 rounded-full border border-border/80 bg-background/90 p-2 shadow-lg backdrop-blur-md select-none transition-all"
      aria-label="Timeline Spine Navigation"
    >
      {/* Up Button */}
      <button
        disabled={currentIndex === 0}
        onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
        className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all"
        title="Previous Milestone"
      >
        <ChevronUp className="size-4" />
      </button>

      {/* Mini Compass Icon */}
      <div className="size-5 text-primary/70 flex items-center justify-center mb-1">
        <Compass className="size-3.5" />
      </div>

      {/* Vertical Spine Rail with Micro-Ticks */}
      <div className="relative flex flex-col items-center justify-between py-1 h-64 w-6">
        {/* Background track line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-border rounded-full" />

        {/* Milestone Node Dots */}
        {milestones.map((m, idx) => {
          const isActive = idx === currentIndex
          const isHovered = hoveredIndex === idx

          return (
            <div
              key={m.id}
              onClick={() => onSelectIndex(idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative z-10 flex items-center justify-center cursor-pointer py-0.5 group"
            >
              {/* Node Tick Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.4 : isHovered ? 1.25 : 1,
                  backgroundColor: isActive
                    ? "var(--color-primary, #0F172A)"
                    : isHovered
                    ? "#0284C7"
                    : "#94A3B8",
                }}
                className={`size-2 rounded-full transition-shadow ${
                  isActive ? "ring-4 ring-primary/20 shadow-xs" : ""
                }`}
              />

              {/* Floating Tooltip Callout on Hover / Active */}
              <AnimatePresence>
                {(isHovered || (isActive && hoveredIndex === null)) && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute right-8 w-48 rounded-lg border border-border bg-popover p-2.5 shadow-md text-popover-foreground z-40 text-left"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground mb-0.5">
                      <span className="font-bold text-primary">{m.year}</span>
                      <span>{m.eraLabel}</span>
                    </div>
                    <p className="font-serif text-xs font-semibold leading-tight line-clamp-2">
                      {m.title}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Active Year Pill on Bottom */}
      <div className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-sm mt-1">
        {activeMilestone.year}
      </div>

      {/* Down Button */}
      <button
        disabled={currentIndex === milestones.length - 1}
        onClick={() => onSelectIndex(Math.min(milestones.length - 1, currentIndex + 1))}
        className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all"
        title="Next Milestone"
      >
        <ChevronDown className="size-4" />
      </button>
    </aside>
  )
}
