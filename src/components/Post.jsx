import { useEffect, useState } from "react";
import Like from "../assets/like.svg";
import Comment from "../assets/comment.svg";
import Share from "../assets/share.svg";
import { auth, db } from "../../server/firebaseConnection";

function Post({ username }) {
  const [posts, setPosts] = useState([]);
  // const user = auth.currentUser;

  useEffect(() => {
    db.collection("posts")
      .get()
      .then((snapshot) => {
        // Iterate over the documents in the collection
        const data = [];
        snapshot.forEach((doc) => {
          // Get the data for each document
          data.push(doc.data());
        });
        setPosts(data);
      });
  }, [username]);

  console.log(posts);
  return (
    <>
      {posts.map((post) => (
        <div className="posts-container">
          <div className="post">
            <p id="user">{post.username}</p>
            <img src={post.imageURL} alt="postImage" className="post-image" />
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
    </>
  );
}

export default Post;
