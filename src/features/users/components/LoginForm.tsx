import { useState, type FormEvent } from 'react'

export function LoginForm({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    onLogin(username.trim())
  }

  return (
    <section className="product-list-page">
      <h1 className="product-list-page__title">Sign in</h1>
      <form onSubmit={onSubmit}>
        <input required placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <input required type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign in</button>
      </form>
    </section>
  )
}
