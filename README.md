# AuraFlow CSS

**49 ready-to-use design system themes as drop-in CSS custom properties.**

> ⚠️ **Not the AI image model.** AuraFlow CSS is a front-end theme library by [Dehlya Studio](https://dehlya-studio.ch). You're probably not looking for the text-to-image diffusion model — that one is Python-based and lives [here](https://github.com/fal-ai/AuraFlow). This package is 100% CSS + TypeScript, zero ML.

Each theme is a complete set of 23 design tokens — colors, typography, radii, shadows, gradients — expressed as CSS custom properties. Drop one into your project and your entire UI adapts.

[![npm version](https://img.shields.io/npm/v/auraflow.svg)](https://www.npmjs.com/package/auraflow)
[![license](https://img.shields.io/npm/l/auraflow.svg)](./LICENSE)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/dehlya_studio)

**Live gallery → [dehlya-studio.ch/theme-studio](https://dehlya-studio.ch/theme-studio)**

## Quick Start

### CDN (zero install)

```html
<link rel="stylesheet" href="https://unpkg.com/auraflow/dist/themes/sakura.css" />
<html data-theme="sakura">
```

### npm

```bash
npm install auraflow
```

```js
// Import a single theme CSS
import "auraflow/themes/sakura.css"

// Or import all 49 themes
import "auraflow/auraflow.css"
```

### JS/TS API

```ts
import { themes, themeList, tokensToCssVars, themeToDownloadableCss } from "auraflow"

// Get a theme's tokens
const sakura = themes.sakura
console.log(sakura.tokens.primary) // "#D4788A"

// Convert to CSS custom properties
const vars = tokensToCssVars(sakura.tokens)
// { "--color-primary": "#D4788A", "--color-background": "#FFF7F9", ... }

// Apply at runtime
Object.entries(vars).forEach(([k, v]) => {
  document.documentElement.style.setProperty(k, v)
})

// Generate a downloadable CSS file
const css = themeToDownloadableCss(sakura)
```

## CLI

```bash
# List all themes
npx auraflow list

# Generate CSS for a theme
npx auraflow generate sakura > sakura.css

# Generate all themes
npx auraflow generate --all --outdir ./my-themes

# Theme info
npx auraflow info sakura
```

## Themes

49 themes across light + dark modes. A few favourites:

| Theme      | Mode  | Tagline                               |
|------------|-------|---------------------------------------|
| hanami     | light | Cherry blossoms at dusk               |
| sakura     | light | Pastel petals on a spring breeze      |
| datacycle  | light | Engineering docs with opinions        |
| blueprint  | dark  | Technical drawings on cyanotype paper |
| satellite  | dark  | Mission control, 3AM, all systems nominal |
| nord       | dark  | Arctic code editor                    |
| synthwave  | dark  | Retro-futuristic sunset               |
| terminal   | dark  | Green phosphor CRT                    |
| cottagecore| light | Hand-pressed flowers in a leather journal |
| y2k        | light | Frosted glass, Bubblegum, Tamagotchi  |

Run `npx auraflow list` for all 49.

## CSS Custom Properties

Each theme sets these 23 tokens:

```css
--color-background    --color-surface       --color-surface-alt
--color-border        --color-text          --color-text-muted
--color-text-inverse  --color-primary       --color-primary-contrast
--color-secondary     --color-accent        --color-success
--color-warning       --color-danger        --radius
--radius-lg           --shadow              --shadow-lg
--font-sans           --font-display        --font-mono
--gradient            --pattern
```

## Applying Themes

Two selector strategies (both included in every CSS file):

```html
<!-- Attribute-based (recommended for single theme) -->
<html data-theme="sakura">

<!-- Class-based (for multi-theme previews) -->
<div class="theme-sakura">
```

## Font Loading

Themes reference font families by name but don't load them. Add your own font loading:

```html
<!-- Example for the Sakura theme -->
<link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap" rel="stylesheet" />
```

## Why AuraFlow CSS?

- **Zero runtime.** Pure CSS custom properties. No provider, no context, no JS required.
- **Framework-agnostic.** Works in React, Vue, Svelte, Astro, plain HTML — anywhere CSS does.
- **Swap themes instantly.** Change one `data-theme` attribute and your whole UI re-skins.
- **Tree-shakeable.** Import only the themes you use, or the bundle if you want them all.
- **Tiny.** Each theme is < 4 KB. The full bundle minified is ~78 KB.
- **Editorial.** Themes aren't bland templates — they're opinionated design systems with personality.

## Disambiguation

If you arrived here looking for:

- 🎨 **Drop-in CSS themes for your website** → you're in the right place.
- 🖼️ **AuraFlow the AI image generation model** → see [fal-ai/AuraFlow](https://github.com/fal-ai/AuraFlow). Different project, unrelated.

## License

MIT — Dehlya Studio
