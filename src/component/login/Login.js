import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertBtn from "../Alert/AlertBtn";
import { AuthorAPI } from "../../apis/AuthorAPI";
import { api } from "../../apis/configs/axiosConfigs";
import { UserAPI } from "../../apis/UserAPI";
import Modal from "react-bootstrap/Modal";
import RegisterModals from "../Register/RegisterModals";
import { CasinoApi } from "../../apis/CasinoApi";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

function Login({ Errmessage, Statusmessage }) {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [StatusVal, setStatusVal] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [isDemoIdLoginAllowed, setIsDemoIdLoginAllowed] = useState();
  const [navLogo, setNavLogo] = useState();

  const { host } = window.location;

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
          if (res?.status === false) {
            toast(res.message, {
              icon: <AiOutlineClose />,
              style: {
                borderRadius: "10px",
                background: "#f8d7da",
                color: "#58151c",
              },
            });
            setIsLoading(false);
          }
          localStorage.removeItem("UserName");
          localStorage.removeItem("UserPassword");
          axios.defaults.headers.common["Authorization"] = token;
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          localStorage.setItem("UsertypeInfo", res?.userTypeInfo);
          const uId = res.userId;
          localStorage.setItem("UserId", uId);
          if (res.token !== "" && res.status !== false) {
            localStorage.setItem("token", token);
            setInterval(
              () =>
                CasinoApi.Casino_Authentication({}).then((item) => {
                  localStorage.setItem(
                    "gameToken",
                    item?.data?.data?.access_token
                  );
                }),
              1000
            );
            nav("/m/home");
          }
          const pType = res.passwordtype;
          localStorage.setItem("Password-type", pType);
          if (pType === "old") {
            nav("/m/setting/changepassword");
          }
        })
        .catch((error) => {
          toast(error?.response?.data?.message, {
            icon: <AiOutlineClose />,
            style: {
              borderRadius: "10px",
              background: "#f8d7da",
              color: "#58151c",
            },
          });
          setIsLoading(false);
        });
    }
  };

  const handleBackBtn = () => {
    nav("/");
  };

  const popupClose = (vl) => {
    setStatusVal(!vl);
  };

  const handleCloseModal = () => setShowModals(false);

  useEffect(() => {
    if (localStorage.getItem("UserName") !== null) {
      setShowModals(true);
    }
    if (localStorage.getItem("token") !== null) {
      nav("/m/home");
    }
  }, []);

  const handleLoginWithDemoAccount = () => {
    setStatusVal(true);
    setIsLoading1(true);
    AuthorAPI.LOGIN_WITH_DEMO_USER()
      .then((res) => {
        const token = res.data.token;
        setMessage(res.message);
        setIsLoading1(false);
        localStorage.removeItem("UserName");
        localStorage.removeItem("UserPassword");
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res?.data?.token}`;
        // setStatusVal(res?.data.status);
        // setMessage("Invalid Username or password");
        localStorage.setItem("UsertypeInfo", res?.data?.userTypeInfo);
        const uId = res.data?.username;
        localStorage.setItem("UserId", uId);
        if (
          res.data?.token !== "" &&
          res?.data?.token !== undefined &&
          res?.data.status !== false
        ) {
          localStorage.setItem("token", token);
          setInterval(
            () =>
              CasinoApi.Casino_Authentication({}).then((item) => {
                localStorage.setItem(
                  "gameToken",
                  item?.data?.data?.access_token
                );
              }),
            1000
          );
          nav("/m/home");
        }
        const pType = res?.data?.passwordtype;
        localStorage.setItem("Password-type", pType);
        if (pType === "old") {
          nav("/m/setting/changepassword");
        }
        if (res?.data.status === false) {
          toast(res?.data?.message, {
            icon: <AiOutlineClose />,
            style: {
              borderRadius: "10px",
              background: "#f8d7da",
              color: "#58151c",
            },
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast(error?.response?.data?.message, {
          icon: <AiOutlineClose />,
          style: {
            borderRadius: "10px",
            background: "#f8d7da",
            color: "#58151c",
          },
        });
        setIsLoading1(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    UserAPI.Self_By_App_Url().then((res) => {
      setIsDemoIdLoginAllowed(res?.data?.isDemoIdLoginAllowed);
      setNavLogo(res?.data?.logo);
    });
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper login_main_section">
        {Statusmessage === true && (
          <div className="alertBtn">
            <AlertBtn
              color="success"
              popupClose={popupClose}
              val={Errmessage}
            />
          </div>
        )}
        {(StatusVal === false || Statusmessage === undefined) &&
        Statusmessage === false ? (
          <div className="alertBtn">
            <AlertBtn color="danger" popupClose={popupClose} val={message} />
          </div>
        ) : (
          ""
        )}

        <div className="login-wrapper1">
          <div className="text-center logo-login mb-3">
            <img
              src={navLogo}
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
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  name="Password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
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
              {isDemoIdLoginAllowed ? (
                <div className="form-group mb-0" style={{ marginTop: "12px" }}>
                  <button
                    onClick={handleLoginWithDemoAccount}
                    className="btn btn-primary btn-block">
                    Login with Demo User
                    {isLoading1 ? (
                      <i className="ml-2 fa fa-spinner fa-spin"></i>
                    ) : (
                      <i className="ml-2 fa fa-sign-in"></i>
                    )}
                  </button>
                </div>
              ) : (
                ""
              )}

              <div className="form-group mb-0" style={{ marginTop: "12px" }}>
                <button
                  onClick={handleBackBtn}
                  className="btn btn-primary btn-block">
                  <i
                    className="ml-2 fa fa-sign-in"
                    style={{ rotate: "180deg" }}></i>
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
                  <Link to="/" className="mail-link">
                    {host}
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
