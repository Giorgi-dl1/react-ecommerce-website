import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import LoadingBox from "../components/LoadingBox";
import Product from "../components/Product";
import "../styles/PorductsListScreen.css";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($title: String!) {
    category(input: { title: $title }) {
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
  }
`;
class PorductsListScreen extends Component {
  componentDidMount() {
    this.props.setCategory(window.location.href.split("/")[4] || "all");
  }
  render() {
    const { data } = this.props;
    const { loading, error, category } = data;
    return loading ? (
      <LoadingBox />
    ) : error ? (
      <div className="error">{error.message}</div>
    ) : (
      <div>
        <p style={{ fontWeight: 400, fontSize: 42, margin: "5rem 0" }}>
          {category.name}
        </p>

        <div className="product-list">
          {category.products.map((product) => (
            <Product
              product={product}
              activeCurrency={this.props.activeCurrency}
              key={product.id}
              addToCart={this.props.addToCart}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default graphql(GET_PRODUCTS, {
  options: (props) => ({
    variables: {
      title: window.location.href.split("/")[4] || "all",
    },
  }),
})(PorductsListScreen);
