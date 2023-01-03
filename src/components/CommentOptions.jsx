import { Modal, Button, Space, message, Input, Form } from "antd";
import { db } from "../../server/firebaseConnection";
import { useState } from "react";

const commentOptions = ({
  isModalOpen,
  handleCancel,
  commentId,
  postId,
  comment,
}) => {
  const [commentModal, setCommentModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  const openCommentModal = () => {
    setCommentModal(true);
  };

  const deleteComment = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .delete()
      .then(() => {
        message.success("Comment deleted");
        isModalOpen = !isModalOpen;
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const EditComment = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .update({
        text: newComment,
      })
      .then(() => {
        message.success("Comment updated");
        commentModal = !commentModal;
        isModalOpen = !isModalOpen;
      })
      .catch((err) => {
        message.error(err);
      });
  };

  return (
    <>
      <Modal
        title="Commet Options"
        open={isModalOpen}
        onCa
        wrapncel={handleCancel}
      >
        <Space className="site-button-ghost-wrapper" wrap>
          <Button
            type="text"
            style={{ background: "#4CBB17", color: "white" }}
            onClick={openCommentModal}
          >
            Edit Comment
          </Button>
          <Button danger ghost onClick={deleteComment}>
            Delete Comment
          </Button>
        </Space>
      </Modal>
      {commentModal ? (
        <Modal title="Edit Comment" open={isModalOpen} onCancel={handleCancel}>
          <Space className="site-button-ghost-wrapper" wrap>
            <Input
              defaultValue={comment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="text"
              style={{ background: "#4CBB17", color: "white" }}
              onClick={EditComment}
            >
              Edit
            </Button>
          </Space>
        </Modal>
      ) : null}
    </>
  );
};
export default commentOptions;
