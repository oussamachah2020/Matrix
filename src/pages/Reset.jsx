import { Alert, Button, Space } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../server/firebaseConnection";
import "../sass/themes/Reset.scss";

function Reset() {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    auth.sendPasswordResetEmail(email).then(() => {
      setShowAlert(true);
    });
  };

  return (
    <div className="reset">
      <h2>Enter your E-mail</h2>
      <form onSubmit={resetPassword}>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" value="Send Reset Email" />
      </form>
      {showAlert ? (
        <Alert
          message="Passwod Reset"
          description={`The reset password email has been sent to ${email}`}
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" type="primary">
                <Link to="/login" style={{ color: "black" }}>
                  Return to login
                </Link>
              </Button>
            </Space>
          }
          closable
        />
      ) : null}
    </div>
  );
}

export default Reset;
