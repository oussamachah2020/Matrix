import React from "react";
import "../../sass/themes/login.scss";
import "../../sass/layout/loginLayout.scss";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <h2 id="title">Login</h2>
      <form method="post">
        <input type="email" placeholder="E-mail" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <input type="submit" value="validate" />
      </form>
      <p>
        Already have an account ! <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
