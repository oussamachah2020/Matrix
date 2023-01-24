import React, { useEffect, useState } from "react";
import "../sass/themes/FollowersContainer.scss";
import Spinner from "./Spinner";
import Close from "../assets/close.svg";

function FollowersContainer({ followers, setShowFollowersCard }) {
  return (
    <div className="followers">
      <img src={Close} alt="arrow" onClick={() => setShowFollowersCard(false)} />
      {followers ? (
        followers.map((follower) => (
          <ul>
            <li>{follower}</li>
          </ul>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default FollowersContainer;
