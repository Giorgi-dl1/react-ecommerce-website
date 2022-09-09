import { PureComponent } from "react";

export default class AttributeItem extends PureComponent {
  componentDidMount() {
    if (this.props.index === 1) {
      this.props.setAttribute(this.props.attributeName, this.props.item);
    }
  }
  render() {
    const { item, type, attributeName, setAttribute, activeAttribute, index } =
      this.props;

    return type === "swatch" ? (
      <div
        style={{
          width: 32,
          height: 32,
          backgroundColor: item.value,
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          transition: ".5s",
          position: "relative",
        }}
        onClick={() => setAttribute(attributeName, item)}
        className={
          activeAttribute?.id === item.id ? "active-swatch-attribute" : ""
        }
      ></div>
    ) : (
      <div
        className={
          activeAttribute?.id === item.id ? "active-attribute item" : "item"
        }
        key={item.id}
        onClick={() => setAttribute(attributeName, item)}
      >
        <span>{item.value}</span>
      </div>
    );
  }
}
