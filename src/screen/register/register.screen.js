import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.screen.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [isName, setName] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isConfrim, setConfrim] = useState("");
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusName, setFocusName] = useState(false);
  const [isFocusPassword, setFocuspassword] = useState(false);
  const [isFocusConfirm, setFocusConfirm] = useState(false);

  const register = () => {
    if (isEmail.length === 0) {
      toast.error("Enter email address");
    } else if (isName.length === 0) {
      toast.error("Enter name");
    } else if (isPassword.length === 0) {
      toast.error("Enter password");
    } else if (isConfrim.length === 0) {
      toast.error("Enter confrim password");
    } else if (isPassword !== isConfrim) {
      toast.error("Confirm password must match to password");
    } else {
      const body = {
        name: isName,
        email: isEmail,
        password: isPassword,
      };
      axios
        .post("http://localhost:5001/api/v1/auth/register", body)
        .then((response) => {
          if (response.status === 201) {
            console.log(response);
            toast.success("Register Successfully");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response.data.msg);
        });
    }
  };
  return (
    <div className="register_container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
      <div className="input_field_wrapper">
        <div className="register_input_field_header">Name</div>
        <div
          className={
            isFocusName ? "focus input_container set_bg" : "input_container"
          }
        >
          <input
            type={"text"}
            className={isFocusName ? `set_bg input` : `input`}
            onChange={(e) => setName(e.target.value)}
            value={isName}
            name={"name"}
            onFocus={() => setFocusName(true)}
            onBlur={() => {
              setFocusName(false);
            }}
          />
        </div>
      </div>
      <div className="input_field_wrapper">
        <div className="register_input_field_header">Email</div>
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
            name={"emails"}
            onFocus={() => {
              setFocusEmail(true);
            }}
            onBlur={() => {
              setFocusEmail(false);
            }}
          />
        </div>
      </div>
      <div className="input_field_wrapper">
        <div className="register_input_field_header">Password</div>
        <div
          className={
            isFocusPassword ? "focus input_container set_bg" : "input_container"
          }
        >
          <input
            type={"password"}
            className={isFocusEmail ? `set_bg input` : `input`}
            onChange={(e) => setPassword(e.target.value)}
            value={isPassword}
            name={"password"}
            onFocus={() => {
              setFocuspassword(true);
            }}
            onBlur={() => {
              setFocuspassword(false);
            }}
          />
        </div>
      </div>
      <div className="input_field_wrapper">
        <div className="register_input_field_header">Confirm password</div>
        <div
          className={
            isFocusConfirm ? "focus input_container set_bg" : "input_container"
          }
        >
          <input
            type={"text"}
            className={isFocusConfirm ? `set_bg input` : `input`}
            onChange={(e) => setConfrim(e.target.value)}
            value={isConfrim}
            name={"emails"}
            onFocus={() => {
              setFocusConfirm(true);
            }}
            onBlur={() => {
              setFocusConfirm(false);
            }}
          />
        </div>
      </div>
      <div onClick={() => register()} className="register_button">
        <div className={"button_wrapper"}>
          <div className="button_text">Register</div>
        </div>
      </div>
      <div className="linking_content">
        Already have an account? <Link to={"/"}>Login</Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
