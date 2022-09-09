import React, { Component } from "react";
import logo from "../images/logo.svg";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import Minicart from "./Minicart";

export default class Navbar extends Component {
  render() {
    const { categories, setCategory, activeCategory } = this.props;
    return (
      <div className="navbar">
        <div className="categories">
          {categories?.map((category) => (
            <div
              className={
                activeCategory === category.name
                  ? "active category"
                  : "category hover"
              }
              key={category.name}
            >
              <Link
                to={
                  category.name === "all" ? "/" : `/category/${category.name}`
                }
                onClick={() => setCategory(category.name)}
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
          <DropDown
            setDropdown={this.props.setDropdown}
            activeCurrency={this.props.activeCurrency}
            dropdown={this.props.dropdown}
            currencies={this.props.currencies}
            setCurrency={this.props.setCurrency}
          />

          <Minicart
            showMinicart={this.props.showMinicart}
            toggleMinicart={this.props.toggleMinicart}
            cartItems={this.props.cartItems}
            activeCurrency={this.props.activeCurrency}
          />
        </div>
      </div>
    );
  }
}
