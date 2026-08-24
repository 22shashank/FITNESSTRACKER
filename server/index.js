import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import { createUser, findUserByEmail, findUserById, readFitnessState, writeFitnessState } from './db.js'

const app = express()
const port = Number(process.env.PORT || 3001)
const jwtSecret = process.env.JWT_SECRET || 'fitgrid-development-secret-change-me'

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '2mb' }))

function issueToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' })
}

function authenticate(request, response, next) {
  const token = request.headers.authorization?.replace('Bearer ', '')
  if (!token) return response.status(401).json({ error: 'Authentication required' })
  try {
    const payload = jwt.verify(token, jwtSecret)
    request.user = findUserById(payload.sub)
    if (!request.user) return response.status(401).json({ error: 'User not found' })
    return next()
  } catch {
    return response.status(401).json({ error: 'Invalid or expired token' })
  }
}

app.get('/api/health', (_request, response) => response.json({ ok: true, service: 'fitgrid-api' }))

app.post('/api/auth/register', async (request, response) => {
  const { email, name, password } = request.body || {}
  if (!email || !name || !password || password.length < 8) return response.status(400).json({ error: 'Name, email, and a password of at least 8 characters are required' })
  if (findUserByEmail(email)) return response.status(409).json({ error: 'An account with that email already exists' })
  const user = createUser({ id: randomUUID(), email, name, passwordHash: await bcrypt.hash(password, 12) })
  return response.status(201).json({ user, token: issueToken(user) })
})

app.post('/api/auth/login', async (request, response) => {
  const { email, password } = request.body || {}
  const user = email ? findUserByEmail(email) : null
  if (!user || !password || !(await bcrypt.compare(password, user.password_hash))) return response.status(401).json({ error: 'Invalid email or password' })
  return response.json({ user: findUserById(user.id), token: issueToken(user) })
})

app.get('/api/state', authenticate, (request, response) => response.json({ state: readFitnessState(request.user.id) }))

app.put('/api/state', authenticate, (request, response) => {
  const state = request.body?.state
  if (!state || typeof state !== 'object' || Array.isArray(state)) return response.status(400).json({ error: 'A state object is required' })
  return response.json({ state: writeFitnessState(request.user.id, state) })
})

app.listen(port, () => console.log(`FitGrid API listening on http://localhost:${port}`))
