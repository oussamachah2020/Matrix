import React, { useEffect } from "react";
import "../../sass/themes/Room.scss";
import Arrow from "../../assets/arrow.svg";
import { Link } from "react-router-dom";
import Send from "../../assets/send.svg";
import { auth, db, database } from "../../../server/firebaseConnection";
import { useState } from "react";
import { message } from "antd";

function ChatRoom() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [Class, setClass] = useState("");
  const [currentUid, setCurrentUid] = useState("");

  let timestamp = Date.now();
  let classType;

  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUid(JSON.stringify(user.uid));
    } else {
      console.log("no user");
    }
  });

  const handleMessaging = (e) => {
    e.preventDefault();
    database
      .ref("Chat")
      .push({
        message: text,
        createdAt: timestamp,
        uid: currentUid,
      })
      .then(() => {
        message.success("message sent");
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let chat = [];
    database.ref("Chat").on("child_added", (snaphost) => {
      let data = snaphost.val();
      let childId = snaphost.key;
      chat.push(data);
      setMessages(chat, childId);
    });

    chat.forEach((c) => {
      if (c.uid === currentUid) {
        setClass("sent_msg");
      } else {
        setClass("recieved_msg");
      }
      console.log(currentUid);
    });
  }, []);

  return (
    <div className="room">
      <Link to="/Chat">
        <img src={Arrow} alt="Back Button" />
      </Link>
      <div className="chat-container">
        {messages.map((message, childId) => (
          <>
            {message.uid === currentUid ? (
              <div key={childId} className="sent_msg">
                <p>{message.message}</p>
                <p id="time">{message.createdAt}</p>
              </div>
            ) : (
              <div key={childId} className="recieved_msg">
                <p>{message.message}</p>
                <p id="time">{message.createdAt}</p>
              </div>
            )}
          </>
        ))}
      </div>
      <div className="chat-input">
        <form onSubmit={handleMessaging}>
          <input
            type="text"
            id="msg"
            placeholder="Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">
            <img src={Send} alt="send_Button" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
