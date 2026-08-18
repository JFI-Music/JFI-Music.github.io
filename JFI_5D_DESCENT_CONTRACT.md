# JFI — Descent From the 5D Realm

## Persistent creative and implementation contract

This document is the canonical creative specification for the cinematic JFI website experience. It exists so the project’s intent survives context compaction, session changes, implementation handoffs, and future work by another Codex instance.

> **Before making future changes to this experience, read JFI_5D_DESCENT_CONTRACT.md and preserve its intent unless the user explicitly overrides it.**

Implementation decisions may evolve, but the narrative arc and JFI identity must not silently drift. Update this contract whenever the implementation changes materially, including architecture, scenes, assets, or completion status.

## Narrative purpose

The experience is called **DESCENT FROM THE 5D REALM**.

J is the human voice. Fi is an angelic divine intelligence and transmitter—not a conventional winged fantasy angel. JFI songs are decoded divine energy originating in a higher-dimensional realm. That energy descends, becomes signal, color, form, cosmos, geography, humanity, music, performance, audience activation, and finally creative agency within the visitor.

Scrolling is the mechanism of descent. The visitor should not merely be told the mythology; they should experience it as a continuous camera journey:

**5D realm → energy / signal → cosmos → galaxy → Earth → Austin / City of the Violet Crown → J → JFI live → audience → visitor / creator**

The signal does not terminate at JFI. It passes through JFI and ultimately reaches the listener. Existing themes of authenticity, divine purpose, manifestation, creativity, “YOU ARE BORN TO CREATE,” and “LET’S DO THIS!!!” form the emotional conclusion.

The experience should communicate, without needing an explanatory paragraph:

> Something exists beyond the visible world.  
> Fi hears it.  
> The signal descends.  
> Reality forms around it.  
> It reaches the City of the Violet Crown.  
> J receives it.  
> Music gives it a body.  
> JFI gives it a voice.  
> The audience receives it.  
> **THE SIGNAL WAS COMING FOR YOU.**  
> **YOU ARE BORN TO CREATE.**

## Non-negotiable visual principles

- Preserve the existing JFI identity: cosmic, mystical, kaleidoscopic, futuristic, dreamlike, elegant, immersive, slightly psychedelic, and high-contrast.
- Compose with black negative space; violet, magenta, pink, electric blue, and selective gold; chrome, prism, and luminous materials; deep layers; and light emerging from darkness.
- Spirituality must not become generic religious imagery, literal winged angels, New Age clip art, or a random fantasy aesthetic.
- Space must not become stock-photo astronomy, a cheap starfield screensaver, or a cheesy hyperspace tunnel.
- Movement must be intentional and cinematic. Large moments need quiet moments. Not every element moves, glows, or parallaxes.
- Transitions—not isolated tricks—carry the magic. Prefer match cuts: point → star; star → Earth light; Earth light → Austin light; galaxy → platter; filament → cable; nebula → stage haze; cosmic pulse → waveform; audience light → visitor light.
- Preserve readability, accessible controls, focus visibility, keyboard operation, useful alt text, and content availability independent of animation.
- Preserve and integrate existing JFI copy, artwork, music, video, biography, navigation, contact details, calls to action, links, responsiveness, rounded-media polish, and cosmic player functionality.
- Do not flatten the site into a corporate landing page or replace it with a generic template.
- Do not autoplay loud audio. Playback remains user-controlled.
- The fixed mid-page poster composition retains its existing square-corner treatment unless the user explicitly changes that direction.
- Mobile is an authored version of the journey, not a shrunken desktop version.
- Performance matters: no needless dependencies, giant unoptimized media, runaway GPU work, huge particle DOMs, or continuous invisible-scene loops.

## Intended scroll sequence

### Scene 1 — The 5D Realm

Begin beyond physical reality: near-infinite darkness, subtle violet atmosphere, impossible translucent geometry, thin energy fields, dim particles at unusual depths, intersecting forms, and consciousness-like light. The existing JFI hero identity remains clear but feels suspended within dimensional space. “Tune in” initiates the descent. Scroll changes perspective, depth, blur, masks, scale, and light—not merely vertical position.

### Scene 2 — Fi / The Transmission

