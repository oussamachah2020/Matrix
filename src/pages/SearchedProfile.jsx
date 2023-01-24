import React, { useState, useEffect } from "react";
import { Avatar, message } from "antd";
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
import { arrayUnion } from "firebase/firestore";
import FollowersContainer from "../components/FollowersContainer";
import Spinner from "../components/Spinner";

function SearchedProfile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("userName");

  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const user = auth.currentUser;

  const [userPosts, setUserPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followId, setFollowId] = useState("");
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [showFollowersCard, setShowFollowersCard] = useState(false);

  useEffect(() => {
    if (username) {
      const unsubscribe = db
        .collection("posts")
        .where("username", "==", username)
        .onSnapshot((snapshot) => {
          const documents = snapshot.docs;
          const posts = [];
          documents.forEach((doc) => {
            posts.push({ data: doc.data(), id: doc.id });
            setUserPosts(posts);
          });
        });
      return () => unsubscribe();
    }
  }, []);

  console.log(userPosts);

  useEffect(() => {
    const getProfilePic = async () => {
      db.collection("profile_pic")
        .where("username", "==", username)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setProfilePic(doc.data().imageURL);
          });
        });
    };

    getProfilePic();
  }, []);

  useEffect(() => {
    if (username) {
      const getFollowers = () => {
        db.collection("followers")
          .where("username", "==", username)
          .onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc) {
                setFollowers(doc.data());
                setFollowId(doc.id);
              }
            });
          });
      };
      getFollowers();
      console.log(followers);
    }
  }, [username]);

  const addFollower = () => {
    if (followId) {
      db.collection("followers")
        .doc(followId)
        .update({
          followersNames: arrayUnion(user?.displayName),
        })
        .then(message.success(`now you are following ${username}`))
        .catch((err) => console.log(err));
    } else {
      db.collection("followers")
        .add({
          followersNames: [user?.displayName],
          username: username,
        })
        .then(message.success(`now you are following ${username}`))
        .catch((err) => console.log(err));
    }
  };

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
            style={{
              backgroundColor: "rgb(14, 52, 108)",
              verticalAlign: "middle",
            }}
            size={100}
            src={profilePic}
          ></Avatar>
        </div>
        <h2 id="username">{username}</h2>
        <div className="counter-container">
          <p onClick={() => setShowFollowersCard(true)}>
            <span id="counter-container--followers">
              {followers.followersNames ? followers.followersNames.length : 0}
            </span>{" "}
            Followers
          </p>
          <span>.</span>
          <p>
            <span id="counter-container--following">0</span> Following
          </p>
        </div>
        <button className="follow_button" onClick={addFollower}>
          Follow
        </button>
        <div className="user-posts">
          <p style={{ margin: "20px 0" }}>{username}'s Posts</p>
          {userPosts.map((post) => (
            <div className="post-container">
              <div key={post.id} className="post">
                <p id="user">{post.data.username}</p>
                <img
                  src={post.data.imageURL}
                  alt="postImage"
                  className="post-image"
                />
                <p className="post-description">{post.data.caption}</p>
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
      {showFollowersCard ? (
        <div
          className="followersCard"
        >
          <FollowersContainer followers={followers.followersNames} setShowFollowersCard={setShowFollowersCard} />
        </div>
      ) : null}
    </>
  );
}

export default SearchedProfile;
