import { useEffect, useState } from 'react'
import './App.css'
import { HomeView } from './features/home/HomeView'
import { Layout } from './features/layout/Layout'
import type { AppView } from './shared/types/types'
import { clearUser, getStoredUser, login, saveUser } from './features/users/auth'
import { LoginForm } from './features/users/components/LoginForm'
import type { User } from './features/users/types/types'
// import { products } from './data/products'
import { UserList } from './features/users/components/UserList'
import { ProductList } from './features/products/components/ProductList'
import { ProductDetail } from './features/products/components/ProductDetail'
import { ProductService } from './features/products/services/productService'
import type { Product } from './features/products/types/types'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Menu } from './features/Menu'

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
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const productService = new ProductService();
    productService.getProducts().then((products) => {
      setProducts(products);
    });
   
  }, []);
  return (
    <>
    <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/" element={<Layout user={null} activeView={'home'} onNavigate={function (view: AppView): void {
            throw new Error('Function not implemented.')
          } } onSignIn={function (): void {
            throw new Error('Function not implemented.')
          } } onSignOut={function (): void {
            throw new Error('Function not implemented.')
          } } children={undefined} />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
    </BrowserRouter>
    {/* <Layout
      user={user}
      activeView={view}
      onNavigate={setView}
      onSignIn={() => setView('login')}
      onSignOut={() => {
        clearUser()
        setUser(null)
        setView('home')
      } }
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
            } } />
        )}
        {view === 'users' && user?.role === 'admin' && <UserList />}
        {view === 'cart' && <PlaceholderPage title="Your cart" />}
      </Layout> */}
      </>
  )
}

export default App