A concentrated intelligent filament appears. Fi is suggested through transient facial geometry, a higher-dimensional feminine silhouette, eyes in signal, or existing Fi artwork integrated as luminous structure. She is never rendered as a conventional angel. The visitor begins following the signal as it coheres.

### Scene 3 — Dimensional Collapse

Impossible geometry simplifies into light, matter, stars, and nebular structure. A dimensional form collapses inward; its vertices become stars and its core becomes a distant galaxy. Reality crystallizes.

### Scene 4 — Cosmic Descent

Depth-separated sparse stars, restrained nebulae, occasional foreground particles, rotating galactic structure, scale change, and carefully limited acceleration create destination and velocity. Text arrives during visual pauses.

### Scene 5 — Galaxy to Earth

Deep cosmos narrows toward a galaxy, local stellar environment, and stylized Earth. Earth begins distant and grows coherently. The signal bends toward North America and Texas. Stylized continuity takes precedence over literal satellite simulation.

### Scene 6 — City of the Violet Crown

The signal arrives in mythological Austin at night: violet horizon, skyline, Capitol, Pennybacker/360 Bridge, river, Hill Country silhouettes, and energy threading through the city. Existing City of the Violet Crown artwork anchors continuity. This is not tourism; Austin is a spiritual/cosmic node receiving something.

### Scene 7 — The Signal Enters J

The vast journey turns human using approved JFI photography and artwork. Cosmic light becomes reflection in J’s glasses, a city light becomes stage light, a waveform becomes cable, and rotating celestial structure becomes the platter. Never invent an inaccurate replacement face; use existing J imagery, silhouettes, or abstraction.

### Scene 8 — Embodiment / JFI Live

The transmission becomes music through J, turntables, microphone, stage atmosphere, songs, videos, and existing media. Galaxy/platter, beam/microphone, nebula/haze, star/audience-light, and pulse/waveform correspondences support the transition. Music players and video controls remain unobstructed and usable.

### Scene 9 — The Audience Activates

Energy travels outward from Fi → signal → J → music → audience. Dark human silhouettes illuminate from within—one becomes many. The audience is activated, not merely asked to admire the artist.

### Scene 10 — The Visitor

The viewpoint aligns with the final recipient. Audience forms reduce to a centered implied visitor silhouette; energy approaches and passes through the screen; stars/prism light appear inside the human form. The existing authenticity and divine-purpose language resolves into **THE SIGNAL WAS COMING FOR YOU** and **YOU ARE BORN TO CREATE**, followed organically by **LET’S DO THIS!!!**

### Final visual moment

Return to simplicity and darkness: one breathing point of violet light or prism fragment and the JFI identity suspended in quiet space. The beginning’s distant light is now immediate—inside or directly before the visitor.

## Existing content mapping requirements

The final journey must retain direct access and coherent narrative placement for:

- Fixed navigation and direct scene links.
- Hero identity and “Tune in” language.
- Dead Lover’s Kill five-track custom music player.
- City of the Violet Crown single and custom player.
- Destroy the Girl live video.
- City of the Violet Crown live-at-Moon-Dial video.
- J/Fi mythology, biography, career highlights, and performance identity.
- Existing release, performance, Fi, poster, gallery, and brand artwork.
- Tech rider / live-production information.
- Contact phone and email.
- Closing manifesto, gratitude, and “Let’s do this!!!”
- Any valid social, streaming, live, or call-to-action links found during inventory.

Basic information cannot be trapped behind a mandatory slow sequence. Navigation must jump cleanly to relevant narrative/content scenes.

## Technical architecture

The implementation remains a GitHub Pages-compatible static site with semantic HTML, CSS, and centralized JavaScript—no build step unless a later material decision is documented here.

Chosen architecture for the first complete implementation:

