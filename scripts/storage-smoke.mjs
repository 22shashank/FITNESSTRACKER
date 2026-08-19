import { JSDOM } from 'jsdom'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' })
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.localStorage = dom.window.localStorage

import { exportAllData, importAllData, loadDemoData, resetPersistedFitnessState } from '../src/services/storage.js'

async function run() {
  console.log('--- initial export (truncated) ---')
  let out = exportAllData()
  console.log(out.slice(0, 400))

  console.log('\n--- loading demo data into storage.js via importAllData ---')
  const demo = loadDemoData()
  const ok = importAllData(JSON.stringify(demo))
  console.log('import ok:', ok)

  console.log('\n--- export after import (truncated) ---')
  out = exportAllData()
  console.log(out.slice(0, 400))

  console.log('\n--- resetting persisted state to defaults ---')
  resetPersistedFitnessState()
  console.log('reset complete')

  console.log('\n--- final export after reset (truncated) ---')
  out = exportAllData()
  console.log(out.slice(0, 400))
}

run().catch((e) => { console.error(e); process.exit(1) })
