import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import { Input } from "antd";
const { TextArea } = Input;
import "../sass/themes/upload.scss";
import { db, storage } from "../../server/firebaseConnection";

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

const UploadImage = ({ setOpenPostCard, username }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const storageRef = storage.ref();

  const hideUpload = () => {
    setOpenPostCard(false);
  };

  const HandlePost = () => {
    const task = storage.ref(`PostImage/${image}`).put(image);

    task.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    });

    storage
      .ref("PostImage")
      .child(image.name)
      .getDownloadURL()
      .then((url) =>
        db.collection("post").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          caption: caption,
          imageURL: url,
          username: username,
        })
      );
  };

  function handleBeforeUpload(file) {
    const fileName = file.name;
    const fileRef = storageRef.child(fileName);
    const task = fileRef.put(file);
    task.start();
  }

  return (
    <div className="upload-container">
      <p>Post Something</p>
      <TextArea
        rows={4}
        className="caption-container"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <Upload
        {...props}
        name="file"
        beforeUpload={handleBeforeUpload}
      >
        <Button className="uploadBtn">Upload</Button>
      </Upload>
      <div className="uploadBtns-container">
        <button className="postBtn" onClick={HandlePost}>
          Post
        </button>
        <button className="cancelBtn" onClick={hideUpload}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default UploadImage;
