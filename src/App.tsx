import { useEffect, useState } from 'react'
import './App.css'
import { CartView } from './features/cart/CartView'
import { HomeView } from './features/home/HomeView'
import { productService } from './features/products/services/ProductService'
import type { Product } from './features/products/types/types'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductDetailModal } from './features/products/components/ProductDetailModal'
import { ProductsPage } from './features/products/components/ProductsPage'
import { FeedbackPage } from './features/feedback/components/FeedbackPage'
import { Layout } from './features/layout/Layout'


function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    productService.getProducts().then((products) => {
      setProducts(products)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout user={null} onSignIn={() => {}} onSignOut={() => {}} />
          }
        >
          <Route path="/" element={<HomeView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/products" element={<ProductsPage products={products} />}>
            <Route path=":id" element={<ProductDetailModal />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App