# Descent From the 5D Realm — implementation guide

Read `JFI_5D_DESCENT_CONTRACT.md` before changing the experience. That contract owns the narrative and identity; this guide explains the current implementation.

## Runtime architecture

The site remains a no-build static GitHub Pages project:

- `index.html` contains all semantic content, direct navigation targets, the seven-scene cinematic prologue, preserved music/live/EPK content, audience activation, and visitor finale.
- `styles.css` owns layout, sticky scene staging, dimensional overlays, custom players, audience/visitor forms, responsive treatments, and reduced-motion composition.
- `script.js` owns both audio players, navigation, one-time content reveals, scene activation, and a single `requestAnimationFrame` canvas coordinator.
- `assets/5d/` contains original cinematic assets.
- `assets/web/` contains lightweight WebP derivatives of approved JFI masters. The source masters remain in `assets/`.

There is no package manager, framework, external animation dependency, or build step.

## Scene and content map

| Scene | DOM / visual system | Existing content connection |
|---|---|---|
| 1. 5D Realm | `.realm-scene`, procedural geometry and filament | JFI logo, Vapor Wave Positivity, Tune In |
| 2. Fi / Transmission | `.transmission-scene`, generated Fi portrait | Fi as higher-dimensional intelligence |
| 3. Dimensional Collapse | `.collapse-scene`, collapsing polygons/stars | Signal becomes physical reality |
| 4. Cosmic Descent | `.cosmos-scene`, procedural star depth/galaxy | Direction and destination |
| 5. Galaxy to Earth | `.earth-scene`, CSS Earth/orbit | Signal approaches Texas |
| 6. Violet Crown | `.austin-scene`, Austin SVG and energy river | City of the Violet Crown mythology |
| 7. Signal Enters J | `.receiver-scene`, approved J photography | Match cut into sound |
| 8. Embodiment | `#music`, `#single`, `#live`, `#epk` | Players, releases, biography, live video |
| 9. Audience | `#audience`, CSS silhouettes/lights | Signal moves outward |
| 10. Visitor | `#creator` | “The signal was coming for you” / “You are born to create” |
| Final echo | `footer .final-light` | Gratitude, manifesto, JFI identity |

## Adjusting timing

The seven prologue scenes use `.descent-scene { min-height:112svh; }`. Increase this value for slower scroll pacing or reduce it for a shorter journey. Phone pacing is set separately in the `max-width:800px` media query.

Scroll-to-visual timing is centralized in `updateDescentState()` in `script.js`:

- `--fi-opacity`: Fi entrance and dissolve.
- `--earth-opacity`: Earth approach.
- `--austin-opacity`: city arrival and handoff.
- `--receiver-opacity`: J resolving from the Austin scene.

The `bell()` calls define fade-in peak and fade-out. `smoothstep()` defines one-way entrances. Keep these transitions overlapping slightly so the visual world transforms rather than cuts.

## Canvas controls

The canvas renderer is deliberately small and dependency-free:

- `drawGeometry()` — impossible-dimensional polygons and collapse.
- `drawStars()` — depth layers and restrained acceleration.
- `drawGalaxy()` — crystallized spiral structure.
- `drawSignal()` — the guiding filament/core.
- `drawAtmosphere()` — darkness and violet dimensional air.

Desktop uses up to 150 stars and a device-pixel-ratio cap of 1.6. Phone uses 75 stars and a cap of 1.25. Rendering targets roughly 30 FPS, pauses outside `#descent`, and pauses when the document is hidden.

To disable the canvas only, hide `#descent-canvas`; the CSS scene layers and all text remain. To remove continuous animation but retain a composed experience, use the operating system’s reduced-motion setting.

## Replacing artwork

- Replace Fi at `assets/5d/fi-signal-portrait.webp` with the same dark-edge, portrait-oriented composition.
- Edit `assets/5d/austin-violet-silhouette.svg` directly for skyline/bridge/river changes.
- Preserve original JFI source masters in `assets/`. Create a new derivative in `assets/web/` and update the relevant `src` in `index.html`.
- Keep first-scene files small; later images can use `loading="lazy"`.

## Mobile behavior

At 800 px and below, scene distances shorten, canvas particle density halves, canvas resolution is capped, dimensional geometry simplifies through scale, Fi becomes full-width, Austin widens for readable landmarks, and the J receiver is art-directed to the right. The site clips horizontal overflow and keeps player widths stable.

Phone landscape is supported as a reasonable compact cinematic view. Basic content remains directly reachable from navigation regardless of prologue length.

## Reduced motion and progressive enhancement

`prefers-reduced-motion: reduce` disables meaningful animation duration, preserves a static dimensional composition, resolves all scene copy, and leaves Fi/Earth/Austin/J layers readable. Canvas redraws only when scroll state changes instead of running continuously.

Without JavaScript, semantic content remains in document order, the scene copy is visible, the existing `<noscript>` treatment makes the sticky scene linear, and all contact/media information remains present. Custom audio controls require JavaScript; their underlying audio files remain declared in the HTML.

## Deployment

GitHub Pages serves `main` from the repository root. No build command is required.

1. Preview locally with `python3 -m http.server 4173`.
2. Check `index.html`, `styles.css`, and `script.js` cache keys when shipping material front-end changes.
3. Commit and push `main`.
4. Wait for the GitHub Pages build to report `built`.
5. Verify the live HTML references the new cache keys and inspect `https://jfi-music.github.io/`.

## Effect disable switches

- Procedural canvas: `#descent-canvas { display:none; }`
- Fi overlay: `.fi-presence { display:none; }`
- Austin overlay: `.austin-silhouette { display:none; }`
- One-time reveals: remove `reveal-ready` from the root or set `.reveal-item { opacity:1; transform:none; }`
- Ambient loops: remove `scene-active`; offscreen scenes already pause automatically.

