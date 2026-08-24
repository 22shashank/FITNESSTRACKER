import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

mkdirSync('server/data', { recursive: true })
const database = new Database('server/data/fitgrid.sqlite')
database.pragma('journal_mode = WAL')
database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS fitness_state (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`)

export function findUserByEmail(email) {
  return database.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase())
}

export function findUserById(id) {
  return database.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?').get(id)
}

export function createUser({ id, email, name, passwordHash }) {
  database.prepare('INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)').run(id, email.toLowerCase(), name, passwordHash, new Date().toISOString())
  return findUserById(id)
}

export function readFitnessState(userId) {
  const row = database.prepare('SELECT state_json FROM fitness_state WHERE user_id = ?').get(userId)
  return row ? JSON.parse(row.state_json) : null
}

export function writeFitnessState(userId, state) {
  database.prepare(`INSERT INTO fitness_state (user_id, state_json, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET state_json = excluded.state_json, updated_at = excluded.updated_at`).run(userId, JSON.stringify(state), new Date().toISOString())
  return state
}
