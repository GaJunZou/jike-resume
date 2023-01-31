import React from "react";
import "./style.css";
import Quill from "quill";

class QuillEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.children };
    this.uniqueStamp = new Date().getTime();
  }

  componentDidMount() {
    let { onChange } = this.props;
    this.quill = new Quill(`.quill-edit-${this.uniqueStamp}`, {
      placeholder: "Compose an epic...",
      theme: "snow",
    });
    // todo 触发事件有问题
    this.quill.on("text-change", () => {
      console.log("change");
      if (onChange instanceof Function) {
        console.log("quill 触发change事件");
        onChange(this.quill.root.innerHTML);
      }
    });
  }
  render() {
    return (
      <div className={`quill-edit-${this.uniqueStamp}`} dangerouslySetInnerHTML={{ __html: this.state.value }}></div>
    );
  }
}

export default QuillEdit;
