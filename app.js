// ==========================================================================
// Dr. B. R. Ambedkar Digital Heritage Archive - Application Engine
// Editorial Design System, Fluid Touch Gestures & Audio Synthesis
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  let currentLanguage = 'english';
  let activePaneId = 'pane-home';
  let activeDocId = null;
  let speechUtterance = null;
  let isSpeaking = false;

  // DOM Elements - Navigation & Panes
  const navButtons = document.querySelectorAll('.nav-pill-btn');
  const sectionPanes = document.querySelectorAll('.view-section');
  const brandHomeLink = document.getElementById('brand-home-link');
  const globalLangSelect = document.getElementById('global-lang-select');
  const heroExploreBtn = document.getElementById('hero-explore-btn');
  const heroChatBtn = document.getElementById('hero-chat-btn');
  const moduleCards = document.querySelectorAll('.module-card');

  // DOM Elements - Gallery & Home
  const galleryTrack = document.getElementById('gallery-track');
  const cardsViewport = document.getElementById('cards-viewport');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');

  // DOM Elements - Search & Archive
  const searchField = document.getElementById('search-field');
  const searchButton = document.getElementById('search-button');
  const filterPills = document.querySelectorAll('#search-filter-pills .category-filter-btn');
  const docResultsContainer = document.getElementById('doc-results-container');

  // DOM Elements - Apple-Style Detail Sheet Drawer
  const sheetBackdrop = document.getElementById('detail-sheet-backdrop');
  const sheetWindow = document.getElementById('sheet-window');
  const sheetDragHandle = document.getElementById('sheet-drag-handle');
  const sheetCategoryBadge = document.getElementById('sheet-category-badge');
  const sheetYearBadge = document.getElementById('sheet-year-badge');
  const sheetDocumentTitle = document.getElementById('sheet-document-title');
  const sheetTranscriptBody = document.getElementById('sheet-transcript-body');
  const sheetCloseBtn = document.getElementById('sheet-close-btn');
  const sheetLangBtns = document.querySelectorAll('.sheet-lang-btn');

  // DOM Elements - Audio Narration
  const ttsPlayToggle = document.getElementById('tts-play-toggle');
  const ttsIcon = document.getElementById('tts-icon');
  const ttsBtnLabel = document.getElementById('tts-btn-label');
  const sheetEqualizer = document.getElementById('sheet-equalizer');
  const ttsStatusIndicator = document.getElementById('tts-status-indicator');
  const ttsVoiceDropdown = document.getElementById('tts-voice-dropdown');

  // DOM Elements - Knowledge Graph & Timeline
  const timelineTrack = document.getElementById('timeline-milestones-track');

  // DOM Elements - OCR Studio
  const ocrDropzone = document.getElementById('ocr-dropzone');
  const ocrFileInput = document.getElementById('ocr-file-input');
  const ocrOutputText = document.getElementById('ocr-output-text');
  const ocrStatusTag = document.getElementById('ocr-status-tag');
  const ocrExportBtn = document.getElementById('ocr-export-btn');
  const ocrSaveBtn = document.getElementById('ocr-save-btn');

  // DOM Elements - AI Scholar Chat
  const chatFeed = document.getElementById('chat-feed');
  const chatInputBox = document.getElementById('chat-input-box');
  const chatSubmitBtn = document.getElementById('chat-submit-btn');
  const chatPresetPills = document.querySelectorAll('.chat-preset-pill');

  // ==========================================================================
  // Speech Synthesis Setup
  // ==========================================================================
  function loadAvailableVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    ttsVoiceDropdown.innerHTML = '';
    voices.forEach(voice => {
      if (voice.lang.includes('en') || voice.lang.includes('hi') || voice.lang.includes('mr')) {
        const opt = document.createElement('option');
        opt.value = voice.name;
        opt.textContent = `${voice.name} (${voice.lang})`;
        ttsVoiceDropdown.appendChild(opt);
      }
    });
  }

  loadAvailableVoices();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadAvailableVoices;
  }

  // ==========================================================================
  // Section Navigation
  // ==========================================================================
  function switchPane(targetId) {
    activePaneId = targetId;
    sectionPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === targetId);
    });

    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === targetId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetId === 'pane-graph') {
      setTimeout(renderKnowledgeGraph, 80);
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => switchPane(btn.dataset.target));
  });

  moduleCards.forEach(card => {
    card.addEventListener('click', () => switchPane(card.dataset.target));
  });

  if (brandHomeLink) {
    brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchPane('pane-home');
    });
  }

  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => switchPane('pane-search'));
  }

  if (heroChatBtn) {
    heroChatBtn.addEventListener('click', () => switchPane('pane-chat'));
  }

  // Language Change Handler
  globalLangSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    updateSheetLanguagePills(currentLanguage);
    renderDocuments(ARCHIVE_DATA.documents);
    if (activeDocId) {
      loadDocumentIntoSheet(activeDocId);
    }
  });

  // ==========================================================================
  // Apple-Style Document Detail Sheet Drawer
  // ==========================================================================
  function openDocumentSheet(docId) {
    activeDocId = docId;
    loadDocumentIntoSheet(docId);
    sheetBackdrop.classList.add('active');
    sheetBackdrop.setAttribute('aria-hidden', 'false');
    sheetWindow.style.transform = '';
  }

  function closeDocumentSheet() {
    sheetWindow.style.transform = 'translateY(100%)';
    setTimeout(() => {
      sheetBackdrop.classList.remove('active');
      sheetBackdrop.setAttribute('aria-hidden', 'true');
      sheetWindow.style.transform = '';
      activeDocId = null;
    }, 280);
    stopNarration();
  }

  function updateSheetLanguagePills(lang) {
    sheetLangBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function loadDocumentIntoSheet(docId) {
    const doc = ARCHIVE_DATA.documents.find(d => d.id === docId);
    if (!doc) return;

    sheetDocumentTitle.textContent = doc.title;
    sheetCategoryBadge.textContent = doc.category;
    sheetYearBadge.textContent = doc.year;

    const exhibitBanner = `
      <div class="drawer-exhibit-banner">
        <div class="drawer-exhibit-media">
          <img src="${doc.image}" alt="${doc.title}" class="drawer-exhibit-img">
        </div>
        <div class="drawer-exhibit-metadata">
          <div class="drawer-archival-id">RECORD: ${doc.id} • ${doc.volume}</div>
          <div class="drawer-source-location">${doc.source} (${doc.year})</div>
          <p class="drawer-image-caption-text">${doc.imageCaption || doc.summary}</p>
        </div>
      </div>
    `;

    let bodyHTML = exhibitBanner;
    if (currentLanguage !== 'english' && doc.translations && doc.translations[currentLanguage]) {
      bodyHTML += `
        <div class="translation-callout-panel">
          <div style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: var(--track-wide); margin-bottom: 6px;">
            ${currentLanguage.toUpperCase()} Translation
          </div>
          <p style="font-size: 16px; line-height: 1.65; margin-bottom: 0;">${doc.translations[currentLanguage]}</p>
        </div>
        <p style="font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--ink-secondary); text-transform: uppercase; letter-spacing: var(--track-wide); margin-bottom: 10px;">
          Original English Primary Source Text:
        </p>
        <p>${doc.fullText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
      `;
    } else {
      bodyHTML += `<p>${doc.fullText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
    }

    sheetTranscriptBody.innerHTML = bodyHTML;
    updateSheetLanguagePills(currentLanguage);
  }

  sheetLangBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.dataset.lang;
      currentLanguage = lang;
      globalLangSelect.value = lang;
      updateSheetLanguagePills(lang);
      if (activeDocId) {
        loadDocumentIntoSheet(activeDocId);
      }
    });
  });

  sheetCloseBtn.addEventListener('click', closeDocumentSheet);
  sheetBackdrop.addEventListener('click', (e) => {
    if (e.target === sheetBackdrop) closeDocumentSheet();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheetBackdrop.classList.contains('active')) {
      closeDocumentSheet();
    }
  });

  // Touch Gesture Drag-to-Dismiss on Sheet Handle
  let dragStartY = 0;
  let dragCurrentY = 0;
  let isDraggingSheet = false;

  function onDragStart(e) {
    const point = e.touches ? e.touches[0] : e;
    dragStartY = point.clientY;
    dragCurrentY = dragStartY;
    isDraggingSheet = true;
    sheetWindow.style.transition = 'none';
  }

  function onDragMove(e) {
    if (!isDraggingSheet) return;
    const point = e.touches ? e.touches[0] : e;
    dragCurrentY = point.clientY;
    const deltaY = dragCurrentY - dragStartY;

    if (deltaY > 0) {
      sheetWindow.style.transform = `translateY(${deltaY}px)`;
    } else {
      sheetWindow.style.transform = `translateY(${deltaY * 0.15}px)`;
    }
  }

  function onDragEnd() {
    if (!isDraggingSheet) return;
    isDraggingSheet = false;
    sheetWindow.style.transition = 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)';
    const deltaY = dragCurrentY - dragStartY;

    if (deltaY > 100) {
      closeDocumentSheet();
    } else {
      sheetWindow.style.transform = 'translateY(0)';
    }
  }

  sheetDragHandle.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('touchmove', onDragMove, { passive: true });
  window.addEventListener('touchend', onDragEnd);

  sheetDragHandle.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  // ==========================================================================
  // Audio Speech Narration
  // ==========================================================================
  function startNarration(text) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    stopNarration();
    speechUtterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceName = ttsVoiceDropdown.value;
    const voices = window.speechSynthesis.getVoices();
    const chosen = voices.find(v => v.name === selectedVoiceName);
    if (chosen) speechUtterance.voice = chosen;

    speechUtterance.rate = 0.95;

    speechUtterance.onstart = () => {
      isSpeaking = true;
      ttsIcon.textContent = '⏸';
      ttsBtnLabel.textContent = 'Pause Narration';
      ttsStatusIndicator.textContent = 'Playing narration...';
      sheetEqualizer.classList.add('playing');
    };

    speechUtterance.onend = () => {
      isSpeaking = false;
      ttsIcon.textContent = '▶';
      ttsBtnLabel.textContent = 'Listen to Narration';
      ttsStatusIndicator.textContent = 'Finished';
      sheetEqualizer.classList.remove('playing');
    };

    speechUtterance.onerror = () => {
      isSpeaking = false;
      ttsIcon.textContent = '▶';
      ttsBtnLabel.textContent = 'Listen to Narration';
      ttsStatusIndicator.textContent = 'Narration paused';
      sheetEqualizer.classList.remove('playing');
    };

    window.speechSynthesis.speak(speechUtterance);
  }

  function stopNarration() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      ttsIcon.textContent = '▶';
      ttsBtnLabel.textContent = 'Listen to Narration';
      ttsStatusIndicator.textContent = 'Ready';
      if (sheetEqualizer) sheetEqualizer.classList.remove('playing');
    }
  }

  ttsPlayToggle.addEventListener('click', () => {
    if (isSpeaking) {
      stopNarration();
    } else {
      const plainText = sheetTranscriptBody.textContent;
      startNarration(plainText);
    }
  });

  // ==========================================================================
  // Featured Landmark Cards Gallery
  // ==========================================================================
  function renderGallery() {
    if (!galleryTrack) return;
    galleryTrack.innerHTML = '';

    ARCHIVE_DATA.documents.forEach((doc, idx) => {
      const card = document.createElement('div');
      card.className = 'monograph-card';
      const quoteText = doc.fullText.split('\n')[0].slice(0, 160) + '...';
      const numLabel = String(idx + 1).padStart(2, '0');

      card.innerHTML = `
        <div class="card-visual-media">
          <img src="${doc.image}" alt="${doc.title}" class="card-visual-img" loading="lazy">
          <span class="card-visual-year">${doc.year}</span>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="card-num-marker">NO. ${numLabel}</span>
            <span class="card-category-pill">${doc.category}</span>
          </div>
          <h3 class="card-heading">${doc.title}</h3>
          <p class="card-citation-meta">${doc.volume} • ${doc.source} (${doc.year})</p>
        </div>

        <div class="card-excerpt-block">
          "${quoteText}"
        </div>

        <div>
          <button class="card-link-prompt open-doc-action" data-id="${doc.id}">
            Inspect Primary Record ›
          </button>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.open-doc-action')) {
          openDocumentSheet(doc.id);
        }
      });

      galleryTrack.appendChild(card);
    });

    document.querySelectorAll('.open-doc-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDocumentSheet(e.currentTarget.dataset.id);
      });
    });
  }

  if (galleryPrev && cardsViewport) {
    galleryPrev.addEventListener('click', () => {
      cardsViewport.scrollBy({ left: -400, behavior: 'smooth' });
    });
  }

  if (galleryNext && cardsViewport) {
    galleryNext.addEventListener('click', () => {
      cardsViewport.scrollBy({ left: 400, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // Search & Document Results Grid
  // ==========================================================================
  function renderDocuments(docs) {
    if (!docResultsContainer) return;
    docResultsContainer.innerHTML = '';

    if (docs.length === 0) {
      docResultsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--ink-secondary);">
          <div style="font-size: 28px; margin-bottom: 8px;">📄</div>
          <p style="font-size: 16px; font-weight: 500;">No archival records matched your query.</p>
        </div>`;
      return;
    }

    docs.forEach(doc => {
      const card = document.createElement('div');
      card.className = 'record-card';

      card.innerHTML = `
        <div class="record-media-cover">
          <img src="${doc.image}" alt="${doc.title}" class="record-media-img" loading="lazy">
          <span class="record-media-duration-tag">${doc.year}</span>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="card-category-pill">${doc.category}</span>
            <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--ink-tertiary);">${doc.volume}</span>
          </div>
          <h3 class="record-title">${doc.title}</h3>
          <p style="font-family: var(--font-mono); font-size: 12px; color: var(--ink-tertiary); margin-top: 4px;">
            ${doc.source}
          </p>
          <p class="record-abstract">${doc.summary}</p>
        </div>

        <div class="record-footer-actions">
          <button class="btn-primary-pill inspect-btn" data-id="${doc.id}" style="padding: 8px 18px; font-size: 13px;">
            Inspect Document
          </button>
          <button class="btn-secondary-pill listen-btn" data-id="${doc.id}" style="padding: 8px 16px; font-size: 13px;">
            Audio
          </button>
        </div>
      `;

      docResultsContainer.appendChild(card);
    });

    document.querySelectorAll('.inspect-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openDocumentSheet(e.currentTarget.dataset.id);
      });
    });

    document.querySelectorAll('.listen-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openDocumentSheet(id);
        const doc = ARCHIVE_DATA.documents.find(d => d.id === id);
        if (doc) startNarration(doc.fullText);
      });
    });
  }

  function applySearchFilter() {
    const query = searchField.value.toLowerCase().trim();
    const activePill = document.querySelector('#search-filter-pills .category-filter-btn.active');
    const category = activePill ? activePill.dataset.category : 'All';

    const filtered = ARCHIVE_DATA.documents.filter(doc => {
      const matchesQuery = doc.title.toLowerCase().includes(query) ||
                           doc.summary.toLowerCase().includes(query) ||
                           doc.fullText.toLowerCase().includes(query) ||
                           doc.tags.some(t => t.toLowerCase().includes(query));

      const matchesCategory = category === 'All' || doc.category.includes(category) || doc.tags.includes(category);
      return matchesQuery && matchesCategory;
    });

    renderDocuments(filtered);
  }

  if (searchField) {
    searchField.addEventListener('input', applySearchFilter);
  }
  if (searchButton) {
    searchButton.addEventListener('click', applySearchFilter);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applySearchFilter();
    });
  });

  // ==========================================================================
  // Historical Timeline Revamped Architecture
  // ==========================================================================
  // ==========================================================================
  // Historical Timeline: Flagship TimelineJS Dual-Deck Architecture
  // ==========================================================================
  // TimelineJS DOM Elements
  const timelineStageContainer = document.getElementById('timeline-stage-container');
  const stageViewport = document.getElementById('stage-viewport');
  const stageSlideDeck = document.getElementById('stage-slide-deck');
  const stagePrevBtn = document.getElementById('stage-prev-btn');
  const stageNextBtn = document.getElementById('stage-next-btn');
  const stagePaginationStrip = document.getElementById('stage-pagination-strip');

  const tapeViewport = document.getElementById('tape-viewport');
  const tapeTrack = document.getElementById('tape-track');
  const tapeEraBands = document.getElementById('tape-era-bands');
  const tapeRulerTicks = document.getElementById('tape-ruler-ticks');
  const tapeMarkerFlags = document.getElementById('tape-marker-flags');
  const tapeActiveCursor = document.getElementById('tape-active-cursor');
  const tapeZoomIn = document.getElementById('tape-zoom-in');
  const tapeZoomOut = document.getElementById('tape-zoom-out');
  const tapeZoomLabel = document.getElementById('tape-zoom-label');

  // Multi-Layout & Controls DOM Elements
  const timelineViewport = document.getElementById('timeline-viewport');
  const timelineRibbonContainer = document.getElementById('timeline-ribbon-container');
  const timelineEditorialContainer = document.getElementById('timeline-editorial-container');
  const timelineEditorialStream = document.getElementById('timeline-editorial-stream');
  const scrubberTrackLine = document.getElementById('scrubber-track-line');
  const scrubberTooltip = document.getElementById('scrubber-tooltip');
  const timelineCountBadge = document.getElementById('timeline-count-badge');
  const tStatCount = document.getElementById('t-stat-count');
  const timelineSearchInput = document.getElementById('timeline-search-input');
  const timelineAutoplayBtn = document.getElementById('timeline-autoplay-btn');
  const btnLayoutTimelinejs = document.getElementById('btn-layout-timelinejs');
  const btnLayoutRibbon = document.getElementById('btn-layout-ribbon');
  const btnLayoutEditorial = document.getElementById('btn-layout-editorial');
  const timelinePrevBtn = document.getElementById('timeline-prev-btn');
  const timelineNextBtn = document.getElementById('timeline-next-btn');
  const timelineEraPills = document.querySelectorAll('.t-era-pill');
  const decadeRulerChips = document.querySelectorAll('.ruler-chip');

  let timelineState = {
    era: 'all',
    decade: 'all',
    search: '',
    layout: 'timelinejs', // Default flagship layout
    currentIndex: 0,
    zoom: 1, // 1 = 100%, 1.5 = 150%, 2 = 200%
    isTourPlaying: false,
    tourIndex: 0
  };

  let milestoneSpeechUtterance = null;

  function getFilteredMilestones() {
    let list = ARCHIVE_DATA.timeline || [];

    if (timelineState.era && timelineState.era !== 'all') {
      list = list.filter(m => m.era === timelineState.era);
    }

    if (timelineState.decade && timelineState.decade !== 'all') {
      list = list.filter(m => m.decade === timelineState.decade);
    }

    if (timelineState.search && timelineState.search.trim()) {
      const q = timelineState.search.trim().toLowerCase();
      list = list.filter(m => {
        return (
          (m.title && m.title.toLowerCase().includes(q)) ||
          (m.description && m.description.toLowerCase().includes(q)) ||
          (m.quote && m.quote.toLowerCase().includes(q)) ||
          (m.location && m.location.toLowerCase().includes(q)) ||
          (m.impact && m.impact.toLowerCase().includes(q)) ||
          (m.category && m.category.toLowerCase().includes(q)) ||
          String(m.year).includes(q)
        );
      });
    }

    return list;
  }

  function renderTimeline() {
    const milestones = getFilteredMilestones();

    if (timelineCountBadge) {
      timelineCountBadge.textContent = `${milestones.length} Milestone${milestones.length === 1 ? '' : 's'}`;
    }
    if (tStatCount) {
      tStatCount.textContent = milestones.length;
    }

    // Keep currentIndex within bounds of filtered list
    if (timelineState.currentIndex >= milestones.length) {
      timelineState.currentIndex = Math.max(0, milestones.length - 1);
    }

    // Render all 3 view modes
    renderTimelineStage(milestones);
    renderTimelineTape(milestones);
    renderTimelineRibbon(milestones);
    renderTimelineEditorial(milestones);
    renderTimelineScrubber(milestones);
    bindTimelineInteractions();
  }

  // ==========================================================================
  // TimelineJS: Upper Deck (Interactive Slide Stage)
  // ==========================================================================
  function renderTimelineStage(milestones) {
    if (!stageSlideDeck) return;
    stageSlideDeck.innerHTML = '';
    if (stagePaginationStrip) stagePaginationStrip.innerHTML = '';

    if (milestones.length === 0) {
      stageSlideDeck.innerHTML = `
        <div style="padding: 4rem 2rem; text-align: center; width: 100%;">
          <div style="font-size: 32px; margin-bottom: 8px;">⏳</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--ink-primary); margin-bottom: 6px;">No Milestones Found</h3>
          <p style="font-size: 14px; color: var(--ink-secondary);">Try clearing your search query or selecting "All Eras".</p>
        </div>
      `;
      return;
    }

    milestones.forEach((item, idx) => {
      const slide = document.createElement('div');
      slide.className = `stage-slide-item ${idx === timelineState.currentIndex ? 'active' : ''}`;
      slide.dataset.index = idx;
      slide.id = `stage-slide-${item.id}`;

      slide.innerHTML = `
        <div class="stage-slide-media">
          <img src="${item.image}" alt="${item.title}" class="stage-slide-img" loading="lazy">
          <span class="year-badge-pill">${item.year}</span>
          <span class="milestone-era-badge">${item.eraLabel || item.category}</span>
        </div>

        <div class="stage-slide-content">
          <div class="stage-header-row">
            <span class="stage-counter-pill">Milestone ${idx + 1} of ${milestones.length} • ${item.decade}</span>
            <span class="card-category-pill" style="margin: 0;">${item.category}</span>
          </div>

          <h2 class="stage-slide-title">${item.title}</h2>
          
          <div class="stage-meta-row">
            <span>📅 ${item.date}</span>
            <span>•</span>
            <span>📍 ${item.location}</span>
          </div>

          <p class="stage-slide-desc">${item.description}</p>

          ${item.quote ? `
            <div class="stage-quote-box">
              <p class="stage-quote-text">“${item.quote}”</p>
            </div>
          ` : ''}

          ${item.impact ? `
            <div class="stage-impact-tag">
              <span>⚡</span>
              <span>${item.impact}</span>
            </div>
          ` : ''}

          <div class="stage-actions-row">
            <button class="stage-action-btn stage-action-listen milestone-listen-btn" data-id="${item.id}" title="Listen to narration">
              <span>🔊</span> Narrate Milestone
            </button>
            ${item.relatedDocId ? `
              <button class="stage-action-btn stage-action-primary milestone-primary-cta" data-doc="${item.relatedDocId}" data-type="${item.relatedType}">
                ${item.relatedType === 'audio' ? '🎙️ Archival Recording' : '📖 Primary Document Record'}
              </button>
            ` : ''}
          </div>
        </div>
      `;

      stageSlideDeck.appendChild(slide);

      // Pagination dot
      if (stagePaginationStrip) {
        const dot = document.createElement('div');
        dot.className = `stage-page-dot ${idx === timelineState.currentIndex ? 'active' : ''}`;
        dot.dataset.index = idx;
        dot.title = `${item.year}: ${item.title}`;
        dot.addEventListener('click', () => goToMilestone(idx));
        stagePaginationStrip.appendChild(dot);
      }
    });

    stageSlideDeck.style.transform = `translate3d(-${timelineState.currentIndex * 100}%, 0, 0)`;
  }

  // ==========================================================================
  // TimelineJS: Lower Deck (Chrono-Tape Ruler & Interactive Flags)
  // ==========================================================================
  function renderTimelineTape(milestones) {
    if (!tapeTrack || !tapeEraBands || !tapeRulerTicks || !tapeMarkerFlags) return;

    const baseTrackWidth = 1800 * timelineState.zoom;
    tapeTrack.style.width = `${baseTrackWidth}px`;

    const startYear = 1890;
    const endYear = 1956;
    const yearSpan = endYear - startYear;

    function getYearX(year) {
      const ratio = (year - startYear) / yearSpan;
      return ratio * (baseTrackWidth - 120) + 60;
    }

    // 1. Era Color Bands
    tapeEraBands.innerHTML = '';
    const eras = [
      { key: 'early-life', name: '1891–1912: Formative', start: 1891, end: 1912, cls: 'era-early-life' },
      { key: 'education', name: '1913–1923: Columbia & London', start: 1913, end: 1923, cls: 'era-education' },
      { key: 'civil-rights', name: '1924–1936: Civil Rights', start: 1924, end: 1936, cls: 'era-civil-rights' },
      { key: 'labour-governance', name: '1937–1946: Labour & Governance', start: 1937, end: 1946, cls: 'era-labour-governance' },
      { key: 'constitution', name: '1947–1950: Constitution Architect', start: 1947, end: 1950, cls: 'era-constitution' },
      { key: 'legacy', name: '1951–1956: Navayana & Legacy', start: 1951, end: 1956, cls: 'era-legacy' }
    ];

    eras.forEach(era => {
      const xStart = getYearX(era.start);
      const xEnd = getYearX(era.end);
      const width = Math.max(50, xEnd - xStart);

      const band = document.createElement('div');
      band.className = `tape-era-band ${era.cls}`;
      band.style.left = `${xStart}px`;
      band.style.width = `${width}px`;
      band.textContent = era.name;
      band.title = `Jump to ${era.name}`;

      band.addEventListener('click', () => {
        const targetIdx = milestones.findIndex(m => m.era === era.key);
        if (targetIdx !== -1) {
          goToMilestone(targetIdx);
        }
      });

      tapeEraBands.appendChild(band);
    });

    // 2. Ruler & Decade Markers
    tapeRulerTicks.innerHTML = '';
    for (let yr = startYear; yr <= endYear; yr += 2) {
      const x = getYearX(yr);
      const isDecade = yr % 10 === 0 || yr === 1956;

      const tick = document.createElement('div');
      tick.className = `tape-year-tick ${isDecade ? 'major' : ''}`;
      tick.style.left = `${x}px`;
      tapeRulerTicks.appendChild(tick);

      if (isDecade) {
        const decLabel = document.createElement('div');
        decLabel.className = 'tape-decade-marker';
        decLabel.style.left = `${x}px`;
        decLabel.textContent = yr;
        tapeRulerTicks.appendChild(decLabel);
      }
    }

    // 3. Milestone Marker Flags
    tapeMarkerFlags.innerHTML = '';
    const placedPositions = [];

    milestones.forEach((item, idx) => {
      let x = getYearX(item.year);

      // Collision avoidance for milestones sharing the same or adjacent year
      for (const p of placedPositions) {
        if (Math.abs(p - x) < 38) {
          x += 38; // offset flag
        }
      }
      placedPositions.push(x);

      const flag = document.createElement('div');
      flag.className = `tape-marker-flag ${idx === timelineState.currentIndex ? 'active' : ''} ${idx % 2 === 1 ? 'staggered-down' : ''}`;
      flag.id = `tape-flag-${idx}`;
      flag.style.left = `${x}px`;
      flag.dataset.index = idx;
      flag.title = `${item.year}: ${item.title}`;

      flag.innerHTML = `
        <div class="tape-marker-pin-thumb">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <span class="tape-marker-year-pill">${item.year}</span>
        <span class="tape-marker-title-label">${item.badge || item.title.slice(0, 16)}</span>
      `;

      flag.addEventListener('click', () => {
        goToMilestone(idx);
      });

      tapeMarkerFlags.appendChild(flag);
    });

    // Synchronize Spotlight Laser Cursor position & tape scroll
    updateTapeActiveCursor();
  }

  function updateTapeActiveCursor() {
    if (!tapeActiveCursor) return;
    const activeFlag = document.getElementById(`tape-flag-${timelineState.currentIndex}`);
    if (activeFlag) {
      const x = activeFlag.offsetLeft;
      tapeActiveCursor.style.left = `${x}px`;

      if (tapeViewport) {
        const offset = x - tapeViewport.clientWidth / 2;
        tapeViewport.scrollTo({ left: offset, behavior: 'smooth' });
      }
    }
  }

  function goToMilestone(index) {
    const milestones = getFilteredMilestones();
    if (milestones.length === 0) return;

    if (index < 0) index = 0;
    if (index >= milestones.length) index = milestones.length - 1;

    timelineState.currentIndex = index;

    // Slide Stage Deck
    if (stageSlideDeck) {
      stageSlideDeck.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      stageSlideDeck.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
    }

    // Update Pagination Dots
    if (stagePaginationStrip) {
      const dots = stagePaginationStrip.querySelectorAll('.stage-page-dot');
      dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
    }

    // Update Tape Flags
    if (tapeMarkerFlags) {
      const flags = tapeMarkerFlags.querySelectorAll('.tape-marker-flag');
      flags.forEach((f, idx) => f.classList.toggle('active', idx === index));
    }

    // Update Spotlight Cursor
    updateTapeActiveCursor();

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }

  // ==========================================================================
  // Touch Physics & Gestures on Stage Viewport
  // ==========================================================================
  function initStageGestures() {
    if (!stageViewport || !stageSlideDeck) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let lastX = 0;
    let startTime = 0;
    let lastTime = 0;
    let velocityX = 0;
    let isTracking = false;
    let isHorizontalGesture = null;

    stageViewport.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      isTracking = true;
      isHorizontalGesture = null;
      startX = e.clientX;
      startY = e.clientY;
      lastX = startX;
      startTime = performance.now();
      lastTime = startTime;
      velocityX = 0;

      stageSlideDeck.style.transition = 'none';
      if (stageViewport.setPointerCapture) {
        stageViewport.setPointerCapture(e.pointerId);
      }
    });

    stageViewport.addEventListener('pointermove', (e) => {
      if (!isTracking) return;

      currentX = e.clientX;
      const currentY = e.clientY;
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      // Evaluate gesture intent in first 8px
      if (isHorizontalGesture === null) {
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
          isHorizontalGesture = Math.abs(deltaX) >= Math.abs(deltaY);
        }
      }

      if (!isHorizontalGesture) {
        return; // Allow native vertical page scroll!
      }

      e.preventDefault();

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velocityX = (currentX - lastX) / dt;
      }
      lastX = currentX;
      lastTime = now;

      const milestones = getFilteredMilestones();
      let dragOffset = deltaX;

      // Rubber-band resistance at boundaries
      const atStart = timelineState.currentIndex === 0 && deltaX > 0;
      const atEnd = timelineState.currentIndex === milestones.length - 1 && deltaX < 0;
      if (atStart || atEnd) {
        dragOffset = deltaX * 0.22;
      }

      const basePercent = -timelineState.currentIndex * 100;
      stageSlideDeck.style.transform = `translate3d(calc(${basePercent}% + ${dragOffset}px), 0, 0)`;
    });

    function endStageGesture() {
      if (!isTracking) return;
      isTracking = false;

      if (!isHorizontalGesture) {
        stageSlideDeck.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        stageSlideDeck.style.transform = `translate3d(-${timelineState.currentIndex * 100}%, 0, 0)`;
        return;
      }

      const deltaX = lastX - startX;
      const milestones = getFilteredMilestones();

      stageSlideDeck.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

      // Flick or threshold snap
      if (velocityX < -0.35 || deltaX < -75) {
        if (timelineState.currentIndex < milestones.length - 1) {
          goToMilestone(timelineState.currentIndex + 1);
        } else {
          goToMilestone(timelineState.currentIndex);
        }
      } else if (velocityX > 0.35 || deltaX > 75) {
        if (timelineState.currentIndex > 0) {
          goToMilestone(timelineState.currentIndex - 1);
        } else {
          goToMilestone(timelineState.currentIndex);
        }
      } else {
        goToMilestone(timelineState.currentIndex);
      }
    }

    stageViewport.addEventListener('pointerup', endStageGesture);
    stageViewport.addEventListener('pointercancel', endStageGesture);

    // Navigation Pedal Buttons
    if (stagePrevBtn) {
      stagePrevBtn.addEventListener('click', () => {
        goToMilestone(timelineState.currentIndex - 1);
      });
    }

    if (stageNextBtn) {
      stageNextBtn.addEventListener('click', () => {
        goToMilestone(timelineState.currentIndex + 1);
      });
    }
  }

  // ==========================================================================
  // Chrono-Tape Touch Drag & Zoom Controls
  // ==========================================================================
  function initTapeGestures() {
    if (!tapeViewport) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    tapeViewport.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.tape-marker-flag') || e.target.closest('.tape-era-band')) return;
      isDown = true;
      startX = e.pageX - tapeViewport.offsetLeft;
      scrollLeft = tapeViewport.scrollLeft;
      tapeViewport.style.cursor = 'grabbing';
      if (tapeViewport.setPointerCapture) tapeViewport.setPointerCapture(e.pointerId);
    });

    tapeViewport.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tapeViewport.offsetLeft;
      const walk = (x - startX) * 1.4;
      tapeViewport.scrollLeft = scrollLeft - walk;
    });

    function endTapeDrag() {
      if (!isDown) return;
      isDown = false;
      tapeViewport.style.cursor = 'grab';
    }

    tapeViewport.addEventListener('pointerup', endTapeDrag);
    tapeViewport.addEventListener('pointercancel', endTapeDrag);

    // Tape Zoom In / Out
    if (tapeZoomIn && tapeZoomOut && tapeZoomLabel) {
      tapeZoomIn.addEventListener('click', () => {
        if (timelineState.zoom < 2) {
          timelineState.zoom += 0.5;
          tapeZoomLabel.textContent = `${Math.round(timelineState.zoom * 100)}%`;
          renderTimelineTape(getFilteredMilestones());
        }
      });

      tapeZoomOut.addEventListener('click', () => {
        if (timelineState.zoom > 1) {
          timelineState.zoom -= 0.5;
          tapeZoomLabel.textContent = `${Math.round(timelineState.zoom * 100)}%`;
          renderTimelineTape(getFilteredMilestones());
        }
      });
    }
  }

  // ==========================================================================
  // Ribbon & Editorial Renderers
  // ==========================================================================
  function renderTimelineRibbon(milestones) {
    if (!timelineTrack) return;
    timelineTrack.innerHTML = '';

    milestones.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'milestone-item-card';
      card.id = `card-${item.id}`;
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="milestone-media-wrap">
          <img src="${item.image}" alt="${item.title}" class="milestone-thumb-img" loading="lazy">
          <span class="year-badge-pill">${item.year}</span>
          <span class="milestone-era-badge">${item.eraLabel || item.category}</span>
        </div>
        <div class="milestone-date-loc">
          <span>📅 ${item.date}</span>
          <span>•</span>
          <span>📍 ${item.location}</span>
        </div>
        <h3 class="milestone-card-title">${item.title}</h3>
        <p class="milestone-card-desc">${item.description}</p>
        ${item.quote ? `
          <div class="milestone-quote-block">
            <p class="milestone-quote-text">“${item.quote}”</p>
          </div>
        ` : ''}
        ${item.impact ? `
          <div class="milestone-impact-tag">
            <span>⚡</span>
            <span>${item.impact}</span>
          </div>
        ` : ''}
        <div class="milestone-card-footer">
          <button class="milestone-listen-btn" data-id="${item.id}" title="Spoken archival narration">
            <span>🔊</span> Listen
          </button>
          ${item.relatedDocId ? `
            <button class="milestone-primary-cta" data-doc="${item.relatedDocId}" data-type="${item.relatedType}">
              ${item.relatedType === 'audio' ? '🎙️ Archival Audio' : '📖 Primary Record'}
            </button>
          ` : ''}
        </div>
      `;

      timelineTrack.appendChild(card);
    });
  }

  function renderTimelineEditorial(milestones) {
    if (!timelineEditorialStream) return;
    timelineEditorialStream.innerHTML = '';

    milestones.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'editorial-entry-card';
      card.id = `editorial-${item.id}`;
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="editorial-node-col">
          <div class="editorial-node-dot"></div>
          <div class="editorial-node-year">${item.year}</div>
        </div>
        <div class="editorial-content-box" id="ed-box-${item.id}">
          <div class="editorial-entry-grid">
            <div class="editorial-media-matting">
              <img src="${item.image}" alt="${item.title}" class="editorial-photo-img" loading="lazy">
              <span class="year-badge-pill">${item.year}</span>
            </div>
            <div class="editorial-details-col">
              <div class="editorial-badge-row">
                <span class="milestone-era-badge" style="position:static;">${item.eraLabel || item.category}</span>
                ${item.impact ? `<span class="milestone-impact-tag" style="margin-bottom:0;">⚡ ${item.impact}</span>` : ''}
              </div>
              <h3 class="editorial-title">${item.title}</h3>
              <div class="editorial-meta-line">📅 ${item.date} • 📍 ${item.location}</div>
              <p class="editorial-body-p">${item.description}</p>
              ${item.quote ? `
                <div class="editorial-quote-wrap">
                  <p>“${item.quote}”</p>
                </div>
              ` : ''}
              <div class="milestone-card-footer" style="padding-top:10px; margin-top:8px;">
                <button class="milestone-listen-btn" data-id="${item.id}" title="Narrate milestone">
                  <span>🔊</span> Narrate Milestone
                </button>
                ${item.relatedDocId ? `
                  <button class="milestone-primary-cta" data-doc="${item.relatedDocId}" data-type="${item.relatedType}">
                    ${item.relatedType === 'audio' ? '🎙️ Play Archival Recording' : '📖 Inspect Primary Source'}
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      timelineEditorialStream.appendChild(card);
    });
  }

  function renderTimelineScrubber(milestones) {
    if (!scrubberTrackLine) return;
    scrubberTrackLine.innerHTML = '';

    milestones.forEach((item, idx) => {
      const dot = document.createElement('div');
      dot.className = 'scrubber-node-dot';
      dot.dataset.id = item.id;
      dot.dataset.year = item.year;
      dot.dataset.title = item.title;
      dot.title = `${item.year}: ${item.title}`;

      dot.addEventListener('mouseenter', () => {
        if (!scrubberTooltip) return;
        scrubberTooltip.textContent = `${item.year} • ${item.title}`;
        scrubberTooltip.style.display = 'block';
        const rect = dot.getBoundingClientRect();
        const parentRect = scrubberTrackLine.getBoundingClientRect();
        scrubberTooltip.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
      });

      dot.addEventListener('mouseleave', () => {
        if (scrubberTooltip) scrubberTooltip.style.display = 'none';
      });

      dot.addEventListener('click', () => {
        goToMilestone(idx);
      });

      scrubberTrackLine.appendChild(dot);
    });
  }

  function narrateMilestone(item, onFinishCallback) {
    if (!('speechSynthesis' in window)) {
      if (onFinishCallback) onFinishCallback();
      return;
    }

    window.speechSynthesis.cancel();

    const speechText = `Year ${item.year}. ${item.title}. In ${item.location}. ${item.description}. ${item.quote ? "Babasaheb stated: " + item.quote : ""}`;
    milestoneSpeechUtterance = new SpeechSynthesisUtterance(speechText);
    milestoneSpeechUtterance.rate = 0.95;

    const selectedVoiceName = ttsVoiceDropdown ? ttsVoiceDropdown.value : '';
    const voices = window.speechSynthesis.getVoices();
    const chosen = voices.find(v => v.name === selectedVoiceName);
    if (chosen) {
      milestoneSpeechUtterance.voice = chosen;
    }

    milestoneSpeechUtterance.onend = () => {
      if (onFinishCallback) onFinishCallback();
    };

    milestoneSpeechUtterance.onerror = () => {
      if (onFinishCallback) onFinishCallback();
    };

    window.speechSynthesis.speak(milestoneSpeechUtterance);
  }

  function startTour() {
    const list = getFilteredMilestones();
    if (list.length === 0) return;

    timelineState.isTourPlaying = true;
    if (timelineAutoplayBtn) {
      timelineAutoplayBtn.classList.add('playing');
      const textSpan = timelineAutoplayBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Pause Chronicle Tour';
    }

    function stepTour(idx) {
      if (!timelineState.isTourPlaying || idx >= list.length) {
        stopTour();
        return;
      }

      timelineState.tourIndex = idx;
      goToMilestone(idx);
      const item = list[idx];

      narrateMilestone(item, () => {
        if (!timelineState.isTourPlaying) return;
        setTimeout(() => {
          stepTour(idx + 1);
        }, 1200);
      });
    }

    stepTour(timelineState.tourIndex || 0);
  }

  function stopTour() {
    timelineState.isTourPlaying = false;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (timelineAutoplayBtn) {
      timelineAutoplayBtn.classList.remove('playing');
      const textSpan = timelineAutoplayBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Audio Chronicle Tour';
    }
  }

  function bindTimelineInteractions() {
    // Primary Source & Audio Action Buttons
    document.querySelectorAll('.milestone-primary-cta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.dataset.doc;
        const type = btn.dataset.type;

        if (type === 'document' && docId) {
          openDocumentSheet(docId);
        } else if (type === 'audio') {
          switchPane('pane-media');
          const audioElem = document.querySelector(`[data-audio-id="${docId}"]`);
          if (audioElem) {
            audioElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });

    // Listen to Single Milestone
    document.querySelectorAll('.milestone-listen-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = ARCHIVE_DATA.timeline.find(m => m.id === id);
        if (item) {
          if (timelineState.isTourPlaying) stopTour();
          narrateMilestone(item);
        }
      });
    });
  }

  // Setup Global Timeline Listeners (Controls Deck, Drag, Prev/Next, Layout Switcher)
  function initTimelineControls() {
    // Initialize Gesture Listeners
    initStageGestures();
    initTapeGestures();

    // Era Pills
    timelineEraPills.forEach(pill => {
      pill.addEventListener('click', () => {
        timelineEraPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        timelineState.era = pill.dataset.era;
        timelineState.currentIndex = 0;
        renderTimeline();
      });
    });

    // Decade Ruler Chips
    decadeRulerChips.forEach(chip => {
      chip.addEventListener('click', () => {
        decadeRulerChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        timelineState.decade = chip.dataset.decade;
        timelineState.currentIndex = 0;
        renderTimeline();
      });
    });

    // Search Field
    let searchTimeout = null;
    if (timelineSearchInput) {
      timelineSearchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          timelineState.search = e.target.value;
          timelineState.currentIndex = 0;
          renderTimeline();
        }, 150);
      });
    }

    // Autoplay Tour Toggle
    if (timelineAutoplayBtn) {
      timelineAutoplayBtn.addEventListener('click', () => {
        if (timelineState.isTourPlaying) {
          stopTour();
        } else {
          startTour();
        }
      });
    }

    // Layout Toggle Buttons (3-Way: TimelineJS Stage vs Ribbon Stream vs Editorial Chronicle)
    if (btnLayoutTimelinejs && btnLayoutRibbon && btnLayoutEditorial) {
      btnLayoutTimelinejs.addEventListener('click', () => {
        btnLayoutTimelinejs.classList.add('active');
        btnLayoutRibbon.classList.remove('active');
        btnLayoutEditorial.classList.remove('active');
        timelineState.layout = 'timelinejs';
        if (timelineStageContainer) timelineStageContainer.style.display = 'flex';
        if (timelineRibbonContainer) timelineRibbonContainer.style.display = 'none';
        if (timelineEditorialContainer) timelineEditorialContainer.style.display = 'none';
      });

      btnLayoutRibbon.addEventListener('click', () => {
        btnLayoutRibbon.classList.add('active');
        btnLayoutTimelinejs.classList.remove('active');
        btnLayoutEditorial.classList.remove('active');
        timelineState.layout = 'ribbon';
        if (timelineStageContainer) timelineStageContainer.style.display = 'none';
        if (timelineRibbonContainer) timelineRibbonContainer.style.display = 'block';
        if (timelineEditorialContainer) timelineEditorialContainer.style.display = 'none';
      });

      btnLayoutEditorial.addEventListener('click', () => {
        btnLayoutEditorial.classList.add('active');
        btnLayoutTimelinejs.classList.remove('active');
        btnLayoutRibbon.classList.remove('active');
        timelineState.layout = 'editorial';
        if (timelineStageContainer) timelineStageContainer.style.display = 'none';
        if (timelineRibbonContainer) timelineRibbonContainer.style.display = 'none';
        if (timelineEditorialContainer) timelineEditorialContainer.style.display = 'block';
      });
    }

    // Ribbon View Prev / Next Arrows
    if (timelinePrevBtn && timelineViewport) {
      timelinePrevBtn.addEventListener('click', () => {
        timelineViewport.scrollBy({ left: -380, behavior: 'smooth' });
      });
    }

    if (timelineNextBtn && timelineViewport) {
      timelineNextBtn.addEventListener('click', () => {
        timelineViewport.scrollBy({ left: 380, behavior: 'smooth' });
      });
    }

    // Keyboard Arrow navigation when Timeline is active
    window.addEventListener('keydown', (e) => {
      if (activePaneId !== 'pane-timeline') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (timelineState.layout === 'timelinejs') {
        if (e.key === 'ArrowLeft') {
          goToMilestone(timelineState.currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          goToMilestone(timelineState.currentIndex + 1);
        }
      } else if (timelineState.layout === 'ribbon' && timelineViewport) {
        if (e.key === 'ArrowLeft') {
          timelineViewport.scrollBy({ left: -300, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
          timelineViewport.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    });
  }

  // ==========================================================================
  // Knowledge Graph
  // ==========================================================================
  function renderKnowledgeGraph() {
    const canvas = document.getElementById('knowledge-graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const width = canvas.width;
    const height = canvas.height;

    const nodes = ARCHIVE_DATA.knowledgeNodes.map((n, idx) => {
      const angle = (idx / ARCHIVE_DATA.knowledgeNodes.length) * 2 * Math.PI;
      const radius = idx === 0 ? 0 : 190 + (idx % 2 === 0 ? 30 : -20);
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius
      };
    });

    ctx.clearRect(0, 0, width, height);

    // Links
    ARCHIVE_DATA.knowledgeLinks.forEach(link => {
      const s = nodes.find(n => n.id === link.source);
      const t = nodes.find(n => n.id === link.target);
      if (s && t) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const midX = (s.x + t.x) / 2;
        const midY = (s.y + t.y) / 2;
        ctx.fillStyle = '#64748B';
        ctx.font = '11px Plus Jakarta Sans, sans-serif';
        ctx.fillText(link.label, midX - 20, midY - 4);
      }
    });

    // Nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      ctx.fillStyle = '#1C1917';
      ctx.font = '600 12px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + node.val + 16);
    });
  }

  // ==========================================================================
  // OCR Studio Digitization Handler
  // ==========================================================================
  const ocrSampleBtns = document.querySelectorAll('.ocr-sample-btn');
  const ocrPreviewImg = document.getElementById('ocr-preview-img');

  ocrSampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ocrSampleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sampleId = btn.dataset.sample;
      const manuscript = ARCHIVE_DATA.rareManuscripts.find(m => m.id === sampleId);
      if (manuscript && ocrPreviewImg) {
        ocrPreviewImg.src = manuscript.image;
        ocrStatusTag.textContent = `Facsimile: ${manuscript.title}`;
        ocrOutputText.value = manuscript.extractedText + "\n\n--- Dublin Core Metadata ---\n" + manuscript.metadata.dublinCore;
      }
    });
  });

  if (ocrDropzone) {
    ocrDropzone.addEventListener('click', () => ocrFileInput.click());
    ocrFileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        if (ocrPreviewImg && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (evt) => { ocrPreviewImg.src = evt.target.result; };
          reader.readAsDataURL(file);
        }
        ocrStatusTag.textContent = 'Processing OCR...';
        ocrOutputText.value = 'Running AI optical character recognition on scanned manuscript facsimile...';

        setTimeout(() => {
          ocrStatusTag.textContent = 'Completed (99.4% confidence)';
          ocrOutputText.value = ARCHIVE_DATA.rareManuscripts[0].extractedText +
            "\n\n--- Dublin Core Metadata ---\n" +
            ARCHIVE_DATA.rareManuscripts[0].metadata.dublinCore;
        }, 1200);
      }
    });
  }

  if (ocrExportBtn) {
    ocrExportBtn.addEventListener('click', () => {
      alert('Metadata exported in Dublin Core XML / JSON-LD format.');
    });
  }

  if (ocrSaveBtn) {
    ocrSaveBtn.addEventListener('click', () => {
      alert('Saved directly to the DAIC Digital Institutional Repository.');
    });
  }

  // Audio vault play action
  document.querySelectorAll('.audio-play-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      alert(`Streaming: ${e.currentTarget.dataset.title}\nBitrate: 320kbps Lossless Audio`);
    });
  });

  // ==========================================================================
  // AI Scholar Chat
  // ==========================================================================
  function appendChatBubble(role, text) {
    const row = document.createElement('div');
    row.className = `chat-message-row ${role}`;

    if (role === 'assistant') {
      row.innerHTML = `
        <div class="chat-msg-avatar-wrap">
          <img src="images/ambedkar-portrait.jpg" alt="Dr. Ambedkar Scholar" class="chat-msg-avatar-img">
        </div>
        <div class="message-bubble assistant">
          ${text.replace(/\n/g, '<br>')}
        </div>
      `;
    } else {
      row.innerHTML = `
        <div class="message-bubble user">
          ${text.replace(/\n/g, '<br>')}
        </div>
      `;
    }

    chatFeed.appendChild(row);
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query.trim()) return;
    appendChatBubble('user', query);

    const lower = query.toLowerCase();
    const match = ARCHIVE_DATA.aiCorpus.find(item => lower.includes(item.query.toLowerCase().split(' ')[0]));

    setTimeout(() => {
      if (match) {
        appendChatBubble('assistant', `<strong>Ambedkar Scholar Citation:</strong><br>${match.answer}`);
      } else {
        appendChatBubble('assistant', `<strong>Ambedkar Scholar Citation:</strong><br>Dr. B. R. Ambedkar addressed this topic extensively across the 22 published volumes of Writings and Speeches. He strongly advocated for constitutional morality, democratic institutions, and legal guarantees for social and economic equality.`);
      }
    }, 500);
  }

  if (chatSubmitBtn) {
    chatSubmitBtn.addEventListener('click', () => {
      const q = chatInputBox.value;
      chatInputBox.value = '';
      handleUserQuery(q);
    });

    chatInputBox.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const q = chatInputBox.value;
        chatInputBox.value = '';
        handleUserQuery(q);
      }
    });
  }

  chatPresetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      handleUserQuery(pill.textContent.trim());
    });
  });

  // ==========================================================================
  // Initialize Page
  // ==========================================================================
  renderGallery();
  renderDocuments(ARCHIVE_DATA.documents);
  initTimelineControls();
  renderTimeline();
});
