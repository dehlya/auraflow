/**
 * AuraFlow — Type definitions for the theme system.
 */

export type ThemeId =
  | "light"
  | "dark"
  | "atelier"
  | "azuki"
  | "dazed"
  | "carbon"
  | "mintmarble"
  | "russian"
  | "ceramic"
  | "soulwaves"
  | "redmaiden"
  | "y2k"
  | "salome"
  | "nord"
  | "terminal"
  | "neobrutalist"
  | "cottagecore"
  | "cyberpulse"
  | "gazette"
  | "sakura"
  | "synthwave"
  | "coastal"
  | "mocha"
  | "frosted"
  | "pop"
  | "souk"
  | "polaroid"
  | "greenhouse"
  | "vinyl"
  | "tatami"
  | "carnival"
  | "darkroom"
  | "chalk"
  | "sunset"
  | "arctic"
  | "alpine"
  | "abyss"
  | "harvest"
  | "noire"
  | "pixelart"
  | "zine"
  | "lab"
  | "terrace"
  | "aurora"
  | "espresso"
  | "hanami"
  | "datacycle"
  | "blueprint"
  | "satellite"

export type ThemeMode = "light" | "dark"

export interface ThemeTokens {
  background: string
  surface: string
  surfaceAlt: string
  border: string
  text: string
  textMuted: string
  textInverse: string
  primary: string
  primaryContrast: string
  secondary: string
  accent: string
  success: string
  warning: string
  danger: string
  radius: string
  radiusLg: string
  shadow: string
  shadowLg: string
  fontSans: string
  fontDisplay: string
  fontMono: string
  gradient: string
  pattern: string
}

export interface TypeScaleEntry {
  name: string
  description: string
  sample: string
  font: string
  weight: number
  size: string
  lineHeight: string
  tracking: string
  color: "primary" | "text" | "textMuted"
}

export interface ThemeDefinition {
  id: ThemeId
  name: string
  tagline: string
  description: string
  designer: string
  year: string
  mode: ThemeMode
  inspiration: string
  features: string[]
  useCases: string[]
  tokens: ThemeTokens
  typeScale: TypeScaleEntry[]
  motif?: string
  preview: [string, string, string]
}
