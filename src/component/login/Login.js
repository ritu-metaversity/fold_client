import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertBtn from "../Alert/AlertBtn";
import { AuthorAPI } from "../../apis/AuthorAPI";
import { api } from "../../apis/configs/axiosConfigs";

function Login() {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [StatusVal, setStatusVal] = useState(true);
  const [message, setMessage]= useState("")
 
  const handleLogin = () => {

    // history.push('/home')

    if(password === "" && user ===""){
      setStatusVal(false)
      setMessage("password: length must be between 4 and 30");
    }
    if (password !== "" && user !== ""){
      AuthorAPI.Login({
        userId: user,
        password: password,
      }).then((res) => {
        const token = res.token;
        axios.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token", token);
api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setStatusVal(res.status);
        setMessage("Invalid Username or password")
        const uId = res.userId;
        localStorage.setItem("UserId", uId);
        if (res.token !== "" && user === res.userId) {
          nav("/home");
        }
        const pType = res.passwordtype;
        localStorage.setItem("Password-type", pType);
        if (pType === "old") {
          nav("/m/setting/changepassword");
        }
      });
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("token") !== null){
      nav('/home');
    }
  },[])

  
  
  const popupClose = (vl) => {
    setStatusVal(vl);
  };

  return (
    <>
      <div className="wrapper">
        {StatusVal === false ? (
          <div className="alertBtn">
            <AlertBtn
              color="danger"
              popupClose={popupClose}
              val={message}
            />
          </div>
        ) : (
          ""
        )}

        <div className="login-wrapper">
          <div className="text-center logo-login mb-3">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/mobile/logo.png"
              alt=""
            />
          </div>
          <div className="login-form">
            <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group mb-4">
                <input
                  name="User Name"
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  aria-required="true"
                  aria-invalid="false"
                  onChange={(e) => setUser(e.target.value)}
                />

                <span
                  className="text-danger error-msg"
                  style={{ display: "none" }}>
                  {" "}
                </span>
              </div>
              <div className="form-group mb-4">
                <input
                  name="Password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  aria-required="true"
                  aria-invalid="false"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="text-danger error-msg"
                  style={{ display: "none" }}></span>
              </div>
              <div className="form-group mb-0">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}>
                  Login
                  <i className="ml-2 fa fa-sign-in"></i>
                </button>
              </div>
              <div className="form-group mb-0" style={{ marginTop: "12px" }}>
                <Link
                  type="submit"
                  className="btn btn-primary btn-block"
                  to="/Register">
                  Register
                  <i className="ml-2 fa fa-sign-in"></i>
                </Link>
              </div>
              <small className="recaptchaTerms">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy">Privacy Policy</a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                apply.
              </small>
              <div className="form-group mt-1">
                <p className="mt-1 text-center">
                  <a href="mailto:info@diamondexch.com" className="mail-link">
                    info@diamondexch.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
