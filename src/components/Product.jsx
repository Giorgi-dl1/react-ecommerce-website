import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import cart from "../images/cart.svg";
import { getPrice } from "../utils";
export default class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
    };
  }
  componentDidMount() {
    let stateObject = {};
    // eslint-disable-next-line array-callback-return
    this.props.product?.attributes?.map((attribute) => {
      // eslint-disable-next-line array-callback-return
      attribute?.items?.map((item, index) => {
        if (index === 0) {
          stateObject[attribute.name] = item;
        }
      });
    });
    this.setState(stateObject);
  }
  render() {
    const { product } = this.props;
    const price = getPrice(product.prices, this.props.activeCurrency);
    return (
      <div className="grid-child">
        <div
          className={product.inStock ? "product instock" : "product outstock"}
        >
          <div className="image-cart">
            <Link to={`/product/${product.id}`}>
              <div className="image">
                <img src={product.gallery[0]} alt={product.name} />{" "}
              </div>
            </Link>
            <div
              className="cart-icon"
              onClick={() => this.props.addToCart(product, this.state)}
            >
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
      </div>
    );
  }
}
