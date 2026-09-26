# Touch-Friendly & Swipeable UI Projects on GitHub
## Primary Source Research & Architecture Evaluation Report

**Document Purpose:** Curated analysis of top open-source GitHub repositories featuring fluid, gesture-driven, touch-friendly "swipe and see details" user experiences (card stacks, bottom-sheet drawers, touch sliders, and museum kiosk interactives).  
**Investigated Under:** Primary Source Research (`/research`) & Skills Discovery (`/find-skills`)  
**Target Context:** Web applications, touch kiosks, and digital heritage archives (such as the DAIC Kiosk & Digital Heritage Platform in `SIH26096`).

---

## 1. Executive Summary & Comparison Matrix

When building an application where users can **swipe cards, flick items, and expand details via natural touch gestures**, the ecosystem divides into four architectural archetypes:

1. **Card Decks & Tinder-Style Stacks:** Swipe left/right/up to inspect, dismiss, or reveal the next piece of content.
2. **Bottom Sheets & Expandable Drawers:** Tap or swipe up from the bottom to expand full detail views, with spring physics and swipe-down-to-dismiss.
3. **Cover Flow & 3D Touch Carousels:** Smooth touch sliders with perspective cards, snap points, and touch inertia.
4. **Shared Element Full-Screen Transitions:** Tap or drag a card; it morphs into a full-screen detail view with gesture dismiss.

