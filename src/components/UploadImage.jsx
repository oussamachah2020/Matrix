import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Input } from "antd";
const { TextArea } = Input;
import "../sass/themes/upload.scss";
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      "0%": "#fffff",
      "100%": "#060217",
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseInt(percent.toFixed(2))}%`,
  },
};

const UploadImage = ({ setOpenPostCard }) => {
  const hideUpload = () => {
    setOpenPostCard(false);
  };
  return (
    <div className="upload-container">
      <p>Post Something</p>
      <TextArea rows={4} className="caption-container" placeholder="Caption" />

      <Upload {...props} style={{ color: "red" }}>
        <Button className="uploadBtn">Upload</Button>
      </Upload>
      <div className="uploadBtns-container">
        <button className="postBtn">Post</button>
        <button className="cancelBtn" onClick={hideUpload}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default UploadImage;
