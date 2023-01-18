import { useState } from "react";
import "../../sass/themes/register.scss";
import "../../sass/layout/registerLayout.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../server/firebaseConnection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = formData;

    if (password === password2) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: username,
          });

          db.collection("users").add({
            username: username,
          });
        })
        .catch((err) => {
          toast(err);
        });
      toast("Account created successfully");
      navigate(`/Home?username=${username}`);
    } else {
      toast("passwords not matching");
    }
  };

  return (
    <div className="regitser">
      <ToastContainer />
      <h2 id="title">Register</h2>
      <form method="post" onSubmit={signUp}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              username: e.target.value,
            }))
          }
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              email: e.target.value,
            }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              password: e.target.value,
            }))
          }
        />
        <input
          type="password"
          placeholder="Confirme Password"
          name="confirmation"
          value={formData.password2}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              password2: e.target.value,
            }))
          }
        />
        <input type="submit" value="validate" />
      </form>
      <p>
        Already have an account ! <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
