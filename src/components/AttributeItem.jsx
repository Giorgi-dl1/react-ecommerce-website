import { PureComponent } from "react";

export default class AttributeItem extends PureComponent {
  render() {
    const { item, type, attributeName, setAttribute, activeAttribute, index } =
      this.props;

    return type === "swatch" ? (
      <div
        style={{
          width: index === "minicart" ? 16 : 32,
          height: index === "minicart" ? 16 : 32,
          backgroundColor: item.value,
          cursor:
            index === "minicart" || index === "cart" ? "default" : "pointer",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          transition: ".5s",
          position: "relative",
        }}
        onClick={
          index !== "minicart" && index !== "cart"
            ? () => setAttribute(attributeName, item)
            : null
        }
        className={
          activeAttribute?.id === item.id && index === "minicart"
            ? "active-minicart-swatch-attribute"
            : activeAttribute?.id === item.id
            ? "active-swatch-attribute"
            : index === "minicart"
            ? "minicart-swatch-attribute"
            : ""
        }
      ></div>
    ) : (
      <>
        <div
          className={
            activeAttribute?.id === item.id && index === "minicart"
              ? "active-attribute item minicart-item"
              : activeAttribute?.id === item.id
              ? "active-attribute item"
              : index === "minicart"
              ? "item minicart-item"
              : "item"
          }
          style={{
            cursor: index === "cart" && "default",
          }}
          key={item.id}
          onClick={
            index !== "minicart" && index !== "cart"
              ? () => setAttribute(attributeName, item)
              : null
          }
        >
          <span>{item.value}</span>
        </div>
      </>
    );
  }
}
