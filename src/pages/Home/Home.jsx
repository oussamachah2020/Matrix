import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ControlPanel from "../../components/ControlPanel";
import "../../sass/themes/Home.scss";
import Wallpaper from "../../assets/view.png";
import UploadImage from "../../components/UploadImage";
import Search from "../../components/Search";
import Post from "../../components/Post";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");

  const navigate = useNavigate();

  const [openPostCard, setOpenPostCard] = useState(false);
  const [openSearchCard, setOpenSearchCard] = useState(false);

  useEffect(() => {
    if (username == null) {
      navigate("/login");
    }
  }, [username]);

  return (
    <>
      {openPostCard ? (
        <div className="uploadCard">
          <UploadImage setOpenPostCard={setOpenPostCard} username={username} />
        </div>
      ) : null}

      {openSearchCard ? (
        <div className="searchCard">
          <Search setOpenSearchCard={setOpenSearchCard} />
        </div>
      ) : null}

      <div className="home">
        <h2>Matrix</h2>
        <ControlPanel
          username={username}
          setOpenPostCard={setOpenPostCard}
          setOpenSearchCard={setOpenSearchCard}
        />
        {username ? <Post username={username} /> : navigate("/login")}
      </div>
    </>
  );
}

export default Home;
