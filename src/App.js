import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import Navbar from "./components/Navbar";
import LoadingBox from "./components/LoadingBox";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PorductsListScreen from "./screens/PorductsListScreen";

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
    };
  }
  setCategory = (category) => {
    this.setState({
      activeCategory: category,
    });
    localStorage.setItem("activeCategory", category);
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
          />

          <Routes>
            {data?.categories?.map((category) => (
              <Route
                key={category.name}
                path={
                  category.name === "all" ? "/" : `/category/${category.name}`
                }
                element={
                  <PorductsListScreen
                    products={category.products}
                    category={category.name}
                    setCategory={this.setCategory}
                    activeCurrency={this.state.activeCurrency}
                  />
                }
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default graphql(GET_CATEGORIES)(App);
