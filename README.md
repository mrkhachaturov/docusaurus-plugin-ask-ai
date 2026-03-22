# docusaurus-ask-ai

[![npm plugin](https://img.shields.io/npm/v/docusaurus-plugin-ask-ai?label=docusaurus-plugin-ask-ai&color=0f766e)](https://www.npmjs.com/package/docusaurus-plugin-ask-ai)
[![npm theme](https://img.shields.io/npm/v/docusaurus-theme-ask-ai?label=docusaurus-theme-ask-ai&color=0f766e)](https://www.npmjs.com/package/docusaurus-theme-ask-ai)
[![license](https://img.shields.io/github/license/mrkhachaturov/docusaurus-ask-ai)](LICENSE)

> AI-ready Docusaurus docs: `llms.txt` generation, per-page markdown output, and a floating "Use with AI" button.

Forked from [`docusaurus-plugin-llms`](https://github.com/rachfop/docusaurus-plugin-llms), then expanded into a two-package toolkit for modern Docusaurus documentation sites.

## ✨ What This Repo Is

This repo is no longer just the upstream plugin with a few patches.

It now contains:

- `docusaurus-plugin-ask-ai`: build-time generation for `llms.txt`, `llms-full.txt`, `*.md`, and `ask-ai-manifest.json`
- `docusaurus-theme-ask-ai`: runtime UI for a floating Ask AI button on supported pages

If you want Docusaurus docs that are both:

- easier for LLMs to crawl and consume
- easier for humans to send directly into ChatGPT, Claude, and similar tools

this fork is aimed at that use case.

## 🚀 Highlights

- `llms.txt` and `llms-full.txt` generation
- per-page markdown output for doc pages
- floating "Use with AI" button with two position modes (`fixed` or `breadcrumb`)
- copy-as-markdown and view-as-markdown actions
- configurable AI providers with `{prompt}` URL templates
- build-time route manifest for hiding the button on unsupported pages
- preserved upstream features like ordering, path transforms, blog inclusion, and custom LLM files

## 📦 Packages

### `docusaurus-plugin-ask-ai`

Build-time package for generating AI-facing static artifacts.

Outputs can include:

- `llms.txt`
- `llms-full.txt`
- page-level markdown files
- `ask-ai-manifest.json`
- custom `llms-*.txt` files

Path:
[`packages/docusaurus-plugin-ask-ai`](./packages/docusaurus-plugin-ask-ai)

### `docusaurus-theme-ask-ai`

Theme package that injects an Ask AI button into doc pages.

Two position modes:

- `fixed` (default): floating button at the bottom-right of the viewport
- `breadcrumb`: inline button in the breadcrumb row, right-aligned

It:

- checks `ask-ai-manifest.json` to only render on pages with generated markdown
- fetches the current page markdown on demand
- builds an AI prompt from the page title and markdown content
- opens configured providers using `{prompt}` substitution
- swizzles `DocBreadcrumbs` (breadcrumb mode) or `Root` (fixed mode) via `@theme-init`

Path:
[`packages/docusaurus-theme-ask-ai`](./packages/docusaurus-theme-ask-ai)

## 🆕 What This Fork Added

Compared to upstream `docusaurus-plugin-llms`, this fork adds:

- a monorepo with separate plugin and theme packages
- a user-facing Docusaurus theme package
- `ask-ai-manifest.json` generation for route gating
- a floating AI actions menu inspired by `mkdocs-ask-ai`
- breadcrumb-inline position mode as alternative to floating button
- packaging of compiled theme assets under `lib/theme` for real npm installs

Upstream functionality still kept here:

- `llms.txt` generation
- `llms-full.txt` generation
- custom LLM files by pattern
- document ordering controls
- path transformation
- blog inclusion
- import stripping
- duplicate heading cleanup
- frontmatter preservation for generated markdown files

## 🛠 Installation

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
      position: 'breadcrumb', // or 'fixed' (default)
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

## ⚠️ Important

- Enable `generateMarkdownFiles: true` when using the theme.
- The theme uses `ask-ai-manifest.json` to decide where the button should appear.
- The published theme package ships compiled files from `lib/theme`, not raw TSX.

## 🎛 Plugin Options

The plugin keeps the upstream option surface. Most commonly used options:

| Option | Default | What it does |
|---|---:|---|
| `generateLLMsTxt` | `true` | Generates `llms.txt` |
| `generateLLMsFullTxt` | `true` | Generates `llms-full.txt` |
| `generateMarkdownFiles` | `false` | Generates page markdown files |
| `docsDir` | `'docs'` | Sets the docs source directory |
| `includeBlog` | `false` | Includes blog content |
| `ignoreFiles` | `[]` | Excludes matching files |
| `includeOrder` | `[]` | Controls document ordering |
| `customLLMFiles` | `[]` | Generates extra LLM files |
| `excludeImports` | `false` | Removes MDX imports |
| `removeDuplicateHeadings` | `false` | Cleans repeated title text |
| `keepFrontMatter` | `[]` | Preserves selected frontmatter keys |
| `preserveDirectoryStructure` | `true` | Keeps nested output structure |
| `processingBatchSize` | `100` | Controls large-site batching |
| `logLevel` | `'normal'` | Logging verbosity |

## 🎨 Theme Config

```js
themeConfig: {
  askAi: {
    buttonText: 'Use with AI',
    position: 'fixed', // 'fixed' (floating bottom-right) or 'breadcrumb' (inline in breadcrumb row)
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
      {
        name: 'Claude',
        url: 'https://claude.ai/new?q={prompt}',
        icon: 'claude',
      },
    ],
  },
}
```

Provider fields:

- `name`: provider label
- `url`: URL template containing `{prompt}`
- `icon`: built-in key or custom image path / URL / data URI
- `description`: optional subtitle

## 🧠 How It Works

### Build time

The plugin:

1. scans docs content
2. processes markdown and MDX
3. generates `llms.txt`
4. generates `llms-full.txt`
5. optionally emits per-page `.md` files
6. writes `ask-ai-manifest.json`

### Runtime

The theme:

1. loads the manifest
2. checks if the current route has markdown
3. renders the floating button only on supported pages
4. fetches markdown only when the user clicks an action

## 🧪 Development

Install dependencies:

```bash
npm install
```

Build all workspaces:

```bash
npm run build
```

Run tests:

```bash
npm test
```

UX inspired by [`mkdocs-ask-ai`](https://github.com/mrkhachaturov/mkdocs-ask-ai).

## 🧬 Upstream Lineage

Started from:

- repo: `rachfop/docusaurus-plugin-llms`
- package: `docusaurus-plugin-llms`

This fork then:

1. renamed the plugin package to `docusaurus-plugin-ask-ai`
2. added `docusaurus-theme-ask-ai`
3. added `ask-ai-manifest.json`
4. added the Ask AI floating-button UX
5. added packaging for compiled theme runtime assets

## 📁 Repo Layout

```text
docusaurus-plugin-ask-ai/
├── packages/
│   ├── docusaurus-plugin-ask-ai/
│   └── docusaurus-theme-ask-ai/
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## 📄 License

MIT. See [`LICENSE`](./LICENSE).
