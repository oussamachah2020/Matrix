import React, { useEffect, useState } from "react";
import "../../sass/themes/Chat.scss";
import { Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/arrow.svg";
import Spinner from "../../components/Spinner";
import { auth, db } from "../../../server/firebaseConnection";

function Chat() {
  const [chatPeople, setChatPeople] = useState([]);
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  //check if user is authenticated
  auth.onAuthStateChanged((user) => {
    setUsername(user?.displayName);
    setUser(user);
  });

  //fetch followers names
  useEffect(() => {
    setLoading(true);
    const getFollowers = async () => {
      if (user) {
        db.collection("followers")
          .where("username", "==", username)
          .onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
              setChatPeople(doc.data().followersNames);
            });
            setLoading(false);
          });
      }
    };

    getFollowers();
  }, [username]);

  useEffect(() => {
    setLoading(true);
    let images = [""];

    const getProfilePics = async () => {
      chatPeople.forEach((people) => {
        db.collection("profile_pic")
          .where("username", "==", people)
          .onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
              images.push(doc.data().imageURL);
              setPics(images);
            });
            setLoading(false);
          });
      });
    };

    getProfilePics();
  }, [chatPeople]);

  if (loading) {
    return <Spinner />;
  }

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
              chatPeople.map((people, index) => (
                <li key={index}>
                  <div className="chat-container">
                    <Avatar size={45} src={pics[index]} />
                    <li
                      onClick={() => {
                        navigate(`/Room?ChatWith=${people}`);
                      }}
                    >
                      {people}
                      <p>Sent You a Message</p>
                    </li>
                  </div>
                </li>
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
