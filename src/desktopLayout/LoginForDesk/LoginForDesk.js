import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForDesk.css";
import { FaHandPointDown, FaUserAlt, FaKey, FaSignInAlt } from "react-icons/fa";
import { UserAPI } from "../../apis/UserAPI";
import axios from "axios";
import { api } from "../../apis/configs/axiosConfigs";
import { AuthorAPI } from "../../apis/AuthorAPI";
import Modal from "react-bootstrap/Modal";
import RegisterModals from "../../component/Register/RegisterModals";
import AlertBtn from "../../component/Alert/AlertBtn";

const LoginForDesk = () => {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [StatusVal, setStatusVal] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusbtn, setStatusBtn] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [logo, setLogo] = useState();

  const handleLogin = () => {
    setStatusVal(true);
    setIsLoading(true);
    if (password === "" && user === "") {
      setStatusVal(false);
      setMessage("Username and Password are required");
      setIsLoading(false);
    } else if (user === "") {
      setStatusVal(false);
      setMessage("Username is required");
      setIsLoading(false);
    } else if (password === "") {
      setStatusVal(false);
      setMessage("Password is required");
      setIsLoading(false);
    }

    if (password !== "" && user !== "") {
      AuthorAPI.Login({
        userId: user,
        password: password,
      })
        .then((res) => {
          const token = res.token;
          if(res?.status === false){
            setStatusVal(false);
            setMessage(res.message);
            setIsLoading(false);  
          }
          localStorage.removeItem("UserName");
          localStorage.removeItem("UserPassword");
          axios.defaults.headers.common["Authorization"] = token;
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setStatusVal(res.status);
          setMessage("Invalid Username or password");
          const uId = res.userId;
          localStorage.setItem("UserId", uId);
          localStorage.setItem("userTypeInfo", res?.userTypeInfo);
          if (res.token !== "" && res.status !== false) {
          localStorage.setItem("token", token);
            nav("/home");

          }
          const pType = res.passwordtype;
          localStorage.setItem("Password-type", pType);
          if (pType === "old") {
            nav("/changepassword");
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const handleBackBtn = (e) => {
    nav("/home");
  };


  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      nav("/login");
    }

    UserAPI.Self_By_App_Url().then((res) => {
      setStatusBtn(res?.data?.selfAllowed);
      setLogo(res?.data?.logo);
    });

    if (localStorage.getItem("token") === null) {
      nav("/login");
    }
  }, []);


console.log("login")
  const popupClose = (vl) => {
    setStatusVal(vl);
  };

  const handleCloseModal = () => setShowModals(false);

  useEffect(() => {
    if (localStorage.getItem("UserName") !== null) {
      setShowModals(true);
    }
  }, []);

  const { host } = window.location;



  const handleLoginWithDemoAccount = ()=>{
    setStatusVal(true);
    setIsLoading1(true);
    AuthorAPI.LOGIN_WITH_DEMO_USER()
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        setMessage(res.message);
        setIsLoading1(false);
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserPassword");
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res?.data?.token}`;
        setStatusVal(res?.data.status);
        console.log(res?.data?.message)
        setMessage("Invalid Username or password");
        localStorage.setItem("UsertypeInfo", res?.data?.userTypeInfo);
        const uId = res.data?.username;
        localStorage.setItem("UserId", uId);
        if (res.data?.token !== "" && res?.data?.token !== undefined  && res?.data.status !== false) {
        localStorage.setItem("token", token);

          nav("/m/home");
        }
        const pType = res?.data?.passwordtype;
        localStorage.setItem("Password-type", pType);
        if (pType === "old") {
          nav("/m/setting/changepassword");
        }
        if (res?.data.status === false) {
          setStatusVal(false);
          setMessage(res?.data?.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading1(false);
      });
  }

  return (
    <div>
    
      <div className="deck-top-view">
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
                      <img src={logo} alt="" className="logo-login dia-logo" />
                    </div>
                    <div className="featured-box-login featured-box-secundary default">
                      <h4 className="text-center">
                        LOGIN <FaHandPointDown />{" "}
                        <i className="fas fa-hand-point-down"></i>
                      </h4>
                      {StatusVal === false ? <p className="error">{message}</p> : ""}
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
                          <i>
                            {" "}
                            <FaUserAlt />
                          </i>
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
                          <i>
                            <FaKey />
                          </i>
                          <small
                            className="text-danger"
                            style={{ display: "none" }}></small>
                        </div>
                        <div className="form-group text-center mb-0">
                          <button
                            type="submit"
                            className={`btn btn-submit btn-login ${
                              isLoading ? "fadeBtn" : ""
                            }`}
                            onClick={handleLogin}>
                            Login
                            {isLoading ? (
                              <i className="ml-2 fa fa-spinner fa-spin _spin"></i>
                            ) : (
                              <i>
                                <FaSignInAlt />
                              </i>
                            )}
                          </button>
                        </div>
                        <div className="form-group text-center mb-0 mt-2">
                          <button
                            type="submit"
                            className={`btn btn-submit btn-login ${
                              isLoading1 ? "fadeBtn" : ""
                            }`}
                            onClick={handleLoginWithDemoAccount}>
                            Login with Demo User
                            {isLoading1 ? (
                              <i className="ml-2 fa fa-spinner fa-spin _spin"></i>
                            ) : (
                              <i>
                                <FaSignInAlt />
                              </i>
                            )}
                          </button>
                        </div>
                        <div className="form-group text-center mt-2 mb-0">
                          <button
                            type="submit"
                            className={`btn btn-submit btn-login ${
                              isLoading ? "fadeBtn" : ""
                            }`}
                            onClick={handleBackBtn}>
                            <i className="ml-2 fa fa-sign-in rotateBtn p-0"></i>
                            Back
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
                            <Link to="/" className="mail-link">
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
      <Modal
        show={showModals}
        className={``}
        onHide={handleCloseModal}
        style={{
          marginTop: "12px",
          marginInline: "2%",
          width: "95%",
        }}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterModals />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginForDesk;
