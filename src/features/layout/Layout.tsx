import type { User } from '../users/types/types'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

type LayoutProps = {
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

export function Layout({ user, onSignIn, onSignOut }: LayoutProps) {
  return (
    <div className="store-layout">
      <Header user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
      <main className="store-main">
        <Outlet />
      </main>
    </div>
  )
}
