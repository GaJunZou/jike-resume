import React from "react";
import "./style.scss";
import Icon from "../../component/icon";
import { Col, Row } from "antd";
import Quill from "quill";
import TextInput from "../../component/text-input";
import { DragOutlined } from "@ant-design/icons";

class SimpleModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.value };
  }

  render() {
    const data = this.state.data;
    // this.bodyClassName = "module-" + this.props.index + "-htmlDsc";
    let body = (
      <div className="simple-html">
        <TextInput path={`data.htmlDesc`} inst={this} mode="html"></TextInput>
      </div>
    );
    let subTitle = data.subTitle.map((sub, subIndex) => {
      return (
        <Col span={24 / data.subTitle.length} key={subIndex} className="simple-sub">
          <TextInput path={`data.subTitle.${subIndex}`} inst={this}></TextInput>
        </Col>
      );
    });
    return (
      <div className="simple-module module-space">
        <div className="title">
          <TextInput path={`data.title`} inst={this}></TextInput>
          <span className="drag-trigger edit-item">
            <DragOutlined />
          </span>
        </div>
        <Row>{subTitle}</Row>
        {body}
      </div>
    );
  }
}

export default SimpleModule;
