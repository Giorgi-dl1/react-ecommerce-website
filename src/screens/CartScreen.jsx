import { PureComponent } from "react";
import { countTax, getPrice, getTotalPrice } from "../utils.js";
import "../styles/CartScreen.css";
import AttributeItem from "../components/AttributeItem";
import CartGallery from "../components/CartGallery.jsx";
import { Link } from "react-router-dom";
export default class CartScreen extends PureComponent {
  render() {
    const { cartItems, activeCurrency, addToCart } = this.props;
    const totalPrice = getTotalPrice(cartItems, activeCurrency);
    const tax = countTax(totalPrice);
    const totalQuantity = cartItems?.reduce((a, c) => a + c.quantity, 0);
    return (
      <div className="cartscreen">
        {cartItems.length ? (
          <div className="cart">
            <p style={{ fontWeight: 400, fontSize: 42, margin: "5rem 0" }}>
              Cart
            </p>
            <div className="cart-products">
              {cartItems.map((item, index) => {
                const price = getPrice(item.product.prices, activeCurrency);
                return (
                  <div className="cart-b minicart-product" key={index}>
                    <div className="minicart-product-info">
                      <div>
                        <div className="brand">{item.product.brand}</div>
                        <div className="product-name">
                          <Link to={`/product/${item.product.id}`}>
                            {item.product.name}
                          </Link>
                        </div>
                      </div>
                      <div className="price-productScreen">
                        <span>{price.currency.symbol}</span>
                        <span>{price.amount}</span>
                      </div>
                      <div className="cart-attributes">
                        {item?.product?.attributes?.map((attribute) => (
                          <div className="attribute" key={attribute.name}>
                            <div className="label">{attribute.name}:</div>
                            <div className="attribute-items ">
                              {attribute?.items?.map((attributeItem) => (
                                <AttributeItem
                                  item={attributeItem}
                                  type={attribute.type}
                                  attributeName={attribute.name}
                                  key={attributeItem.id}
                                  activeAttribute={
                                    item.activeAttributes[attribute.name]
                                  }
                                  index="cart"
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="quantity-control_image">
                      <div className="cart-b quantity-control">
                        <button
                          className="cart_b plus"
                          onClick={() =>
                            addToCart(item.product, item?.activeAttributes)
                          }
                        >
                          +
                        </button>
                        <div className="cart__quantity">{item.quantity}</div>
                        <button
                          className="cart_b minus"
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
                      <CartGallery gallery={item.product.gallery} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-bottom">
              <div className="cart-total">
                <span>Tax 21%: </span>
                <span className="cart-amount">
                  {activeCurrency.symbol}
                  {tax}
                </span>
              </div>
              <div className="cart-total">
                <span>Quantity: </span>
                <span className="cart-amount">{totalQuantity}</span>
              </div>
              <div className="cart-total">
                <span>Total:</span>
                <span className="cart-amount">
                  {activeCurrency.symbol}
                  {totalPrice}
                </span>
              </div>
              <button className="cart-button">ORDER</button>
            </div>
          </div>
        ) : (
          <div className="cartscreen-empty">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span>Cart is empty.</span>
              <Link to="/">
                <strong style={{ color: "#5ece7b" }}>Go shopping</strong>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}
