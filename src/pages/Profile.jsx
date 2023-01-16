import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import Sword from "../assets/sword.jpg";
import "../sass/themes/Profile.scss";
import "../sass/layout/postsLayout.scss";
import "../sass/themes/upload.scss";
import { useSearchParams } from "react-router-dom";
import { auth, db } from "../../server/firebaseConnection";
import "../sass/themes/Home.scss";
import Like from "../assets/like.svg";
import Comment from "../assets/comment.svg";
import Share from "../assets/share.svg";
import Back from "../assets/arrow.svg";
import Menu from "../assets/burgerMenu.svg";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfilePicUploader from "../components/profilePicUploader";
import Camera from "../assets/camera.png";

function profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [open, setOpen] = useState(false);
  const [openUploader, setOpenUploader] = useState(false);
  const user = auth.currentUser;
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    // Get the posts collection
    if (user) {
      // Get the collection
      const unsubscribe = db
        .collection("posts")
        // Create a query with a filter on the user ID field
        .where("username", "==", user.displayName)
        .onSnapshot((snapshot) => {
          // Get the documents in the snapshot
          const documents = snapshot.docs;
          const posts = [];
          documents.forEach((doc) => {
            // console.log(doc.data());
            posts.push(doc.data());
            setData(posts);
          });
          // Set the data state with the documents
        });
      // Unsubscribe from the snapshot when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const getProfilePic = async () => {
      db.collection("profile_pic")
        .where("username", "==", user?.displayName)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setProfile(doc.data().imageURL);
            setPicId(doc.id);
          });
        });
    };

    getProfilePic();
  }, []);

  // console.log(picId);

  return (
    <>
      <div className="profile">
        <div className="header">
          <Link to={`/Home?username=${username}`}>
            <img src={Back} alt="backButton" title="back" />
          </Link>
          <img
            src={Menu}
            alt="menuButton"
            id="menuBtn"
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="profile_pic">
          <Avatar
            src={profile}
            style={{
              backgroundColor: "rgb(14, 52, 108)",
              verticalAlign: "middle",
            }}
            size={100}
          />
          <img
            src={Camera}
            alt="edit_pen"
            style={{ width: "18px", cursor: "pointer" }}
            title="edit image"
            onClick={() => setOpenUploader(true)}
          />
        </div>
        <h2 id="username">{user?.displayName}</h2>
        <p id="userEmail">{user.email}</p>
        <div className="counter-container">
          <p>
            <span id="counter-container--followers">0</span> Followers
          </p>
          <span>.</span>
          <p>
            <span id="counter-container--following">0</span> Following
          </p>
        </div>
        <div className="user-posts">
          <p style={{ margin: "20px 0" }}>Your Posts</p>
          {data.map((item) => (
            <div className="post-container">
              <div className="post">
                <p id="user">{item.username}</p>
                <img
                  src={item.imageURL}
                  alt="postImage"
                  className="post-image"
                />
                <p className="post-description">{item.caption}</p>
                <hr style={{ width: "90%" }} />
                <div className="buttons-container">
                  <button>
                    <img src={Like} alt="likeButton" />
                    Like
                  </button>
                  <button>
                    <img src={Comment} alt="commentButton" />
                    Comment
                  </button>
                  <button>
                    <img src={Share} alt="shareButton" />
                    Share
                  </button>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
      {open ? <Navbar setOpen={setOpen} /> : null}
      {openUploader ? (
        <div className="uploadCard">
          <ProfilePicUploader setOpenUploader={setOpenUploader} />
        </div>
      ) : null}
    </>
  );
}

export default profile;
