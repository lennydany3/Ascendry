# Ascendry Design System — Black & White Minimal

> Websites, booking systems and automation for growing businesses.
> Pure black and white. Lots of space. Sharp type. One unforgettable hero.

This file is the single source of truth for the Ascendry hub site and the shared
elements (demo bar, footer credit) that appear on every Ascendry demo website.
It **replaces** the earlier Obsidian & Champagne version. No gold anywhere.

---

## 1. Brand principles

1. **Monochrome, always.** Emphasis comes from white vs grey, size, italics and space, never colour.
2. **The work is the colour.** The only colour on the hub comes from the 9 demo screenshots, so they pop.
3. **Minimal means minimal.** If a section feels busy, remove an element before adding one.
4. **Precise, not decorative.** 1px hairlines, small radii, no shadows, no decorative gradients.
5. **Clear over clever.** Every page has one obvious next step.

---

## 2. Logo

### Mark: "Split Summit" A

Three pieces: left plane, right plane (rises higher, the "ascend" cue), crossbar.
Never redraw or distort. Always use these exact paths.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <g fill="currentColor">
    <path d="M8 116 41 18h17L34 116z"/>   <!-- left plane -->
    <path d="M73 0h17l30 116H94z"/>       <!-- right plane -->
    <path d="M25 82h40l4 14H21z"/>        <!-- crossbar -->
  </g>
</svg>
```

### Versions

| Version | Mark | Background |
|---|---|---|
| Primary (dark) | `#FAFAFA` | `#0A0A0A` |
| Light | `#0A0A0A` | `#FAFAFA` |
| Code / inline | `currentColor` | — |
| App icon / favicon | `#FAFAFA` mark, ~22% padding | `#0A0A0A` rounded square, radius 22% |

### Lockup

- Mark + `ASCENDRY` in **Inter 500**, uppercase, `letter-spacing: 0.2em`.
- Mark height ≈ 1.4× wordmark cap height; gap = 0.5× mark width.
- Clear space around the lockup = height of the crossbar × 2.
- Minimum size: mark 16px, lockup 96px wide.

### Don't

- Don't use gold/champagne or any colour on the mark.
- Don't rotate, outline, add shadows/gradients, or set the wordmark in bold or Arial.
- Don't place the mark on busy images without a solid black/white backing.

---

## 3. Colour

### Core tokens

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background |
| `--surface` | `#111111` | Cards, inputs, raised blocks |
| `--surface-hover` | `#171717` | Hover state for cards and rows |
| `--fg` | `#FAFAFA` | Headings, primary text, primary button background |
| `--fg-muted` | `#A1A1A1` | Body text, nav links, italic headline word |
| `--fg-subtle` | `#7C7C7C` | Meta, captions, eyebrows |
| `--border` | `rgba(255,255,255,0.08)` | Default 1px hairline |
| `--border-strong` | `rgba(255,255,255,0.16)` | Hover, emphasis, secondary button |
| `--invert-bg` | `#FAFAFA` | One optional inverted (white) section per page |
| `--invert-fg` | `#0A0A0A` | Text on the inverted section |
| `--invert-muted` | `#525252` | Body text on the inverted section |
| `--error` | `#F87171` | Form errors only |
| `--success` | `#4ADE80` | Form success tick only |

### Rules

- **No brand accent colour.** No gold, no blue links.
- `--error` / `--success` are functional only: never decorative.
- No decorative gradients. Allowed only: functional fades (marquee edge masks,
  a background grid fading out) and the 3D hero lighting.
- No drop shadows. Depth = `--surface` + hairline.

### Contrast (WCAG on `#0A0A0A`)

| Pair | Ratio | Result |
|---|---|---|
| `#FAFAFA` on `#0A0A0A` | ~19:1 | AAA |
| `#A1A1A1` on `#0A0A0A` | ~7.7:1 | AAA body |
| `#7C7C7C` on `#0A0A0A` | ~4.7:1 | AA (use ≥ 12px) |
| `#0A0A0A` on `#FAFAFA` | ~19:1 | AAA |
| `#525252` on `#FAFAFA` | ~7.6:1 | AAA body |
| ❌ `#525252` or darker on `#0A0A0A` | < 3:1 | Never for text |

