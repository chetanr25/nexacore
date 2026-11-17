import type { ReactNode } from 'react'
import type { AppView } from '../../shared/types/types'
import type { User } from '../users/types/types'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

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
       {/* <main className="store-main">{children}</main> */}
      <main className="store-main"><Outlet /></main>
    </div>
  )
}
