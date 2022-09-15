import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.screen.css";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginScreen = () => {
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusPassword, setFocuspassword] = useState(false);
  const login = () => {
    if (isEmail.length === 0) {
      toast.error("Enter email");
    } else if (isPassword.length === 0) {
      toast.error("Enter password");
    } else {
      const body = {
        email: isEmail,
        password: isPassword,
      };
      axios
        .post("http://localhost:5001/api/v1/auth/login", body)
        .then((response) => {
          if (response.status === 200) {
            toast.success("login successfully");
            window.location.pathname = "/home";
          }
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    }
  };
  return (
    <div className="login_container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <div className="input_field_wrapper">
        <div className="register_input_field_header">Name</div>
        <div
          className={
            isFocusEmail ? "focus input_container set_bg" : "input_container"
          }
        >
          <input
            type={"text"}
            className={isFocusEmail ? `set_bg input` : `input`}
            onChange={(e) => setEmail(e.target.value)}
            value={isEmail}
            name={"name"}
            onFocus={() => setFocusEmail(true)}
            onBlur={() => {
              setFocusEmail(false);
            }}
          />
        </div>
      </div>
      <div className="input_field_wrapper">
        <div className="register_input_field_header">Email</div>
        <div
          className={
            isFocusPassword ? "focus input_container set_bg" : "input_container"
          }
        >
          <input
            type={"text"}
            className={isFocusPassword ? `set_bg input` : `input`}
            onChange={(e) => setPassword(e.target.value)}
            value={isPassword}
            name={"emails"}
            onFocus={() => {
              setFocuspassword(true);
            }}
            onBlur={() => {
              setFocuspassword(false);
            }}
          />
        </div>
      </div>
      <div onClick={() => login()} className="register_button">
        <div className={"button_wrapper"}>
          <div className="button_text">Login</div>
        </div>
      </div>
      <div className="linking_content">
        Dont't have an account? <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
