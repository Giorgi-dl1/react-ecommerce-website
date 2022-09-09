import React, { PureComponent } from "react";
import arrow from "../images/arrow-down.svg";

export default class DropDown extends PureComponent {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target) &&
      this.props.dropdown
    ) {
      this.props.setDropdown();
    }
  }

  render() {
    const { currencies, setDropdown, activeCurrency, dropdown } = this.props;
    return (
      <div className="currencies-div" ref={this.wrapperRef}>
        <div className="currency-dropdown" onClick={setDropdown}>
          <div className="currency-symbol">{activeCurrency.symbol}</div>
          <div className={dropdown ? "arrow rotate" : "arrow"}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div
          className={
            dropdown ? "currencies-cont dropdown-active" : "currencies-cont"
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
      </div>
    );
  }
}
