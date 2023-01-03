import React from "react";

function PostComments({ username, comment, showModal }) {
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
