/**
 * AuraFlow — CSS generation utilities.
 */

import type { ThemeTokens, ThemeDefinition } from "./types"

/** Convert tokens to CSS custom properties for runtime injection. */
export function tokensToCssVars(tokens: ThemeTokens): Record<string, string> {
  return {
    "--color-background": tokens.background,
    "--color-surface": tokens.surface,
    "--color-surface-alt": tokens.surfaceAlt,
    "--color-border": tokens.border,
    "--color-text": tokens.text,
    "--color-text-muted": tokens.textMuted,
    "--color-text-inverse": tokens.textInverse,
    "--color-primary": tokens.primary,
    "--color-primary-contrast": tokens.primaryContrast,
    "--color-secondary": tokens.secondary,
    "--color-accent": tokens.accent,
    "--color-success": tokens.success,
    "--color-warning": tokens.warning,
    "--color-danger": tokens.danger,
    "--radius": tokens.radius,
    "--radius-lg": tokens.radiusLg,
    "--shadow": tokens.shadow,
    "--shadow-lg": tokens.shadowLg,
    "--font-sans": tokens.fontSans,
    "--font-display": tokens.fontDisplay,
    "--font-mono": tokens.fontMono,
    "--gradient": tokens.gradient,
    "--pattern": tokens.pattern,
  }
}

/** Render a full CSS file for download — drops in anywhere. */
export function themeToDownloadableCss(theme: ThemeDefinition): string {
  const vars = tokensToCssVars(theme.tokens)
  const varLines = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")

  return `/*
 * ${theme.name} — by ${theme.designer} (${theme.year})
 * ${theme.tagline}
 *
 * Generated from Dehlya Studio / AuraFlow Theme Studio.
 * Drop this file into your site and apply via <html data-theme="${theme.id}">,
 * or copy the :root variables to use directly.
 */

:root[data-theme="${theme.id}"],
.theme-${theme.id} {
${varLines}
}

:root[data-theme="${theme.id}"] body,
.theme-${theme.id} body {
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans);
}

/* Utility classes — optional, use if you like */
.theme-${theme.id} .af-surface { background: var(--color-surface); color: var(--color-text); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 1.5rem; border: 1px solid var(--color-border); }
.theme-${theme.id} .af-button  { background: var(--color-primary); color: var(--color-primary-contrast); border-radius: var(--radius); padding: 0.75rem 1.5rem; font-weight: 600; border: 0; cursor: pointer; box-shadow: var(--shadow); font-family: var(--font-sans); }
.theme-${theme.id} .af-display { font-family: var(--font-display); color: var(--color-text); }
.theme-${theme.id} .af-muted   { color: var(--color-text-muted); }
`
}
