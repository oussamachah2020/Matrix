import { useEffect, useState } from "react";
import Like from "../assets/like.svg";
import Comment from "../assets/comment.svg";
import Share from "../assets/share.svg";
import { db, auth } from "../../server/firebaseConnection";
import firebase from "firebase/compat/app";
import { message } from "antd";
import Send from "../assets/send.png";
import CommentOptions from "./CommentOptions.jsx";
import PostComments from "./PostComments";
import PostOptions from "./PostOptions";

function Post({ username, imageURL, caption, postId }) {
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [liked, setLiked] = useState(false);
  const [reactionData, setReactionData] = useState([]);
  const [reactionId, setReactionId] = useState("");

  const loggedInUser = auth.currentUser;

  // const showModal = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   db.collection("posts").doc(postId).collection("reaction").add({
  //     counter: counter,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     username: username,
  //   });
  // }, []);

  const postComment = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        message.success("comment posted!");
        setComment("");
        setShowInput(false);
      })
      .catch((err) => {
        message.error(err);
      });
    console.log(comment);
  };

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setPostComments(
            snapshot.docs.map((doc) => ({
              commentId: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = () => {
        db.collection("posts")
          .doc(postId)
          .collection("reaction")
          .onSnapshot((snapshot) => {
            setReactionData(
              snapshot.docs.map((doc) => ({
                reactionId: doc.id,
                reactionCount: doc.data(),
              }))
            );
          });
      };
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const countLikes = () => {
    // if (liked == false) {
    //   setCounter((counter) => counter + 1);
    //   db.collection("posts")
    //     .doc(postId)
    //     .collection("reaction")
    //     .doc(`${reactionId}`)
    //     .update({
    //       counter: counter,
    //     });
    //   setLiked(true);
    // } else {
    //   message.info("you can like a post only once");
    // }
  };

  return (
    <>
      <div className="posts-container">
        <div className="post">
          <div className="post_header">
            <p id="user">{username}</p>
            <PostOptions postId={postId} postUser={username}/>
          </div>
          <img src={imageURL} alt="postImage" className="post-image" />
          <p className="post-description">{caption}</p>
          <hr style={{ width: "90%" }} />
          {postComments.map(({ commentId, comment }) => (
            <>
              <PostComments
                key={commentId}
                commentId={commentId}
                username={comment.username}
                comment={comment.text}
                setIsModalOpen={setIsModalOpen}
              />
              <CommentOptions
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleCancel={handleCancel}
                commentId={commentId}
                postId={postId}
                comment={comment.text}
              />
            </>
          ))}
          {showInput ? (
            <div className="commentInput-container">
              <input
                type="text"
                id="commentInput"
                placeholder="Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <img src={Send} alt="send button" onClick={postComment} />
            </div>
          ) : null}
          <div className="buttons-container">
            <button onClick={countLikes}>
              <img src={Like} alt="likeButton" />
              Like
              {reactionData.map((reactionId, reaction) => (
                <span
                  id="likeCounter"
                  key={reactionId}
                  onChange={() => setReactionId(reactionId)}
                >
                  {reaction}
                </span>
              ))}
            </button>
            <button onClick={() => setShowInput(!showInput)}>
              <img src={Comment} alt="commentButton" />
              Comment
            </button>
            <button>
              <img src={Share} alt="shareButton" />
              Share
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Post;
