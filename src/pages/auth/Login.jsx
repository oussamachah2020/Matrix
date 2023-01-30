import { useState } from "react";
import "../../sass/themes/login.scss";
import "../../sass/layout/loginLayout.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../../server/firebaseConnection";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          let username = user?.displayName;
          navigate("/Home");
        });
      })
      .catch((err) => {
        toast(err);
      });
  };

  return (
    <div className="login">
      <h2 id="title">Login</h2>
      <form method="post" onSubmit={signIn}>
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
        <input type="submit" value="validate" />
        <Link to="/reset" style={{ position: "relative", top: "-10%" }}>
          Forget Password?
        </Link>
      </form>
      <p>
        Already have an account ! <Link to="/register">Sign Up</Link>
      </p>
      <p>---------------------------------------</p>
      <div className="google_auth">
        <button className="google_auth--button" onClick={signInWithGoogle}>
          Sign In with google
        </button>
      </div>
    </div>
  );
}

export default Login;
