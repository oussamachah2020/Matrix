import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../sass/components/NavBar.scss";
import Close from "../assets/close.svg";
import User from "../assets/user.svg";
import PersonalInfo from "../assets/personalInfo.svg";
import Management from "../assets/management.svg";
import Notifications from "../assets/notifications.svg";
import Logout from "../assets/logout.svg";
import Help from "../assets/help.svg";
import Terms from "../assets/terms.svg";
import Privacy from "../assets/privacy.svg";
import { auth } from "../../server/firebaseConnection";
import { toast } from "react-toastify";

function Navbar({ open, setOpen }) {
  const closeMenu = () => {
    setOpen(false);
    if (open == false) {
      document.querySelector(".navbar").classList.add("hide");
    }
  };

  const navigate = useNavigate();

  const SignOut = () => {
    auth
      .signOut()
      .then((user) => {
        if (!user) {
          navigate("/login");
        }
      })
      .catch((err) => toast(err));
  };

  return (
    <div className="navbar hide">
      <img src={Close} alt="closeButton" id="closeBtn" onClick={closeMenu} />
      <div className="account-informations">
        <p>Account Informations</p>
        <Link>
          <img src={User} alt="user" /> Public Profile
        </Link>
        <Link>
          <img src={PersonalInfo} alt="personal info" /> Personal Informations
        </Link>
        <Link>
          <img src={Management} alt="management" /> Account Management
        </Link>
        <Link>
          <img src={Notifications} alt="notifications" /> Notifications
        </Link>
      </div>
      <div className="actions">
        <p>Actions</p>
        <Link>
          <img src={User} alt="user" /> Add Account
        </Link>
        <Link>
          <img src={Logout} alt="logout" onClick={SignOut} /> Logout
        </Link>
      </div>
      <div className="support">
        <p>Support</p>
        <Link>
          <img src={Help} alt="help" /> Get Help
        </Link>
        <Link>
          <img src={Terms} alt="terms" /> Terms of Services
        </Link>
        <Link>
          <img src={Privacy} alt="privacy" /> Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
