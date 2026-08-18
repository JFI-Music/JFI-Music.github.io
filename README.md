# JFI Music website

Static, responsive artist website and cinematic scroll journey for GitHub Pages. No build step is required.

Before changing the experience, read [JFI_5D_DESCENT_CONTRACT.md](JFI_5D_DESCENT_CONTRACT.md). The implementation details, timing controls, asset map, responsive behavior, and deployment notes are in [DESCENT_ARCHITECTURE.md](DESCENT_ARCHITECTURE.md).

## Preview locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish

Push the `main` branch to the JFI Music organization repository, then enable GitHub Pages with **Deploy from a branch**, using `main` and `/ (root)`.
