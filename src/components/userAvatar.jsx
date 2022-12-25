import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const userAvatar = ({ user }) => {
  const [color, setColor] = useState(ColorList[0]);

  useEffect(() => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(
      index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]
    );
  }, [user]);

  return (
    <Avatar
      style={{
        backgroundColor: color,
        verticalAlign: "middle",
      }}
      size="large"
      gap={gap}
    >
    </Avatar>
  );
};
export default userAvatar;
