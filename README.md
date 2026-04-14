# AuraFlow

**46 ready-to-use design system themes as CSS custom properties.**

Each theme is a complete set of 23 design tokens — colors, typography, spacing, shadows — expressed as CSS custom properties. Drop one into your project and your entire UI adapts.

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

// Or import all 46 themes
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

| Theme | Mode | Tagline |
|-------|------|---------|
| light | light | Soft, cute, daylight-friendly |
| dark | dark | Cyberpunk studio floor |
| hanami | light | Cherry blossoms at dusk |
| atelier | light | Oil-stained studio smock |
| azuki | dark | Midnight matcha ceremony |
| dazed | dark | Neon-soaked magazine spread |
| carbon | dark | Monochrome command line |
| sakura | light | Pastel petals on a spring breeze |
| terminal | dark | Green phosphor CRT |
| nord | dark | Arctic code editor |
| synthwave | dark | Retro-futuristic sunset |
| mocha | dark | Coffee-stained notebook |
| ... and 34 more | | |

Run `npx auraflow list` to see all 46.

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

## License

MIT -- Dehlya Studio
