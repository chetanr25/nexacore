import type { User } from './types/types'

const COOKIE = 'auth_user'
const MAX_AGE = 60 * 60 * 24 * 30

export function login(username: string): User {
  return {
    name: username,
    role: username === 'admin' ? 'admin' : 'user',
  }
}

export function saveUser(user: User) {
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(user))}; max-age=${MAX_AGE}; path=/`
}

export function clearUser() {
  document.cookie = `${COOKIE}=; max-age=0; path=/`
}

export function getStoredUser(): User | null {
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`))
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(match.slice(COOKIE.length + 1)))
  } catch {
    return null
  }
}