- **HTML** preserves accessible content and introduces a dedicated cinematic prologue, semantic scene labels, visual transition layers, and a narrative finale around existing informational sections.
- **CSS** provides layered atmosphere, sticky/pinned-style scene staging, masks, perspective, gradients, responsive layouts, low-cost motion, and reduced-motion/static treatments.
- **JavaScript** centralizes scroll state in one `requestAnimationFrame` coordinator, eases visual progress toward native scroll position with a decaying gesture impulse, uses `IntersectionObserver` to activate/deactivate scenes and one-time content reveals, updates CSS custom properties for scene progress, and preserves existing media controls.
- **Canvas** provides a single procedural prologue backdrop for particles, filaments, dimensional geometry, collapse, cosmic depth, and galactic structure. Density and effects adapt to viewport size and reduced-motion preferences. The loop pauses when not visible and does not create a large DOM particle system.
- **SVG/CSS assets** provide the stylized Earth, scalable Austin/river/bridge skyline, audience silhouettes, visitor form, energy paths, and quiet final light.
- **No Three.js or GSAP initially.** The visual language can be delivered with one optimized canvas plus CSS/HTML while avoiding external dependencies and GitHub Pages fragility. This may evolve if a later measured limitation justifies it.
- **Existing media assets** remain local. Non-critical images use native lazy loading where it does not harm the first scene. Existing video remains `preload="metadata"`.
- **Progressive enhancement** ensures critical content remains readable without JavaScript. Reduced-motion receives composed static scenes rather than empty disabled states.

## Performance and responsive rules

- One central scroll update, scheduled with `requestAnimationFrame`; no independent per-element scroll handlers.
- Canvas resolution is capped by a modest device-pixel-ratio ceiling.
- Fewer particles and reduced blur on phones; shorter scene distances and no excessive pinned waits.
- Expensive rendering pauses outside the cinematic scene and when the document is hidden.
- Transform and opacity drive DOM movement; layout reads are batched.
- Prevent horizontal overflow and protect media-control hit targets from visual overlays.
- Test desktop widescreen, laptop, tablet, phone portrait, phone landscape where reasonable, and reduced-motion.

## Asset ledger

Existing assets are inventoried after this contract is created and before implementation. New assets must be added here when created.

### Original/procedural assets

- `assets/5d/fi-signal-portrait.webp` — original generated abstract Fi/divine-intelligence portrait, used as a transient signal presence rather than a literal angel. **Complete; 1122×1402, 78 KB WebP.**
- `assets/5d/austin-violet-silhouette.svg` — original scalable mythological Austin/Hill Country/Capitol/Pennybacker Bridge/river layer with violet energy path. **Complete.**
- Procedural canvas visuals — dimensional geometry, particles, filament, stars, galaxy, and signal core. Generated at runtime; no binary asset. **Complete.**
- CSS visual assets — stylized Earth/orbit, audience silhouettes with internal light, visitor form/core, and final breathing light. **Complete.**

### Performance derivatives of approved JFI masters

The originals remain untouched in `assets/`. The site consumes these smaller derivatives from `assets/web/`:

- `j-dj-sideways.webp` — J receiver transition.
- `jfi-hero-mark.webp` — transparent first-scene JFI hero mark.
- `dead-lovers-kill-album.webp` — album player artwork.
- `city-violet-crown.webp` — single artwork.
- `destroy-the-girl-artwork.webp` and `dead-lovers-kill-final.webp` — layered biography artwork.
- `jfi-live-poster.webp` — protected square-corner poster composition.
- `j-disco-two-hands.webp` — tech/live performance image.
- `of-a-lifetime.webp`, `warrior-outside.webp`, and `fi-x4.webp` — gallery.
- `our-name-is-jfi.webp` — footer artwork.

No third-party artwork will be hotlinked or copied from image search.

## Documentation requirements

Maintain a practical architecture guide covering scene/content mapping, animation timing, asset replacement, effect toggles, mobile behavior, reduced-motion behavior, and GitHub Pages deployment. Code comments should explain non-obvious scene math and operational controls without narrating every line.

## Completion checklist

### Foundation

- [x] Create this persistent creative/implementation contract before modifying site code.
- [x] Re-read and inventory the current HTML, CSS, JavaScript, navigation, links, media, typography, colors, animation, and all local assets.
- [x] Preserve a recoverable version-control baseline (`e63f32c` is the last pre-descent live version).
- [x] Create/update implementation documentation.

### Narrative scenes

