import React from "react";
import { Link } from "react-router-dom";
import "../sass/themes/404.scss";
import Robot from "../assets/404_robot.png";
import Error404 from "../assets/404_icon.png";

function NotFound() {
  return (
    <div className="container">
      <img src={Robot} alt="404" width={250} />
      <p>Sorry, content not found!</p>
      <Link to={"/Home"}>return Home</Link>
    </div>
  );
}

export default NotFound;
