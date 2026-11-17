import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { productService } from '../services/ProductService'
import type { Product } from '../types/types'
import './ProductList.css'
import { useNavigate, useParams } from 'react-router-dom'

export function ProductDetailModal() {
  const navigate = useNavigate()
  const { id } = useParams()
  const parsedId = id ? parseInt(id, 10) : NaN
  const productId = Number.isNaN(parsedId) ? null : parsedId

  const onClose = useCallback(() => {
    navigate('/products')
  }, [navigate])

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (productId === null) {
      setProduct(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setProduct(null)

    productService
      .getProduct(productId)
      .then((data) => {
        if (!cancelled) setProduct(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load this product.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [productId])

  useEffect(() => {
    if (productId === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [productId, onClose])

  if (productId === null) return null

  return createPortal(
    <div className="product-modal" role="presentation" onMouseDown={onClose}>
      <div
        className="product-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="product-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {loading && <p className="product-modal__status">Loading product…</p>}
        {error && !loading && <p className="product-modal__status">{error}</p>}
        {product && !loading && (
          <article className="product-detail__card product-modal__content">
            <div className="product-detail__image-wrap">
              <img
                className="product-detail__image"
                src={product.image}
                alt={product.title}
                width={320}
                height={320}
              />
            </div>
            <div className="product-detail__body">
              <p className="product-card__category">{product.category}</p>
              <h2 id="product-modal-title" className="product-detail__title">
                {product.title}
              </h2>
              <p className="product-card__rating">
                <strong>{product.rating.rate.toFixed(1)}</strong> · {product.rating.count} reviews
              </p>
              <p className="product-detail__price">${product.price.toFixed(2)}</p>
              <p className="product-detail__description">{product.description}</p>
            </div>
          </article>
        )}
      </div>
    </div>,
    document.body,
  )
}