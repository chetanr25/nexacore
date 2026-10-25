import { useEffect, useState, type FormEvent } from 'react'
import { createUser, deleteUser, getUsers, updateUser } from '../api'
import type { ApiUser, UserInput } from '../types/types'

const EMPTY: UserInput = {
  email: '',
  username: '',
  password: '',
  name: { firstname: '', lastname: '' },
  phone: '',
}

export function UserList() {
  const [users, setUsers] = useState<ApiUser[]>([])
  const [form, setForm] = useState<UserInput>(EMPTY)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getUsers().then(setUsers).catch((e: Error) => setError(e.message))
  }, [])

  const run = async (action: () => Promise<void>) => {
    setError('')
    try {
      await action()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    run(async () => {
      if (editingId === null) {
        const { id } = await createUser(form)
        setUsers((prev) => [...prev, { ...form, id }])
      } else {
        const updated = await updateUser(editingId, form)
        setUsers((prev) =>
          prev.map((u) => (u.id === editingId ? { ...form, ...updated, id: editingId } : u)),
        )
      }
      setForm(EMPTY)
      setEditingId(null)
    })
  }

  const onEdit = ({ id, ...input }: ApiUser) => {
    setEditingId(id)
    setForm(input)
  }

  const onDelete = (id: number) =>
    run(async () => {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    })

  return (
    <section className="product-list-page">
      <h1 className="product-list-page__title">Users</h1>
      {error && <p className="store-empty">{error}</p>}

      <form onSubmit={onSubmit}>
        <input required placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required placeholder="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input required placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input required placeholder="First name" value={form.name.firstname}
          onChange={(e) => setForm({ ...form, name: { ...form.name, firstname: e.target.value } })} />
        <input required placeholder="Last name" value={form.name.lastname}
          onChange={(e) => setForm({ ...form, name: { ...form.name, lastname: e.target.value } })} />
        <input placeholder="Phone" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button type="submit">{editingId === null ? 'Add user' : 'Save'}</button>
        {editingId !== null && (
          <button type="button" onClick={() => { setEditingId(null); setForm(EMPTY) }}>
            Cancel
          </button>
        )}
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name.firstname} {u.name.lastname} · {u.username} · {u.email}{' '}
            <button type="button" onClick={() => onEdit(u)}>Edit</button>{' '}
            <button type="button" onClick={() => onDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
