import React from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/themes/Intro.scss";

function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro_page">
      <h1 id="intro_title">Matrix</h1>
      <h2 id="intro_text">Welcome to the Matrix</h2>
      <p id="intro_description">Here you can express yourself with all freedom</p>
      <button id="intro_button" onClick={() => navigate("/register")}>Start Rolling</button>
    </div>
  );
}

export default Intro;
