import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import Navbar from "./components/Navbar";
import LoadingBox from "./components/LoadingBox";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PorductsListScreen from "./screens/PorductsListScreen";
import ProductScreen from "./screens/ProductScreen";
import { isEqual } from "./utils";
import CartScreen from "./screens/CartScreen";

const GET_CATEGORIES = gql`
  query {
    categories {
      name
      products {
        name
        id
        inStock
        gallery
        description
        brand
        category
        attributes {
          name
          id
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    currencies {
      label
      symbol
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: localStorage.getItem("activeCategory") || "all",
      activeCurrency: JSON.parse(localStorage.getItem("activeCurrency")) || {
        symbol: "$",
        label: "USD",
      },
      dropdown: false,
      showMinicart: false,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  setCategory = (category) => {
    this.setState({
      activeCategory: category,
    });
    localStorage.setItem("activeCategory", category);
  };
  toggleMinicart = () => {
    this.setState((state) => ({
      showMinicart: !state.showMinicart,
    }));
  };
  setCurrency = (currency) => {
    this.setState({
      activeCurrency: currency,
      dropdown: false,
    });
    localStorage.setItem(
      "activeCurrency",
      JSON.stringify({ symbol: currency.symbol, label: currency.label })
    );
  };

  setDropdown = () => {
    this.setState((state) => ({
      dropdown: !state.dropdown,
    }));
  };

  addToCart = (product, activeAttributes, action) => {
    if (activeAttributes) {
      const checkAttributes = Object.getOwnPropertyNames(activeAttributes);
      if (checkAttributes.length <= 1) {
        activeAttributes = null;
      }
    }

    if (activeAttributes) {
      activeAttributes.image = "";
    }
    const existItem = this.state.cartItems?.find((item) => {
      if (activeAttributes) {
        return (
          item.product.id === product.id &&
          isEqual(item.activeAttributes, activeAttributes)
        );
      } else {
        return item.product.id === product.id;
      }
    });
    const quantity =
      existItem && action === "decrease"
        ? existItem.quantity - 1
        : existItem
        ? existItem.quantity + 1
        : 1;
    if (quantity < 1) {
      const updateCartItems = activeAttributes
        ? this.state.cartItems.filter((item) => {
            if (
              item.product.id === existItem.product.id &&
              isEqual(item.activeAttributes, existItem.activeAttributes)
            ) {
              return false;
            } else {
              return true;
            }
          })
        : this.state.cartItems.filter(
            (item) => item.product.id !== existItem.product.id
          );
      this.setState({
        cartItems: updateCartItems,
      });
      localStorage.setItem("cartItems", JSON.stringify(updateCartItems));

      return;
    }
    const updateCartItems =
      existItem && activeAttributes
        ? this.state.cartItems.map((item) =>
            item.product.id === existItem.product.id &&
            isEqual(item.activeAttributes, existItem.activeAttributes)
              ? { product, activeAttributes, quantity }
              : item
          )
        : existItem
        ? this.state.cartItems.map((item) =>
            item.product.id === existItem.product.id
              ? { product, activeAttributes, quantity }
              : item
          )
        : [...this.state.cartItems, { product, activeAttributes, quantity }];
    this.setState({
      cartItems: updateCartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
  };

  render() {
    const { data } = this.props;
    const { error, loading } = data;
    return loading ? (
      <LoadingBox />
    ) : error ? (
      <div className=" place-center">
        <div className="error">{error.message}</div>
      </div>
    ) : (
      <BrowserRouter>
        <div className="app">
          <Navbar
            categories={data.categories}
            currencies={data.currencies}
            activeCategory={this.state.activeCategory}
            setCategory={this.setCategory}
            activeCurrency={this.state.activeCurrency}
            setCurrency={this.setCurrency}
            dropdown={this.state.dropdown}
            setDropdown={this.setDropdown}
            cartItems={this.state.cartItems}
            showMinicart={this.state.showMinicart}
            toggleMinicart={this.toggleMinicart}
            addToCart={this.addToCart}
          />
          <div className={this.state.showMinicart ? "background" : ""}>
            <Routes>
              <Route
                path="/"
                element={
                  <PorductsListScreen
                    setCategory={this.setCategory}
                    activeCurrency={this.state.activeCurrency}
                    addToCart={this.addToCart}
                  />
                }
              />
              <Route
                path="/category/:category"
                element={
                  <PorductsListScreen
                    setCategory={this.setCategory}
                    activeCurrency={this.state.activeCurrency}
                    addToCart={this.addToCart}
                  />
                }
              />

              <Route
                path="/cart"
                element={
                  <CartScreen
                    cartItems={this.state.cartItems}
                    activeCurrency={this.state.activeCurrency}
                    addToCart={this.addToCart}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductScreen
                    activeCurrency={this.state.activeCurrency}
                    addToCart={this.addToCart}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default graphql(GET_CATEGORIES)(App);
