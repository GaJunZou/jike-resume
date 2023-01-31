import React from "react";
import { Button } from "antd";
import "./style.scss";

function toParentDistance(target, value) {
  let v = target.style[value].split("px")[0];
  if (!v) {
    console.log(target);
    // debugger;
  }
  return Number(v);
}

function noPointer(f) {
  let pointList = document.querySelectorAll(".crop-image .point");
  pointList.forEach((v) => {
    if (f) {
      v.style.width = "0px";
    } else {
      v.style.width = "10px";
    }
  });
}

class CropImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src,
    };
  }
  getAngel() {
    let isOnPointer = false;
    let startEvent;
    let endEvent;
    let cropArea;
    let onPrinterDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }
      console.log(1);
      cropArea = document.querySelector(".crop-area");
      isOnPointer = true;
      startEvent = e;
      console.log(e);
    };
    let onPointerMove = (e) => {
      if (!isOnPointer) return;
      let movex = e.clientX - startEvent.clientX;
      let movey = e.clientY - startEvent.clientY;
      console.log(movex, movey);
      let p = startEvent.target.getAttribute("data-index");
      switch (p) {
        case "tl":
          cropArea.style.top = movey + "px";
          cropArea.style.left = movex + "px";
          cropArea.style.width = `calc(100% - ${movex}px)`;
          cropArea.style.height = `calc(100% - ${movey}px)`;
          break;
        case "tr":
          cropArea.style.top = movey + "px";
          cropArea.style.right = -movex + "px";
          cropArea.style.width = `calc(100% - ${-movex}px)`;
          cropArea.style.height = `calc(100% - ${movey}px)`;
          break;
        case "bl":
          cropArea.style.bottom = -movey + "px";
          cropArea.style.left = movex + "px";
          cropArea.style.width = `calc(100% - ${movex}px)`;
          cropArea.style.height = `calc(100% - ${-movey}px)`;
          break;
        case "br":
          cropArea.style.bottom = -movey + "px";
          cropArea.style.right = -movex + "px";
          cropArea.style.width = `calc(100% - ${-movex}px)`;
          cropArea.style.height = `calc(100% - ${-movey}px)`;
          break;
      }
    };
    let onPrinterUp = (e) => {
      if (isOnPointer) {
        isOnPointer = false;
        console.log(3);
      }
    };
    return ["tl", "tr", "bl", "br"].map((v, i) => {
      let style;
      switch (v) {
        case "tl":
          style = { top: "0px", left: "0px", transform: "rotate(0deg)" };
          break;
        case "tr":
          style = { top: "0px", right: "0px", transform: "rotate(90deg)" };
          break;
        case "bl":
          style = { bottom: "0px", left: "0px", transform: "rotate(-90deg)" };
          break;
        case "br":
          style = { bottom: "0px", right: "0px", transform: "rotate(180deg)" };
          break;
      }
      // return (
      //   <div
      //     key={i}
      //     className={"crop-icon icon-" + v}
      //     data-index={v}
      //     style={{ ...style }}
      //     onMouseDown={(e) => onPrinterDown(e)}
      //     onMouseMove={(e) => onPointerMove(e)}
      //     onMouseUp={(e) => onPrinterUp(e)}
      //     onMouseLeave={(e) => onPrinterUp(e)}
      //   ></div>
      // );
    });
  }
  getCropArea() {
    let isDrag = false;
    let startEvent;
    let cropArea;
    let onPrinterDown = (e) => {
      e.stopPropagation();
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }
      isDrag = true;
      cropArea = document.querySelector(".crop-area");
      startEvent = e;
    };
    let onPointerMove = (e) => {
      if (isDrag) {
        let movex = e.clientX - startEvent.clientX;
        let movey = e.clientY - startEvent.clientY;
        // console.log("movex:", movex, "movey:", movey);
        /* bug:经过边界时 e.target 会变成边界的 target */
        this.top = toParentDistance(e.target, "top") + movey;
        this.left = toParentDistance(e.target, "left") + movex;
        cropArea.style.top = this.top + "px";
        cropArea.style.left = this.left + "px";
        startEvent = e;
      }
    };
    let onPrinterUp = (e) => {
      if (isDrag) {
        isDrag = false;
      }
    };
    let event = {};
    if (!this.isShot) {
      event = {
        onPointerDown: (e) => onPrinterDown(e),
        onPointerMove: (e) => onPointerMove(e),
        onPointerUp: (e) => onPrinterUp(e),
        onPointerLeave: (e) => onPrinterUp(e),
      };
    }
    return (
      <div className="crop-area" {...event}>
        <div className="top">
          <div className="point"></div>
          <div className="point"></div>
          <div className="point"></div>
        </div>
        <div className="middle">
          <div className="point"></div>
          <div className="point"></div>
        </div>
        <div className="bottom">
          <div className="point"></div>
          <div className="point"></div>
          <div className="point"></div>
        </div>
      </div>
    );
  }
  getModalContent(src) {
    let isOnPointer = false;
    let startEvent;
    let cropArea;
    let rect; /* todo:在crop-image位置、距离改变时要重新获取 */
    let onPrinterDown = (e) => {
      e.stopPropagation();
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }
      if (!rect) {
        rect = document.querySelector(".crop-image").getBoundingClientRect();
      }
      isOnPointer = true;
      this.isShot = true;
      cropArea = document.querySelector(".crop-area");
      startEvent = e;
    };
    let onPointerMove = (e) => {
      e.stopPropagation();
      if (isOnPointer) {
        let movex = e.clientX - startEvent.clientX;
        let movey = e.clientY - startEvent.clientY;
        if (movex > 0) {
          cropArea.style.left = startEvent.nativeEvent.clientX - rect.x + "px";
        } else {
          cropArea.style.left = e.nativeEvent.clientX - rect.x + "px";
        }
        if (movey > 0) {
          cropArea.style.top = startEvent.nativeEvent.clientY - rect.y + "px";
        } else {
          cropArea.style.top = e.nativeEvent.clientY - rect.y + "px";
        }
        // if (cropArea.style.top === "3px") {
        //   console.log(e);
        //   debugger;
        // }
        cropArea.style.width = Math.abs(movex) + "px";
        cropArea.style.height = Math.abs(movey) + "px";
        this.width = Math.abs(movex);
        this.height = Math.abs(movey);
        if (this.width < 30 || this.height < 30) {
          noPointer(true);
        } else {
          noPointer(false);
        }
      }
    };
    let onPrinterUp = (e) => {
      e.stopPropagation();
      if (isOnPointer) {
        console.log("up or leave");
        isOnPointer = false;
        this.isShot = false;
      }
    };
    return (
      <>
        <div
          className="crop-image"
          onPointerDown={(e) => onPrinterDown(e)}
          onPointerMove={(e) => onPointerMove(e)}
          onPointerUp={(e) => onPrinterUp(e)}
          onPointerLeave={(e) => onPrinterUp(e)}
        >
          {this.getCropArea()}
          <img
            className="crop-target"
            crossOrigin="Anonymous"
            src={src}
            onDragStart={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        </div>
        <Button
          block
          nz-button
          onClick={() => {
            this.crop();
            setTimeout(() => {
              this.props.onChange(this.state.src);
            }, 100);
          }}
        >
          截取
        </Button>
        <img crossOrigin="Anonymous" src={this.state.src} style={{ width: "100%" }} />
      </>
    );
  }
  crop() {
    let imgDom = document.querySelector(".crop-target");
    let scale = imgDom.naturalWidth / imgDom.width;
    let left = parseInt(this.left * scale);
    let top = parseInt(this.top * scale);
    let width = parseInt(this.width * scale);
    let height = parseInt(this.height * scale);
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", this.width);
    canvas.setAttribute("height", this.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(imgDom, left, top, width, height, 0, 0, this.width, this.height);
    const url = canvas.toDataURL("image/png");
    this.setState({
      src: url,
    });
  }
  render() {
    return this.getModalContent(this.props.src);
  }
}

export default CropImage;
