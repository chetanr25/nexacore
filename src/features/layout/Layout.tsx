import type { ReactNode } from 'react'
import type { AppView, User } from '../../types'
import { Header } from './Header'

type LayoutProps = {
  user: User | null
  activeView: AppView
  onNavigate: (view: AppView) => void
  onSignIn: () => void
  onSignOut: () => void
  children: ReactNode
}

export function Layout({
  user,
  activeView,
  onNavigate,
  onSignIn,
  onSignOut,
  children,
}: LayoutProps) {
  return (
    <div className="store-layout">
      <Header
        user={user}
        activeView={activeView}
        onNavigate={onNavigate}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <main className="store-main">{children}</main>
    </div>
  )
}