---

## 4. Typography

| Role | Font | Weights | Source |
|---|---|---|---|
| Display / headings | **Instrument Serif** | 400, italic 400 | Google Fonts |
| Body / UI | **Inter** | 400, 500 | Google Fonts |
| Mono details (optional) | **Geist Mono** | 400 | Google Fonts / Vercel |

### Scale (desktop → mobile)

| Token | Size | Line height | Style |
|---|---|---|---|
| `display` | 96 → 52px | 0.95 | Instrument Serif, `-0.02em` |
| `h1` | 72 → 44px | 1.0 | Instrument Serif |
| `h2` | 48 → 34px | 1.05 | Instrument Serif |
| `h3` | 24 → 20px | 1.3 | Inter 500 |
| `lead` | 20 → 18px | 1.6 | Inter 400, `--fg-muted` |
| `body` | 16px | 1.7 | Inter 400, `--fg-muted` |
| `small` | 14px | 1.6 | Inter 400 |
| `eyebrow` | 12px | 1.4 | Inter 500 or Geist Mono, uppercase, `0.16em`, `--fg-subtle` |

### Rules

- **Signature move:** one word per headline in *Instrument Serif italic* +
  `--fg-muted`. Example: "Websites that *work* as hard as you do." Max one per headline.
- Headings `--fg`, body `--fg-muted`, max 60ch per line.
- Sentence case everywhere; uppercase only for eyebrows and the wordmark.
- Never use Inter for display sizes or bold the serif.

---

## 5. Layout and spacing

- **Base unit:** 4px. Scale: `4 8 12 16 24 32 48 64 96 128 160 200`.
- **Container:** 1200px max, side padding 24px (mobile) / 48px (desktop).
- **Grid:** 12 columns, 24px gutter.
- **Section padding:** 160px desktop / 96px mobile.
- **Section separation:** full-width 1px `--border` line, not background changes.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.

---

## 6. Shape and borders

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Buttons, inputs, chips |
| `--radius-md` | 10px | Cards |
| `--radius-lg` | 12px | Screenshot / browser frames |
| Border | `1px solid var(--border)` | All edges and dividers |

No pills, no thick borders, no shadows.

---

## 7. Components

### Buttons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| **Primary** | `--fg` | `--bg` | — | bg `#E5E5E5`, arrow `→` slides 3px |
| **Secondary** | transparent | `--fg` | 1px `--border-strong` | bg `--surface` |
| **Inverted primary** (on white section) | `--invert-fg` | `--invert-bg` | — | bg `#262626` |
| **Text link** | — | `--fg` | 1px underline `--border-strong`, offset 4px | underline → `--fg` |

Size: height 44px, padding 0 20px, radius 6px, Inter 500 14px.
**Max one primary button per view.** Subtle magnetic pull (≤ 6px) on primary only.

### Navigation

- Transparent over hero → `rgba(10,10,10,0.8)` + `backdrop-filter: blur(12px)` +
  bottom hairline after 40px scroll.
- Left: white lockup. Centre: Work · Services · About (`--fg-muted` → `--fg`).
  Right: secondary button "Get a quote".
- Mobile: full-screen black menu, large serif links staggered in.

### Cards

- `--surface`, 1px `--border`, radius 10px, padding 24px.
- Hover: `--surface-hover` + `--border-strong`.
- Optional: cursor-follow spotlight on the **border only** (white at 10%).

### Demo / work card

- Screenshot inside a browser frame (radius 12px, hairline, 3 grey dots).
- Eyebrow niche → serif name → one line `--fg-muted` → "View live demo ↗".
- Hover: screenshot pans slowly downward inside the frame.

### Inputs

- `--surface`, 1px `--border`, radius 6px, height 44px, `--fg` text, `--fg-subtle` placeholder.
- Focus: border `--fg`, no glow. Label above: Inter 500 13px `--fg`.
- Error: 13px `--error` text below; border `--error`.

### Chips (feature tags, multi-select)

