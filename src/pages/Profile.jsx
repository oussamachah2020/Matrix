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
import UserAvatar from "../components/UserAvatar";
import Spinner from "../components/Spinner";

function profile() {
  const [open, setOpen] = useState(false);
  const [openUploader, setOpenUploader] = useState(false);
  // const user = auth.currentUser;
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState("");
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  
  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("posts")
        .where("username", "==", username)
        .onSnapshot((snapshot) => {
          const documents = snapshot.docs;
          const posts = [];
          documents.forEach((doc) => {
            posts.push(doc.data());
            setData(posts);
          });
        });
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const getProfilePic = async () => {
      db.collection("profile_pic")
        .where("username", "==", username)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setProfile(doc.data().imageURL);
          });
        });
    };

    getProfilePic();
  }, [username]);

  useEffect(() => {
    setLoading(true);
    if (user != null) {
      db.collection("followers")
        .where("username", "==", username)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc) {
              setFollowers(doc.data().followersNames);
            }
          });
          setLoading(false);
        });
    }
  }, [username]);

  console.log(followers);

  localStorage.setItem("profileImage", profile);

  if (loading) {
    return <Spinner />;
  }

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
          <UserAvatar />
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
            <span id="counter-container--followers">{followers.length}</span>{" "}
            Followers
          </p>
          <span>.</span>
          <p>
            <span id="counter-container--following">0</span> Following
          </p>
        </div>
        <div className="user-posts">
          <p>Your Posts</p>
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
