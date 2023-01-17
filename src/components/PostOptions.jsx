import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { useState } from "react";
import { db, auth } from "../../server/firebaseConnection";
import UpdateModal from "./UpdateModal";

//TODO Update the post caption and delete the post based on the username.
//TODO  fix posts username

const PostOptions = ({ postId, postUser }) => {
  const currentUser = auth.currentUser;

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const deletePost = () => {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        message.success("post deleted");
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const updatePost = () => {
    db.collection("posts")
      .doc(postId)
      .update({
        caption: newCaption,
      })
      .then(() => {
        message.success("post deleted");
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const showUpadateModal = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: <a onClick={showUpadateModal}>update post</a>,
            },
            {
              key: "2",
              danger: true,
              label: <a onClick={deletePost}>delete post</a>,
            },
          ],
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{ cursor: "pointer", fontSize: "25px" }}>...</Space>
        </a>
      </Dropdown>
      <UpdateModal setUpdateModalOpen={setUpdateModalOpen} updateModalOpen={updateModalOpen} postId={postId} />
    </>
  );
};
export default PostOptions;