- Transparent, 1px `--border`, radius 6px, 12px Inter, `--fg-muted`.
- Selected: bg `--fg`, text `--bg`.

### Section header pattern

```
— 01 / SELECTED WORK          ← eyebrow, --fg-subtle
Built for real businesses.     ← h2 serif, one italic word in --fg-muted
Short supporting line…         ← lead, --fg-muted, max 56ch
```

### Footer

- Top hairline; lockup + one-liner; columns Pages / Legal / Contact.
- "© {year} Ascendry · Chennai, India" + Udyam line in `--fg-subtle`.
- Signature: huge cropped `ASCENDRY` wordmark at the bottom edge in `#141414`.

### WhatsApp button (floating)

- 48px circle, `--surface`, 1px `--border`, white icon, bottom-right. Hidden on `/contact`.

### Focus and selection

- `:focus-visible` → 1px solid `--fg` outline, offset 3px.
- `::selection` → bg `--fg`, text `--bg`.

---

## 8. Hero: "The Ascent"

The one place allowed to use 3D lighting and reflections.

- **Layout:** split, text left (~55%), 3D mark right (~45%); mark above text on mobile.
- **Background:** 1px dot/line grid at 4% white, radially masked to fade at the edges.
- **3D mark:** the 3 SVG pieces extruded separately, polished silver/chrome
  (`#D9D9D9`, metalness 1, roughness ~0.2, clearcoat 0.6), studio light strips,
  faint floor reflection, optional faint white light shaft.
- **Intro (~2.2s):** left plane slides in → crossbar snaps on → **right plane rises
  from below and settles higher** (tiny overshoot) → one white highlight sweep →
  headline words mask up, then sub, then CTAs.
- **Idle:** slow float ±4px, ±5° sway. **Cursor:** tilt ≤ 8°, heavy lerp.
  **Scroll out:** rotate ~25°, fade and scale down.
- **Fallback:** same assemble animation in 2D SVG (white) on mobile, low-power
  devices, before WebGL loads, and a static mark under reduced motion.
- **Marquee** at the bottom: niches in eyebrow style, edge-faded, pause on hover.

---

## 9. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150ms | Hover states |
| `--dur-base` | 250ms | Cards, nav, accordions |
| `--dur-slow` | 700ms | Reveals |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything |

- Reveal: opacity 0→1, y 12→0px, blur 4→0px, once, stagger 60ms.
- Headlines: word-by-word mask-up.
- Page transition: main content fade + 8px rise.
- `prefers-reduced-motion: reduce` → opacity only; static hero and marquee.
- No bounce, no parallax overload, no custom cursor, no autoplay carousels.

---

## 10. Imagery and icons

- **Icons:** lucide-react, outline, 1.5px stroke, 18–20px, `--fg-muted` → `--fg`.
- **Imagery:** only demo screenshots in browser/phone frames. No stock photos.
- **Portraits:** monochrome (greyscale) only.
- No emoji on the hub site.

---

## 11. Ascendry demo bar (on every demo site)

Each demo keeps its own colours; this bar marks it as Ascendry work.

| Property | Value |
|---|---|
| Height | 40px desktop / 48px mobile |
| Background | `#0A0A0A` |
| Bottom border | `1px solid rgba(255,255,255,0.12)` |
| Left text | "Demo by **ASCENDRY** · want this for your business?", Inter 13px, `#FAFAFA`; wordmark tracked `0.2em` |
| Right CTA | "Chat on WhatsApp": `#FAFAFA` bg, `#0A0A0A` text, 28px tall, radius 6px |
| Behaviour | Static (not sticky), dismissible ✕ on mobile |

```html
<div class="asc-demo-bar">
  <span>Demo by <strong>ASCENDRY</strong> · want this for your business?</span>
  <a href="https://wa.me/91XXXXXXXXXX" class="asc-demo-cta">Chat on WhatsApp</a>
</div>
```

