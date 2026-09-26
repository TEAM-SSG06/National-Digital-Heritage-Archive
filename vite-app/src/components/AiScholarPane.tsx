import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Send, User, Volume2 } from "lucide-react"
import OnScreenKeyboard from "./OnScreenKeyboard"
import { getTranslation } from "@/utils/translations"
import { speakText } from "@/utils/speech"
import { sfx } from "@/utils/soundEffects"

interface Message {
  id: string
  sender: "user" | "scholar"
  text: string
  citations?: string[]
}

interface AiScholarPaneProps {
  currentLanguage?: string
}

export function AiScholarPane({ currentLanguage = "english" }: AiScholarPaneProps) {
  const t = getTranslation(currentLanguage)

  const suggestedPrompts = [
    t.suggestedQ1,
    t.suggestedQ2,
    t.suggestedQ3,
    t.suggestedQ4,
  ]

  const knowledgeBase: Record<string, Record<string, { answer: string; citations: string[] }>> = {
    federalism: {
      english: {
        answer:
          "Dr. Ambedkar described the Indian Constitution as 'both unitary and federal according to the requirements of time and circumstances'. In normal times, it functions as a federal union with distinct spheres of power, but during national emergencies, it converts automatically into a unitary system without constitutional amendments. He emphasized that the Indian federation is not the result of an agreement among states to secede, rendering the Union indestructible.",
        citations: ["Constituent Assembly Debates, Nov 4, 1948", "BAWS Vol 13"],
      },
      hindi: {
        answer:
          "डॉ. आंबेडकर ने भारतीय संविधान को 'समय और परिस्थितियों की आवश्यकताओं के अनुसार एकात्मक और संघीय दोनों' बताया। सामान्य काल में यह शक्तियों के स्पष्ट विभाजन के साथ एक संघीय प्रणाली के रूप में कार्य करता है, किंतु आपातकाल में यह बिना किसी संशोधन के स्वतः एकात्मक प्रणाली में परिवर्तित हो जाता है। उन्होंने बल दिया कि भारतीय संघ राज्यों के बीच अलग होने के किसी समझौते का परिणाम नहीं है, इसलिए यह संघ अविनाशी है।",
        citations: ["संविधान सभा की बहसें, ४ नवंबर १९४८", "बीएडब्ल्यूएस खंड १३"],
      },
      marathi: {
        answer:
          "डॉ. बाबासाहेब आंबेडकरांनी भारतीय संविधानाचे वर्णन 'वेळ आणि परिस्थितीनुसार संघराज्यीय आणि एकात्म दोन्ही' असे केले आहे. सामान्य काळात हे अधिकारांच्या विभाजनासह संघराज्य म्हणून कार्य करते, परंतु आणीबाणीच्या काळात ते एकात्म व्यवस्थेत रूपांतरित होते. भारतीय संघराज्य हे राज्यांमधील कराराचा परिणाम नाही, त्यामुळे हा संघ अविनाशी आहे.",
        citations: ["संविधान सभा वादविवाद, ४ नोव्हेंबर १९४८", "बीएडब्ल्यूएस खंड १३"],
      },
      tamil: {
        answer:
          "டாக்டர் அம்பேத்கர் இந்திய அரசியலமைப்பை 'காலம் மற்றும் சூழ்நிலைகளின் தேவைகளுக்கு ஏற்ப கூட்டாட்சியாகவும் ஒற்றையாட்சியாகவும்' செயல்படக்கூடியது என்று விவரித்தார்.",
        citations: ["அரசியலமைப்பு சபை விவாதங்கள், 4 நவம்பர் 1948"],
      },
    },
    article32: {
      english: {
        answer:
          "Dr. Ambedkar considered Article 32 paramount because without a constitutional remedy to enforce fundamental rights through judicial prerogative writs (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari), fundamental rights would remain mere paper declarations. He stated: 'If I was asked to name any particular article in this Constitution as the most important — an article without which this Constitution would be a nullity — I could not refer to any other article except this one.'",
        citations: ["CAD Vol VII, Dec 9, 1948", "Constitution of India, Part III"],
      },
      hindi: {
        answer:
          "डॉ. आंबेडकर ने अनुच्छेद ३२ को सर्वोपरि माना क्योंकि बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध आदि न्यायिक रिटों के माध्यम से मौलिक अधिकारों को लागू करने के संवैधानिक उपचार के बिना मौलिक अधिकार केवल कागजी घोषणाएं रह जाते। उन्होंने कहा: 'यदि मुझसे कोई पूछे कि इस संविधान में सबसे महत्वपूर्ण अनुच्छेद कौन सा है, जिसके बिना यह संविधान शून्य हो जाएगा, तो मैं अनुच्छेद ३२ के अतिरिक्त किसी अन्य अनुच्छेद का नाम नहीं ले सकता। यह संविधान की आत्मा और हृदय है।'",
        citations: ["संविधान सभा खंड ७, ९ दिसंबर १९४८", "भारतीय संविधान, भाग ३"],
      },
      marathi: {
        answer:
          "डॉ. आंबेडकरांनी कलम ३२ ला सर्वोच्च मानले कारण न्यायालयीन उपायांशिवाय मूलभूत हक्क केवळ कागदावर राहतील. ते म्हणाले: 'जर मला या संविधानातील सर्वात महत्त्वाचे कलम कोणते असे विचारले, तर मी कलम ३२ शिवाय दुसऱ्या कोणत्याही कलमाचा उल्लेख करणार नाही. हा संविधानाचा आत्मा आणि हृदय आहे.'",
        citations: ["संविधान सभा खंड ७, ९ डिसेंबर १९४८"],
      },
      tamil: {
        answer:
          "டாக்டர் அம்பேத்கர் பிரிவு 32 ஐ அரசியலமைப்பின் இதயம் மற்றும் ஆன்மா என்று அழைத்தார், ஏனெனில் இது குடிமக்களுக்கு அடிப்படை உரிமைகளை நிலைநாட்ட உச்ச நீதிமன்றத்தை அணுகும் நேரடி உரிமையை வழங்குகிறது.",
        citations: ["அரசியலமைப்பு சபை விவாதங்கள், 9 டிசம்பர் 1948"],
      },
    },
    rbi: {
      english: {
        answer:
          "Dr. Ambedkar's 1923 doctorate thesis 'The Problem of the Rupee: Its Origin and Its Solution' presented at the London School of Economics served as the primary economic foundation evaluated by the Royal Commission on Indian Currency and Finance (Hilton Young Commission) in 1926. The commission adopted Ambedkar's monetary economic principles regarding price stability, gold exchange standard, and automatic currency regulation when framing the Reserve Bank of India Act of 1934.",
        citations: ["The Problem of the Rupee (1923)", "BAWS Vol 6"],
      },
      hindi: {
        answer:
          "लंदन स्कूल ऑफ इकोनॉमिक्स में प्रस्तुत डॉ. आंबेडकर का १९२३ का शोध ग्रंथ 'द प्रॉब्लम ऑफ द रुपी: इट्स ओरिजिन एंड इट्स सॉल्यूशन' भारतीय मुद्रा और वित्त पर रॉयल कमीशन (हिल्टन यंग कमीशन, १९२६) के समक्ष मुख्य आधार बना। आयोग ने १९३४ के भारतीय रिज़र्व बैंक अधिनियम का प्रारूप तैयार करते समय आंबेडकर के मौद्रिक सिद्धांतों, मूल्य स्थिरता और केंद्रीय बैंक के दिशा-निर्देशों को पूरी तरह अपनाया।",
        citations: ["रुपये की समस्या (१९२३)", "बीएडब्ल्यूएस खंड ६"],
      },
      marathi: {
        answer:
          "डॉ. बाबासाहेब आंबेडकरांचा १९२३ चा 'द प्रॉब्लेम ऑफ द रुपी' हा शोधप्रबंध हिल्टन यंग कमिशनने आधारभूत मानला. त्या आधारावर १९३४ च्या रिझर्व्ह बँक ऑफ इंडिया कायद्याची रचना करण्यात आली.",
        citations: ["रुपयाची समस्या (१९२३)", "बीएडब्ल्यूएस खंड ६"],
      },
      tamil: {
        answer:
          "டாக்டர் அம்பேத்கரின் 'ரூபாயின் பிரச்சனை' (1923) ஆய்வு, ஹில்டன் யங் ஆணையத்தால் ஆராயப்பட்டு ரிசர்வ் வங்கி சட்டம் 1934 உருவாக்கத்திற்கு அடிப்படையாக அமைந்தது.",
        citations: ["ரூபாயின் பிரச்சனை (1923)"],
      },
    },
    mahad: {
      english: {
        answer:
          "The Mahad Satyagraha on March 20, 1927, led by Dr. Ambedkar at Chavdar Lake, Mahad, was India's first mass civil rights assertion. Dr. Ambedkar declared that the movement was not merely about drinking water, but about asserting basic human dignity, equality, and fundamental civic rights under the rule of law. It marked the dawn of organized Dalit self-respect and constitutional assertion.",
        citations: ["Bahishkrit Bharat (1927)", "BAWS Vol 17"],
      },
      hindi: {
        answer:
          "२० मार्च १९२७ को महाड़ के चवदार तालाब पर डॉ. आंबेडकर के नेतृत्व में हुआ सत्याग्रह भारत का प्रथम सामूहिक नागरिक अधिकार आंदोलन था। डॉ. आंबेडकर ने स्पष्ट किया कि यह संघर्ष केवल पानी पीने के लिए नहीं, बल्कि समाज में मानवीय गरिमा, समानता और स्वाभिमान की स्थापना के लिए है। इसने शोषित वर्ग में संगठित आत्मसम्मान और लोकतांत्रिक अधिकारों की ज्वाला प्रज्वलित की।",
        citations: ["बहिष्कृत भारत (१९२७)", "बीएडब्ल्यूएस खंड १७"],
      },
      marathi: {
        answer:
          "२० मार्च १९२७ रोजी महाडच्या चवदार तळ्यावर डॉ. बाबासाहेब आंबेडकरांच्या नेतृत्वाखाली झालेला सत्याग्रह हा भारताचा पहिला मानवी हक्क लढा होता. हा लढा केवळ पाण्यासाठी नसून मानवी प्रतिष्ठा आणि समतेसाठी होता.",
        citations: ["बहिष्कृत भारत (१९२७)", "बीएडब्ल्यूएस खंड १७"],
      },
      tamil: {
        answer:
          "20 மார்ச் 1927 அன்று மகத் சவ்தார் குளத்தில் அம்பேத்கர் தலைமையில் நடைபெற்ற சத்தியாகிரகம், குடிநீர் உரிமையைத் தாண்டி மனித மாண்பையும் சமத்துவத்தையும் நிலைநாட்டிய இந்தியாவின் முதல் மக்கள் சிவில் உரிமைப் போராட்டமாகும்.",
        citations: ["பஹிஷ்கிருத பாரதம் (1927)"],
      },
    },
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "scholar",
      text: t.scholarGreeting,
      citations: [t.citationsLabel || "BAWS Complete Works Volumes 1–22"],
    },
  ])

  // Synchronize initial greeting when currentLanguage changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === "scholar") {
        return [
          {
            id: "msg-1",
            sender: "scholar",
            text: t.scholarGreeting,
            citations: [t.citationsLabel || "BAWS Complete Works Volumes 1–22"],
          },
        ]
      }
      return prev
    })
  }, [currentLanguage, t.scholarGreeting, t.citationsLabel])

  const [inputQuery, setInputQuery] = useState("")

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim()
    if (!q) return

    sfx.playKeyClick("enter")

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputQuery("")

    // Generate grounded scholar response
    setTimeout(() => {
      const qLower = q.toLowerCase()
      let matchedKey = ""
      if (qLower.includes("federal") || qLower.includes("संघ") || qLower.includes("கூட்டாட்சி")) matchedKey = "federalism"
      else if (qLower.includes("article 32") || qLower.includes("32") || qLower.includes("heart and soul") || qLower.includes("आत्मा") || qLower.includes("हृदय") || qLower.includes("ஆன்மா")) matchedKey = "article32"
      else if (qLower.includes("reserve bank") || qLower.includes("rbi") || qLower.includes("rupee") || qLower.includes("रुपया") || qLower.includes("रिज़र्व") || qLower.includes("ரூபாய்"))
        matchedKey = "rbi"
      else if (qLower.includes("mahad") || qLower.includes("water") || qLower.includes("satyagraha") || qLower.includes("महाड") || qLower.includes("पानी") || qLower.includes("மகத்"))
        matchedKey = "mahad"

      const responseBundle = matchedKey ? knowledgeBase[matchedKey] : null
      const langKey = (["hindi", "marathi", "tamil"].includes(currentLanguage) ? currentLanguage : "english") as "english" | "hindi" | "marathi" | "tamil"
      const responseData = responseBundle ? (responseBundle[langKey] || responseBundle.english) : null

      const fallbackText: Record<string, string> = {
        english: `According to Dr. B. R. Ambedkar's writings in BAWS: "Political democracy cannot last unless there lies at the base of it social democracy. What does social democracy mean? It means a way of life which recognizes liberty, equality, and fraternity as the principles of life." Your inquiry regarding "${q}" touches upon these fundamental democratic foundations.`,
        hindi: `डॉ. बी. आर. आंबेडकर के वांग्मय के अनुसार: "राजनीतिक लोकतंत्र तब तक टिक नहीं सकता जब तक कि उसके आधार में सामाजिक लोकतंत्र न हो। सामाजिक लोकतंत्र का अर्थ क्या है? इसका अर्थ जीवन का वह मार्ग है जो स्वतंत्रता, समानता और बंधुत्व को जीवन के सिद्धांतों के रूप में मान्यता देता है।" "${q}" पर आपका प्रश्न इन्हीं बुनियादी संवैधानिक आधारों से जुड़ा है।`,
        marathi: `डॉ. बाबासाहेब आंबेडकरांच्या विचारानुसार: "जोपर्यंत सामाजिक लोकशाहीचा पाया रचला जात नाही तोपर्यंत राजकीय लोकशाही टिकू शकत नाही."`,
        tamil: `டாக்டர் அம்பேத்கரின் எழுத்துகளின்படி: "சமூக ஜனநாயகம் இல்லாமல் அரசியல் ஜனநாயகம் நிலைக்க முடியாது."`,
      }

      const scholarMsg: Message = {
        id: `scholar-${Date.now()}`,
        sender: "scholar",
        text: responseData ? responseData.answer : fallbackText[langKey] || fallbackText.english,
        citations: responseData
          ? responseData.citations
          : ["BAWS Volume 1", "Constituent Assembly Debates"],
      }

      setMessages((prev) => [...prev, scholarMsg])
    }, 500)
  }

  return (
    <div className="flex flex-col gap-6 py-6 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="size-4 text-primary" />
          <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
            {t.scholarBadge}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          {t.scholarTitle}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.scholarDesc}
        </p>
      </div>

      {/* Suggested Questions */}
      <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-card shadow-xs">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
          {t.suggestedInquiriesLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                sfx.playNavClick()
                handleSend(p)
              }}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground/90 transition-colors text-left"
            >
              “{p}”
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 shadow-sm min-h-[420px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {msg.sender === "scholar" ? (
              <Avatar className="size-8 border border-border shrink-0">
                <AvatarImage src="/images/ambedkar-portrait.jpg" alt="Scholar Bot" />
                <AvatarFallback>BRA</AvatarFallback>
              </Avatar>
            ) : (
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <User className="size-4" />
              </div>
            )}

            <div
              className={`rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground font-medium rounded-tr-xs"
                  : "bg-background border border-border text-foreground rounded-tl-xs shadow-xs"
              }`}
            >
              <p>{msg.text}</p>
              <div className="mt-3 pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span>{t.citationsLabel}</span>
                  {msg.citations?.map((c, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] font-mono">
                      📚 {c}
                    </Badge>
                  ))}
                </div>

                {msg.sender === "scholar" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(msg.text, currentLanguage)}
                    className="h-6 px-2 text-[10px] gap-1 text-primary hover:text-primary"
                    title="Read Aloud"
                  >
                    <Volume2 className="size-3" />
                    <span>Listen</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Query Input Box & Kiosk Touchscreen Keyboard */}
      <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3 shadow-xs">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={t.scholarInputPlaceholder}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="h-11 text-sm bg-background border-border"
          />
          <Button onClick={() => handleSend()} className="h-11 px-5 gap-2 font-semibold shrink-0">
            <span>{t.sendBtn}</span>
            <Send className="size-4" />
          </Button>
        </div>

        {/* On-Screen Touch Keyboard for Museum Kiosk */}
        <OnScreenKeyboard
          value={inputQuery}
          onChange={setInputQuery}
          onEnter={() => handleSend()}
          enterLabel="Ask AI ↵"
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  )
}
