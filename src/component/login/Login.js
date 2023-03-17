import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AlertBtn from "../Alert/AlertBtn";
import { AuthorAPI } from "../../apis/AuthorAPI";

function Login() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [StatusVal, setStatusVal] = useState(true);

  const handleLogin = () => {
    AuthorAPI.Login({
      userId: user,
      password: password,
    }).then((res) => {
      const token = res.token;
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
      console.log(token)
      setStatusVal(res.status);
      const uId = res.userId;
      localStorage.setItem("UserId", uId);
      if (res.token !=="" && user === res.userId) {
        history.push("/home");
      }
      const pType = res.passwordtype;
      localStorage.setItem("Password-type", pType)
      if (pType === "old") {
        history.push("/m/setting/changepassword");
      }
    });
  };

  return (
    <>
      {/* <div className="deck-top-view">
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
                        className="logo-login"
                      />
                    </div>
                    <div className="featured-box-login featured-box-secundary default">
                      <h4 className="text-center">
                        LOGIN <i className="fas fa-hand-point-down"></i>
                      </h4>
                      <form
                        autoComplete="off"
                        onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group m-b-20">
                          <input
                            name="User Name"
                            placeholder="User Name"
                            type="text"
                            className="form-control"
                            aria-required="true"
                            aria-invalid="false"
                            onChange={(e) => setUser(e.target.value)}
                          />{" "}
                          <i className="fas fa-user"></i>
                          <small
                            className="text-danger"
                            style={{ display: "none" }}></small>
                        </div>
                        <div className="form-group m-b-20">
                          <input
                            name="Password"
                            placeholder="Password"
                            type="password"
                            className="form-control"
                            aria-required="true"
                            aria-invalid="false"
                            onChange={(e) => setPassword(e.target.value)}
                          />{" "}
                          <i className="fas fa-key"></i>
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
                            <i className=" ml-2 fas fa-sign-in-alt"></i>
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
                              to="mailto:info@diamondexch.com"
                              className="mail-link">
                              info@diamondexch.com
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
      </div> */}

      <div className="wrapper">
        {StatusVal === false ? (
          <div className="alertBtn">
            <AlertBtn val="Invalid Username or password" />
          </div>
        ) : (
          ""
        )}

        <div id="load" style={{ visibility: "hidden" }}>
          <div id="load-inner" className="logo-login">
            <img
              src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/front/logo.png"
              className="img-fluid logo"
              alt=""
            />{" "}
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        </div>

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
                  <i className="ml-2 fas fa-sign-in-alt"></i>
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
