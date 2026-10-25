import { useState } from 'react'
import './App.css'
import { HomeView } from './features/home/HomeView'
import { Layout } from './features/layout/Layout'
import type { AppView } from './shared/types/types'
import type { User } from './features/users/types/types'
import { products } from './data/products'
import { UserList } from './features/users/components/UserList'
import { ProductList } from './features/products/components/ProductList'

const DEMO_USER: User = {
  name: 'Alex Rivera',
  avatarUrl:
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4',
}

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
  const [user, setUser] = useState<User | null>(null)

  return (
    <Layout
      user={user}
      activeView={view}
      onNavigate={setView}
      onSignIn={() => setUser(DEMO_USER)}
      onSignOut={() => setUser(null)}
    >
      {view === 'home' && <HomeView />}
      {view === 'products' && <ProductList products={products} />}
      {view === 'users' && <UserList />}
      {view === 'cart' && <PlaceholderPage title="Your cart" />}
    </Layout>
  )
}

export default App
