import React, { useEffect, useState } from "react";
import "./NavLoginForm.css";
import { AuthorAPI } from "../../../apis/AuthorAPI";
import axios from "axios";
import { api } from "../../../apis/configs/axiosConfigs";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../../apis/UserAPI";
import AlertBtn from "../../../component/Alert/AlertBtn";

const NavLoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPasswords] = useState();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [StatusVal, setStatusVal] = useState(true);
  const [statusBtn, setStatusBtn] = useState();

  const nav = useNavigate();

  const handleLogin = () => {

    nav('/login')
    // setIsLoading(true);
    // if (password === "" || userName === "") {
    //   setMessage("password: length must be between 4 and 30");
    //   setStatusVal(false);
    //   setIsLoading(false);
    // } else {
    //   setStatusVal(true);
    // }
    // if (password !== "" && userName !== "") {
    //   AuthorAPI.Login({
    //     userId: userName,
    //     password: password,
    //   })
    //     .then((res) => {
    //       const token = res.token;
    //       setMessage(res.message);
    //       setIsLoading(false);
    //       localStorage.removeItem("UserName");
    //       localStorage.removeItem("UserPassword");
    //       axios.defaults.headers.common["Authorization"] = token;
    //       localStorage.setItem("token", token);
    //       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //       setStatusVal(res.status);
    //       setMessage("Invalid Username or password");
    //       const uId = res.userId;
    //       localStorage.setItem("UsertypeInfo", res?.userTypeInfo)
    //       localStorage.setItem("UserId", uId);
    //       if (res.token !== "" && res.status !== false) {
    //         nav("/home");
    //       }
    //       const pType = res.passwordtype;
    //       localStorage.setItem("Password-type", pType);
    //       if (pType === "old") {
    //         nav("/setting/changepassword");
    //       }
    //     })
    //     .catch((error) => {
    //       setIsLoading(false);
    //     });
    // }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      nav("/");
    }

    UserAPI.Self_By_App_Url().then((res) => {
      setStatusBtn(res?.data?.selfAllowed);
    });

    if (localStorage.getItem("token") === null) {
      nav("/login");
    }
  }, [nav]);

  const popupClose = (vl) => {
    setStatusVal(vl);
  };

  const handleRegisterBtn = () => {
    nav("/register");
  };

  return (
    <>
      {StatusVal === false ? (
        <div className="alertBtn">
          <AlertBtn color="danger" popupClose={popupClose} val={message} />
        </div>
      ) : (
        ""
      )}
      <div className="input_box">
        {statusBtn === true ? (
          <button type="button" onClick={handleRegisterBtn}>
            REGISTER
            <span className="MuiTouchRipple-root css-w0pj6f" />
          </button>
        ) : (
          ""
        )}

        {/* <div className="text_field">
          <input
            type="text"
            placeholder="Username*"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="text_field">
          <input
            type="password"
            placeholder="Password*"
            onChange={(e) => setPasswords(e.target.value)}
          />
        </div> */}
        <button className="ml-2" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
    </>
  );
};

export default NavLoginForm;
