import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import cart from "../images/cart.svg";
export default class Product extends PureComponent {
  render() {
    const { product } = this.props;
    const price = product.prices.filter(
      (item) => item.currency.label == this.props.activeCurrency.label
    )[0];
    return (
      <div className={product.inStock ? "product instock" : "product outstock"}>
        <div className="image-cart">
          <Link to={`/product/${product.id}`}>
            <div className="image">
              <img src={product.gallery[0]} alt={product.name} />{" "}
            </div>
          </Link>
          <div className="cart-icon">
            <img src={cart} alt="cart-icon" />
          </div>
        </div>

        <div className={product.inStock ? "name" : "name grey"}>
          <Link to={`/product/${product.id}`}>
            <span>
              <span>{product.brand} </span>
              <span>{product.name}</span>
            </span>
          </Link>
        </div>
        <div className={product.inStock ? "price" : "price grey"}>
          <span>{price.currency.symbol}</span>
          <span>{price.amount}</span>
        </div>
      </div>
    );
  }
}
