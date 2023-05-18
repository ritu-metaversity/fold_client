import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginForDesk.css'
import { FaHandPointDown, FaUserAlt, FaKey, FaSignInAlt } from 'react-icons/fa'
import { UserAPI } from "../../apis/UserAPI";
import axios from "axios";
import { api } from "../../apis/configs/axiosConfigs";
import { AuthorAPI } from "../../apis/AuthorAPI";


const LoginForDesk = () => {
    const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [StatusVal, setStatusVal] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusbtn, setStatusBtn] = useState(false);
  const [showModals, setShowModals] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    if (password === "" && user === "") {
      setStatusVal(false);
      setMessage("password: length must be between 4 and 30");
      setIsLoading(false);
    } else {
      setStatusVal(true);
    }
    if (password !== "" && user !== "") {

      AuthorAPI.Login({
        userId: user,
        password: password,
      })
        .then((res) => {
          const token = res.token;
          setMessage(res.message)
          setIsLoading(false);
          localStorage.removeItem("UserName");
          localStorage.removeItem("UserPassword");
          axios.defaults.headers.common["Authorization"] = token;
          localStorage.setItem("token", token);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setStatusVal(res.status);
          setMessage("Invalid Username or password");
          const uId = res.userId;
          localStorage.setItem("UserId", uId);
          if (res.token !== "" && res.status !== false) {
            nav("/home");
          }
          const pType = res.passwordtype;
          localStorage.setItem("Password-type", pType);
          if (pType === "old") {
            nav("/m/setting/changepassword");
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const handleBackBtn = (e)=>{
    // e.preventDefault();
    nav('/');
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      nav("/home");
    }
    UserAPI.Self_By_App_Url().then((res) => {
      setStatusBtn(res.data.selfAllowed);
    });

    if (localStorage.getItem("token") === null) {
      nav("/login");
    }
  }, [nav]);

  const popupClose = (vl) => {
    setStatusVal(vl);
  };

  const handleCloseModal = () => setShowModals(false);

  useEffect(() => {
    if (localStorage.getItem("UserName") !== null) {
      setShowModals(true);
    }
  }, []);


  const {host} = window.location


  return (
    <div><div className="deck-top-view">
    <div id="load" style={{ visibility: "hidden" }}>
      <div id="load-inner">
        <img
          src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/front/logo.png"
          alt=""
          className="logo-login"
        />
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    </div>
    <div className="login">
      <div className="wrapper">
        <div className="container-fluid">
          <div className=" row">
            <div className="col-md-12">
              <div className="loginInner1">
                <div className="log-logo m-b-20 text-center">
                  <img
                    src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/front/logo.png"
                    alt=""
                    className="logo-login dia-logo"
                  />
                </div>
                <div className="featured-box-login featured-box-secundary default">
                  <h4 className="text-center">
                    LOGIN <FaHandPointDown/> <i className="fas fa-hand-point-down"></i>
                  </h4>
                  {
                    StatusVal === false ?(
                        <p className="error">
                    {message}
                  </p>
                    ):""
                  }
                  
                  <form
                    autoComplete="off"
                    onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group m-b-20">
                      <input
                        name="User Name"
                        placeholder="User Name"
                        type="text"
                        className="form-control form-cont"
                        aria-required="true"
                        aria-invalid="false"
                        onChange={(e) => setUser(e.target.value)}
                      />{" "}
                      <i>  <FaUserAlt /></i>
                    
                      <small
                        className="text-danger"
                        style={{ display: "none" }}></small>
                    </div>
                    <div className="form-group m-b-20">
                      <input
                        name="Password"
                        placeholder="Password"
                        type="password"
                        className="form-control form-cont"
                        aria-required="true"
                        aria-invalid="false"
                        onChange={(e) => setPassword(e.target.value)}
                      />{" "}
                      <i><FaKey/></i>
                      <small
                        className="text-danger"
                        style={{ display: "none" }}></small>
                    </div>
                    <div className="form-group text-center mb-0">
                      <button
                        type="submit"
                        className="btn btn-submit btn-login"
                        onClick={handleLogin}>
                        Login
                        <i><FaSignInAlt/></i>
                      </button>
                    </div>
                    <small className="recaptchaTerms">
                      This site is protected by reCAPTCHA and the Google
                      <Link to="https://policies.google.com/privacy">
                        Privacy Policy
                      </Link>
                      and
                      <Link to="https://policies.google.com/terms">
                        Terms of Service
                      </Link>
                      apply.
                    </small>
                    <div className="mt-2 text-center download-apk">
                      <p className="mt-1">
                        <Link
                          to="/"
                          className="mail-link">
                            {host}
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default LoginForDesk