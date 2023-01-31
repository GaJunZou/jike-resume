import React from "react";
import "./style.scss";
import Icon from "../../component/icon";
import { Col, Row, Space, Button, Popconfirm } from "antd";
import TextInput from "../../component/text-input";
import { DragOutlined } from "@ant-design/icons";
import { getUniqueId } from "../../util/util";

class GroupModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.value };
  }
  editItem(index) {
    let state = this.state;
    const addModuleItem = () => {
      let obj = {
        id: getUniqueId(),
        subTitle: ["自定义项1", "自定义项2", "自定义项3"],
        htmlDesc: "在此处填入内容",
      };
      state.data.group.splice(index, 0, obj);
      this.setState({ data: state.data });
    };
    const removeModuleItem = () => {
      state.data.group.splice(index, 1);
      this.setState({ data: state.data });
    };
    return (
      <Space className="edit-item">
        <Button type="dashed" onClick={() => addModuleItem("group")}>
          <a href="#">此处插入子模块</a>
        </Button>
        <Button type="dashed" danger>
          <Popconfirm
            title="确认删除？"
            onConfirm={(e) => removeModuleItem()}
            onCancel={(e) => {}}
            okText="确定删除"
            cancelText="取消"
          >
            <a href="#">删除下面的子模块</a>
          </Popconfirm>
        </Button>
      </Space>
    );
  }
  render() {
    const data = this.state.data;
    console.log(data);
    return (
      <div className="group-module module-space">
        <div className="title">
          <TextInput path="data.title" inst={this}></TextInput>
          <span className="drag-trigger edit-item">
            <DragOutlined />
          </span>
        </div>
        {data.group.map((item, index) => {
          let subTitle = item.subTitle.map((sub, subIndex) => {
            return (
              <Col span={24 / item.subTitle.length} key={subIndex} className="group-sub">
                <div>
                  <TextInput path={`data.group.${index}.subTitle.${subIndex}`} inst={this}></TextInput>
                </div>
              </Col>
            );
          });
          // this.bodyClassName = "module-" + this.props.index + "-group-" + index + "-htmlDesc";
          let body = (
            <div className="group-html">
              <TextInput path={`data.group.${index}.htmlDesc`} inst={this} mode="html"></TextInput>
              {data.group.length !== index + 1 ? <hr></hr> : null}
              {this.editItem(index + 1)}
            </div>
          );
          return (
            <div key={item.id}>
              <Row>{subTitle}</Row>
              {body}
            </div>
          );
        })}
      </div>
    );
  }
}

export default GroupModule;
