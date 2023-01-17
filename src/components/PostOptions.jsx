import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Button, Popconfirm } from "antd";
import { useState } from "react";
import { db, auth } from "../../server/firebaseConnection";
import UpdateModal from "./UpdateModal";
import { QuestionCircleOutlined } from "@ant-design/icons";


const PostOptions = ({ postId, postUser }) => {
  const currentUser = auth.currentUser;

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

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

  const showUpadateModal = () => {
    setUpdateModalOpen(true);
  };

  const showConfirmationAlert = () => {
    setOpenAlert(true);
  };


  return (
    <>
      {currentUser?.displayName == postUser ? (
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
                label: (
                  <Popconfirm
                    title="Delete Post"
                    description="Are you sure to delete this post?"
                    onConfirm={deletePost}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <a onClick={showConfirmationAlert}>delete post</a>
                  </Popconfirm>
                ),
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ cursor: "pointer", fontSize: "25px" }}>...</Space>
          </a>
        </Dropdown>
      ) : (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: <a>Report Post</a>,
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ cursor: "pointer", fontSize: "25px" }}>...</Space>
          </a>
        </Dropdown>
      )}
      <UpdateModal
        setUpdateModalOpen={setUpdateModalOpen}
        updateModalOpen={updateModalOpen}
        postId={postId}
      />
    </>
  );
};
export default PostOptions;
