le# Changelog

All notable changes to docusaurus-ask-ai will be documented in this file.

## [0.1.1] - 2026-03-22

### Added

- `position: 'breadcrumb'` option — renders the button inline in the breadcrumb row instead of floating
- `skill` config option — adds "Install {name} skill" menu item that copies an npx command to clipboard
- `DocBreadcrumbs` swizzle for breadcrumb-position mode

### Fixed

- Manifest paths normalized (no more double slashes)

## [0.1.0] - 2026-03-22

Initial release. Forked from `docusaurus-plugin-llms` v0.3.0 and restructured into a two-package monorepo.

### docusaurus-plugin-ask-ai

- `llms.txt` and `llms-full.txt` generation (inherited from upstream)
- Per-page `.md` file generation alongside HTML output
- `ask-ai-manifest.json` generation for theme route gating
- Custom LLM files by pattern
- Document ordering, path transforms, blog inclusion
- Import stripping, duplicate heading cleanup, frontmatter preservation

### docusaurus-theme-ask-ai

- Floating "Use with AI" button on doc pages
- Copy page as Markdown (clipboard)
- View as Markdown (new tab)
- Configurable AI providers with `{prompt}` URL templates
- Built-in ChatGPT and Claude providers with SVG icons
- Custom provider support (any URL template + custom icon)
- `showCopyMarkdown`, `showViewMarkdown`, `showLlmsTxt` toggles
- `promptPrefix` and `maxPromptLength` configuration
- Smart truncation with page URL suffix
- Manifest-based route gating (button only on pages with `.md` files)
- SPA navigation awareness via `useLocation()`
- SSR-safe rendering via `BrowserOnly`
- Compiled theme files shipped in `lib/theme/` (npm-ready)
- Uses `@theme-init/Root` for proper Docusaurus theme composition
- Graceful error handling for all actions (fetch failures, clipboard unavailable)
