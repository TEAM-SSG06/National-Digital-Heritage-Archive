// Comprehensive multilingual dictionary for English, Hindi, Marathi, and Tamil
// Built to ensure consistent text length and zero layout shifts across languages

export interface LocaleDict {
  // Brand & Header
  brandTitle: string
  brandSubtitle: string
  brandBadge: string
  navOverview: string
  navSearch: string
  navTimeline: string
  navGraph: string
  navAudio: string
  navScholar: string
  kioskButton: string
  dossierButton: string

  // Overview Page
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  exploreTimelineBtn: string
  searchCorpusBtn: string
  quoteBanner: string
  quoteAuthor: string
  metricWritings: string
  metricWritingsSub: string
  metricDebates: string
  metricDebatesSub: string
  metricPreservation: string
  metricPreservationSub: string
  metricTimeline: string
  metricTimelineSub: string
  featuredTreatisesTitle: string
  featuredTreatisesSub: string
  browseAllDocsBtn: string
  readRecordBtn: string
  debatesExplorerTitle: string
  debatesExplorerSub: string
  debatesQuoteLabel: string
  readDebateBtn: string
  toolGraphTitle: string
  toolGraphDesc: string
  toolGraphBtn: string
  toolAudioTitle: string
  toolAudioDesc: string
  toolAudioBtn: string
  toolScholarTitle: string
  toolScholarDesc: string
  toolScholarBtn: string

  // Knowledge Map Page
  mapBadge: string
  mapTitle: string
  mapSubtitle: string
  mapAllLocations: string

  // Search Page
  searchCatalogBadge: string
  searchCatalogSub: string
  searchPageTitle: string
  searchPageDesc: string
  searchPlaceholder: string
  showingMatchedPrefix: string
  showingMatchedSuffix: string
  catAll: string
  catWritings: string
  catDebates: string
  catEconomics: string
  catHistorical: string
  catLegal: string

  // Timeline Page
  timelineBadge: string
  timelineTitle: string
  timelineDesc: string
  metricMilestones: string
  metricEras: string
  metricYears: string
  timelineSearchPlaceholder: string
  audioTourStart: string
  audioTourPlaying: string
  viewTape: string
  viewStream: string
  viewSpine: string
  tapeHint: string
  eraAll: string
  eraEarly: string
  eraEducation: string
  eraCivil: string
  eraLabour: string
  eraConstitution: string
  eraLegacy: string
  narrateBtn: string
  viewDocBtn: string

  // Audio Vault Page
  audioVaultTitle: string
  audioVaultSubtitle: string
  audioTabLabel: string
  videoTabLabel: string
  audioPlaylistTitle: string
  transcriptTitle: string
  listenBtn: string
  resetBtn: string
  historicalSignificance: string
  speedLabel: string
  watchVideoBtn: string
  videoChaptersTitle: string
  watchOnYouTubeBtn: string
  closePlayerBtn: string

  // AI Scholar Page
  scholarBadge: string
  scholarTitle: string
  scholarDesc: string
  suggestedInquiriesLabel: string
  suggestedQ1: string
  suggestedQ2: string
  suggestedQ3: string
  suggestedQ4: string
  scholarGreeting: string
  scholarInputPlaceholder: string
  sendBtn: string
  citationsLabel: string

  // Document Drawer
  fullTextTab: string
  aiSummaryTab: string
  preservationTab: string
  listenAudioBtn: string
  verifiedSourceBadge: string
  langTranslationLabel: string
  summaryOverviewTitle: string
  originalTextTitle: string
  dismissBtn: string
  addToDossier: string
  inDossier: string

  // Dossier Drawer
  dossierTitle: string
  dossierDesc: string
  dossierEmptyTitle: string
  dossierEmptyDesc: string
  generateQrBtn: string
  clearAllBtn: string
  qrModalTitle: string
  qrModalDesc: string
  qrDoneBtn: string
  qrSyncedText: string

  // General Pavilion & Shell
  exhibitHallLabel: string
  pavilionLabel: string
  hallOfLabel: string
  prevBtn: string
  nextBtn: string
  sectionsTabLabel: string
  pagesLabel: string
  readFullRecordBtn: string
  downloadVideoBtn: string
  decadeLabel: string
  stageAndTape: string
  streamView: string
  chronicleView: string
  allDecades: string
  hideKeyboard: string
  showKeyboard: string
  footerText: string
  ambedkarLifeDates: string
}