- [x] Scene 1 — 5D Realm.
- [x] Scene 2 — Fi / Transmission.
- [x] Scene 3 — Dimensional Collapse.
- [x] Scene 4 — Cosmic Descent.
- [x] Scene 5 — Galaxy to Earth.
- [x] Scene 6 — City of the Violet Crown.
- [x] Scene 7 — Signal enters J.
- [x] Scene 8 — Embodiment / JFI Live.
- [x] Scene 9 — Audience activates.
- [x] Scene 10 — Visitor / creator payoff.
- [x] Final quiet visual echo.
- [x] Continuous match-cut transitions connect the scenes through the persistent signal, geometry-to-stars/galaxy, galaxy-to-Earth, Earth-to-Austin, Austin-to-J, signal-to-player threshold, audience lights, and visitor core.

### Existing functionality and content

- [x] Navigation remains usable and lands cleanly.
- [x] Both custom music players function without mobile scale drift.
- [x] Both videos function and controls remain unobstructed.
- [x] Biography, highlights, tech rider, contact, artwork, and closing copy remain available.
- [x] Existing links and calls to action are preserved. No social or streaming links existed in the inventoried implementation.

### Quality

- [x] Desktop, laptop, tablet, phone portrait, and reasonable phone-landscape checks.
- [x] Reduced-motion composed/static experience implemented and code-audited.
- [x] Keyboard navigation, skip link, semantic structure, and visible focus states.
- [x] No console errors, missing assets, broken URLs, horizontal overflow, or blocked controls in local testing.
- [x] Refresh and direct navigation work at different scene positions.
- [x] Performance audit: mobile particle/resolution caps, ~30 FPS canvas throttle, document visibility pause, prologue intersection pause, offscreen ambient-loop pause, lazy imagery, and WebP derivatives.
- [x] GitHub Pages build verified; the original implementation was commit `2d021df`. The canonical custom domain is configured as `www.jfimusic.com`; final HTTPS edge verification follows the inertial-motion deployment.

### Final audit

- [x] Re-read this contract after implementation.
- [x] Compare every scene against the contract and fix material omissions.
- [x] Update the asset ledger, architecture, limitations, and checklist to final state.
- [x] Summarize new assets and major changed files in this contract, `DESCENT_ARCHITECTURE.md`, and the delivery handoff.

## Implemented file summary

- `index.html` — re-authored into the semantic continuous descent, preserved media/information chapters, audience activation, visitor payoff, direct navigation, skip link, lazy media, and no-JavaScript audio fallbacks.
- `styles.css` — cinematic stage, original scene composition, players, existing media polish, audience/visitor visuals, responsive layouts, reduced-motion mode, focus states, and offscreen animation controls.
- `script.js` — centralized canvas/scroll coordinator, procedural scene rendering, direct scene activation, audio controls, one-time reveals, visibility pausing, and responsive canvas management.
- `assets/5d/` — original Fi and Austin cinematic assets.
- `assets/web/` — optimized derivatives of approved JFI master artwork.
- `DESCENT_ARCHITECTURE.md` — maintenance, timing, asset, responsive, accessibility, effect-toggle, and deployment guide.
- `README.md` — project entry point linking the canonical contract and architecture guide.

## Deployment record

- Pre-descent recoverable baseline: `e63f32c`.
- Complete cinematic implementation: `2d021df`.
- GitHub Pages build status: **built and visually verified live** on 2026-08-18.
- Canonical custom domain: `https://www.jfimusic.com/` via repository `CNAME`, GitHub Pages settings, and matching metadata. DNS resolves to GitHub Pages; the pre-deploy HTTPS response was still a stale Wix/Fastly cache and must be rechecked after the build.
- Motion refinement: native scroll remains accessible while visual progress eases toward its target; wheel/touch gestures add a decaying cinematic impulse to star streaks and the signal core.

## Current limitations and deliberate boundaries

- Earth and the galaxy-to-city transition are stylized, not satellite-photoreal. This is an art-directed choice that preserves continuity and avoids a heavy map/video sequence.
- The first implementation uses Canvas 2D rather than WebGL. Actual 3D was not necessary to achieve the dimensional narrative and would add dependency/GPU cost.
- Player halos react to playback state, but the main scroll canvas does not analyze live audio. Playback reactivity remains secondary to the narrative, as required.
- There were no social or streaming links in the inventoried page to preserve. Add them later only as real destinations become available.
- Automated browser tooling did not expose operating-system motion emulation. The reduced-motion media query and static composition were code-audited; a manual OS-level preference check remains a useful optional follow-up.
