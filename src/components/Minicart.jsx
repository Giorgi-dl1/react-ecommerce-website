import React, { PureComponent } from "react";
import "../styles/Minicart.css";
import cart from "../images/cart.svg";
import { getPrice, getTotalPrice } from "../utils";
import AttributeItem from "./AttributeItem";
import { Link } from "react-router-dom";

export default class Minicart extends PureComponent {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target) &&
      this.props.showMinicart
    ) {
      this.props.toggleMinicart();
    }
  }
  render() {
    const {
      cartItems,
      toggleMinicart,
      showMinicart,
      activeCurrency,
      addToCart,
    } = this.props;
    const totalQuantity = cartItems?.reduce((a, c) => a + c.quantity, 0);
    const totalPrice = getTotalPrice(cartItems, activeCurrency);
    return (
      <div className="cart" ref={this.wrapperRef}>
        <div className="nav__cart-icon" onClick={toggleMinicart}>
          <img src={cart} alt="cart-icon" />

          {this.props.cartItems.length > 0 && (
            <div className="cart-quantity">
              <span>{totalQuantity}</span>
            </div>
          )}
        </div>
        <div className={showMinicart ? "minicart show" : "minicart"}>
          {cartItems.length ? (
            <div className="minicart-items">
              <div className="header">
                <span className="bag">My Bag, </span>
                <span>{totalQuantity} items</span>
              </div>
              <div className="minicart-products styled-scrollbar">
                {cartItems.map((item, index) => {
                  const price = getPrice(item.product.prices, activeCurrency);
                  return (
                    <div className="minicart-product" key={index}>
                      <div className="minicart-product-info">
                        <div className="brand-name">
                          <div>{item.product.brand}</div>
                          <div>{item.product.name}</div>
                        </div>
                        <div className="minicart-price">
                          <span>{price.currency.symbol}</span>
                          <span>{price.amount}</span>
                        </div>
                        <div className="minicart-attributes">
                          {item?.product?.attributes?.map((attribute) => (
                            <div className="attribute" key={attribute.name}>
                              <div className="minicart-label">
                                {attribute.name}:
                              </div>
                              <div className="attribute-items minicart-attribute-items">
                                {attribute?.items?.map((attributeItem) => (
                                  <AttributeItem
                                    item={attributeItem}
                                    type={attribute.type}
                                    attributeName={attribute.name}
                                    key={attributeItem.id}
                                    activeAttribute={
                                      item.activeAttributes[attribute.name]
                                    }
                                    index="minicart"
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="quantity-control_image">
                        <div className="quantity-control">
                          <button
                            className="plus"
                            onClick={() =>
                              addToCart(item.product, item?.activeAttributes)
                            }
                          >
                            +
                          </button>
                          <div className="quantity">{item.quantity}</div>
                          <button
                            className="minus"
                            onClick={() =>
                              addToCart(
                                item.product,
                                item.activeAttributes,
                                "decrease"
                              )
                            }
                          >
                            -
                          </button>
                        </div>
                        <div className="minicart-image">
                          <img src={item.product.gallery[0]} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="minicart-bottom">
                <div className="minicart-total">
                  <span>Total</span>
                  <span className="price">
                    {activeCurrency.symbol}
                    {totalPrice}
                  </span>
                </div>
                <div className="actions">
                  <Link to="/cart" onClick={toggleMinicart}>
                    <button className="view-bag">VIEW BAG</button>
                  </Link>

                  <button className="check-out">CHECK OUT</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="cart-empty">Cart is empty</div>
          )}
        </div>
      </div>
    );
  }
}
