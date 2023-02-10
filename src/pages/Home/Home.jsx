import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ControlPanel from "../../components/ControlPanel";
import "../../sass/themes/Home.scss";

import UploadImage from "../../components/UploadImage";
import Search from "../../components/Search";
import Post from "../../components/Post";
import { auth, db } from "../../../server/firebaseConnection";
import { Avatar } from "antd";
import Spinner from "../../components/Spinner";

function Home() {
  const [username, setUsername] = useState("");
  const [openPostCard, setOpenPostCard] = useState(false);
  const [openSearchCard, setOpenSearchCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const profileImage = localStorage.getItem("profileImage");
  const navigate = useNavigate();

  console.log(profileImage);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setUsername(user?.displayName);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    db.collection("posts")
      .get()
      .then((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            postId: doc.id,
            post: doc.data(),
          }))
        );

        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {openPostCard ? (
        <div className="uploadCard">
          <UploadImage setOpenPostCard={setOpenPostCard} username={username} />
        </div>
      ) : null}

      {openSearchCard ? (
        <div className="searchCard">
          <Search setOpenSearchCard={setOpenSearchCard} />
        </div>
      ) : null}

      <div className="home">
        <div className="home-header">
          <h2>Matrix</h2>
          <nav>
            <ul>
              <li
                onClick={() => {
                  navigate("/Home");
                }}
              >
                Home
              </li>
              <li onClick={() => setOpenSearchCard(true)}>Search</li>
              <li onClick={() => setOpenPostCard(true)}>Post</li>
              <li
                onClick={() => {
                  navigate("/Chat");
                }}
              >
                Chat
              </li>
              <li
                onClick={() => {
                  navigate(`/Profile?username=${username}`);
                }}
              >
                <Avatar src={profileImage} />
              </li>
            </ul>
          </nav>
        </div>
        <ControlPanel
          username={user?.displayName}
          setOpenPostCard={setOpenPostCard}
          setOpenSearchCard={setOpenSearchCard}
        />
        {posts.map(({ postId, post }) => (
          <Post
            key={postId}
            postId={postId}
            imageURL={post.imageURL}
            caption={post.caption}
            username={post.username}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