export const TRANSLATIONS: Record<string, LocaleDict> = {
  english: {
    brandTitle: "Ambedkar Heritage",
    brandSubtitle: "Dr. Ambedkar International Centre (DAIC)",
    brandBadge: "Archive",
    navOverview: "Overview",
    navSearch: "Search",
    navTimeline: "Timeline",
    navGraph: "Knowledge Map",
    navAudio: "Audio & Video",
    navScholar: "AI Scholar",
    kioskButton: "Kiosk",
    dossierButton: "Dossier",

    heroBadge: "Ministry of Social Justice and Empowerment • DAIC",
    heroTitle: "National Digital Heritage Archive of Babasaheb Ambedkar",
    heroSubtitle: "An institutional AI knowledge repository preserving primary manuscripts, Constituent Assembly debates, economic treatises, and historical audio-visual recordings.",
    exploreTimelineBtn: "Explore Historical Timeline",
    searchCorpusBtn: "Search Archival Corpus",
    quoteBanner: "“Cultivation of mind should be the ultimate aim of human existence.”",
    quoteAuthor: "— Dr. B. R. Ambedkar",
    metricWritings: "Archival Writings & Speeches",
    metricWritingsSub: "22 Volumes Digitized",
    metricDebates: "Constituent Assembly Debates",
    metricDebatesSub: "2,840+ Verbatim Speeches",
    metricPreservation: "Preservation Standard",
    metricPreservationSub: "OAIS Level-4 • Dublin Core",
    metricTimeline: "Historical Timeline Milestones",
    metricTimelineSub: "6 Eras • 65 Years Mapped",
    featuredTreatisesTitle: "Featured Archival Treatises",
    featuredTreatisesSub: "High-resolution digitized manuscripts linked to historical evidence",
    browseAllDocsBtn: "Browse All Documents",
    readRecordBtn: "Read Primary Record",
    debatesExplorerTitle: "Constituent Assembly Debates Explorer",
    debatesExplorerSub: "Explore landmark constitutional discussions directly from verbatim parliamentary records (1946–1949).",
    debatesQuoteLabel: "Dr. B. R. Ambedkar’s Verbatim Address to the House:",
    readDebateBtn: "Read Debate Proceedings",
    toolGraphTitle: "Knowledge Graph",
    toolGraphDesc: "Explore interconnected concepts linking Fundamental Rights, Mahad Satyagraha, and economic reform.",
    toolGraphBtn: "Launch Graph",
    toolAudioTitle: "Audio & Video Vault",
    toolAudioDesc: "Archival television interviews, 1949 Constitution adoption footage, and remastered historic speeches.",
    toolAudioBtn: "Watch & Listen",
    toolScholarTitle: "AI Scholar Assistant",
    toolScholarDesc: "Query the corpus with semantic AI assistance strictly grounded in primary sources.",
    toolScholarBtn: "Ask Scholar",

    mapBadge: "Intellectual Cartography & Concept Atlas",
    mapTitle: "Ambedkar Intellectual Knowledge Atlas",
    mapSubtitle: "Interactive cartography of constitutional doctrines, economic theses, civil rights movements, and moral philosophy. Explore the neural pathways linking his foundational ideas.",
    mapAllLocations: "All Domains",

    searchCatalogBadge: "DAIC Central Catalog",
    searchCatalogSub: "22 Volumes Digitized",
    searchPageTitle: "Semantic Corpus Search",
    searchPageDesc: "Search across Dr. B. R. Ambedkar's treatises, parliamentary addresses, and Constituent Assembly proceedings with multilingual transcript access.",
    searchPlaceholder: "Search keywords, volumes, or topics (e.g. 'Article 32', 'Caste', 'Currency', 'Fraternity')...",
    showingMatchedPrefix: "Showing",
    showingMatchedSuffix: "matched archival documents",
    catAll: "All Works",
    catWritings: "Writings & Speeches",
    catDebates: "Constituent Assembly",
    catEconomics: "Economics",
    catHistorical: "Historical",
    catLegal: "Legal Manuscripts",

    timelineBadge: "Historical Chronology • 1891–1956",
    timelineTitle: "The Archival Odyssey of Babasaheb Ambedkar",
    timelineDesc: "Six decades of revolutionary scholarship, civil rights mobilizations, constitutional architecture, and moral renaissance mapped with primary historical records.",
    metricMilestones: "Milestones",
    metricEras: "Historical Eras",
    metricYears: "Years Mapped",
    timelineSearchPlaceholder: "Search milestones, locations, or years...",
    audioTourStart: "Audio Chronicle Tour",
    audioTourPlaying: "Narration Playing...",
    viewTape: "Interactive Chrono-Tape",
    viewStream: "Continuous Stream",
    viewSpine: "Museum Chronicle",
    tapeHint: "Drag or tap timeline pins to explore chronological events",
    eraAll: "All Eras (1891–1956)",
    eraEarly: "1891–1912: Formative",
    eraEducation: "1913–1923: Columbia & London",
    eraCivil: "1924–1936: Civil Rights",
    eraLabour: "1937–1946: Labour & Governance",
    eraConstitution: "1947–1950: Constitution Architect",
    eraLegacy: "1951–1956: Navayana & Legacy",
    narrateBtn: "Narrate",
    viewDocBtn: "View Document",

    audioVaultTitle: "Audio-Video Archival Repository",
    audioVaultSubtitle: "Listen to remastered speeches and watch archival documentaries and interviews of Dr. B. R. Ambedkar.",
    audioTabLabel: "Historic Speeches (Audio)",
    videoTabLabel: "Documentaries & Footage (Video)",
    audioPlaylistTitle: "Archival Audio Tracks",
    transcriptTitle: "Verbatim Archival Transcript",
    listenBtn: "Press Play to Listen",
    resetBtn: "Reset",
    historicalSignificance: "Historical Significance:",
    speedLabel: "Speed:",
    watchVideoBtn: "Watch Video Archive",
    videoChaptersTitle: "Video Chapters & Key Historical Interventions",
    watchOnYouTubeBtn: "Watch on YouTube ↗",
    closePlayerBtn: "Close Player",

    scholarBadge: "Primary Source AI Grounding",
    scholarTitle: "Dr. Ambedkar AI Scholar Assistant",
    scholarDesc: "Ask scholarly questions grounded directly in the 22 volumes of Babasaheb Ambedkar's writings and debates.",
    suggestedInquiriesLabel: "Suggested Archival Research Inquiries:",
    suggestedQ1: "What were Dr. Ambedkar's views on federalism?",
    suggestedQ2: "Why did Dr. Ambedkar call Article 32 the heart and soul of the Constitution?",
    suggestedQ3: "How did Dr. Ambedkar contribute to the establishment of the Reserve Bank of India?",
    suggestedQ4: "What was the core significance of the Mahad Satyagraha in 1927?",
    scholarGreeting: "Greetings. I am the AI Scholar Assistant for the Dr. B. R. Ambedkar Digital Heritage Archive. You may query my knowledge base on Dr. Ambedkar's constitutional philosophy, economic treatises, social reform movements, and primary writings.",
    scholarInputPlaceholder: "Ask a scholarly question about Dr. Ambedkar's treatises or debates...",
    sendBtn: "Send",
    citationsLabel: "Citations:",

    fullTextTab: "Full Manuscript Text",
    aiSummaryTab: "AI Key Summary (60s TL;DR)",
    preservationTab: "Archival Metadata & Preservation",
    listenAudioBtn: "Listen Audio Narration",
    verifiedSourceBadge: "Verified Source",
    langTranslationLabel: "Language Translation:",
    summaryOverviewTitle: "Overview Synopsis",
    originalTextTitle: "Original Primary Text Excerpt",
    dismissBtn: "Dismiss",
    addToDossier: "Add to Dossier",
    inDossier: "In Dossier",

    dossierTitle: "Visitor Research Dossier",
    dossierDesc: "Compiled writings, debates, and audio-visual records for study and mobile takeaway.",
    dossierEmptyTitle: "Your Research Dossier is Empty",
    dossierEmptyDesc: "As you explore the kiosk, tap the “Add to Dossier” icon on any manuscript, speech, or Constituent Assembly debate to compile your custom reading portfolio.",
    generateQrBtn: "Generate Mobile QR Pass",
    clearAllBtn: "Clear All",
    qrModalTitle: "Scan to Take Research Home",
    qrModalDesc: "Point your smartphone camera at this code to access your compiled works on the go.",
    qrDoneBtn: "Done / Return to Kiosk",
    qrSyncedText: "Dossier synchronized to DAIC Cloud Server",

    exhibitHallLabel: "EXHIBIT HALL",
    pavilionLabel: "Pavilion",
    hallOfLabel: "Hall 0{current} of 0{total}",
    prevBtn: "Prev",
    nextBtn: "Next",
    sectionsTabLabel: "SECTIONS",
    pagesLabel: "Pages",
    readFullRecordBtn: "Read Full Record",
    downloadVideoBtn: "Download Video (MP4)",
    decadeLabel: "Decade:",
    stageAndTape: "Stage & Tape",
    streamView: "Stream",
    chronicleView: "Chronicle",
    allDecades: "ALL",
    hideKeyboard: "▾ Hide Keyboard",
    showKeyboard: "▸ Show Keyboard",
    footerText: "© 2026 Dr. Ambedkar International Centre (DAIC), New Delhi · Central Institutional Digital Heritage Repository",
    ambedkarLifeDates: "Dr. B. R. Ambedkar (1891–1956)",
  },

  hindi: {
    brandTitle: "आंबेडकर डिजिटल धरोहर",
    brandSubtitle: "डॉ. आंबेडकर अंतर्राष्ट्रीय केंद्र (DAIC)",
    brandBadge: "अभिलेखागार",
    navOverview: "अवलोकन",
    navSearch: "खोज",
    navTimeline: "समयरेखा",
    navGraph: "ज्ञान मानचित्र",
    navAudio: "ध्वनि व वीडियो",
    navScholar: "एआई शोध सहायक",
    kioskButton: "कियोस्क",
    dossierButton: "शोध संकलन",

    heroBadge: "सामाजिक न्याय एवं अधिकारिता मंत्रालय • DAIC",
    heroTitle: "बाबासाहेब डॉ. बी. आर. आंबेडकर राष्ट्रीय डिजिटल धरोहर",
    heroSubtitle: "मूल पांडुलिपियों, संविधान सभा की बहसों, आर्थिक ग्रंथों और ऐतिहासिक ऑडियो-वीडियो अभिलेखों का आधुनिक ज्ञान मंच।",
    exploreTimelineBtn: "ऐतिहासिक समयरेखा देखें",
    searchCorpusBtn: "अभिलेख संग्रह खोजें",
    quoteBanner: "“मन का विकास मानव अस्तित्व का अंतिम लक्ष्य होना चाहिए।”",
    quoteAuthor: "— डॉ. बी. आर. आंबेडकर",
    metricWritings: "अभिलेखीय लेखन व भाषण",
    metricWritingsSub: "22 खंड डिजिटाइज़्ड",
    metricDebates: "संविधान सभा की बहसें",
    metricDebatesSub: "2,840+ मूल भाषण",
    metricPreservation: "संरक्षण मानक",
    metricPreservationSub: "OAIS स्तर-4 • डबलिन कोर",
    metricTimeline: "ऐतिहासिक समयरेखा मील के पत्थर",
    metricTimelineSub: "6 युग • 65 वर्षों का इतिहास",
    featuredTreatisesTitle: "प्रमुख अभिलेखीय ग्रंथ",
    featuredTreatisesSub: "ऐतिहासिक प्रमाणों से जुड़ी उच्च-रिज़ॉल्यूशन डिजिटाइज़्ड पांडुलिपियां",
    browseAllDocsBtn: "सभी दस्तावेज़ देखें",
    readRecordBtn: "मूल अभिलेख पढ़ें",
    debatesExplorerTitle: "संविधान सभा बहस अन्वेषक",
    debatesExplorerSub: "1946-1949 की ऐतिहासिक संसदीय बहसों को सीधे आधिकारिक पाठ से समझें।",
    debatesQuoteLabel: "डॉ. बी. आर. आंबेडकर का सदन में मूल संबोधन:",
    readDebateBtn: "बहस की कार्यवाही पढ़ें",
    toolGraphTitle: "ज्ञान मानचित्र",
    toolGraphDesc: "मौलिक अधिकारों, महाड़ सत्याग्रह और आर्थिक सुधारों को जोड़ने वाले विचारों का अन्वेषण करें।",
    toolGraphBtn: "मानचित्र खोलें",
    toolAudioTitle: "ऑडियो और वीडियो संग्रह",
    toolAudioDesc: "दुर्लभ टेलीविज़न साक्षात्कार, 1949 संविधान प्रस्तुति फुटेज और पुनर्निर्मित ऐतिहासिक भाषण।",
    toolAudioBtn: "देखें और सुनें",
    toolScholarTitle: "एआई शोध सहायक",
    toolScholarDesc: "प्राथमिक ऐतिहासिक स्रोतों पर आधारित कृत्रिम बुद्धिमत्ता से शोध प्रश्न पूछें।",
    toolScholarBtn: "सहायक से पूछें",

    mapBadge: "वैचारिक मानचित्रावली एवं ज्ञान एटलस",
    mapTitle: "डॉ. आंबेडकर वैचारिक ज्ञान एटलस",
    mapSubtitle: "संवैधानिक सिद्धांतों, आर्थिक विचारों, नागरिक अधिकार आंदोलनों और दर्शन का इंटरैक्टिव मानचित्र।",
    mapAllLocations: "सभी वैचारिक क्षेत्र",

    searchCatalogBadge: "DAIC केंद्रीय सूची",
    searchCatalogSub: "22 खंड डिजिटाइज़्ड",
    searchPageTitle: "अर्थपूर्ण अभिलेख खोज",
    searchPageDesc: "डॉ. बी. आर. आंबेडकर के ग्रंथों, संसदीय भाषणों और संविधान सभा की बहसों में बहुभाषी खोज करें।",
    searchPlaceholder: "कीवर्ड, खंड या विषय खोजें (उदा. 'अनुच्छेद 32', 'जाति', 'रुपया', 'बंधुत्व')...",
    showingMatchedPrefix: "प्रदर्शित",
    showingMatchedSuffix: "प्रासंगिक ऐतिहासिक दस्तावेज़",
    catAll: "सभी रचनाएं",
    catWritings: "लेखन व भाषण",
    catDebates: "संविधान सभा",
    catEconomics: "अर्थशास्त्र",
    catHistorical: "ऐतिहासिक",
    catLegal: "कानूनी पांडुलिपियां",

    timelineBadge: "ऐतिहासिक कालक्रम • 1891–1956",
    timelineTitle: "बाबासाहेब आंबेडकर की ऐतिहासिक जीवन यात्रा",
    timelineDesc: "छह दशकों का क्रांतिकारी शोध, नागरिक अधिकार आंदोलन, संविधान निर्माण और नैतिक पुनर्जागरण।",
    metricMilestones: "मील के पत्थर",
    metricEras: "ऐतिहासिक युग",
    metricYears: "वर्ष अंकित",
    timelineSearchPlaceholder: "मील के पत्थर, स्थान या वर्ष खोजें...",
    audioTourStart: "ऑडियो कालक्रम यात्रा",
    audioTourPlaying: "ऑडियो विवरण जारी...",
    viewTape: "इंटरएक्टिव समयरेखा फ़ीता",
    viewStream: "निरंतर प्रवाह",
    viewSpine: "संग्रहालय कालक्रम",
    tapeHint: "इतिहास के पन्नों को पलटने के लिए समयरेखा फ़ीते पर टैप या ड्रैग करें",
    eraAll: "सभी युग (1891–1956)",
    eraEarly: "1891–1912: प्रारंभिक वर्ष",
    eraEducation: "1913–1923: कोलंबिया व लंदन",
    eraCivil: "1924–1936: नागरिक अधिकार",
    eraLabour: "1937–1946: श्रम व शासन",
    eraConstitution: "1947–1950: संविधान निर्माता",
    eraLegacy: "1951–1956: नवयान व विरासत",
    narrateBtn: "सुनाएं",
    viewDocBtn: "दस्तावेज़ देखें",

    audioVaultTitle: "दृश्य-श्रव्य अभिलेखागार एवं ऐतिहासिक फुटेज",
    audioVaultSubtitle: "डॉ. बी. आर. आंबेडकर के ऐतिहासिक भाषण सुनें तथा दुर्लभ वृत्तचित्र एवं साक्षात्कार देखें।",
    audioTabLabel: "ऐतिहासिक भाषण (ऑडियो)",
    videoTabLabel: "वृत्तचित्र एवं फुटेज (वीडियो)",
    audioPlaylistTitle: "अभिलेखीय ऑडियो ट्रैक",
    transcriptTitle: "मूल अभिलेखीय प्रतिलेख",
    listenBtn: "सुनने के लिए प्ले दबाएं",
    resetBtn: "रीसेट करें",
    historicalSignificance: "ऐतिहासिक महत्व:",
    speedLabel: "गति:",
    watchVideoBtn: "वीडियो अभिलेख देखें",
    videoChaptersTitle: "वीडियो अध्याय एवं मुख्य ऐतिहासिक क्षण",
    watchOnYouTubeBtn: "यूट्यूब पर देखें ↗",
    closePlayerBtn: "प्लेयर बंद करें",

    scholarBadge: "प्राथमिक स्रोत आधारित एआई",
    scholarTitle: "डॉ. आंबेडकर एआई शोध सहायक",
    scholarDesc: "बाबासाहेब आंबेडकर के 22 खंडों के संपूर्ण वांग्मय पर आधारित विद्वत्तापूर्ण प्रश्न पूछें।",
    suggestedInquiriesLabel: "सुझाए गए शोध प्रश्न:",
    suggestedQ1: "संघवाद पर डॉ. आंबेडकर के क्या विचार थे?",
    suggestedQ2: "डॉ. आंबेडकर ने अनुच्छेद 32 को संविधान की आत्मा क्यों कहा?",
    suggestedQ3: "भारतीय रिज़र्व बैंक (RBI) की स्थापना में डॉ. आंबेडकर का क्या योगदान था?",
    suggestedQ4: "1927 के महाड़ सत्याग्रह का मूल महत्व क्या था?",
    scholarGreeting: "नमस्ते। मैं डॉ. बी. आर. आंबेडकर डिजिटल धरोहर का एआई शोध सहायक हूँ। आप मुझसे डॉ. आंबेडकर के संवैधानिक दर्शन, आर्थिक ग्रंथों और सामाजिक सुधार आंदोलनों पर प्रश्न पूछ सकते हैं।",
    scholarInputPlaceholder: "डॉ. आंबेडकर के विचारों या बहसों पर प्रश्न पूछें...",
    sendBtn: "भेजें",
    citationsLabel: "प्रमाणिक संदर्भ:",

    fullTextTab: "मूल पांडुलिपि पाठ",
    aiSummaryTab: "एआई मुख्य सारांश (60s)",
    preservationTab: "अभिलेखीय मेटाडेटा एवं संरक्षण",
    listenAudioBtn: "ऑडियो विवरण सुनें",
    verifiedSourceBadge: "सत्यापित स्रोत",
    langTranslationLabel: "भाषा अनुवाद:",
    summaryOverviewTitle: "संक्षिप्त सारांश",
    originalTextTitle: "मूल प्राथमिक पाठ उद्धरण",
    dismissBtn: "बंद करें",
    addToDossier: "संग्रह में जोड़ें",
    inDossier: "संग्रहित",

    dossierTitle: "आगंतुक शोध संग्रह (डॉसियर)",
    dossierDesc: "अध्ययन और मोबाइल पर ले जाने हेतु संकलित लेख, बहसें और दृश्य-श्रव्य सामग्री।",
    dossierEmptyTitle: "आपका शोध संग्रह खाली है",
    dossierEmptyDesc: "कियोस्क ब्राउज़ करते समय किसी भी दस्तावेज़, भाषण या बहस पर 'संग्रह में जोड़ें' बटन दबाएं।",
    generateQrBtn: "मोबाइल क्यूआर पास बनाएं",
    clearAllBtn: "सभी हटाएं",
    qrModalTitle: "शोध घर ले जाने हेतु स्कैन करें",
    qrModalDesc: "अपने मोबाइल कैमरे से यह क्यूआर कोड स्कैन करें और संकलित सामग्री अपने फोन पर पढ़ें।",
    qrDoneBtn: "पूर्ण / कियोस्क पर लौटें",
    qrSyncedText: "DAIC क्लाउड सर्वर पर संकलन सुरक्षित",

    exhibitHallLabel: "प्रदर्शनी कक्ष",
    pavilionLabel: "दीर्घा",
    hallOfLabel: "दीर्घा ०{current} / ०{total}",
    prevBtn: "पिछला",
    nextBtn: "अगला",
    sectionsTabLabel: "खंड",
    pagesLabel: "पृष्ठ",
    readFullRecordBtn: "पूरा अभिलेख पढ़ें",
    downloadVideoBtn: "वीडियो डाउनलोड करें (MP4)",
    decadeLabel: "दशक:",
    stageAndTape: "स्टेज व फ़ीता",
    streamView: "प्रवाह",
    chronicleView: "कालक्रम",
    allDecades: "सभी",
    hideKeyboard: "▾ कीबोर्ड छिपाएं",
    showKeyboard: "▸ कीबोर्ड दिखाएं",
    footerText: "© २०२६ डॉ. आंबेडकर अंतर्राष्ट्रीय केंद्र (DAIC), नई दिल्ली • केंद्रीय संस्थागत डिजिटल धरोहर अभिलेखागार",
    ambedkarLifeDates: "डॉ. बी. आर. आंबेडकर (१८९१–१९५६)",
  },

  marathi: {
    brandTitle: "आंबेडकर डिजिटल वारसा",
    brandSubtitle: "डॉ. आंबेडकर आंतरराष्ट्रीय केंद्र (DAIC)",
    brandBadge: "अभिलेखागार",
    navOverview: "आढावा",
    navSearch: "शोध",
    navTimeline: "कालरेषा",
    navGraph: "ज्ञान नकाशा",
    navAudio: "ध्वनी व चित्रफित",
    navScholar: "एआय अभ्यासक",
    kioskButton: "किऑस्क",
    dossierButton: "संशोधन संकलन",

    heroBadge: "सामाजिक न्याय व अधिकारिता मंत्रालय • DAIC",
    heroTitle: "भारतरत्न डॉ. बाबासाहेब आंबेडकर राष्ट्रीय डिजिटल वारसा",
    heroSubtitle: "मूळ हस्तलिखिते, संविधान सभेतील भाषणे, अर्थशास्त्रीय ग्रंथ आणि ऐतिहासिक ध्वनी-चित्रफितींचे आधुनिक डिजिटल दालन.",
    exploreTimelineBtn: "ऐतिहासिक कालरेषा पहा",
    searchCorpusBtn: "ऐतिहासिक संग्रह शोधा",
    quoteBanner: "“शिका, संघटित व्हा आणि संघर्ष करा.”",
    quoteAuthor: "— डॉ. बाबासाहेब आंबेडकर",
    metricWritings: "अभिलेखीय लेखन व भाषणे",
    metricWritingsSub: "२२ खंड डिजिटाइझ",
    metricDebates: "संविधान सभेतील वादविवाद",
    metricDebatesSub: "२,८४०+ मूळ भाषणे",
    metricPreservation: "जतन मानक",
    metricPreservationSub: "OAIS स्तर-४ • डब्लिन कोर",
    metricTimeline: "ऐतिहासिक कालरेषा टप्पे",
    metricTimelineSub: "६ युगे • ६५ वर्षांचा इतिहास",
    featuredTreatisesTitle: "वैशिष्ट्यपूर्ण ऐतिहासिक ग्रंथ",
    featuredTreatisesSub: "ऐतिहासिक पुराव्यांशी जोडलेली उच्च-गुणवत्तेची डिजिटाइझ हस्तलिखिते",
    browseAllDocsBtn: "सर्व दस्तऐवज पहा",
    readRecordBtn: "मूळ दस्तऐवज वाचा",
    debatesExplorerTitle: "संविधान सभा वादविवाद दालन",
    debatesExplorerSub: "१९४६-१९४९ दरम्यान संसदेतील ऐतिहासिक वादविवाद थेट मूळ नोंदींमधून अनुभवा.",
    debatesQuoteLabel: "डॉ. बाबासाहेब आंबेडकरांचे सभागृहातील मूळ भाषण:",
    readDebateBtn: "सभागृहाचे कामकाज वाचा",
    toolGraphTitle: "ज्ञान नकाशा",
    toolGraphDesc: "मूलभूत हक्क, महाड सत्याग्रह आणि आर्थिक सुधारणांना जोडणाऱ्या संकल्पनांचा मागोवा घ्या.",
    toolGraphBtn: "नकाशा सुरू करा",
    toolAudioTitle: "ध्वनी व चित्रफित संग्रह",
    toolAudioDesc: "दुर्मिळ दूरदर्शन मुलाखती, १९४९ संविधान सुपूर्त केल्याची चित्रफीत आणि पुनर्निर्मित भाषणे.",
    toolAudioBtn: "पहा आणि ऐका",
    toolScholarTitle: "एआय अभ्यासक सहाय्यक",
    toolScholarDesc: "मूळ ऐतिहासिक संदर्भांवर आधारित कृत्रिम बुद्धिमत्तेकडून उत्तरे मिळवा.",
    toolScholarBtn: "अभ्यासकाला विचारा",

    mapBadge: "वैचारिक मानचित्रावली व ज्ञान नकाशा",
    mapTitle: "डॉ. आंबेडकर विचार व ज्ञान एटलस",
    mapSubtitle: "घटनात्मक विचार, अर्थशास्त्र, सामाजिक लढे आणि नवयान तत्त्वज्ञानाचा परस्पर जोडणारा संवाद नकाशा.",
    mapAllLocations: "सर्व ज्ञानक्षेत्रे",

    searchCatalogBadge: "DAIC केंद्रीय सूची",
    searchCatalogSub: "२२ खंड डिजिटाइझ",
    searchPageTitle: "अर्थपूर्ण ऐतिहासिक शोध",
    searchPageDesc: "डॉ. बाबासाहेब आंबेडकरांचे ग्रंथ, संसदीय भाषणे आणि संविधान सभेतील भाषणांमध्ये बहुभाषिक शोध घ्या.",
    searchPlaceholder: "कीवर्ड किंवा विषय शोधा (उदा. 'कलम ३२', 'जाती', 'रुपया', 'बंधुता')...",
    showingMatchedPrefix: "दाखवत आहे",
    showingMatchedSuffix: "संबंधित ऐतिहासिक दस्तऐवज",
    catAll: "सर्व साहित्य",
    catWritings: "लेखन व भाषणे",
    catDebates: "संविधान सभा",
    catEconomics: "अर्थशास्त्र",
    catHistorical: "ऐतिहासिक",
    catLegal: "कायदेशीर हस्तलिखिते",

    timelineBadge: "ऐतिहासिक कालक्रम • १८९१–१९५६",
    timelineTitle: "डॉ. बाबासाहेब आंबेडकरांची ऐतिहासिक जीवनगाथा",
    timelineDesc: "सहा दशकांचे क्रांतिकारक संशोधन, मानवी हक्क लढा, संविधान निर्मिती आणि नैतिक पुनरुज्जीवन.",
    metricMilestones: "महत्त्वाचे टप्पे",
    metricEras: "ऐतिहासिक युगे",
    metricYears: "वर्षांचा प्रवास",
    timelineSearchPlaceholder: "टप्पे, ठिकाण किंवा वर्ष शोधा...",
    audioTourStart: "ऑडिओ कालरेषा दौरा",
    audioTourPlaying: "ऑडिओ सुरू आहे...",
    viewTape: "इंटरएक्टिव्ह कालरेषा पट्टी",
    viewStream: "सलग प्रवाह",
    viewSpine: "संग्रहालय कालक्रम",
    tapeHint: "इतिहासाचा मागोवा घेण्यासाठी कालरेषेवरील चिन्हांवर टॅप किंवा ड्रॅग करा",
    eraAll: "सर्व युगे (१८९१–१९५६)",
    eraEarly: "१८९१–१९१२: सुरुवातीची वर्षे",
    eraEducation: "१९१३–१९२३: कोलंबिया व लंडन",
    eraCivil: "१९२४–१९३६: नागरी हक्क लढा",
    eraLabour: "१९३७–१९४६: कामगार व प्रशासन",
    eraConstitution: "१९४७–१९५०: संविधान निर्माते",
    eraLegacy: "१९५१–१९५६: नवयान व वारसा",
    narrateBtn: "ऐकवा",
    viewDocBtn: "दस्तऐवज पहा",

    audioVaultTitle: "दृक-श्राव्य ऐतिहासिक संग्रह",
    audioVaultSubtitle: "डॉ. बाबासाहेब आंबेडकरांची मूळ भाषणे ऐका आणि दुर्मिळ ऐतिहासिक माहितीपट व चित्रफिती पहा.",
    audioTabLabel: "ऐतिहासिक भाषणे (ऑडिओ)",
    videoTabLabel: "माहितीपट व चित्रफिती (व्हिडिओ)",
    audioPlaylistTitle: "अभिलेखीय ऑडिओ ट्रॅक",
    transcriptTitle: "मूळ लिखित प्रतिलेख",
    listenBtn: "ऐकण्यासाठी प्ले करा",
    resetBtn: "रीसेट करा",
    historicalSignificance: "ऐतिहासिक महत्त्व:",
    speedLabel: "गती:",
    watchVideoBtn: "व्हिडिओ संग्रह पहा",
    videoChaptersTitle: "व्हिडिओ अध्याय व महत्त्वाचे ऐतिहासिक क्षण",
    watchOnYouTubeBtn: "यूट्यूबवर पहा ↗",
    closePlayerBtn: "प्लेयर बंद करा",

    scholarBadge: "मूळ संदर्भांवर आधारित एआय",
    scholarTitle: "डॉ. आंबेडकर एआय अभ्यासक सहाय्यक",
    scholarDesc: "डॉ. बाबासाहेब आंबेडकरांच्या २२ खंडांमधील साहित्यावर आधारित अभ्यासपूर्ण प्रश्न विचारा.",
    suggestedInquiriesLabel: "सुचवलेले संशोधन प्रश्न:",
    suggestedQ1: "संघराज्यावर डॉ. आंबेडकरांचे काय विचार होते?",
    suggestedQ2: "डॉ. आंबेडकरांनी कलम ३२ ला संविधानाचा आत्मा का म्हटले?",
    suggestedQ3: "रिझर्व्ह बँकेच्या स्थापनेत डॉ. आंबेडकरांचे काय योगदान होते?",
    suggestedQ4: "१९२७ च्या महाड सत्याग्रहाचे मूळ महत्त्व काय होते?",
    scholarGreeting: "जय भीम. मी डॉ. आंबेडकर डिजिटल वारसा दालनाचा एआय अभ्यासक आहे. आपण मला संविधानाचे तत्त्वज्ञान, अर्थशास्त्र आणि सामाजिक चळवळींविषयी विचारू शकता.",
    scholarInputPlaceholder: "डॉ. आंबेडकरांच्या ग्रंथांवर किंवा विचारांवर प्रश्न विचारा...",
    sendBtn: "पाठवा",
    citationsLabel: "प्रमाणित संदर्भ:",

    fullTextTab: "मूळ हस्तलिखित मजकूर",
    aiSummaryTab: "एआय महत्त्वाचा सारांश (60s)",
    preservationTab: "अभिलेखीय माहिती व जतन",
    listenAudioBtn: "ऑडिओ कथन ऐका",
    verifiedSourceBadge: "प्रमाणित स्रोत",
    langTranslationLabel: "भाषांतर:",
    summaryOverviewTitle: "थोडक्यात आढावा",
    originalTextTitle: "मूळ मजकूर उतारा",
    dismissBtn: "बंद करा",
    addToDossier: "संकलनात जोडा",
    inDossier: "संकलित",

    dossierTitle: "अभ्यासक संशोधन संकलन (डॉसियर)",
    dossierDesc: "अभ्यासासाठी आणि मोबाईलवर नेण्यासाठी संकलित साहित्य, वादविवाद व चित्रफिती.",
    dossierEmptyTitle: "आपले संशोधन संकलन रिकामे आहे",
    dossierEmptyDesc: "कोणत्याही ग्रंथावर किंवा भाषणावर 'संकलनात जोडा' टॅप करून आपले वैयक्तिक संकलन तयार करा.",
    generateQrBtn: "मोबाईल क्यूआर पास तयार करा",
    clearAllBtn: "सर्व हटवा",
    qrModalTitle: "संशोधन मोबाईलवर नेण्यासाठी स्कॅन करा",
    qrModalDesc: "हा क्यूआर कोड आपल्या स्मार्टफोनने स्कॅन करा आणि संकलित माहिती सोबत घेऊन जा.",
    qrDoneBtn: "पूर्ण / परत या",
    qrSyncedText: "DAIC सर्व्हरवर संकलन सुरक्षित जतन झाले आहे",

    exhibitHallLabel: "प्रदर्शन कक्ष",
    pavilionLabel: "दालन",
    hallOfLabel: "दालन ०{current} / ०{total}",
    prevBtn: "मागे",
    nextBtn: "पुढे",
    sectionsTabLabel: "विभाग",
    pagesLabel: "पाने",
    readFullRecordBtn: "संपूर्ण दस्तऐवज वाचा",
    downloadVideoBtn: "व्हिडिओ डाउनलोड करा (MP4)",
    decadeLabel: "दशक:",
    stageAndTape: "स्टेज व फीत",
    streamView: "सलग प्रवाह",
    chronicleView: "कालक्रम",
    allDecades: "सर्व",
    hideKeyboard: "▾ कीबोर्ड लपवा",
    showKeyboard: "▸ कीबोर्ड दाखवा",
    footerText: "© २०२६ डॉ. आंबेडकर आंतरराष्ट्रीय केंद्र (DAIC), नवी दिल्ली • मध्यवर्ती डिजिटल वारसा अभिलेखागार",
    ambedkarLifeDates: "डॉ. बाबासाहेब आंबेडकर (१८९१–१९५६)",
  },

  tamil: {
    brandTitle: "அம்பேத்கர் மரபு",
    brandSubtitle: "டாக்டர் அம்பேத்கர் சர்வதேச மையம் (DAIC)",
    brandBadge: "ஆவணக் காப்பகம்",
    navOverview: "மேலோட்டம்",
    navSearch: "தேடல்",
    navTimeline: "காலவரிசை",
    navGraph: "அறிவு வரைபடம்",
    navAudio: "ஒலி-ஒளி காப்பகம்",
    navScholar: "AI உதவியாளர்",
    kioskButton: "கியோஸ்க்",
    dossierButton: "தொகுப்பு",

    heroBadge: "சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம் • DAIC",
    heroTitle: "பாபாசாகேப் டாக்டர் பி. ஆர். அம்பேத்கர் தேசிய டிஜிட்டல் காப்பகம்",
    heroSubtitle: "கையெழுத்துப் பிரதிகள், அரசியல் நிர்ணய சபை விவாதங்கள், பொருளாதார நூல்கள் மற்றும் வரலாற்று ஆடியோ-வீடியோ காப்பகம்.",
    exploreTimelineBtn: "வரலாற்று காலவரிசையை ஆராய்க",
    searchCorpusBtn: "காப்பகத்தை தேடுக",
    quoteBanner: "“கற்பி, ஒன்றுசேர், புரட்சி செய்.”",
    quoteAuthor: "— டாக்டர் பி. ஆர். அம்பேத்கர்",
    metricWritings: "எழுத்துக்கள் மற்றும் உரைகள்",
    metricWritingsSub: "22 தொகுதிகள் டிஜிட்டல் மயமாக்கப்பட்டன",
    metricDebates: "அரசியல் நிர்ணய சபை விவாதங்கள்",
    metricDebatesSub: "2,840+ நேரடி உரைகள்",
    metricPreservation: "பாதுகாப்பு தரம்",
    metricPreservationSub: "OAIS நிலை-4 • டப்ளின் கோர்",
    metricTimeline: "வரலாற்று மைல்கற்கள்",
    metricTimelineSub: "6 காலகட்டங்கள் • 65 ஆண்டுகள்",
    featuredTreatisesTitle: "முக்கிய வரலாற்று நூல்கள்",
    featuredTreatisesSub: "வரலாற்று ஆதாரங்களுடன் இணைக்கப்பட்ட ஆவணங்கள்",
    browseAllDocsBtn: "அனைத்து ஆவணங்களையும் காண்க",
    readRecordBtn: "ஆவணத்தை படிக்கவும்",
    debatesExplorerTitle: "அரசியலமைப்பு விவாத அரங்கம்",
    debatesExplorerSub: "1946-1949 பாராளுமன்ற விவாதங்களை நேரடிப் பதிவிலிருந்து படிக்கவும்.",
    debatesQuoteLabel: "டாக்டர் அம்பேத்கரின் நேரடி உரை:",
    readDebateBtn: "விவாதங்களை படிக்கவும்",
    toolGraphTitle: "அறிவு வரைபடம்",
    toolGraphDesc: "அடிப்படை உரிமைகள் மற்றும் சமூக நீதியை இணைக்கும் கருத்து வரைபடம்.",
    toolGraphBtn: "தொடங்கவும்",
    toolAudioTitle: "ஒலி-ஒளி காப்பகம்",
    toolAudioDesc: "வரலாற்று நேர்காணல்கள் மற்றும் அரசியல் நிர்ணய சபை காட்சிகள்.",
    toolAudioBtn: "காண்க மற்றும் கேட்க",
    toolScholarTitle: "AI உதவியாளர்",
    toolScholarDesc: "அம்பேத்கரின் 22 தொகுதிகள் சார்ந்த கேள்விகளுக்கு AI மூலம் பதில் பெறுக.",
    toolScholarBtn: "கேள்வி கேட்க",

    mapBadge: "கருத்தியல் வரைபடம் & அறிவுத் திரட்டு",
    mapTitle: "அம்பேத்கர் அறிவு மற்றும் கருத்தியல் வரைபடம்",
    mapSubtitle: "அரசியலமைப்பு கோட்பாடுகள், பொருளாதார ஆய்வுகள் மற்றும் சமூக உரிமை போராட்டங்களின் தொடர்பு வரைபடம்.",
    mapAllLocations: "அனைத்து களங்கள்",

    searchCatalogBadge: "DAIC மத்திய பட்டியல்",
    searchCatalogSub: "22 தொகுதிகள்",
    searchPageTitle: "ஆவணத் தேடல்",
    searchPageDesc: "அம்பேத்கரின் எழுத்துக்கள், உரைகள் மற்றும் விவாதங்களை பல மொழிகளில் தேடுங்கள்.",
    searchPlaceholder: "தேடல் சொற்களை உள்ளிடவும் (எ.கா: 'பிரிவு 32', 'சாதி', 'பொருளாதாரம்')...",
    showingMatchedPrefix: "காட்டப்படும் முடிவுகள்:",
    showingMatchedSuffix: "ஆவணங்கள்",
    catAll: "அனைத்தும்",
    catWritings: "எழுத்துக்கள் & உரைகள்",
    catDebates: "அரசியலமைப்பு சபை",
    catEconomics: "பொருளாதாரம்",
    catHistorical: "வரலாறு",
    catLegal: "சட்ட ஆவணங்கள்",

    timelineBadge: "வரலாற்று காலவரிசை • 1891–1956",
    timelineTitle: "பாபாசாகேப் அம்பேத்கரின் வரலாற்றுப் பயணம்",
    timelineDesc: "ஆறு தசாப்த கால புரட்சிகர ஆராய்ச்சி, மனித உரிமை இயக்கம் மற்றும் அரசியலமைப்பு உருவாக்கம்.",
    metricMilestones: "மைல்கற்கள்",
    metricEras: "காலகட்டங்கள்",
    metricYears: "ஆண்டுகள்",
    timelineSearchPlaceholder: "மைல்கற்கள், இடம் அல்லது ஆண்டைத் தேடுக...",
    audioTourStart: "ஆடியோ காலவரிசைப் பயணம்",
    audioTourPlaying: "ஆடியோ இயங்குகிறது...",
    viewTape: "ஊடாடும் காலவரிசை நாடா",
    viewStream: "தொடர் ஓட்டம்",
    viewSpine: "அருங்காட்சியக காலவரிசை",
    tapeHint: "காலவரிசைப் புள்ளிகளைத் தட்டி வரலாற்றை ஆராய்க",
    eraAll: "அனைத்து காலகட்டங்களும் (1891–1956)",
    eraEarly: "1891–1912: ஆரம்ப ஆண்டுகள்",
    eraEducation: "1913–1923: கொலம்பியா & லண்டன்",
    eraCivil: "1924–1936: மனித உரிமைகள்",
    eraLabour: "1937–1946: தொழிலாளர் நலம்",
    eraConstitution: "1947–1950: அரசியலமைப்பு சிற்பி",
    eraLegacy: "1951–1956: நவயானம் & மரபு",
    narrateBtn: "விவரிக்க",
    viewDocBtn: "ஆவணம் காண்க",

    audioVaultTitle: "ஒலி-ஒளி காப்பகம் மற்றும் வரலாற்று காட்சிகள்",
    audioVaultSubtitle: "டாக்டர் அம்பேத்கரின் வரலாற்று உரைகளைக் கேளுங்கள் மற்றும் ஆவணப்படங்களைப் பாருங்கள்.",
    audioTabLabel: "வரலாற்று உரைகள் (ஆடியோ)",
    videoTabLabel: "ஆவணப்படங்கள் (வீடியோ)",
    audioPlaylistTitle: "ஆடியோ பட்டியல்",
    transcriptTitle: "உரை வடிவம்",
    listenBtn: "கேட்க அழுத்தவும்",
    resetBtn: "மீட்டமை",
    historicalSignificance: "வரலாற்று முக்கியத்துவம்:",
    speedLabel: "வேகம்:",
    watchVideoBtn: "வீடியோ காண்க",
    videoChaptersTitle: "முக்கிய தருணங்கள்",
    watchOnYouTubeBtn: "யூடியூப்பில் காண்க ↗",
    closePlayerBtn: "மூடுக",

    scholarBadge: "ஆதாரப்பூர்வ AI தளம்",
    scholarTitle: "டாக்டர் அம்பேத்கர் AI ஆய்வு உதவியாளர்",
    scholarDesc: "அம்பேத்கரின் 22 தொகுதிகள் சார்ந்த ஆய்வுக் கேள்விகளைக் கேளுங்கள்.",
    suggestedInquiriesLabel: "பரிந்துரைக்கப்பட்ட கேள்விகள்:",
    suggestedQ1: "கூட்டாட்சி பற்றி அம்பேத்கரின் பார்வை என்ன?",
    suggestedQ2: "பிரிவு 32 ஐ அரசியலமைப்பின் ஆன்மா என்று ஏன் அழைத்தார்?",
    suggestedQ3: "ரிசர்வ் வங்கி உருவாக்கத்தில் அம்பேத்கரின் பங்கு என்ன?",
    suggestedQ4: "1927 மகத் சத்தியாகிரகத்தின் முக்கியத்துவம் என்ன?",
    scholarGreeting: "வணக்கம். நான் டாக்டர் அம்பேத்கர் டிஜிட்டல் காப்பகத்தின் AI ஆய்வு உதவியாளர். நீங்கள் அரசியலமைப்பு மற்றும் சமூக சீர்திருத்தம் குறித்து கேட்கலாம்.",
    scholarInputPlaceholder: "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...",
    sendBtn: "அனுப்பு",
    citationsLabel: "ஆதாரங்கள்:",

    fullTextTab: "முழு உரை",
    aiSummaryTab: "AI சுருக்கம் (60s)",
    preservationTab: "காப்பக விவரங்கள்",
    listenAudioBtn: "ஆடியோ விளக்கம்",
    verifiedSourceBadge: "சரிபார்க்கப்பட்ட ஆதாரம்",
    langTranslationLabel: "மொழிபெயர்ப்பு:",
    summaryOverviewTitle: "சுருக்கம்",
    originalTextTitle: "அசல் உரை",
    dismissBtn: "மூடுக",
    addToDossier: "தொகுப்பில் சேர்",
    inDossier: "சேர்க்கப்பட்டது",

    dossierTitle: "ஆராய்ச்சியாளர் தொகுப்பு",
    dossierDesc: "மொபைலுக்கு எடுத்துச் செல்ல தொகுக்கப்பட்ட ஆவணங்கள்.",
    dossierEmptyTitle: "உங்கள் தொகுப்பு காலியாக உள்ளது",
    dossierEmptyDesc: "கியோஸ்க்கை உலாவும்போது 'தொகுப்பில் சேர்' பொத்தானை அழுத்துங்கள்.",
    generateQrBtn: "மொபைல் QR பாஸ் உருவாக்கு",
    clearAllBtn: "அனைத்தையும் நீக்கு",
    qrModalTitle: "மொபைலுக்கு எடுத்துச் செல்ல ஸ்கேன் செய்க",
    qrModalDesc: "உங்கள் ஸ்மார்ட்போன் கேமரா மூலம் இந்த QR குறியீட்டை ஸ்கேன் செய்யுங்கள்.",
    qrDoneBtn: "முடிந்தது",
    qrSyncedText: "DAIC சேவையகத்தில் ஒத்திசைக்கப்பட்டது",

    exhibitHallLabel: "கண்காட்சி கூடம்",
    pavilionLabel: "அரங்கு",
    hallOfLabel: "அரங்கு 0{current} / 0{total}",
    prevBtn: "முந்தைய",
    nextBtn: "அடுத்த",
    sectionsTabLabel: "பிரிவுகள்",
    pagesLabel: "பக்கங்கள்",
    readFullRecordBtn: "முழு ஆவணத்தைப் படியுங்கள்",
    downloadVideoBtn: "காணொளியை பதிவிறக்கு (MP4)",
    decadeLabel: "பத்தாண்டு:",
    stageAndTape: "மேடை & நாடா",
    streamView: "தொடர் ஓட்டம்",
    chronicleView: "வரலாற்றுப் பதிவு",
    allDecades: "அனைத்தும்",
    hideKeyboard: "▾ விசைப்பலகையை மறைக்க",
    showKeyboard: "▸ விசைப்பலகையைக் காட்டுக",
    footerText: "© 2026 டாக்டர் அம்பேத்கர் சர்வதேச மையம் (DAIC), புது தில்லி",
    ambedkarLifeDates: "டாக்டர் பி. ஆர். அம்பேத்கர் (1891–1956)",
  },
}

export function getTranslation(lang: string): LocaleDict {
  return TRANSLATIONS[lang] || TRANSLATIONS.english
}
