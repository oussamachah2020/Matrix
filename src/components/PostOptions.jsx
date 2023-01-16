import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { useState } from "react";
import { db } from "../../server/firebaseConnection";
const items = [];

//TODO Update the post caption and delete the post based on the username.
//TODO  fix posts username 

const PostOptions = ({ postId }) => {
  const [newCaption, setNewCaption] = useState("");
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

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "1",
            label: <a>update post</a>,
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
  );
};
export default PostOptions;
