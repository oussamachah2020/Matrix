import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import { Input } from "antd";
const { TextArea } = Input;
import "../sass/themes/upload.scss";
import { db, storage, auth } from "../../server/firebaseConnection";
import firebase from "firebase/compat/app";

const props = {
  name: "file",
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
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const user = auth.currentUser;

  const hideUpload = () => {
    setOpenPostCard(false);
  };

  const handleUpload = () => {
    // Use the `put` method to upload the image
    const task = storage.ref(`PostImage/${image.name}`).put(image);

    // Get the download URL for the image
    task
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            // Add a document to the "posts" collection
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageURL: url,
              username: user?.displayName,
            });

            message.success("Posted successfully");
          })
          .catch((error) => {
            console.log("Error getting download URL:", error);
            message.error("Error getting download URL: " + error);
          });
      })
      .catch((error) => {
        console.log("Error uploading image:", error);
        message.error("Error uploading image: " + error);
      });
  };

  // const handleChange = (info) => {
  //   const { fileList } = info;
  //   setImage(fileList[0]);
  // };

  console.log(image);

  // console.log(Image);
  return (
    <div className="upload-container">
      <p>Post Something</p>
      <TextArea
        rows={4}
        className="caption-container"
        placeholder="Caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <div className="custom-file-input">
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.currentTarget.files[0])}
        />
      </div>
      <div className="uploadBtns-container">
        <button className="postBtn" onClick={handleUpload}>
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
