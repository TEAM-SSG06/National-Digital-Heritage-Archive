import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  BookOpen,
  Clock,
  Network,
  Film,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Scale,
  BookmarkPlus,
  Check,
  Quote,
} from "lucide-react"
import type { NavTab } from "./Header"
import { getTranslation } from "@/utils/translations"

import { ARCHIVE_DATA } from "@/data/archiveData"

interface OverviewPaneProps {
  onNavigate: (tab: NavTab) => void
  onOpenDocument: (docId: string) => void
  currentLanguage?: string
  onToggleDossierItem?: (item: {
    id: string
    title: string
    category: string
    year: string | number
    source: string
    type: "document" | "speech" | "video" | "debate"
  }) => void
  dossierIds?: string[]
}

export function OverviewPane({
  onNavigate,
  onOpenDocument,
  currentLanguage = "english",
  onToggleDossierItem,
  dossierIds = [],
}: OverviewPaneProps) {
  const t = getTranslation(currentLanguage)

  // Constitutional Debates state
  const [selectedDebateIndex, setSelectedDebateIndex] = useState(0)

  const constitutionalDebates = [
    {
      article: currentLanguage === "hindi" || currentLanguage === "marathi" ? "अनुच्छेद ३२" : currentLanguage === "tamil" ? "பிரிவு 32" : "Article 32",
      title: currentLanguage === "hindi" 
        ? "संवैधानिक उपचारों का अधिकार" 
        : currentLanguage === "marathi" 
        ? "घटनात्मक उपायांचा हक्क" 
        : currentLanguage === "tamil" 
        ? "அரசியலமைப்பு பரிகாரங்களுக்கான உரிமை" 
        : "Right to Constitutional Remedies",
      date: currentLanguage === "hindi" ? "९ दिसंबर १९४८" : currentLanguage === "marathi" ? "९ डिसेंबर १९४८" : currentLanguage === "tamil" ? "9 டிசம்பர் 1948" : "9 December 1948",
      quote: currentLanguage === "hindi"
        ? "“यदि मुझसे कोई पूछे कि इस संविधान में सबसे महत्वपूर्ण अनुच्छेद कौन सा है, जिसके बिना यह संविधान शून्य हो जाएगा, तो मैं इस अनुच्छेद ३२ के अलावा किसी अन्य अनुच्छेद का नाम नहीं ले सकता। यह संविधान की आत्मा और हृदय है।”"
        : currentLanguage === "marathi"
        ? "“जर मला या संविधानातील सर्वात महत्त्वाचे कलम कोणते असे विचारले, ज्याशिवाय हे संविधान निरर्थक ठरेल, तर मी कलम ३२ शिवाय दुसऱ्या कोणत्याही कलमाचा उल्लेख करणार नाही. हा संविधानाचा आत्मा आणि हृदय आहे.”"
        : currentLanguage === "tamil"
        ? "“இந்த அரசியலமைப்பில் மிக முக்கியமான சட்டப்பிரிவு எது என்று என்னிடம் கேட்கப்பட்டால், இது இல்லாமல் அரசியலமைப்பு செல்லாததாகிவிடும் என்றால், நான் பிரிவு 32 ஐத் தவிர வேறு எதையும் குறிப்பிட முடியாது. அது அரசியலமைப்பின் ஆன்மாவும் இதயமும் ஆகும்.”"
        : "“If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it.”",
      assemblyNotes: currentLanguage === "hindi"
        ? "नागरिकों को राज्य के अत्याचार के विरुद्ध सीधे सर्वोच्च न्यायालय में रिट (बंदी प्रत्यक्षीकरण, परमादेश आदि) दायर करने का अधिकार दिया गया।"
        : currentLanguage === "marathi"
        ? "नागरिकांना राज्यसंस्थेच्या हस्तक्षेपाविरोधात थेट सर्वोच्च न्यायालयात दाद मागण्याचा मूलभूत अधिकार दिला."
        : currentLanguage === "tamil"
        ? "அரசு அத்துமீறலுக்கு எதிராக குடிமக்கள் உச்ச நீதிமன்றத்தை நேரடியாக அணுகுவதை உறுதி செய்தது."
        : "Guaranteed citizens direct access to the Supreme Court via Writs (Habeas Corpus, Mandamus, Certiorari) against state overreach.",
      docId: "DOC-002",
    },
    {
      article: currentLanguage === "hindi" || currentLanguage === "marathi" ? "अनुच्छेद २१" : currentLanguage === "tamil" ? "பிரிவு 21" : "Article 21",
      title: currentLanguage === "hindi" 
        ? "जीवन और व्यक्तिगत स्वतंत्रता का संरक्षण" 
        : currentLanguage === "marathi" 
        ? "जीवन आणि वैयक्तिक स्वातंत्र्याचे रक्षण" 
        : currentLanguage === "tamil" 
        ? "வாழ்க்கை மற்றும் தனிநபர் சுதந்திரத்தின் பாதுகாப்பு" 
        : "Protection of Life & Personal Liberty",
      date: currentLanguage === "hindi" ? "१३ दिसंबर १९४८" : currentLanguage === "marathi" ? "१३ डिसेंबर १९४८" : currentLanguage === "tamil" ? "13 டிசம்பர் 1948" : "13 December 1948",
      quote: currentLanguage === "hindi"
        ? "“मौलिक अधिकारों का प्रश्न विधायिका और व्यक्ति के बीच का प्रश्न है... हमें व्यक्तिगत स्वतंत्रता और सामाजिक नियंत्रण के बीच संतुलन बनाना होगा।”"
        : currentLanguage === "marathi"
        ? "“मूलभूत हक्कांचा प्रश्न हा विधिमंडळ आणि व्यक्ती यांच्यातील प्रश्न आहे... वैयक्तिक स्वातंत्र्य आणि सामाजिक नियंत्रण यांच्यात समतोल साधला पाहिजे.”"
        : currentLanguage === "tamil"
        ? "“அடிப்படை உரிமைகள் பற்றிய கேள்வி சட்டமன்றத்திற்கும் தனிநபருக்கும் இடையிலான ஒரு கேள்வி... தனிநபர் சுதந்திரத்திற்கும் சமூக கட்டுப்பாட்டிற்கும் இடையே நாம் சமநிலையை ஏற்படுத்த வேண்டும்.”"
        : "“The question of fundamental rights is a question between the legislature and the individual... we must strike a balance between individual liberty and social control without leaving liberties to the mercy of a temporary legislative majority.”",
      assemblyNotes: currentLanguage === "hindi"
        ? "प्रारूप समिति ने व्यक्तिगत स्वतंत्रता की रक्षा करते हुए सामाजिक-आर्थिक कानूनों पर न्यायिक गतिरोध को रोकने पर गहन विचार किया।"
        : currentLanguage === "marathi"
        ? "मसुदा समितीने सामाजिक-आर्थिक सुधारणांना अडथळा न येता वैयक्तिक स्वातंत्र्याचे संरक्षण करण्याची तरतूद केली."
        : currentLanguage === "tamil"
        ? "சமூக-பொருளாதார சட்டங்களை முடக்காமல் தனிநபர் சுதந்திரத்தை பாதுகாப்பதை உறுதி செய்தது."
        : "Drafting committee deliberated on safeguarding individual liberty while preventing judicial deadlock on socio-economic legislation.",
      docId: "DOC-005",
    },
    {
      article: currentLanguage === "hindi" || currentLanguage === "marathi" ? "प्रस्तावना" : currentLanguage === "tamil" ? "முகப்புரை" : "The Preamble",
      title: currentLanguage === "hindi" 
        ? "बंधुत्व, समानता और स्वतंत्रता की त्रिमूर्ति" 
        : currentLanguage === "marathi" 
        ? "बंधुता, समता आणि स्वातंत्र्य" 
        : currentLanguage === "tamil" 
        ? "சகோதரத்துவம், சமத்துவம் மற்றும் சுதந்திரம்" 
        : "Fraternity, Equality, and Liberty",
      date: currentLanguage === "hindi" ? "२५ नवंबर १९४९" : currentLanguage === "marathi" ? "२५ नोव्हेंबर १९४९" : currentLanguage === "tamil" ? "25 நவம்பர் 1949" : "25 November 1949",
      quote: currentLanguage === "hindi"
        ? "“स्वतंत्रता को समानता से अलग नहीं किया जा सकता, समानता को स्वतंत्रता से अलग नहीं किया जा सकता। न ही स्वतंत्रता और समानता को बंधुत्व से अलग किया जा सकता है।”"
        : currentLanguage === "marathi"
        ? "“स्वातंत्र्याला समतेपासून वेगळे करता येत नाही, समतेला स्वातंत्र्यापासून वेगळे करता येत नाही. तसेच स्वातंत्र्य आणि समतेला बंधुतेपासून वेगळे करता येत नाही.”"
        : currentLanguage === "tamil"
        ? "“சுதந்திரத்தை சமத்துவத்திலிருந்து பிரிக்க முடியாது, சமத்துவத்தை சுதந்திரத்திலிருந்து பிரிக்க முடியாது. சகோதரத்துவத்திலிருந்து இவ்விரண்டையும் பிரிக்க முடியாது.”"
        : "“Liberty cannot be divorced from equality, equality cannot be divorced from liberty. Nor can liberty and equality be divorced from fraternity. Without equality, liberty would produce the supremacy of the few over the many.”",
      assemblyNotes: currentLanguage === "hindi"
        ? "यह सुनिश्चित किया कि भारतीय गणराज्य केवल राजनीतिक प्रतिनिधित्व पर नहीं, बल्कि सामाजिक लोकतंत्र और नैतिक बंधुत्व पर आधारित हो।"
        : currentLanguage === "marathi"
        ? "भारतीय प्रजासत्ताक केवळ राजकीय लोकशाहीवर नव्हे, तर सामाजिक लोकशाही आणि नैतिक बंधुतेवर आधारलेले असेल याची खात्री केली."
        : currentLanguage === "tamil"
        ? "இந்திய குடியரசு வெறும் அரசியல் பிரதிநிதித்துவம் மட்டுமல்லாமல், சமூக ஜனநாயகம் மற்றும் சகோதரத்துவத்தின் அடிப்படையில் இயங்குவதை உறுதி செய்தது."
        : "Ensured that the Republic is grounded in social democracy and moral fraternity, not merely political representation.",
      docId: "DOC-006",
    },
  ]

  const activeDebate = constitutionalDebates[selectedDebateIndex]

  const metrics = [
    { label: t.metricWritings, count: "11,400+", sub: t.metricWritingsSub },
    { label: t.metricDebates, count: "2,840+", sub: t.metricDebatesSub },
    { label: t.metricPreservation, count: "OAIS Level-4", sub: t.metricPreservationSub },
    { label: t.metricTimeline, count: "20", sub: t.metricTimelineSub },
  ]

  // Use top 3 documents from ARCHIVE_DATA directly for 100% unique images & localized summaries
  const featured = ARCHIVE_DATA.documents.slice(0, 3).map((doc) => {
    const langKey = currentLanguage as "hindi" | "marathi" | "tamil"
    const localizedSummary = (doc.translations && doc.translations[langKey]) || doc.summary
    return {
      id: doc.id,
      title: doc.title,
      year: doc.year,
      category: doc.category,
      image: doc.image,
      summary: localizedSummary,
    }
  })

  return (
    <div className="flex flex-col gap-10 py-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card to-muted/30 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="gap-1.5 font-mono text-[11px] uppercase tracking-wide">
                <ShieldCheck className="size-3 text-emerald-600" />
                {t.heroBadge}
              </Badge>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              {t.heroTitle}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => onNavigate("timeline")} className="gap-2 font-semibold">
                <Clock className="size-4" />
                {t.exploreTimelineBtn}
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate("search")} className="gap-2">
                {t.searchCorpusBtn}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-amber-500/20 blur-lg group-hover:blur-xl transition-all" />
              <img
                src="/images/ambedkar-portrait.jpg"
                alt="Dr. B. R. Ambedkar"
                className="relative size-64 sm:size-72 rounded-2xl object-cover border-2 border-border shadow-xl"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-max px-3 py-1 rounded-full bg-background border border-border shadow-md text-xs font-mono font-semibold">
                {t.ambedkarLifeDates}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="p-5 rounded-2xl bg-muted/40 border border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Quote className="size-6 text-primary shrink-0 opacity-60" />
          <p className="font-serif text-base sm:text-lg italic text-foreground font-medium">
            {t.quoteBanner}
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-muted-foreground whitespace-nowrap shrink-0">
          {t.quoteAuthor}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={i} className="bg-card/70 border-border">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs font-mono uppercase tracking-wider">
                {m.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="font-serif text-3xl font-bold text-foreground">{m.count}</div>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Primary Exhibits */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              {t.featuredTreatisesTitle}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.featuredTreatisesSub}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("search")} className="gap-1 text-xs">
            {t.browseAllDocsBtn}
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item) => {
            const isInDossier = dossierIds.includes(item.id)
            const localizedFeatured: Record<string, Record<string, { title: string; category: string }>> = {
              "DOC-001": {
                hindi: { title: "जाति का विनाश (Annihilation of Caste)", category: "लेखन एवं भाषण" },
                marathi: { title: "जातीचा उच्छेद (Annihilation of Caste)", category: "लेखन व भाषणे" },
                tamil: { title: "சாதி ஒழிப்பு (Annihilation of Caste)", category: "எழுத்துக்கள் & உரைகள்" },
              },
              "DOC-002": {
                hindi: { title: "संविधान सभा भाषण - अनुच्छेद ३२ (संवैधानिक उपचारों का अधिकार)", category: "संविधान सभा की बहसें" },
                marathi: { title: "संविधान सभा भाषण - कलम ३२", category: "संविधान सभा" },
                tamil: { title: "அரசியலமைப்பு சபை உரை - பிரிவு 32", category: "அரசியலமைப்பு சபை" },
              },
              "DOC-003": {
                hindi: { title: "रुपये की समस्या: इसका उद्गम और समाधान", category: "आर्थिक ग्रंथ" },
                marathi: { title: "रुपयाची समस्या: तिचा उगम आणि उपाय", category: "अर्थशास्त्र" },
                tamil: { title: "ரூபாயின் பிரச்சனை: தோற்றமும் தீர்வும்", category: "பொருளாதாரம்" },
              },
            }

            const loc = currentLanguage !== "english" ? localizedFeatured[item.id]?.[currentLanguage] : null
            const displayTitle = loc?.title || item.title
            const displayCategory = loc?.category || item.category
            const displaySummary = currentLanguage !== "english" && (item as any).translations?.[currentLanguage]
              ? (item as any).translations[currentLanguage]
              : item.summary

            return (
              <Card
                key={item.id}
                className="overflow-hidden flex flex-col justify-between border-border hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-muted">
                    <img src={item.image} alt={displayTitle} className="size-full object-cover" />
                    <Badge className="absolute top-2.5 right-2.5 font-mono text-[10px]">
                      {item.year}
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase line-clamp-1">
                      {displayCategory}
                    </span>
                    <CardTitle className="font-serif text-lg font-bold leading-snug line-clamp-2 min-h-[3rem]">
                      {displayTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 min-h-[3.6rem]">
                      {displaySummary}
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="p-4 pt-0 border-t border-border/40 mt-3 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenDocument(item.id)}
                    className="flex-1 text-xs font-semibold gap-1.5"
                  >
                    <BookOpen className="size-3.5" />
                    {t.readRecordBtn}
                  </Button>
                  {onToggleDossierItem && (
                    <Button
                      variant={isInDossier ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() =>
                        onToggleDossierItem({
                          id: item.id,
                          title: item.title,
                          category: item.category,
                          year: item.year,
                          source: "BAWS / DAIC Central Archive",
                          type: "document",
                        })
                      }
                      className="text-xs gap-1"
                      title={isInDossier ? "In Dossier" : "Add to Dossier"}
                    >
                      {isInDossier ? (
                        <Check className="size-3.5 text-emerald-600" />
                      ) : (
                        <BookmarkPlus className="size-3.5 text-primary" />
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Interactive Constituent Assembly Debates ("Preamble & Rights Explorer") */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Scale className="size-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {t.debatesExplorerTitle}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t.debatesExplorerSub}
              </p>
            </div>
          </div>

          {/* Article Tabs */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl">
            {constitutionalDebates.map((debate, idx) => (
              <button
                key={debate.article}
                onClick={() => setSelectedDebateIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDebateIndex === idx
                    ? "bg-background text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {debate.article}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Debate Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {activeDebate.article}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {activeDebate.date}
              </span>
            </div>

            <h4 className="font-serif text-xl font-bold text-foreground">
              {activeDebate.title}
            </h4>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold block mb-1">
                {t.debatesQuoteLabel}
              </span>
              <p className="font-serif text-base italic text-foreground leading-relaxed">
                {activeDebate.quote}
              </p>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              <strong>{currentLanguage === "hindi" ? "ऐतिहासिक महत्व:" : currentLanguage === "marathi" ? "ऐतिहासिक महत्त्व:" : currentLanguage === "tamil" ? "வரலாற்று முக்கியத்துவம்:" : "Historical Significance:"}</strong> {activeDebate.assemblyNotes}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-border bg-muted/20 p-5 flex flex-col justify-between h-full gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                {currentLanguage === "hindi" ? "अभिलेखीय संदर्भ लिंक" : currentLanguage === "marathi" ? "अभिलेख संदर्भ लिंक" : currentLanguage === "tamil" ? "ஆவணப் பதிவு இணைப்பு" : "Archival Record Link"}
              </span>
              <h5 className="font-serif text-base font-bold text-foreground mt-1">
                {currentLanguage === "hindi" ? "संविधान सभा खंड VII" : currentLanguage === "marathi" ? "संविधान सभा खंड VII" : currentLanguage === "tamil" ? "அரசியலமைப்பு நிர்ணய சபை தொகுதி VII" : "Constituent Assembly Volume VII"}
              </h5>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {currentLanguage === "hindi" 
                  ? "संविधान सभा के सदस्यों द्वारा प्रस्तावित संशोधनों सहित संपूर्ण प्रतिलेख पढ़ें।"
                  : currentLanguage === "marathi"
                  ? "संविधान सभेच्या सदस्यांनी सुचवलेल्या दुरुस्त्यांसह संपूर्ण भाषण वाचा."
                  : currentLanguage === "tamil"
                  ? "அரசியலமைப்பு நிர்ணய சபை உறுப்பினர்கள் முன்மொழிந்த திருத்தங்களுடன் கூடிய முழுப் பிரதியைப் படிக்கவும்."
                  : "Read the complete transcript with amendments proposed by members of the Constituent Assembly."}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenDocument(activeDebate.docId)}
                className="w-full text-xs font-semibold gap-1.5"
              >
                <BookOpen className="size-3.5" />
                {t.readDebateBtn}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tool Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigate("graph")}
          className="cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Network className="size-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground">{t.toolGraphTitle}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[3rem]">
              {t.toolGraphDesc}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
            {t.toolGraphBtn} <ArrowRight className="size-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigate("audio")}
          className="cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Film className="size-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground">{t.toolAudioTitle}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[3rem]">
              {t.toolAudioDesc}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
            {t.toolAudioBtn} <ArrowRight className="size-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigate("scholar")}
          className="cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Sparkles className="size-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground">{t.toolScholarTitle}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[3rem]">
              {t.toolScholarDesc}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
            {t.toolScholarBtn} <ArrowRight className="size-3.5" />
          </div>
        </div>
      </div>
    </div>
  )
}

