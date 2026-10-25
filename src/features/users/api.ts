import type { ApiUser, UserInput } from './types/types'

const BASE = 'https://fakestoreapi.com/users'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const getUsers = () => request<ApiUser[]>(BASE)

export const createUser = (data: UserInput) =>
  request<{ id: number }>(BASE, { method: 'POST', body: JSON.stringify(data) })

export const updateUser = (id: number, data: UserInput) =>
  request<ApiUser>(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteUser = (id: number) =>
  request<ApiUser>(`${BASE}/${id}`, { method: 'DELETE' })
