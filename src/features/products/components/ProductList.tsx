import type { Product } from '../types/types'
import './ProductList.css'

export type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={160}
          height={160}
        />
      </div>
      <p className="product-card__category">{product.category}</p>
      <h2 className="product-card__title">{product.title}</h2>
      <p className="product-card__rating">
        <strong>{product.rating.rate.toFixed(1)}</strong> ·{' '}
        {product.rating.count} reviews
      </p>
      <p className="product-card__price">${product.price.toFixed(2)}</p>
    </article>
  )
}

export type ProductListProps = {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <section className="product-list-page">
      <h1 className="product-list-page__title">Products</h1>
      <p className="product-list-page__subtitle">
        {products.length} items — sample catalog aligned with Fake Store API
      </p>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
