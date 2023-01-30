import React, { useEffect, useState } from "react";
import "../../sass/themes/Chat.scss";

import { auth, db } from "../../../server/firebaseConnection";
import { Avatar } from "antd";

import { Link, useNavigate } from "react-router-dom";

import onlineCircle from "../../assets/userState.png";
import offlineCircle from "../../assets/offlineCircle.png";
import Arrow from "../../assets/arrow.svg";

function Chat() {
  const [chatPeople, setChatPeople] = useState([]);
  const [pics, setPics] = useState([]);
  const [roomIn, setRoomIn] = useState(false);
  const [userState, setUserState] = useState("offline");

  const currentUser = auth.currentUser?.displayName;
  const navigate = useNavigate();
  // console.log(user?.displayName);

  useEffect(() => {
    if (currentUser) {
      const getFollowers = async () => {
        db.collection("followers")
          .where("username", "==", currentUser)
          .onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
              setChatPeople(doc.data().followersNames);
            });
          });
      };

      getFollowers();
      // console.log(chatPeople);
    }
  }, [currentUser]);

  useEffect(() => {
    let images = [];
    if (chatPeople) {
      chatPeople.map((person) => {
        // console.log(person);
        db.collection("profile_pic")
          .where("username", "==", person)
          .onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
              images.push(doc.data().imageURL);
              setPics(images);
            });
          });
      });
    }
    // console.log(pics);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserState("online");
        console.log(user);
      } else {
        setUserState("offline");
      }
    });
  }, []);

  return (
    <div className="chat">
      <h1 id="chat_title">
        {" "}
        <Link to="/Home">
          <img src={Arrow} alt="Back Button" /> Chat
        </Link>
      </h1>
      <div className="people-container">
        <div className="people-container__users">
          <ul className="people-list">
            {chatPeople.length > 0 ? (
              chatPeople.map((people, index, id) => (
                <div className="chat-container">
                  <Avatar size={45} src={pics[index]} />
                  <img
                    src={userState == "offline" ? onlineCircle : offlineCircle}
                    alt="state"
                    id="statePoint"
                  />
                  <li
                    key={id}
                    onClick={() => {
                      navigate(`/Room?ChatWith=${people}`);
                    }}
                  >
                    {people}
                    <p>Sent You a Message</p>
                  </li>
                </div>
              ))
            ) : (
              <h1>Want to know people?</h1>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chat;
