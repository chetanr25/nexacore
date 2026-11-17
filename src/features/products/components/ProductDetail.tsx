import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductService } from '../services/productService'
import type { Product } from '../types/types'
import './ProductDetail.css'

export function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const productId = Number(id)
    if (!Number.isFinite(productId)) {
      setError('Invalid product')
      return
    }

    let cancelled = false
    const productService = new ProductService()
    productService
      .getByProductId(productId)
      .then((next) => {
        if (!cancelled) setProduct(next)
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return (
      <section className="store-page">
        <p className="store-empty">{error}</p>
        <Link to="/products">Back to products</Link>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="store-page">
        <p className="store-empty">Loading product…</p>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <Link className="product-detail__back" to="/products">
        Back to products
      </Link>
      <div className="product-detail__layout">
        <img
          className="product-detail__image"
          src={product.image}
          alt={product.title}
          width={280}
          height={280}
        />
        <div>
          <p className="product-card__category">{product.category}</p>
          <h1 className="product-detail__title">{product.title}</h1>
          <p className="product-card__price">${product.price.toFixed(2)}</p>
          <p className="product-card__rating">
            <strong>{product.rating.rate.toFixed(1)}</strong> · {product.rating.count} reviews
          </p>
          <p className="product-detail__description">{product.description}</p>
        </div>
      </div>
    </section>
  )
}
