import { Outlet } from 'react-router-dom'
import type { Product } from '../types/types'
import { ProductList } from './ProductList'

export type ProductsPageProps = {
  products: Product[]
}

export function ProductsPage({ products }: ProductsPageProps) {
  return (
    <>
      <ProductList products={products} />
      <Outlet />
    </>
  )
}