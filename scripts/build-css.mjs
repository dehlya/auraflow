/**
 * Generates individual theme CSS files + bundled auraflow.css
 * Run after tsup builds the JS: `node scripts/build-css.mjs`
 */

import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath, pathToFileURL } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

// Import from built output (pathToFileURL needed on Windows)
const { themes, themeList, themeToDownloadableCss } = await import(
  pathToFileURL(join(root, "dist", "index.js")).href
)

const themesDir = join(root, "dist", "themes")
if (!existsSync(themesDir)) mkdirSync(themesDir, { recursive: true })

let bundled = `/*
 * AuraFlow — ${themeList.length} Design System Themes
 * https://dehlya-studio.ch/theme-studio
 *
 * Each theme is a full set of CSS custom properties.
 * Apply via <html data-theme="theme-id"> or class="theme-theme-id".
 *
 * (c) ${new Date().getFullYear()} Dehlya Studio — MIT License
 */\n\n`

let count = 0
for (const theme of themeList) {
  const css = themeToDownloadableCss(theme)
  const filename = `${theme.id}.css`

  // Individual file
  writeFileSync(join(themesDir, filename), css)

  // Append to bundle
  bundled += css + "\n\n"
  count++
}

// Write bundle
writeFileSync(join(root, "dist", "auraflow.css"), bundled)

// Minified version — simple whitespace/comment strip
const minified = bundled
  .replace(/\/\*[\s\S]*?\*\//g, "")      // remove comments
  .replace(/\n\s*\n/g, "\n")             // collapse blank lines
  .replace(/^\s+/gm, "")                  // remove leading whitespace
  .replace(/\s*{\s*/g, "{")               // collapse around braces
  .replace(/\s*}\s*/g, "}")
  .replace(/;\s*/g, ";")
  .replace(/:\s*/g, ":")
  .trim()

writeFileSync(join(root, "dist", "auraflow.min.css"), minified)

console.log(`Built ${count} theme CSS files`)
console.log(`  dist/themes/*.css — individual files`)
console.log(`  dist/auraflow.css — ${(bundled.length / 1024).toFixed(1)} KB`)
console.log(`  dist/auraflow.min.css — ${(minified.length / 1024).toFixed(1)} KB`)
