import { Link, NavLink } from 'react-router-dom'
import type { User } from '../users/types/types'

type HeaderProps = {
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

export function Header({ user, onSignIn, onSignOut }: HeaderProps) {
  return (
    <header className="store-header">
      <div className="store-header__top">
        <Link to="/" className="store-logo">
          Next Core
        </Link>

        <div className="store-header__account">
          {user ? (
            <>
              <span className="store-header__user-name">Hello, {user.name}</span>
              <button type="button" className="store-link-btn" onClick={onSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <span className="store-header__guest">Guest</span>
              <button type="button" className="store-link-btn" onClick={onSignIn}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>

      <nav className="store-nav" aria-label="Main">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `store-nav__link${isActive ? ' is-active' : ''}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `store-nav__link${isActive ? ' is-active' : ''}`
          }
        >
          Cart
        </NavLink>
        {user?.role === 'admin' && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `store-nav__link${isActive ? ' is-active' : ''}`
            }
          >
            Users
          </NavLink>
        )}
      </nav>
    </header>
  )
}