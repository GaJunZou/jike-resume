import "./style.scss";
import { Input } from "antd";
import { pathToState } from "../../util/util";

import React from "react";
import QuillEdit from "../quill-edit";

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    // 建议使用 constructor() 来初始化 state
    this.state = {
      type: "text",
    };
  }
  escape(e) {
    if (e.keyCode === 27) {
      /* escape */
      this.setState({
        type: "text",
      });
    }
  }
  changeValue(value) {
    let { inst, path, onChange } = this.props;
    let pathValue = pathToState(inst.state, path);
    let data = inst.state;
    Array.from(pathValue).forEach((v, i) => {
      if (pathValue.length - 1 === i) {
        data[v] = value;
      } else {
        data = data[v];
      }
    });
    inst.setState({ ...data });
    if (onChange instanceof Function) {
      onChange(e);
    }
  }

  render() {
    let { inst, path, mode } = this.props;
    let { value } = pathToState(inst.state, path);
    const { type } = this.state;
    let tag;
    if (type === "text") {
      tag = <div dangerouslySetInnerHTML={{ __html: value }}></div>;
    } else {
      if (mode === "html") {
        tag = (
          <div className="">
            <QuillEdit onChange={(e) => this.changeValue(e)}>{value}</QuillEdit>
          </div>
        );
      } else {
        tag = (
          <Input
            className="input"
            autoFocus
            value={value}
            onBlur={() => {
              this.setState({
                type: "text",
              });
            }}
            onInput={(e) => {
              this.changeValue(e.target.value);
            }}
          />
        );
      }
    }

    return (
      <div
        className="text-input-wrapper"
        onKeyDown={(e) => {
          this.escape(e);
        }}
        onDoubleClick={() => {
          if (this.state.type === "text") {
            this.setState({
              type: type === "text" ? "input" : "text",
            });
          }
        }}
      >
        {tag}
      </div>
    );
  }
}

export default TextInput;
