import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import Sword from "../assets/sword.jpg";
import "../sass/themes/Profile.scss";
import { useSearchParams } from "react-router-dom";
import { auth, db } from "../../server/firebaseConnection";
import "../sass/themes/Home.scss";
import Wallpaper from "..//assets/view.png";
import Like from "../assets/like.svg";
import Comment from "../assets/comment.svg";
import Share from "../assets/share.svg";
import Back from "../assets/arrow.svg";
import Menu from "../assets/burgerMenu.svg";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const username = searchParams.get("username");
  const user = auth.currentUser;

  const openMenu = () => {
    setOpen(true);

    if (open == true) {
      document.querySelector(".navbar").classList.remove("hide");
    }
  };

  const [posts, setPosts] = useState([]);

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

          // Set the data state with the documents
          setPosts(documents);
        });

      // Unsubscribe from the snapshot when the component unmounts
      return () => unsubscribe();
    }

    // Unsubscribe from the snapshot when the component unmounts
    return () => unsubscribe();
  }, []);

  console.log("posts =>", posts);

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
            onClick={openMenu}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Avatar
          src={Sword}
          style={{
            backgroundColor: "rgb(14, 52, 108)",
            verticalAlign: "middle",
          }}
          size={100}
        />
        <h2 id="username">{username}</h2>
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
          {posts.map((post) => (
            <div className="post-container">
              <div className="post" key={post.id}>
                <p id="user">{post.username}</p>
                <img
                  src={post.imageURL}
                  alt="postImage"
                  className="post-image"
                />
                <p className="post-description">{post.caption}</p>
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
            </div>
          ))}
        </div>
      </div>
      <Navbar setOpen={setOpen} open={open} />
    </>
  );
}

export default profile;
