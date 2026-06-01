# Design System: Mapache

## 1. Visual Theme & Atmosphere
A refined, boutique-airy interface that balances classic sporting heritage (inspired by preppy giants like Lacoste and Fred Perry) with a fresh, coastal-urban Latin American vibe (Mapache LATAM). 

The atmosphere is clean, timeless, and highly tactile — focusing on premium fabric textures, generous margins, and a structured grid layout that feels both relaxed and premium. It avoids modern tech slop and instead presents the garments as artisanal daily essentials.

## 2. Color Palette & Roles
The color palette is calibrated around Mapache's signature deep navy and natural fiber tones, completely banning sterile cold grays or neon gradients.

- **Sartorial Navy** (#1A3154) — Signature brand color. Derived from the classic logo background. Used for primary branding, dominant UI panels, active navigation, and primary call-to-actions.
- **Canvas Stone** (#FAF9F6) — Primary background surface. A warm, natural alabaster/cotton undertone that evokes the feel of premium textured pique fabrics.
- **Pure Surface** (#FFFFFF) — Card, container, and dialog fill. High-contrast elevation against the warm Canvas Stone.
- **Charcoal Ink** (#1B1C1E) — Primary body text, titles, and headers. A soft, premium off-black that is easier on the eyes than pure black.
- **Muted Linen** (#78726A) — Secondary text, description paragraphs, size guides, and technical metadata.
- **Whisper Border** (rgba(26, 49, 84, 0.08)) — 1px structural dividers, table lines, and input borders. Softly tinted with Navy to maintain palette coherence.
- **Sunset Amber** (#D96B43) — Accent color. A warm, sophisticated terra-cotta/orange inspired by coastal sunsets (as seen in the brand's beachwear photography). Used extremely sparingly for exclusive badges, active filters, or sale notices.

## 3. Typography Rules
Typography balances geometric elegance with utilitarian clarity to communicate heritage and premium craftsmanship.

- **Display/Headlines:** `Outfit` (or `Satoshi`) — Track-tight, medium to semi-bold. Refined geometric grotesque that scales beautifully. Hierarchy is driven by weight and capitalization (e.g., uppercase letter-spaced category titles) rather than gargantuan size.
- **Body:** `Satoshi` (or high-quality Sans-Serif system) — 1.6x line-height, maximum 65 characters per line to ensure effortless reading. Colored in Charcoal Ink for hierarchy and Muted Linen for secondary content.
- **Mono/Technical:** `Space Mono` (or `JetBrains Mono`) — Dedicated to technical garment specifications, fabric grammage, size tags (S, M, L, XL), product SKU codes (e.g., `MPC-POLO-01`), and pricing numbers.
- **Banned:** `Inter` is strictly BANNED to keep the interface from looking like a SaaS dashboard or standard template. Generic system serifs are banned.

## 4. Component Stylings
- **Primary Buttons:** Flat, solid Sartorial Navy fill with sharp or micro-rounded (0.25rem / 4px) corners. Active state uses a tactile press (-1px translate). Focus ring in Sartorial Navy with a 2px offset.
- **Secondary Buttons:** Transparent fill with a thin 1px Whisper Border and Charcoal Ink text. Transitions to a soft Canvas Stone background on hover.
- **Product Cards:** Frameless styling by default. Instead of box-shadowed floating boxes, products are displayed on a clean Pure Surface background with minimal borders (Whisper Border) or defined by generous white space. 
- **Garment Variant Selectors:** Custom round color-swatch circles with high-contrast active rings, and monospace pill buttons for sizes. Banned: Standard HTML dropdown select inputs for sizes.
- **Input Fields:** Text labels positioned above, rendered in small caps, track-wide Muted Linen. Input containers have solid Pure Surface background, thin Whisper Border, and transition to a 1px Navy border on active focus.

## 5. Layout & Grid Principles
- **Asymmetric Splitting:** Large grids that give visual breathing room. Hero sections split into an editorial product story on one side and a premium textured visual on the other.
- **Boutique Spacing:** Vertical section margins use flexible fluid spaces (`clamp(4rem, 10vw, 8rem)`) to give the clothing breathing room.
- **No Overlapping:** Images and typographic headers never overlap. Grid components maintain rigid, pristine boundaries.
- **Collection Rows:** Banned: 3 equal cards horizontally. Instead, use dynamic layouts: an asymmetric 2/3 and 1/3 grid where the featured item has a larger canvas, or a horizontal touch-scroll grid on mobile.

## 6. Motion & Interactive Details
- **Spring Physics:** All hover states, slide-in menus, and filters use a premium spring animation (`stiffness: 90, damping: 18`) to feel organic and weighty. Linear or robotic cubic-bezier ease animations are banned.
- **Fabric Detail Zoom:** Product cards subtly scale the image by 2% on hover, revealing the premium weave texture of the polo shirts without breaking the grid layout.
- **Cart Drawer:** A clean side-slide drawer executing a staggered entrance for added items, utilizing hardware-accelerated `transform: translateX` and `opacity` exclusively.

## 7. Anti-Patterns (Banned AI Tells)
- **NO emojis anywhere** (use bespoke minimalist SVGs instead).
- **NO Inter font** (use `Outfit` and `Space Mono`).
- **NO pure black (#000000)** (use Charcoal Ink #1B1C1E).
- **NO purple, neon, or gradient button glows**.
- **NO generic placeholder text** ("Lorem Ipsum", "John Doe"). All product details, models, and descriptions must represent a real premium Latin American polo boutique.
- **NO generic AI copywriting** like "Elevate your style", "Seamless shopping", "Next-gen apparel", "Unleash your wardrobe". Use clean, direct, editorial copy ("Crafted from 100% Peruvian Pima cotton", "The original Mapache Polo", "Designed for coastal afternoons").
