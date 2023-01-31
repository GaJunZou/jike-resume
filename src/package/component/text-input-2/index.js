import "./style.scss";
import { Input, Popover, Button, Checkbox, InputNumber, Select, Space, message } from "antd";
import { SettingOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Icon from "../icon";

import React from "react";

class TextInput2 extends React.Component {
  constructor(props) {
    super(props);
    // 建议使用 constructor() 来初始化 state
    this.state = {
      edit: false,
      value: this.props.value,
    };
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
    this.props.onChange(e);
  };
  rightClick(e) {
    console.log(e);
  }
  render() {
    let place;
    if (this.state.edit) {
      place = (
        <Input
          style={{ maxWidth: "200px" }}
          autoFocus
          // bordered={this.props.bordered}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={() => {
            this.setState({ edit: false });
          }}
          onContextMenu={this.rightClick}
        ></Input>
      );
    } else {
      place = (
        <span
          onContextMenu={this.rightClick}
          onClick={() => {
            // e.stopPropagation();
            this.setState({ edit: true });
          }}
        >
          {this.state.value}
        </span>
      );
    }
    return <>{place}</>;
  }
}

export default TextInput2;
