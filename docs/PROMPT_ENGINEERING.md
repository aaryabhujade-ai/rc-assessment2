# Prompt Engineering & Text Synthesis Breakdown

This document analyzes the prompt engineering methodology used in the Auralis Nova key visual workflow. The prompt leverages **Qwen Image 2.1**'s advanced multimodal language comprehension to simultaneously synthesize physical product rendering, complex dynamic fluid/shatter dynamics, and exact typographical layout.

---

## 1. Complete Active Positive Prompt

```text
A photorealistic, ultra-premium cinematic advertising poster for a luxury wireless headphone brand, wide 16:9 landscape format, art-directed like a global flagship product launch campaign.

CONCEPT:
A single pulse of sound from the headphones has shattered a wall of black volcanic glass. The moment is frozen in time: power, precision and silence captured in one frame.

HERO PRODUCT (right side, dominant):
One pair of premium over-ear wireless headphones floats mid-air in the right half of the frame, centered around the right third, angled in a dynamic three-quarter view and tilted about 15 degrees. It fills roughly 50% of the frame height and is razor sharp. Colorway: OBSIDIAN & 24K GOLD.
- Headband: a seamless, single-piece arc in deep glossy obsidian black with a mirror-like lacquer finish, and an underside cushioned in fine black protein leather with precise gold stitching.
- Sliders and hinges: slim, polished 24-karat gold metal with machined bevelled edges and engraved precision detailing.
- Earcups: oval, matte obsidian black, with an outer face of a fine micro-perforated acoustic mesh in a subtle radial pattern and a razor-thin warm-gold luminous light ring glowing around the outer edge.
- Ear cushions: plush memory foam wrapped in soft black protein leather with visible natural grain and fine stitching.
- Branding: a tiny, elegant engraved "AURALIS" wordmark in gold on the earcup.
Flawless industrial design, physically accurate metal reflectance, realistic leather micro-texture, no visible buttons or cables.

SCENE AND DYNAMIC ACTION:
Erupting outward from directly behind the headphones, a thick pane of black volcanic glass shatters in a radial explosion. Hundreds of sharp, angular obsidian shards and glinting gold-edged fragments are frozen mid-flight, spiralling outward in a dynamic vortex around the product. Fine 24K gold dust, tiny molten-gold sparks and glass micro-particles hang suspended in the air. A faint visible ring-shaped shockwave distortion ripples through the air around the earcups.

DEPTH LAYERS:
- Foreground: a few large obsidian shards close to the lens, softly out of focus with bokeh highlights, framing the scene.
- Midground: the headphones in perfect crisp focus, surrounded by sharp flying shards and gold dust.
- Background: a dark charcoal backdrop of textured volcanic stone with fine grain and subtle cracks, lit by soft grazing light and fading into deep smoky shadow.
- Atmosphere: thin layers of drifting volumetric smoke catching the light, creating strong three-dimensional depth.

LIGHTING (cinematic and dramatic):
- A hard, narrow top-down spotlight acting as the key, sculpting the headband's curve with a long specular highlight.
- Warm gold rim lights from back-left and back-right tracing a crisp glowing outline around the entire product silhouette, separating it cleanly from the dark background.
- A soft circular backlight bloom directly behind the headphones, creating a subtle halo that pushes the product forward.
- Every shard catches sharp specular glints and gold reflections.
- Deep rich blacks with retained shadow detail, controlled highlights, a gentle bloom on the gold light rings.

COLOR PALETTE:
Obsidian black (#0A0A0B), charcoal smoke (#1C1C1F), 24K gold (#D4A64A), champagne highlight (#F2D9A0), soft warm white (#F5F1E8). A luxurious black-and-gold cinematic color grade with a subtle film-like tonal roll-off.

TYPOGRAPHY AND LAYOUT (left 40% of frame, clean negative space):
The left side is a calm, darker, uncluttered area with a smooth charcoal-to-black gradient and faint stone texture. It holds a refined, left-aligned editorial typographic layout with generous margins (about 6% of frame width from the left edge):
1. Top left: the brand wordmark "AURALIS" in a thin geometric sans-serif with very wide letter-spacing, in polished gold, small and elegant.
2. Vertical center left: a large two-line headline, "SILENCE," over "SHATTERED.", in a bold condensed modern sans-serif with a white fill, a subtle brushed-gold metallic texture, and a soft warm glow. This is the largest text in the composition.
3. Below the headline: the product name "NOVA" in an ultra-thin, widely spaced luxury high-contrast serif in gold, with a thin horizontal gold rule extending to its right.
4. Below that: the tagline "Wireless. Weightless. Limitless." in a light grey, refined sans-serif at small size.
5. Bottom left corner: "AVAILABLE NOW" in tiny wide-tracked gold capitals.
All text is crisp, sharp, correctly spelled, perfectly kerned, with clear visual hierarchy and no overlapping with any shards. The typography sits naturally within the scene lighting.

CAMERA AND RENDERING:
Shot on a Phase One IQ4 medium format camera with a 100mm macro lens at f/8 and a 1/20000s high-speed-flash aesthetic. Eye-level, slightly low angle for a heroic presence. Product tack sharp; foreground and far background gently defocused.
Hyper-photorealistic, 8K resolution, ultra-detailed textures, commercial product photography combined with high-speed photography. Art direction in the style of Bang & Olufsen, Bowers & Wilkins and Cartier campaigns: luxurious, powerful, sophisticated and aspirational.

No watermark, no signature, no border, and no text other than the specified words.
```

