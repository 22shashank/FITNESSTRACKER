const API_URL = import.meta.env.VITE_API_URL || '/api'
const TOKEN_KEY = 'fitgrid_api_token'

export function getApiToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setApiToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const token = getApiToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || `API request failed (${response.status})`)
  return body
}

export function registerAccount(credentials) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(credentials) })
}

export function loginAccount(credentials) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
}

export function fetchRemoteState() {
  return request('/state')
}

export function saveRemoteState(state) {
  return request('/state', { method: 'PUT', body: JSON.stringify({ state }) })
}
