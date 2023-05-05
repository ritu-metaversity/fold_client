import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertBtn from "../Alert/AlertBtn";
import { AuthorAPI } from "../../apis/AuthorAPI";
import { api } from "../../apis/configs/axiosConfigs";
import { UserAPI } from "../../apis/UserAPI";
import Modal from "react-bootstrap/Modal";
import RegisterModals from "../Register/RegisterModals";

function Login({ Errmessage, Statusmessage }) {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [StatusVal, setStatusVal] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusbtn, setStatusBtn] = useState(false);
  const [showModals, setShowModals] = useState(false);

  const handleLogin = () => {
    // history.push('/home')
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



  return (
    <>
      <div className="wrapper">
        {Statusmessage === true ? (
          <div className="alertBtn">
            <AlertBtn
              color="success"
              popupClose={popupClose}
              val={Errmessage}
            />
          </div>
        ) : (
          ""
        )}
        {StatusVal === false && Statusmessage === false  ? (
          <div className="alertBtn">
            <AlertBtn color="danger" popupClose={popupClose} val={message} />
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
                  {isLoading ? (
                    <i className="ml-2 fa fa-spinner fa-spin"></i>
                  ) : (
                    <i className="ml-2 fa fa-sign-in"></i>
                  )}
                </button>
              </div>
              <div className="form-group mb-0" style={{ marginTop: "12px" }}>
                <button
                  
                  onClick={handleBackBtn}
                  className="btn btn-primary btn-block"
                  >
                    <i className="ml-2 fa fa-sign-in" style={{rotate:"180deg"}}></i>
                  Back
                  
                </button>
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
                  <Link to="/login" className="mail-link">
                     247diamondexch.com
                  </Link>
                </p>
              </div>
            </form>
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
    </>
  );
}

export default Login;
