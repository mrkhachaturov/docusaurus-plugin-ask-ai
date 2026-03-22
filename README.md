# docusaurus-ask-ai

Fork of [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms) extended into a two-package Docusaurus toolkit:

- `docusaurus-plugin-ask-ai`: build-time generation of `llms.txt`, `llms-full.txt`, per-page markdown files, and `ask-ai-manifest.json`
- `docusaurus-theme-ask-ai`: runtime floating "Use with AI" button for Docusaurus sites

This repository keeps the upstream LLM-file generation work and adds a Docusaurus theme modeled after the UX of `mkdocs-ask-ai`.

## What This Fork Adds

Compared to upstream `docusaurus-plugin-llms`, this fork adds:

- npm workspace monorepo layout with separate plugin and theme packages
- a Docusaurus theme package for a floating Ask AI button
- per-page route gating via `ask-ai-manifest.json`
- UI actions for:
  - copy page as markdown
  - view page as markdown
  - open the current page in configured AI providers
  - open `llms.txt`
- configurable provider list with built-in and custom icons
- packaging for compiled theme files under `lib/theme` so the package works when installed from npm/tarball

It also preserves the upstream plugin features:

- `llms.txt` generation
- `llms-full.txt` generation
- custom LLM files by glob pattern
- path transformation
- document ordering
- blog inclusion
- frontmatter preservation for generated markdown files
- content cleanup options like import stripping and duplicate-heading removal

## Packages

### `docusaurus-plugin-ask-ai`

Build-time plugin that scans docs content and can generate:

- `llms.txt`
- `llms-full.txt`
- individual `*.md` files for pages
- `ask-ai-manifest.json` for theme route gating
- custom `llms-*.txt` outputs

Package path:
[`packages/docusaurus-plugin-ask-ai`](/home/openclaw/astromech/3rdparty-src/docusaurus-plugin-aski-ai/packages/docusaurus-plugin-ask-ai)

### `docusaurus-theme-ask-ai`

Theme package that injects a floating "Use with AI" button through `@theme/Root`.

Package path:
[`packages/docusaurus-theme-ask-ai`](/home/openclaw/astromech/3rdparty-src/docusaurus-plugin-aski-ai/packages/docusaurus-theme-ask-ai)

The theme:

- checks `ask-ai-manifest.json` before rendering
- stays hidden on routes without generated markdown
- fetches the page markdown on demand
- builds a prompt using page title plus markdown content
- opens configured provider URLs with `{prompt}` substitution

## Status

This repo is no longer just a direct upstream mirror. It is an opinionated fork focused on:

- AI-ready Docusaurus documentation
- static-hosting compatibility
- llms.txt generation plus end-user Ask AI UI

If you only want the original build-time `llms.txt` plugin with no UI, upstream may still be the better reference point.

## Installation

### Plugin only

```bash
npm install docusaurus-plugin-ask-ai
```

```js
// docusaurus.config.js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-ask-ai',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
      },
    ],
  ],
};
```

### Plugin + theme

```bash
npm install docusaurus-plugin-ask-ai docusaurus-theme-ask-ai
```

```js
// docusaurus.config.js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-ask-ai',
      {
        generateMarkdownFiles: true,
      },
    ],
  ],
  themes: ['docusaurus-theme-ask-ai'],
  themeConfig: {
    askAi: {
      buttonText: 'Use with AI',
      providers: [
        {
          name: 'ChatGPT',
          url: 'https://chatgpt.com/?q={prompt}',
          icon: 'chatgpt',
        },
        {
          name: 'Claude',
          url: 'https://claude.ai/new?q={prompt}',
          icon: 'claude',
        },
      ],
    },
  },
};
```

Important:

- the theme expects generated markdown files for full functionality
- enable `generateMarkdownFiles: true` when using the theme
- the theme uses `ask-ai-manifest.json` to decide where the button should appear

## Plugin Options

The plugin keeps the upstream option surface. Common options:

| Option | Default | Notes |
|---|---:|---|
| `generateLLMsTxt` | `true` | Generate `llms.txt` |
| `generateLLMsFullTxt` | `true` | Generate `llms-full.txt` |
| `generateMarkdownFiles` | `false` | Required for theme page actions |
| `docsDir` | `'docs'` | Docs source directory |
| `includeBlog` | `false` | Include blog content |
| `ignoreFiles` | `[]` | Glob patterns to exclude |
| `includeOrder` | `[]` | Ordered include patterns |
| `includeUnmatchedLast` | `true` | Append unmatched files |
| `pathTransformation` | `undefined` | Rewrite output URLs |
| `customLLMFiles` | `[]` | Additional generated LLM files |
| `excludeImports` | `false` | Remove MDX imports from content |
| `removeDuplicateHeadings` | `false` | Trim repeated title/heading content |
| `keepFrontMatter` | `[]` | Preserve selected frontmatter keys in generated markdown |
| `preserveDirectoryStructure` | `true` | Keep docs directory structure for generated markdown |
| `processingBatchSize` | `100` | Large-site memory control |
| `logLevel` | `'normal'` | `quiet`, `normal`, `verbose` |

## Theme Configuration

```js
themeConfig: {
  askAi: {
    buttonText: 'Use with AI',
    showCopyMarkdown: true,
    showViewMarkdown: true,
    showLlmsTxt: true,
    promptPrefix: 'Use the following {title} documentation to help me:\n\n',
    maxPromptLength: 7500,
    providers: [
      {
        name: 'ChatGPT',
        url: 'https://chatgpt.com/?q={prompt}',
        icon: 'chatgpt',
        description: 'Chat about this page with ChatGPT',
      },
    ],
  },
}
```

Provider fields:

- `name`: menu label
- `url`: URL template containing `{prompt}`
- `icon`: built-in key (`chatgpt`, `claude`) or custom path/URL/data URI
- `description`: optional subtitle

## Repository Layout

```text
docusaurus-plugin-aski-ai/
├── packages/
│   ├── docusaurus-plugin-ask-ai/
│   └── docusaurus-theme-ask-ai/
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## Development

Install workspace dependencies:

```bash
npm install
```

Build all packages:

```bash
npm run build
```

Run workspace tests:

```bash
npm test
```

Theme package notes:

- theme source lives under `packages/docusaurus-theme-ask-ai/src/theme`
- the published package uses compiled files under `lib/theme`
- `styles.module.css` is copied into `lib/theme/Root/` during build

## Upstream Lineage

This repository started as a fork of:

- upstream repo: `rachfop/docusaurus-plugin-llms`
- upstream package: `docusaurus-plugin-llms`

Main fork changes:

1. renamed the plugin package to `docusaurus-plugin-ask-ai`
2. added the new `docusaurus-theme-ask-ai` package
3. added `ask-ai-manifest.json` generation
4. added the Ask AI floating-button UX
5. changed packaging to support compiled theme assets for npm distribution

## Related References

- design spec: [`docs/specs/2026-03-22-docusaurus-ask-ai-design.md`](/home/openclaw/astromech/docs/specs/2026-03-22-docusaurus-ask-ai-design.md)
- implementation plan: [`docs/specs/2026-03-22-docusaurus-ask-ai-plan.md`](/home/openclaw/astromech/docs/specs/2026-03-22-docusaurus-ask-ai-plan.md)
- UX inspiration: [`3rdparty-src/mkdocs-ask-ai`](/home/openclaw/astromech/3rdparty-src/mkdocs-ask-ai)

## License

MIT. See [`LICENSE`](/home/openclaw/astromech/3rdparty-src/docusaurus-plugin-aski-ai/LICENSE).
