import type { AppView, User } from '../../types'

type HeaderProps = {
  user: User | null
  activeView: AppView
  onNavigate: (view: AppView) => void
  onSignIn: () => void
  onSignOut: () => void
}

export function Header({
  user,
  activeView,
  onNavigate,
  onSignIn,
  onSignOut,
}: HeaderProps) {
  return (
    <header className="store-header">
      <div className="store-header__top">
        <button
          type="button"
          className="store-logo"
          onClick={() => onNavigate('home')}
        >
          Next Core
        </button>

        <div className="store-header__account">
          {user ? (
            <>
              <img
                src={user.avatarUrl}
                alt=""
                className="store-header__avatar"
                width={32}
                height={32}
              />
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
        <button
          type="button"
          className={`store-nav__link${activeView === 'products' ? ' is-active' : ''}`}
          onClick={() => onNavigate('products')}
        >
          Products
        </button>
        <button
          type="button"
          className={`store-nav__link${activeView === 'cart' ? ' is-active' : ''}`}
          onClick={() => onNavigate('cart')}
        >
          Cart
        </button>
      </nav>
    </header>
  )
}
