import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Filter, ArrowUpRight, BookOpen } from "lucide-react"
import type { ArchiveDocument } from "./DocumentDrawer";
import OnScreenKeyboard from "./OnScreenKeyboard";
import { getTranslation } from "@/utils/translations";
import { sfx } from "@/utils/soundEffects";

interface SearchPaneProps {
  documents: ArchiveDocument[]
  onOpenDocument: (docId: string) => void
  currentLanguage?: string
}

export function SearchPane({
  documents,
  onOpenDocument,
  currentLanguage = "english",
}: SearchPaneProps) {
  const t = getTranslation(currentLanguage)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { key: "all", label: t.catAll },
    { key: "Writings & Speeches", label: t.catWritings },
    { key: "Constituent Assembly Debates", label: t.catDebates },
    { key: "Economic Writings", label: t.catEconomics },
    { key: "Historical Treatises", label: t.catHistorical },
    { key: "Legal Manuscripts", label: t.catLegal },
  ]

  const filtered = documents.filter((doc) => {
    const matchesCat = selectedCategory === "all" || doc.category === selectedCategory
    const q = query.toLowerCase().trim()
    const matchesQuery =
      !q ||
      doc.title.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q) ||
      doc.tags.some((t) => t.toLowerCase().includes(q)) ||
      doc.source.toLowerCase().includes(q) ||
      doc.year.toString().includes(q)

    return matchesCat && matchesQuery
  })

  return (
    <div className="flex flex-col gap-10 py-10">
      {/* Search Header */}
      <div className="flex flex-col gap-2 border-b border-border/80 pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
            {t.searchCatalogBadge}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">• {t.searchCatalogSub}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {t.searchPageTitle}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          {t.searchPageDesc}
        </p>
      </div>

      {/* Search Control Deck */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 size-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-12 text-sm bg-background border-border"
          />
          {/* On‑screen keyboard for kiosk */}
          <OnScreenKeyboard
            value={query}
            onChange={setQuery}
            onEnter={() => {}}
            currentLanguage={currentLanguage}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="size-4 text-muted-foreground shrink-0 ml-1 mr-1" />
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                sfx.playNavClick()
                setSelectedCategory(c.key)
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium shrink-0 transition-all ${
                selectedCategory === c.key
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono px-1">
        <span className="font-medium text-foreground">
          {t.showingMatchedPrefix} {filtered.length} {t.showingMatchedSuffix}
        </span>
        <span>DAIC BAWS Edition</span>
      </div>

      {/* Results Grid with Visible Spacing and Elevated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((doc) => {
          const localizedSummary =
            currentLanguage !== "english" &&
            doc.translations?.[currentLanguage as "hindi" | "marathi" | "tamil"]
              ? doc.translations[currentLanguage as "hindi" | "marathi" | "tamil"]
              : doc.summary

          const localizedMetadata: Record<string, Record<string, { title: string; source: string; tags: string[] }>> = {
            "DOC-001": {
              hindi: {
                title: "जाति का विनाश (Annihilation of Caste)",
                source: "जात-पात तोड़क मंडल के लिए तैयार अप्रकाशित अध्यक्षीय भाषण",
                tags: ["सामाजिक_सुधार", "समानता", "जाति_का_विनाश"],
              },
              marathi: {
                title: "जातीचा उच्छेद (Annihilation of Caste)",
                source: "जात-पात तोडक मंडळासाठी भाषण",
                tags: ["सामाजिक_सुधारणा", "समता", "जातीचा_उच्छेद"],
              },
              tamil: {
                title: "சாதி ஒழிப்பு (Annihilation of Caste)",
                source: "ஜாத்-பாத் தோடக் மண்டல் உரை",
                tags: ["சமூக_சீர்திருத்தம்", "சமத்துவம்", "சாதி_ஒழிப்பு"],
              },
            },
            "DOC-002": {
              hindi: {
                title: "संविधान सभा भाषण - अनुच्छेद ३२ (संवैधानिक उपचारों का अधिकार)",
                source: "भारत की संविधान सभा, नई दिल्ली",
                tags: ["संविधान", "अनुच्छेद३२", "मौलिक_अधिकार"],
              },
              marathi: {
                title: "संविधान सभा भाषण - कलम ३२ (घटनात्मक उपायांचा हक्क)",
                source: "भारतीय संविधान सभा, नवी दिल्ली",
                tags: ["संविधान", "कलम३२", "मूलभूत_हक्क"],
              },
              tamil: {
                title: "அரசியலமைப்பு சபை உரை - பிரிவு 32",
                source: "இந்திய அரசியலமைப்பு சபை",
                tags: ["அரசியலமைப்பு", "பிரிவு32", "அடிப்படை_உரிமைகள்"],
              },
            },
            "DOC-003": {
              hindi: {
                title: "रुपये की समस्या: इसका उद्गम और समाधान",
                source: "लंदन स्कूल ऑफ इकोनॉमिक्स डॉक्टरेट शोध ग्रंथ",
                tags: ["अर्थशास्त्र", "मुद्रा", "आरबीआई"],
              },
              marathi: {
                title: "रुपयाची समस्या: तिचा उगम आणि उपाय",
                source: "लंडन स्कूल ऑफ इकॉनॉमिक्स डॉक्टरेट प्रबंध",
                tags: ["अर्थशास्त्र", "चलन", "रिझर्व्ह_बँक"],
              },
              tamil: {
                title: "ரூபாயின் பிரச்சனை: தோற்றமும் தீர்வும்",
                source: "லண்டன் ஸ்கூல் ஆஃப் எகனாமிக்ஸ்",
                tags: ["பொருளாதாரம்", "நாணயம்", "ரிசர்வ்_வங்கி"],
              },
            },
            "DOC-004": {
              hindi: {
                title: "महाड सत्याग्रह घोषणा: जल अधिकार ही मानवाधिकार",
                source: "चवदार तालाब, महाड, महाराष्ट्र",
                tags: ["महाड_सत्याग्रह", "नागरिक_अधिकार", "मानवाधिकार"],
              },
              marathi: {
                title: "महाड सत्याग्रह घोषणा: पाण्याचा हक्क हा मानवी हक्क",
                source: "चवदार तळे, महाड, महाराष्ट्र",
                tags: ["महाड_सत्याग्रह", "नागरी_हक्क", "मानवी_हक्क"],
              },
              tamil: {
                title: "மகத் சத்தியாகிரகம்: குடிநீர் உரிமை",
                source: "சவ்தார் குளம், மகத்",
                tags: ["மகத்_சத்தியாகிரகம்", "குடிநீர்_உரிமை", "மனித_உரிமை"],
              },
            },
            "DOC-005": {
              hindi: {
                title: "राज्य और अल्पसंख्यक: मौलिक अधिकार एवं राज्य समाजवाद",
                source: "संविधान सभा को सौंपा गया ज्ञापन",
                tags: ["राज्य_समाजवाद", "अल्पसंख्यक_अधिकार", "संविधान"],
              },
              marathi: {
                title: "राज्य आणि अल्पसंख्याक: राज्य समाजवाद मसुदा",
                source: "संविधान सभेस सादर केलेले निवेदन",
                tags: ["राज्य_समाजवाद", "अल्पसंख्याक_हक्क", "संविधान"],
              },
              tamil: {
                title: "மாநிலங்களும் சிறுபான்மையினரும்",
                source: "அரசியலமைப்பு சபைக்கு அறிக்கை",
                tags: ["அரசு_சோசலிசம்", "சிறுபான்மையினர்_உரிமை", "அரசியலமைப்பு"],
              },
            },
            "DOC-006": {
              hindi: {
                title: "अराजकता का व्याकरण (संविधान सभा का अंतिम भाषण)",
                source: "भारत की संविधान सभा, नई दिल्ली",
                tags: ["अराजकता_का_व्याकरण", "लोकतंत्र", "नायक_पूजा"],
              },
              marathi: {
                title: "अराजकतेचे व्याकरण (संविधान सभेतील अंतिम भाषण)",
                source: "भारतीय संविधान सभा, नवी दिल्ली",
                tags: ["अराजकतेचे_व्याकरण", "लोकशाही", "नायक_पूजा"],
              },
              tamil: {
                title: "அராஜகத்தின் இலக்கணம் (இறுதி உரை)",
                source: "இந்திய அரசியலமைப்பு சபை",
                tags: ["அராஜகத்தின்_இலக்கணம்", "ஜனநாயகம்", "நாயக_வழிபாடு"],
              },
            },
          }

          const loc =
            currentLanguage !== "english"
              ? localizedMetadata[doc.id]?.[currentLanguage]
              : null

          const displayTitle = loc?.title || doc.title
          const displaySource = loc?.source || doc.source
          const displayTags = loc?.tags || doc.tags

          return (
            <Card
              key={doc.id}
              className="flex flex-col justify-between border border-border bg-card rounded-2xl shadow-xs hover:shadow-md hover:border-primary/40 transition-all overflow-hidden"
            >
              <div>
                {/* Media banner */}
                <div className="relative aspect-16/10 overflow-hidden bg-muted border-b border-border/80">
                  <img
                    src={doc.image}
                    alt={displayTitle}
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <Badge className="absolute top-3 right-3 font-mono text-xs font-bold shadow-xs">
                    {doc.year}
                  </Badge>
                </div>

                <CardHeader className="p-6 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="font-mono text-[11px] uppercase">
                      {doc.id}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      {doc.volume}
                    </span>
                  </div>
                  <CardTitle className="font-serif text-xl font-bold leading-snug">
                    {displayTitle}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1">
                    {displaySource} ({doc.pages} {t.pagesLabel})
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed line-clamp-3 min-h-[4.5rem]">
                    {localizedSummary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {displayTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono bg-muted/80 px-2 py-0.5 rounded-md text-muted-foreground border border-border/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="p-6 pt-4 border-t border-border/60 bg-muted/10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    sfx.playSwoosh("open")
                    onOpenDocument(doc.id)
                  }}
                  className="w-full text-xs font-semibold gap-2 justify-between h-9 shadow-xs hover:bg-background"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="size-3.5" />
                    {t.readRecordBtn}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
