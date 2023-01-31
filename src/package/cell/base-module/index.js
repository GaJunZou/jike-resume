import React from "react";
import "./style.scss";
import Icon from "../../component/icon";
import { Col, Row, Avatar, Modal } from "antd";
import TextInput from "./../../component/text-input/index";
import UploadAvatar from "./../../component/upload-avatar/index";

class BaseModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { base: props.value };
  }
  render() {
    let base = this.state.base;
    return (
      <div className="base module-space">
        <Row>
          <Col span={16}>
            <div className="base-name">
              <TextInput path="base.name" inst={this}></TextInput>
            </div>
            <Row>
              <Col span="12">
                <ul>
                  <li>
                    <TextInput path="base.age" inst={this}></TextInput>
                  </li>
                  <li>
                    <TextInput path="base.city" inst={this}></TextInput>
                  </li>
                  <li>
                    <TextInput path="base.sex" inst={this}></TextInput>
                  </li>
                </ul>
              </Col>
              <Col span="12">
                <ul>
                  <li>
                    <TextInput path="base.post" inst={this}></TextInput>
                  </li>
                  <li>
                    <TextInput path="base.phone" inst={this}></TextInput>
                  </li>
                  <li>
                    <TextInput path="base.email" inst={this}></TextInput>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <div className="base-image">
              <UploadAvatar
                src={base.image}
                onChange={(src) => {
                  this.setState({
                    base: {
                      ...this.state.base,
                      image: src,
                    },
                  });
                }}
              ></UploadAvatar>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BaseModule;
