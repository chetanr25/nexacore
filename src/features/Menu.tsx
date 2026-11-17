import { Link } from 'react-router-dom'

export function Menu() {
    return (
        <nav>
            <Link to="/">Home</Link>
            {" | "}
            <Link to="/products">Products</Link>
        </nav>
    )
}