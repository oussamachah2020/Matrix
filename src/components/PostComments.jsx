import React from "react";
import { auth } from "../../server/firebaseConnection";

function PostComments({ username, comment, setIsModalOpen }) {
  const user = auth.currentUser

  const showModal = () => {
    if(user?.displayName == username) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <div className="comment-section" onClick={showModal}>
        <h5 id="username">{username}:</h5>
        <p>{comment}</p>
      </div>
      <p>----------------------------</p>
    </>
  );
}

export default PostComments;
