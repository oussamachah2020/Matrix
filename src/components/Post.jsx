import Like from "../assets/like.svg";
import Comment from "../assets/comment.svg";
import Share from "../assets/share.svg";

function Post() {
  return (
    <div className="post">
      <img src="" alt="postImage" className="post-image" />
      <p className="post-description"></p>
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
  );
}

export default Post;
