#!/usr/bin/env node

/**
 * AuraFlow CLI — Generate theme CSS from the command line.
 *
 * Usage:
 *   auraflow list [--json]          List all theme IDs with name and mode
 *   auraflow generate <id>          Output CSS for a theme to stdout
 *   auraflow generate --all --outdir <dir>  Write all CSS files to a directory
 *   auraflow info <id>              Print theme metadata
 *   auraflow --help                 Show this help message
 */

import { themes, themeList, themeIds } from "./tokens"
import { themeToDownloadableCss } from "./css"
import type { ThemeId } from "./types"
import * as fs from "fs"
import * as path from "path"

const HELP = `
auraflow — Design token theme system CLI

Usage:
  auraflow list [--json]                   List all theme IDs with name and mode
  auraflow generate <id>                   Output CSS for a theme to stdout
  auraflow generate --all --outdir <dir>   Write all theme CSS files to a directory
  auraflow info <id>                       Print theme metadata
  auraflow --help                          Show this help message

Examples:
  auraflow list
  auraflow list --json
  auraflow generate nord > nord.css
  auraflow generate --all --outdir ./themes
  auraflow info azuki
`.trim()

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(HELP)
    process.exit(0)
  }

  const command = args[0]

  switch (command) {
    case "list":
      cmdList(args.slice(1))
      break
    case "generate":
      cmdGenerate(args.slice(1))
      break
    case "info":
      cmdInfo(args.slice(1))
      break
    default:
      console.error(`Unknown command: ${command}`)
      console.error(`Run "auraflow --help" for usage.`)
      process.exit(1)
  }
}

function cmdList(args: string[]) {
  const json = args.includes("--json")

  if (json) {
    const data = themeList.map((t) => ({
      id: t.id,
      name: t.name,
      mode: t.mode,
      tagline: t.tagline,
    }))
    console.log(JSON.stringify(data, null, 2))
  } else {
    const maxId = Math.max(...themeIds.map((id) => id.length))
    const maxName = Math.max(...themeList.map((t) => t.name.length))

    for (const theme of themeList) {
      const id = theme.id.padEnd(maxId)
      const name = theme.name.padEnd(maxName)
      const mode = theme.mode === "dark" ? "dark " : "light"
      console.log(`  ${id}  ${name}  ${mode}  ${theme.tagline}`)
    }
    console.log(`\n  ${themeList.length} themes total.`)
  }
}

function cmdGenerate(args: string[]) {
  const allFlag = args.includes("--all")

  if (allFlag) {
    const outdirIdx = args.indexOf("--outdir")
    if (outdirIdx === -1 || !args[outdirIdx + 1]) {
      console.error(`Error: --all requires --outdir <directory>`)
      process.exit(1)
    }
    const outdir = args[outdirIdx + 1]

    if (!fs.existsSync(outdir)) {
      fs.mkdirSync(outdir, { recursive: true })
    }

    for (const theme of themeList) {
      const css = themeToDownloadableCss(theme)
      const filePath = path.join(outdir, `${theme.id}.css`)
      fs.writeFileSync(filePath, css, "utf-8")
    }

    console.log(`Wrote ${themeList.length} CSS files to ${outdir}/`)
  } else {
    const id = args.find((a) => !a.startsWith("-"))
    if (!id) {
      console.error(`Error: specify a theme ID or use --all --outdir <dir>`)
      console.error(`Run "auraflow list" to see available IDs.`)
      process.exit(1)
    }

    if (!themes[id as ThemeId]) {
      console.error(`Error: unknown theme "${id}"`)
      console.error(`Run "auraflow list" to see available IDs.`)
      process.exit(1)
    }

    const css = themeToDownloadableCss(themes[id as ThemeId])
    process.stdout.write(css)
  }
}

function cmdInfo(args: string[]) {
  const id = args.find((a) => !a.startsWith("-"))
  if (!id) {
    console.error(`Error: specify a theme ID.`)
    console.error(`Run "auraflow list" to see available IDs.`)
    process.exit(1)
  }

  const theme = themes[id as ThemeId]
  if (!theme) {
    console.error(`Error: unknown theme "${id}"`)
    console.error(`Run "auraflow list" to see available IDs.`)
    process.exit(1)
  }

  console.log(`
  ${theme.name} (${theme.id})
  ${theme.tagline}
  Mode: ${theme.mode}
  Designer: ${theme.designer} (${theme.year})

  ${theme.description}

  Inspiration: ${theme.inspiration}

  Features:
${theme.features.map((f) => `    - ${f}`).join("\n")}

  Use cases:
${theme.useCases.map((u) => `    - ${u}`).join("\n")}

  Preview colors: ${theme.preview.join(", ")}
${theme.motif ? `  Motif: ${theme.motif}` : ""}
`.trimEnd())
}

main()
