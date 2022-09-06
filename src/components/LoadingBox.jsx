import { Component } from "react";
import "../styles/LoadingBox.css";

export default class LoadingBox extends Component {
  render() {
    return (
      <div className="place-center">
        <div className="loader"></div>
      </div>
    );
  }
}
