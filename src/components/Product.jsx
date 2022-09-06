import React, { Component } from "react";
import cart from "../images/cart.svg";
export default class Product extends Component {
  render() {
    const { product } = this.props;
    const price = product.prices.filter(
      (item) => item.currency.label == this.props.activeCurrency.label
    )[0];
    console.log(price);
    return (
      <div className="product">
        <div className="image-cart">
          <div className="image">
            <img src={product.gallery[0]} alt={product.name} />{" "}
          </div>
          <div className="cart-icon">
            <img src={cart} alt="cart-icon" />
          </div>
        </div>

        <div className="name">
          <span>{product.brand} </span>
          <span>{product.name}</span>
        </div>
        <div className="price">
          <span>{price.currency.symbol}</span>
          <span>{price.amount}</span>
        </div>
      </div>
    );
  }
}
