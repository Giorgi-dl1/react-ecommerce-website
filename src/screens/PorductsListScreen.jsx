import React, { Component } from "react";
import Product from "../components/Product";
import "../styles/PorductsListScreen.css";
export default class PorductsListScreen extends Component {
  componentDidMount() {
    this.props.setCategory(this.props.category);
  }
  render() {
    return (
      <div>
        <p style={{ fontWeight: 400, fontSize: 42, margin: "5rem 0" }}>
          {this.props.category}
        </p>
        <div className="product-list">
          {this.props.products.map((product) => (
            <Product
              product={product}
              activeCurrency={this.props.activeCurrency}
              key={product.name}
            />
          ))}
        </div>
      </div>
    );
  }
}
