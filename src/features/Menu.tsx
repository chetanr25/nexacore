import { Link } from "react-router-dom";

function Menu(){
    return (
        <nav>
      <Link to="/"> </Link>
      {" | "}
      <Link to="/products">Products</Link>
      {" | "}
      <Link to="/cart">Cart</Link>
    </nav>
    )
}

export default Menu;