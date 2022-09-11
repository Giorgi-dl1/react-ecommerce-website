import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class NoMatch extends PureComponent {
  render() {
    return (
      <div className="content-center">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span>URL was not found.</span>
          <span style={{ color: "#5ece7b" }}>
            <Link to="/">go to homepage</Link>
          </span>
        </div>
      </div>
    );
  }
}
