import React from "react";
import "../../sass/themes/Room.scss";
import Arrow from "../../assets/arrow.svg";
import { Link } from "react-router-dom";
import Send from "../../assets/send.svg";

function ChatRoom() {
  return (
    <div className="room">
      <Link to="/Chat">
        <img src={Arrow} alt="Back Button" />
      </Link>
      <div className="chat-container">
        <div className="chat-container__reciever">
          <div className="recieved_msg">
            <p>Hello</p>
            <p id="time">today, 10:30pm</p>
          </div>
        </div>
        <div className="chat-container__consignee">
          <div className="sent_msg">
            <p>Hey There</p>
            <p id="time">today, 10:30pm</p>
          </div>
        </div>
      </div>
      <div className="chat-input">
        <form>
          <input type="text" id="msg" placeholder="Message..."/>
          <button type="submit">
            <img src={Send} alt="send_Button" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