| Repository | GitHub Stars | Tech Stack | Gesture Mechanics | Primary Use Case / Vibe |
| :--- | :--- | :--- | :--- | :--- |
| **[emilkowalski/vaul](https://github.com/emilkowalski/vaul)** | ~14k ★ | React / Radix Primitives | CSS variable-driven touch drag, snap points (e.g. 20%, 50%, 100%), swipe-down-to-close | Native iOS-style bottom sheet / drawer; perfect for "tap card, swipe up for detailed biography/transcript". |
| **[nolimits4web/swiper](https://github.com/nolimits4web/swiper)** | ~41k ★ | Vanilla JS / TS / React / Vue | Hardware-accelerated touch drag, Cards Effect, 3D Coverflow, inertia, mousewheel | The gold-standard touch carousel; feels like an interactive tablet kiosk or App Store showcase. |
| **[dimsemenov/PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)** | ~25k ★ | Vanilla JS (No dependencies) | Multi-touch pinch-to-zoom, horizontal swipe between slides, vertical swipe-to-dismiss | Archival manuscript & photo inspection; smooth flick gestures and detail metadata overlays. |
| **[davidjerleke/embla-carousel](https://github.com/davidjerleke/embla-carousel)** | ~6.5k ★ | Vanilla JS / React / Vue / Svelte | Extensible physics engine, frictionless momentum, drag velocity recognition | Minimalist, buttery-smooth card carousels with zero bloat (3KB core). |
| **[3DJakob/react-tinder-card](https://github.com/3DJakob/react-tinder-card)** | ~1.5k ★ | React | 2D drag physics with rotation angle tied to swipe offset, threshold triggers | Tinder-style swipe cards; swipe left for "Archive", swipe right for "Explore Details". |
| **[pmndrs/use-gesture](https://github.com/pmndrs/use-gesture)** | ~5k ★ | Vanilla JS / React | Low-level gesture binding (`drag`, `pinch`, `wheel`, `move`, `scroll`) | Foundational gesture engine used by high-end design agencies for bespoke touch interactions. |
| **[stanko/react-spring-bottom-sheet](https://github.com/stanko/react-spring-bottom-sheet)** | ~2k ★ | React / react-spring | Fluid physics-based springs, rubber-band resistance, multi-snap heights | Google Maps / Apple Maps style draggable drawer for inspecting item details. |
| **[rhulse/kiosk-application-framework](https://github.com/rhulse/kiosk-application-framework)** | ~150 ★ | React | Multi-touch surface handling, attract loops, timeout resets | Dedicated museum & exhibition kiosk touch architecture. |

---

## 2. In-Depth Project Case Studies & Code Architecture

### 1. Vaul (`emilkowalski/vaul`)
* **Primary URL:** [https://github.com/emilkowalski/vaul](https://github.com/emilkowalski/vaul)
* **Demo / Docs:** [https://vaul.emilkowal.ski/](https://vaul.emilkowal.ski/)
* **Why it fits the vibe:** Built by Emil Kowalski (Design Engineer), Vaul is the smoothest drawer on the web. It is the engine behind shadcn/ui's `Drawer`.
* **Touch Characteristics:**
  * Uses CSS variables (`--swipe-amount`) coupled with `transform: translateY(...)` to avoid React re-renders during active touch dragging.
  * Native iOS rubber-band resistance when pulled beyond boundaries.
  * Dynamic snap points (e.g. `[0.25, 0.6, 1.0]`): swipe halfway to see a quick summary, swipe fully up to read the complete manuscript or speech.
* **Architecture Pattern:**
  ```jsx
  import { Drawer } from 'vaul';

  export function ManuscriptDetailDrawer({ item }) {
    return (
      <Drawer.Root snapPoints={['148px', '355px', 1]}>
        <Drawer.Trigger className="manuscript-card">
          <h3>{item.title}</h3>
          <p>Tap or swipe up to inspect...</p>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-900 fixed bottom-0 left-0 right-0 rounded-t-[20px] p-6">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-700 mb-6" />
            <h2>{item.title}</h2>
            <div className="overflow-y-auto max-h-[70vh]">
              <p>{item.fullTranscript}</p>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
  ```

---

### 2. Swiper.js (`nolimits4web/swiper`)
* **Primary URL:** [https://github.com/nolimits4web/swiper](https://github.com/nolimits4web/swiper)
* **Demos:** [https://swiperjs.com/demos](https://swiperjs.com/demos)
* **Why it fits the vibe:** The quintessential mobile touch slider. It offers out-of-the-box **Cards Effect** and **3D Coverflow Effect**, letting users flick through a deck of cards with real touch momentum.
* **Touch Characteristics:**
  * Uses pure CSS 3D transforms (`translate3d`, `rotateY`, `scale`) for 60fps / 120fps hardware acceleration on touch devices and kiosk touchscreens.
  * Direct touch listener support (`touchstart`, `touchmove`, `touchend`, `pointerdown`) with touch ratio and momentum inertia.
* **Implementation in Vanilla JS (matches `SIH26096` stack):**
  ```html
  <!-- Swiper Cards Effect Structure -->
  <div class="swiper myCardSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="kiosk-card">
          <img src="manuscript1.jpg" alt="Draft Constitution" />
          <h3>Constituent Assembly Draft (1948)</h3>
          <button onclick="openDetailView(1)">Read Full Detail</button>
        </div>
      </div>
      <div class="swiper-slide">...</div>
    </div>
  </div>

  <script type="module">
    import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

    const swiper = new Swiper('.myCardSwiper', {
      effect: 'cards',
      grabCursor: true,
      cardsEffect: {
        perSlideOffset: 8,
        perSlideRotate: 2,
        rotate: true,
        slideShadows: true,
      },
    });
  </script>
  ```

---

### 3. PhotoSwipe (`dimsemenov/PhotoSwipe`)
* **Primary URL:** [https://github.com/dimsemenov/PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)
* **Why it fits the vibe:** Ideal for museum digital archives where high-resolution manuscripts, rare historical photographs, and archival gazettes require gesture zoom and swipe flicking.
* **Touch Characteristics:**
  * Fluid pinch-to-zoom and multi-touch pan.
  * Swipe vertically to dismiss back to the list.
  * Zero dependencies; extremely fast on touchscreen kiosks and mobile phones.

---

### 4. Framer Motion Shared Element "Card to Detail" (`framer-motion`)
* **Reference Example:** [Motion Shared Layout Documentation](https://motion.dev) / [GitHub Demos](https://github.com/a2rp/framer-motion-demos)
* **Why it fits the vibe:** Directly replicates the Apple App Store "Today" tab: a grid of cards where tapping or pulling any card smoothly morphs it into a full-page modal with high detail, and dragging down dismisses it back into the grid.
* **Gesture Core:**
  ```jsx
  import { motion, AnimatePresence } from 'framer-motion';

  // Detail Modal with Drag-to-Dismiss
  <motion.div
    layoutId={selectedCard.id}
    drag="y"
    dragConstraints={{ top: 0, bottom: 0 }}
    onDragEnd={(e, { offset, velocity }) => {
      if (offset.y > 150 || velocity.y > 500) {
        setSelectedCard(null); // Swipe down dismisses!
      }
    }}
    className="detail-modal"
  >
    {/* Full details content */}
  </motion.div>
  ```

---

### 5. Vanilla JS Lightweight Touch Gestures (Zero-Dependency for Kiosks)
If you do not want external NPM packages and want pure touch event handling in your `app.js`:
```javascript
// Lightweight Touch Swipe Listener with Details Drawer
export function setupSwipeableDetail(element, onSwipeUp, onSwipeDown) {
  let touchStartY = 0;
  let touchEndY = 0;

  element.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  element.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY - touchEndY;
    const threshold = 50; // min 50px swipe

    if (diff > threshold) {
      // Swiped UP -> Reveal Details
      onSwipeUp();
    } else if (diff < -threshold) {
      // Swiped DOWN -> Close / Dismiss Details
      onSwipeDown();
    }
  }, { passive: true });
}
```

---

## 3. Discovered Agent Skills for Touch & Gesture Design (`/find-skills`)

Using the open agent skills ecosystem (`npx skills find`), the following top skills specialize in fluid gesture UI, touch physics, and spring animations:

| Skill Package | Total Installs | Description | Command to Install |
| :--- | :--- | :--- | :--- |
| **`emilkowalski/skills@apple-design`** | **164.4K installs** | Master Apple-grade micro-interactions, fluid touch gestures, and spring physics. | `npx skills add emilkowalski/skills@apple-design -g -y` |
| **`emilkowalski/skills@animate-expo`** | **65.5K installs** | Gesture animation patterns for mobile and tablet touch displays. | `npx skills add emilkowalski/skills@animate-expo -g -y` |
| **`software-mansion/argent@argent-device-interact`** | **19.5K installs** | Touch device interaction principles and gestures. | `npx skills add software-mansion/argent@argent-device-interact -g -y` |
| **`patricio0312rev/skills@framer-motion-animator`** | **10.4K installs** | Advanced gesture-driven card animations and swipe-to-dismiss patterns. | `npx skills add patricio0312rev/skills@framer-motion-animator -g -y` |
| **`dylantarre/animation-principles@mobile-touch`** | **2.3K installs** | Core animation principles for mobile touch, gesture thresholds, and rubber-banding. | `npx skills add dylantarre/animation-principles@mobile-touch -g -y` |
| **`owl-listener/designer-skills@gesture-patterns`** | **1.7K installs** | Design patterns for swipe, pinch, flick, and bottom sheet interactions. | `npx skills add owl-listener/designer-skills@gesture-patterns -g -y` |

---

## 4. Recommendations for the SIH26096 Digital Archive Kiosk

To bring this exact touch-friendly "swipe to see details" vibe to this workspace:
1. **Interactive Touch Carousel for Manuscripts & Speeches:**
   - Integrate **Swiper's Cards or Coverflow Effect** in the `view-kiosk-home` or `view-timeline` section.
   - Visitors can physically flick through historical documents like a tactile deck of cards.
2. **Draggable Detail Bottom Sheet (Vaul style):**
   - When a visitor taps any historical document or timeline milestone, a bottom drawer slides up displaying the high-res archival scan, English/Hindi transcript, and AI summary.
   - Visitors can swipe up to expand to full screen or swipe down to dismiss.
3. **Touch Targets & Physics:**
   - Maintain minimum $48\text{px} \times 48\text{px}$ touch targets.
   - Apply CSS `touch-action: pan-y` or `touch-action: none` to gesture areas to prevent conflicting native page scroll.
