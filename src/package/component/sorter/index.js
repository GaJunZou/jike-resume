import React from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import "./sorter.css";
class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: "" };
  }
  sorter(value) {
    this.setState({ active: value });
    this.props.onSorter(value);
  }
  render() {
    return (
      <div className="tps-sorter">
        <span className={this.state.active === "asc" ? "sorter-active" : ""}>
          <CaretUpOutlined onClick={() => this.sorter("asc")} />
        </span>
        <span className={this.state.active === "desc" ? "sorter-active" : ""}>
          <CaretDownOutlined onClick={() => this.sorter("desc")} />
        </span>
      </div>
    );
  }
}

export default Sorter;
