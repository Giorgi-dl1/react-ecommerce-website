import { gql } from "@apollo/client";
import { PureComponent } from "react";
import { graphql } from "@apollo/client/react/hoc";
import LoadingBox from "../components/LoadingBox";
import "../styles/ProductScreen.css";

const GET_PRODUCT = gql`
  query GET_PRODUCT($productId: String!) {
    product(id: $productId) {
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
`;
class ProductScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      attributes: [],
    };
  }
  setImage = (data) => {
    this.setState({
      image: data,
    });
  };
  setAttribute = (name, item) => {
    const existItem = this.state.attributes.filter(
      (item) => item.name === name
    );
    if (existItem.length) {
      this.setState((state) => ({
        attributes: [
          ...state.attributes.map((attribute) =>
            attribute.name === name ? { name, item } : attribute
          ),
        ],
      }));
    } else {
      console.log("noneExist");
      this.setState((state) => ({
        attributes: [...state.attributes, { name, item }],
      }));
    }
  };
  render() {
    const { data } = this.props;
    const { error, loading, product } = data;
    // console.log(product?.attributes);
    console.log(this.state.attributes);
    return loading ? (
      <LoadingBox />
    ) : error ? (
      <div className="error">{error.message}</div>
    ) : (
      <div className="productsreen">
        <div className="gallery">
          <div className="thumbnails">
            {product?.gallery?.map((item) => (
              <div
                className="thumbnail"
                key={item}
                onClick={() => this.setImage(item)}
              >
                <img src={item} alt="thumbnail" />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img src={this.state.image || product.gallery[0]} alt="product" />
          </div>
        </div>
        <div className="info">
          <div className="brand">{product.brand}</div>
          <div className="product-name">{product.name}</div>
          <div className="attributes">
            {product.attributes?.map((attribute) => (
              <div className="attribute" key={attribute.name}>
                <div className="attribute-name">{attribute.name}:</div>
                <div className="attribute-items">
                  {attribute.items?.map((item, index) => {
                    return attribute.type === "swatch" ? (
                      <div
                        key={item.id}
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: item.value,
                          cursor: "pointer",
                        }}
                        // eslint-disable-next-line array-callback-return
                        className={this.state?.attributes?.map((sItem) =>
                          sItem.name === attribute.name &&
                          sItem.item.value === item.value
                            ? " active-attribute"
                            : ""
                        )}
                        onClick={() => this.setAttribute(attribute.name, item)}
                      ></div>
                    ) : (
                      <div
                        // eslint-disable-next-line array-callback-return
                        className={this.state?.attributes?.map((sItem) => {
                          if (
                            sItem.name === attribute.name &&
                            sItem.item.value === item.value
                          ) {
                            console.log("works");
                            return "active-attribute item";
                          } else {
                            return "item";
                          }
                        })}
                        key={item.id}
                        onClick={() => this.setAttribute(attribute.name, item)}
                      >
                        <span>{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default graphql(GET_PRODUCT, {
  options: (props) => ({
    variables: {
      productId: window.location.href.split("/")[4],
    },
  }),
})(ProductScreen);
