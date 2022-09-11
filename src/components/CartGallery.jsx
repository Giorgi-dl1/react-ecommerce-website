import { PureComponent } from "react";
import arrow from "../images/arrow-up.svg";
export default class CartGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  indexHandler = (index) => {
    const { gallery } = this.props;
    const indexToSet =
      index > gallery.length - 1 ? 0 : index < 0 ? gallery.length - 1 : index;
    this.setState({
      index: indexToSet,
    });
  };
  render() {
    const { gallery } = this.props;
    return (
      <div className="cart-image">
        <img src={gallery[this.state.index]} alt="" />
        {gallery.length > 1 && (
          <div className="arrows">
            <div
              className="arrow-left cart-arrow"
              onClick={() => this.indexHandler(this.state.index - 1)}
            >
              <img src={arrow} alt="arrow" />
            </div>
            <div
              className="arrow-right cart-arrow"
              onClick={() => this.indexHandler(this.state.index + 1)}
            >
              <img src={arrow} alt="arrow" />
            </div>
          </div>
        )}
      </div>
    );
  }
}
