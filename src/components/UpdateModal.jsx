import {useState} from "react";
import { Modal, Button, Space, Input, message } from "antd";
import { db } from "../../server/firebaseConnection";

function UpdateModal({ setUpdateModalOpen, updateModalOpen, postId, postUser, postCaption }) {
  const [newCaption, setNewCaption] = useState("");

  const updatePostCaption = () => {
    db.collection("posts")
      .doc(postId)
      .update({
        caption: newCaption,
      })
      .then(() => {
        message.success("caption updated successfully");
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handleCancel = () => {
    setUpdateModalOpen(false)
  }

  return (
    <>
      <Modal title="Edit Post caption" open={updateModalOpen} onCancel={handleCancel}>
        <Space className="site-button-ghost-wrapper" wrap>
          <Input
            defaultValue=""
            onChange={(e) => setNewCaption(e.target.value)}
          />
          <Button
            type="text"
            style={{ background: "#4CBB17", color: "white" }}
            onClick={updatePostCaption}
          >
            Edit
          </Button>
        </Space>
      </Modal>
    </>
  );
}

export default UpdateModal;
