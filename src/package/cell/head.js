import "./style.scss";
import React from "react";
import { Input, Popover, Button, Checkbox, Form, InputNumber, Select, Space, message } from "antd";

import Icon from "../component/icon";
import TextInput from "../component/text-input";
import { SettingOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import RsRow from "../component/RsRow";

class Head extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      status: "solid",
      selectedStyle: {
        border: "1px solid rgba(0,0,0,.06)",
      },
      style: {},
      styleConfig: [
        {
          name: "width",
          label: "宽",
          type: "number",
          append: "px",
        },
        {
          name: "height",
          label: "高",
          type: "number",
          append: "px",
        },
        {
          name: "margin",
          label: "内边距",
          type: "input-group",
        },
        {
          name: "padding",
          label: "外边距",
          type: "input-group",
        },
      ],
    };
  }
  setStatus(e) {
    if (e.type === "focus") {
      this.setState({ status: "edit" });
      this.setState({ selectedStyle: { border: "1px solid rgba(0,0,0,.06)" } });
      if (e.target.className === "rs-head") {
      }
    } else if (e.type === "blur") {
      this.setState({ status: "solid" });
      this.setState({ selectedStyle: { border: "1px solid rgba(0,0,0,0)" } });
    }
  }
  edit() {}
  handleChange = () => {
    let values = this.formRef.current.getFieldsValue(true);
    let customStyle = (values.customs || [])
      .filter((v) => v)
      .map((v) => {
        return {
          [v.key]: v.value,
        };
      });
    let obj = Object.assign({}, values, ...customStyle, { customs: undefined });
    this.setState({ style: obj });
  };
  config() {
    // input number select color custom
    let FormItem = this.state.styleConfig.map((v) => {
      let control;
      switch (v.type) {
        case "number":
          control = <InputNumber addonAfter={v.append} onChange={this.handleChange} />;
          break;
        case "color":
          control = <Input type="color" onChange={this.handleChange} />;
          break;
        case "input":
          control = <Input type="text" onChange={this.handleChange} />;
          break;
        case "input-group":
          control = (
            <Input.Group compact>
              <Button disabled>上下</Button>
              <Input style={{ width: "25%" }} />
              <Button disabled>左右</Button>
              <Input style={{ width: "25%" }} />
            </Input.Group>
          );
          break;
        case "select":
          control = (
            <Select onChange={this.handleChange}>
              {v.options.map((vv) => {
                return (
                  <Select.Option value={vv} key={vv}>
                    {vv}
                  </Select.Option>
                );
              })}
            </Select>
          );
          break;
      }
      return (
        <Form.Item style={{ marginBottom: "10px" }} label={v.label} name={v.name} key={v.name}>
          {control}
        </Form.Item>
      );
    });
    let content = (
      <div className="config-form">
        <Form
          name="basic"
          ref={this.formRef}
          labelCol={{
            span: 8,
          }}
        >
          {FormItem}
          <Form.List name="customs">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" style={{ height: "42px" }}>
                    <Form.Item noStyle>
                      <Form.Item {...field} name={[field.name, "key"]}>
                        <Input style={{ width: 80 }} placeholder="属性名" onChange={this.handleChange} />
                      </Form.Item>
                    </Form.Item>
                    :
                    <Form.Item {...field} name={[field.name, "value"]}>
                      <Input placeholder="属性值" onChange={this.handleChange} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加css属性
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Form>
      </div>
    );
    return content;
  }

  render() {
    return (
      <div
        tabIndex="0"
        className="rs-head"
        onFocus={(e) => this.setStatus(e)}
        onBlur={(e) => this.setStatus(e)}
        style={{ ...this.state.selectedStyle, ...this.state.style }}
      >
        <RsRow>
          <div>
            <TextInput text="邹家进"></TextInput>
            <TextInput icon="icon-nianling" text="24岁"></TextInput>
            <TextInput icon="icon-dianhuatianchong" text="19875814656"></TextInput>
          </div>
          <div>
            <TextInput text="岗位：前端开发"></TextInput>
            <TextInput icon="icon-dingwei" text="广东-广州"></TextInput>
            <TextInput icon="icon-youxiang" text="1273614957@qq.com"></TextInput>
          </div>
          <div style={{ textAlign: "center" }}>
            <img src="/1.png" style={{ width: "100px", height: "100px" }} />
          </div>
        </RsRow>
      </div>
    );
  }
}
export default Head;
