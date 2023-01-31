import React from "react";
import "./style.scss";
class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div style={{ display: this.props.icon ? "inline-block" : "none" }} className="icon-wrapper">
          <svg className="icon-svg" style={{ width: this.props.size, height: this.props.size }}>
            <use xlinkHref={"#" + this.props.icon}></use>
          </svg>
        </div>
        <span>{this.props.children}</span>
      </>
    );
  }
}

export default Icon;
