import React from "react";
import { Avatar, Modal } from "antd";
import "./style.scss";
import CropImage from "../crop-image";
class UploadAvatar extends React.Component {
  constructor(props) {
    super(props);
  }

  uploadImage() {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("name", "uploader-input");
    input.click();
    input.onchange = (e) => {
      let $file = e.currentTarget;
      let fd = new FormData();
      let file = $file.files;
      fd = new FormData();
      fd.append(file[0].name, file[0]);
      let fr = new FileReader();
      fr.readAsDataURL(file[0]);
      fr.onload = (e) => {
        this.setImage(e.target.result);
      };
    };
  }
  setImage(src) {
    Modal.confirm({
      title: "裁剪",
      content: (
        <CropImage
          src={src}
          onChange={(data) => {
            src = data;
          }}
        ></CropImage>
      ),
      footer: null,
      keyboard: true,
      maskClosable: true,
      width: 520,
      onOk: () => {
        this.props.onChange(src);
      },
    });
  }
  render() {
    return (
      <div onClick={() => this.uploadImage()}>
        <Avatar shape="square" size={120} src={this.props.src} />
      </div>
    );
  }
}

export default UploadAvatar;
