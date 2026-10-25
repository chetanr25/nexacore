import { useState } from 'react'
import './App.css'
import { HomeView } from './features/home/HomeView'
import { Layout } from './features/layout/Layout'
import type { AppView } from './shared/types/types'
import { clearUser, getStoredUser, login, saveUser } from './features/users/auth'
import { LoginForm } from './features/users/components/LoginForm'
import type { User } from './features/users/types/types'
import { products } from './data/products'
import { UserList } from './features/users/components/UserList'
import { ProductList } from './features/products/components/ProductList'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="store-page">
      <h1 className="store-page__title">{title}</h1>
      <p className="store-empty">This section is not implemented yet.</p>
    </section>
  )
}

function App() {
  const [view, setView] = useState<AppView>('home')
  const [user, setUser] = useState<User | null>(getStoredUser)

  return (
    <Layout
      user={user}
      activeView={view}
      onNavigate={setView}
      onSignIn={() => setView('login')}
      onSignOut={() => {
        clearUser()
        setUser(null)
        setView('home')
      }}
    >
      {view === 'home' && <HomeView />}
      {view === 'products' && <ProductList products={products} />}
      {view === 'login' && (
        <LoginForm
          onLogin={(username) => {
            const next = login(username)
            saveUser(next)
            setUser(next)
            setView('home')
          }}
        />
      )}
      {view === 'users' && user?.role === 'admin' && <UserList />}
      {view === 'cart' && <PlaceholderPage title="Your cart" />}
    </Layout>
  )
}

export default App
