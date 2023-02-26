import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { auth, db } from "../../server/firebaseConnection";

const userAvatar = () => {
  const [profile, setProfile] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    const getProfilePic = async () => {
      db.collection("profile_pic")
        .where("username", "==", user?.displayName)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setProfile(doc.data().imageURL);
          });
        });
    };

    getProfilePic();
  }, []);

  return (
    <Avatar
      style={{
        backgroundColor: "rgb(14, 52, 108)",
        verticalAlign: "middle",
      }}
      size={100}
      src={profile}
    ></Avatar>
  );
};
export default userAvatar;
