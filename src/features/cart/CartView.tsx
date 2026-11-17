import { Link } from 'react-router-dom'

export function CartView() {
  return (
    <section className="store-page">
      <h1 className="store-page__title">Your cart</h1>
      <p className="store-empty">Your cart is empty.</p>
      <p>
        <Link to="/products">Continue shopping</Link>
      </p>
    </section>
  )
}