```css
.asc-demo-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;
  height:40px;padding:0 20px;background:#0A0A0A;border-bottom:1px solid rgba(255,255,255,.12);
  font:400 13px/1 Inter,system-ui,sans-serif;color:#FAFAFA}
.asc-demo-bar strong{font-weight:500;letter-spacing:.2em}
.asc-demo-cta{background:#FAFAFA;color:#0A0A0A;font-weight:500;font-size:12px;
  padding:7px 12px;border-radius:6px;text-decoration:none}
.asc-demo-cta:hover{background:#E5E5E5}
```

Footer credit on every demo: `Designed & built by Ascendry` (links to the hub).

### Demo site palettes (reference)

Demos use their own colours; only the demo bar and footer credit are Ascendry.

| Demo | Brand | Surface |
|---|---|---|
| Coffee cafe (Bean and Brew) | `#5C3D2E` | `#F3E9DC` |
| Gaming cafe (Respawn Arena) | `#8B5CF6` | `#0E0B1A` |
| Gym (IronCore) | `#E63946` | `#141414` |
| Clothing (Threadline) | `#7D8F69` | `#F2EFE9` |
| Stays (Coastline Stays) | `#1D6FA3` | `#F4ECDF` |
| Restaurant (Saffron Table) | `#E8891C` | `#8E1F1A` |
| Salon & spa (Luxe Studio) | `#A05C8E` | `#F8F0F4` |
| Coaching (Apex Academy) | `#1F7A4D` | `#F3F6F1` |
| Bakery (Crumb and Co) | `#B23A5B` | `#F7D774` |

---

## 12. Voice and copy

- Confident, plain, short. Talk about the client's results, not our tech.
- ✅ "Get bookings while you sleep." ❌ "We leverage cutting-edge Next.js solutions."
- CTAs: verb first, 1–3 words: "View our work", "Get a quote", "Chat on WhatsApp".
- No exclamation marks; avoid "simply", "seamless", "unlock", "leverage".
- Never invent testimonials, client logos, ratings or statistics.

---

## 13. Do / Don't

| Do | Don't |
|---|---|
| Keep everything black, white and grey | Add any accent colour to the hub |
| Use one italic grey word for emphasis | Bold or colour words for emphasis |
| Separate sections with hairlines and space | Stack coloured background bands |
| One primary (white) button per view | Two white buttons side by side |
| Let demo screenshots carry the colour | Use stock photos or illustrations |
| Instrument Serif for headings, Inter for everything else | Add a third display font |
| Remove elements when a section feels busy | Fill empty space "because it's empty" |

---

## 14. Tokens

### CSS variables

```css
:root {
  /* Colour */
  --bg: #0A0A0A;
  --surface: #111111;
  --surface-hover: #171717;
  --fg: #FAFAFA;
  --fg-muted: #A1A1A1;
  --fg-subtle: #7C7C7C;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --invert-bg: #FAFAFA;
  --invert-fg: #0A0A0A;
  --invert-muted: #525252;
  --error: #F87171;
  --success: #4ADE80;

  /* Type */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;

  /* Shape */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 12px;

  /* Motion */
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 700ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

html { background: var(--bg); color: var(--fg-muted); font-family: var(--font-body); }
h1, h2, .display { font-family: var(--font-display); font-weight: 400; color: var(--fg); }
h1 em, h2 em, .display em { font-style: italic; color: var(--fg-muted); }
::selection { background: var(--fg); color: var(--bg); }
:focus-visible { outline: 1px solid var(--fg); outline-offset: 3px; }
```

### Tailwind v4 (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-bg: #0A0A0A;
  --color-surface: #111111;
  --color-surface-hover: #171717;
  --color-fg: #FAFAFA;
  --color-fg-muted: #A1A1A1;
  --color-fg-subtle: #7C7C7C;
  --color-line: rgba(255, 255, 255, 0.08);
  --color-line-strong: rgba(255, 255, 255, 0.16);
  --color-invert-bg: #FAFAFA;
  --color-invert-fg: #0A0A0A;
  --color-invert-muted: #525252;
  --color-error: #F87171;
  --color-success: #4ADE80;

  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 12px;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Example:
`<button class="h-11 px-5 rounded-sm bg-fg text-bg font-medium hover:bg-[#E5E5E5] transition-colors duration-150">View our work →</button>`
