import React, { useState, useEffect } from "react";
import { Button, message, Upload } from "antd";
import { Input } from "antd";
import { db, storage, auth } from "../../server/firebaseConnection";
import firebase from "firebase/compat/app";
import "../sass/themes/ImageUpload.scss";

const UploadImage = ({ setOpenUploader }) => {
  const [image, setImage] = useState(null);
  const [picId, setPicId] = useState("");

  const user = auth.currentUser;

  const hideUpload = () => {
    setOpenUploader(false);
  };

  useEffect(() => {
    const getProfilePic = async () => {
      db.collection("profile_pic")
        .where("username", "==", user?.displayName)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setPicId(doc.id);
          });
        });
    };

    getProfilePic();
  }, []);

  const handleUpload = () => {
    // Use the `put` method to upload the image
    const task = storage.ref(`ProfilePic/${image.name}`).put(image);

    // Get the download URL for the image
    task
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            if (!picId) {
              // Add a document to the "posts" collection
              db.collection("profile_pic").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                imageURL: url,
                username: user?.displayName,
              });

              message.success("Image uploaded successfully");
            } else {
              // Add a document to the "posts" collection
              db.collection("profile_pic").doc(picId).update({
                imageURL: url,
              });

              message.success("Image updated successfully");
            }
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
      <p>Upload an Image</p>
      <div className="custom-file-input">
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.currentTarget.files[0])}
        />
      </div>

      <div className="uploadBtns-container">
        <button className="postBtn" onClick={handleUpload}>
          Change
        </button>
        <button className="cancelBtn" onClick={hideUpload}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default UploadImage;
