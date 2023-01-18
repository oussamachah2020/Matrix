import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ControlPanel from "../../components/ControlPanel";
import "../../sass/themes/Home.scss";

import UploadImage from "../../components/UploadImage";
import Search from "../../components/Search";
import Post from "../../components/Post";
import { auth, db } from "../../../server/firebaseConnection";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  const user = auth.currentUser;

  const navigate = useNavigate();

  const [openPostCard, setOpenPostCard] = useState(false);
  const [openSearchCard, setOpenSearchCard] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (username == null) {
      navigate("/login");
    }
  }, [username]);

  useEffect(() => {
    db.collection("posts")
      .get()
      .then((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            postId: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, [username]);

  // console.log(posts);

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
        <h2>Matrix</h2>
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
