import React, { Component } from "react";
import logo from "../images/logo.svg";
import arrow from "../images/arrow-down.svg";
import cart from "../images/cart.svg";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    const { categories, currencies } = this.props;

    return (
      <div className="navbar">
        <div className="categories">
          {categories?.map((category) => (
            <div
              className={
                this.props.activeCategory === category.name
                  ? "active category"
                  : "category hover"
              }
              key={category.name}
            >
              <Link
                to={
                  category.name === "all" ? "/" : `/category/${category.name}`
                }
                onClick={() => this.props.setCategory(category.name)}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="currencies-cart">
          <div
            className="currency-dropdown"
            onClick={this.props.setDropdown.bind(this)}
          >
            <div className="currency-symbol">
              {this.props.activeCurrency.symbol}
            </div>
            <div className={this.props.dropdown ? "arrow rotate" : "arrow"}>
              <img src={arrow} alt="arrow" />
            </div>
          </div>
          <div
            className={
              this.props.dropdown
                ? "currencies-cont dropdown-active"
                : "currencies-cont"
            }
          >
            {currencies?.map((currency) => (
              <div
                className="currency"
                key={currency.symbol}
                onClick={() => this.props.setCurrency(currency)}
              >
                <span>{currency.symbol} </span>
                <span>{currency.label}</span>
              </div>
            ))}
          </div>
          <div className="cart">
            <img src={cart} alt="cart-icon" />
          </div>
        </div>
      </div>
    );
  }
}
