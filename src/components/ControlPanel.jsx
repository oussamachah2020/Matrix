import { useState, useEffect } from "react";
import "../sass/components/PanelControl.scss";
import Home from "../assets/home.svg";
import Add from "../assets/add.svg";
import Search from "../assets/search.svg";
import Message from "../assets/message.svg";
import Sword from "../assets/sword.jpg";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { db } from "../../server/firebaseConnection";


function ControlPanel({ username, setOpenPostCard, setOpenSearchCard }) {
  const [profile, setProfile] = useState("");

  const showUpload = () => {
    setOpenPostCard(true)
  };

  const showSearch = () => {
    setOpenSearchCard(true)
  };

  useEffect(() => {
    const getProfilePic = async () => {
      db.collection("profile_pic")
        .where("username", "==", username)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setProfile(doc.data().imageURL);
            setPicId(doc.id);
          });
        });
    };

    getProfilePic();
  }, []);

  return (
    <div className="Panel">
      <div className="panel-container">
        <Link to={`/Home?username=${username}`}>
          <img src={Home} alt="home" />
        </Link>
        <button className="search" onClick={showSearch}>
          <img src={Search} alt="search" />
        </button>
        <button className="add" onClick={showUpload}>
          <img src={Add} alt="add" />
        </button>
        <Link>
          <img src={Message} alt="msg" />
        </Link>
        <Link to={`/profile?username=${username}`} title={username}>
          <Avatar
            src={profile}
            style={{
              backgroundColor: "rgb(14, 52, 108)",
              verticalAlign: "middle",
            }}
            size="medium"
          />
        </Link>
      </div>
    </div>
  );
}

export default ControlPanel;
