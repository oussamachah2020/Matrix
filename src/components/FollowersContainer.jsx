import React, { useEffect, useState } from "react";
import "../sass/themes/FollowersContainer.scss";
import Spinner from "./Spinner";
import Close from "../assets/close.svg";
import { db } from "../../server/firebaseConnection";
import { Avatar } from "antd";

function FollowersContainer({ followers, setShowFollowersCard }) {
  const [usersPics, setUsersPics] = useState([]);
  useEffect(() => {
    const images = [];
    if (followers) {
      followers.map((follower) => {
        db.collection("profile_pic")
          .where("username", "==", follower)
          .onSnapshot((snaphot) => {
            snaphot.docs.forEach((doc) => {
              images.push(doc.data().imageURL);
              setUsersPics(images);
            });
          });
      });
    } else {
      setUsersPics(["No Follower"]);
    }

    // console.log(usersPics[0], followers[0]);
  }, [followers]);

  return (
    <div className="followers">
      <img
        src={Close}
        alt="arrow"
        onClick={() => setShowFollowersCard(false)}
      />
      <ul className="followers-list">
        {followers ? (
          followers.map((follower, index) => (
            <li className="followers-lits--names">
              {" "}
              <Avatar
                className="avatar"
                src={usersPics[index]}
                alt="profile"
              />{" "}
              {follower}
            </li>
          ))
        ) : (
          <li>No Followers</li>
        )}
      </ul>
    </div>
  );
}

export default FollowersContainer;
