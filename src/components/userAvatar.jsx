import React, { useState, useEffect } from "react";
import { Avatar } from "antd";

const userAvatar = ({ user }) => {
  return (
    <Avatar
      style={{
        backgroundColor: color,
        verticalAlign: "middle",
      }}
      size="large"
      gap={gap}
    ></Avatar>
  );
};
export default userAvatar;