---

## 2. Active Negative Prompt

```text
misspelled text, garbled letters, gibberish typography, extra words, distorted fonts, overlapping text, watermark, signature, border, multiple headphones, duplicate product, deformed headband, asymmetrical earcups, broken hinges, cheap plastic, toy look, wires, cables, people, hands, product blending into background, cluttered left side, muddy colors, oversaturated neon, flat lighting, blown highlights, noise, jpeg artifacts, blurry product, cartoon, illustration, CGI plastic look, low resolution
```

---

## 3. Structural Deconstruction & Prompt Architecture

The prompt follows an advanced **Modular Segmented Prompt Architecture (MSPA)** designed for Large Vision-Language diffusion models:

```
┌────────────────────────────────────────────────────────┐
│ 1. CAMPAIGN METADATA & FORMAT SPECIFICATION            │
├────────────────────────────────────────────────────────┤
│ 2. NARRATIVE METAPHOR (Sound Shattering Glass)         │
├────────────────────────────────────────────────────────┤
│ 3. PRODUCT CAD & INDUSTRIAL DESIGN DEFINITIONS         │
├────────────────────────────────────────────────────────┤
│ 4. PARTICLE & FLUID PHYSICS (Radial Vortex Shards)     │
├────────────────────────────────────────────────────────┤
│ 5. Z-DEPTH OPTICAL LAYERING (Foreground/Mid/Back)      │
├────────────────────────────────────────────────────────┤
│ 6. THREE-POINT STUDIO LIGHTING & SPECULAR HIGHLIGHTS   │
├────────────────────────────────────────────────────────┤
│ 7. STRICT HEX COLOR TOKEN SPECIFICATIONS               │
├────────────────────────────────────────────────────────┤
│ 8. SPATIAL TYPOGRAPHIC INJECTION & KERN RULES          │
├────────────────────────────────────────────────────────┤
│ 9. VIRTUAL CAMERA, SENSOR & SHUTTER ATTRIBUTES         │
└────────────────────────────────────────────────────────┘
```

### Why This Architecture Succeeds with Qwen Image 2.1:
1. **Spatial Anchoring (`left 40%` vs `right third`):**
   By explicitly defining spatial bounds in percentages and thirds, the prompt prevents the common AI failure where visual noise spills into typographic zones.
2. **Explicit Typographic Syntax:**
   Specifying exact case, formatting (`"SILENCE," over "SHATTERED."`), font styling (geometric sans vs modern serif), and margin offsets (`6% of frame width`) allowed Qwen 2.1 to generate billboard-ready in-image typography with near-perfect spelling and kerning.
3. **Physical Optical Constraints:**
   Specifying `"Phase One IQ4 medium format camera with a 100mm macro lens at f/8 and 1/20000s high-speed-flash aesthetic"` informs the model's depth-of-field algorithm, producing authentic shallow focus on foreground shards while keeping the entire headphone body tack sharp.
