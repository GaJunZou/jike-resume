import "./style.scss";
import React from "react";
import BaseModule from "../package/cell/base-module";
import data from "../data.json";
import GroupModule from "./../package/cell/group-module/index";
import SimpleModule from "./../package/cell/simple-module/index";
import Draggable from "../package/util/drag-dom";
import { Button, Popconfirm, Space, Anchor, Modal } from "antd";
import { getUniqueId } from "../package/util/util";
import CropImage from "../package/component/crop-image";

export const GlobalContext = React.createContext({ name: "scw" });
class ResumePage extends React.Component {
  constructor() {
    super();
    let result = localStorage.getItem("resume-data");
    if (result) {
      data = JSON.parse(result);
    }
    this.state = {
      data: data,
      isPreview: false,
    };
  }
  componentDidMount() {
    let editBar = document.querySelector(".edit-bar");
    window.onafterprint = () => {
      editBar.style.display = "block";
    };
    window.onbeforeprint = () => {
      editBar.style.display = "none";
    };
    new Draggable({
      wrap: document.querySelector(".drag-wrap"), // 容器的DOM
      contentClass: "drag-item", // 拖动元素类名，应该是容器的直接子节点
      triggerClass: "drag-trigger", // 拖动的触发器，只有拖动该类名的DOM才能实现拖动
      source: data.module,
      afterDragCallback: (res) => {
        // 拖动后回调，回调参数包括拖动元素索引、放置元素索引、排序后的数组
        console.log(res);
      },
    });
  }
  A4Divider() {
    if (this.state.isPreview) {
      let a4 = 310 / 210;
      let width = 820;
      let height = (width * a4).toFixed();
      // return <div className="a4-divider" style={{ top: height + "px" }}></div>;
    }
  }
  cookbook() {
    let content = (
      <div>
        <ol>
          <li>编辑功能：鼠标双击文字可进行编辑。</li>
          <li>退出编辑功能：按下 Esc 或失去焦点时退出编辑功能。</li>
          <li>
            插入模块：点击按钮会在按钮下面插入新模块。
            <ul>
              <li>单项模块：不能添加子模块，适用于填写个人描述等。</li>
              <li>多项模块：可添加子模块，适用于填写多个不同个人经历等。</li>
            </ul>
          </li>
          <li>删除模块：点击按钮删除按钮下面的第一个模块。</li>
          <li>预览：会删除各种编辑功能的按钮，进行整体预览。</li>
          <li>保存数据：把填写的数据保存到本地内存。</li>
          <li>另存为pdf：简历内容生成pdf进行保存。</li>
          <li>保存pdf时在窗口上可能会出现内容分割，此时请用编辑模块微调内容以使用A4比例。</li>
          <li>
            保存pdf时弹窗设置：
            <ul>
              <li>打印机：另存为PDF</li>
              <li>页面：全部</li>
              <li>布局：纵向</li>
              <li>更多设置-纸张尺寸：A4</li>
              <li>更多设置-边距：无</li>
              <li>更多设置-背景图形：不勾选</li>
            </ul>
          </li>
        </ol>
      </div>
    );
    Modal.confirm({
      title: "使用手册",
      content: content,
      footer: null,
      keyboard: true,
      maskClosable: true,
      width: 800,
    });
  }
  preview() {
    let editItems = document.querySelectorAll(".edit-item");
    if (!this.state.isPreview) {
      editItems.forEach((v) => {
        v.style.display = "none";
      });
    } else {
      editItems.forEach((v) => {
        v.style.display = "flex";
      });
    }
    this.setState({
      isPreview: !this.state.isPreview,
    });
  }
  save() {
    localStorage.setItem("resume-data", JSON.stringify(this.state.data));
  }
  print() {
    if (!this.state.isPreview) {
      this.preview();
    }
    window.print();
  }
  editItem(index) {
    let { module } = this.state.data;
    const addModuleItem = (type) => {
      let id = getUniqueId();
      let obj;
      if (type === "simple") {
        obj = {
          id: id,
          title: "自定义模块",
          type: "simple",
          subTitle: ["自定义项1", "自定义项2", "自定义项3"],
          htmlDesc: "在这里填写更多内容",
        };
      } else if (type === "group") {
        obj = {
          id: id,
          title: "自定义模块",
          type: "group",
          group: [
            {
              subTitle: ["自定义项1", "自定义项2", "自定义项3"],
              htmlDesc: "在这里填写更多内容",
            },
          ],
        };
      }
      module.splice(index, 0, obj);
      this.setState({ data: this.state.data });
    };
    const removeModuleItem = () => {
      module.splice(index, 1);
      this.setState({ data: this.state.data });
    };
    const up = () => {};
    const down = () => {};
    return (
      <Space wrap className="edit-item">
        <Button type="primary">
          <Popconfirm
            title="模块类型"
            onConfirm={(e) => addModuleItem("group")}
            onCancel={(e) => addModuleItem("simple")}
            okText="多项模块"
            cancelText="单项模块"
          >
            此处插入新模块
          </Popconfirm>
        </Button>
        <Button danger type="primary">
          <Popconfirm
            title="确认删除？"
            onConfirm={(e) => removeModuleItem()}
            onCancel={(e) => {}}
            okText="确定删除"
            cancelText="取消"
          >
            删除下面的模块
          </Popconfirm>
        </Button>
      </Space>
    );
  }
  editBar() {
    return (
      <div className="edit-bar">
        <Anchor
          items={data.module.map((v) => {
            return {
              key: "anchor-" + v.id,
              href: "anchor-" + v.id,
              title: v.title,
            };
          })}
        />
        <Button block type="primary" onClick={() => this.cookbook()}>
          使用手册
        </Button>
        <Button block type="primary" onClick={() => this.preview()}>
          {this.state.isPreview ? "取消预览" : "预览"}
        </Button>
        <Button block type="primary" onClick={() => this.save()}>
          保存数据
        </Button>
        <Button block type="primary" onClick={() => this.print()}>
          另存为pdf
        </Button>
      </div>
    );
  }
  render() {
    let { data } = this.state;
    return (
      <GlobalContext.Provider value={100}>
        {/* <CropImage src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}></CropImage> */}
        <div className="resume-page">
          {this.A4Divider()}
          {this.editBar()}
          <BaseModule value={data.base}></BaseModule>
          {this.editItem(0)}
          <div className="drag-wrap">
            {data.module.map((module, index) => {
              if (module.type === "group") {
                return (
                  <div key={module.id} className="drag-item" id={"anchor-" + module.id}>
                    <GroupModule value={data.module[index]}></GroupModule>
                    {this.editItem(index + 1)}
                  </div>
                );
              } else if (module.type === "simple") {
                return (
                  <div key={module.id} className="drag-item" id={"anchor-" + module.id}>
                    <SimpleModule value={data.module[index]}></SimpleModule>
                    {this.editItem(index + 1)}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </GlobalContext.Provider>
    );
  }
}
export default ResumePage;
