import React, { useState } from "react";
import NavBar from "../../navBar/NavBar";
import "../AaccountStatement/AaccountStatement.css";
import AlertBtn from "../../Alert/AlertBtn";
import { AuthorAPI } from "../../../apis/AuthorAPI";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ChangePassword() {
  const [currPassword, setCurrPassword] = useState("");
  const [newPasswords, setNewpasswords] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [ShowError, setShowError] = useState(false);
  const [message, setMessege] = useState("");
  const [color, setColor] = useState("");
  const passType = localStorage.getItem("Password-type");
  const userId = localStorage.getItem("UserId");
  const Token = localStorage.getItem("token");


  const history = useHistory();

  const handleClick = () => {
    if (currPassword === "") {
      setShowError(true);
      setColor("danger");
      setMessege("Current Password is required");
    } else if (newPasswords === "") {
      setShowError(true);
      setColor("danger");
      setMessege("New Password is required");
    } else if (newPasswords !== currPassword) {
      setShowError(true);
      setColor("danger");
      setMessege("New Password and Password Confirmation should be same");
    } else {
      setShowError(false);
    }

    if (conformPassword !== "" && newPasswords !== "") {
      if (newPasswords === conformPassword) {
        if (passType === "old") {
          AuthorAPI.FIRST_LOGIN({
            currentPassword: currPassword,
            newPassword: newPasswords,
            confirmPassword: conformPassword,
            userid: userId,
            token: Token,
            oldPassword: currPassword,
          })
            .then((res) => {
              setColor("success");
              setMessege("Password Updated");
              setShowError(true);
              if(res.status === true){
                history.push('/login');
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          AuthorAPI.Change_Passwords({
            currentPassword: currPassword,
            newPassword: newPasswords,
          }).then((res) => {
            // console.log(res.message)
            // if (res.status === false) {
            //   setShowError(true);
            //   setColor("danger");
            //   setMessege(res.message);
            // } 
            if(res.status===true) {
              setShowError(true);
              setColor("success");
              setMessege(res.message);
              history.push('/login');
              window.location.reload();
            }
          });
        }
      }
    }
  };

  const popupClose = (vl) => {
    setShowError(vl);
  };
  return (
    <div>
      <NavBar />
      {ShowError === true ? (
        <AlertBtn
          color={color}
          className="change-passwords"
          popupClose={popupClose}
          val={message}
        />
      ) : (
        ""
      )}
      <div className="report-container wrapper">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Change Password</h4>
          </div>
          <div className="card-body container-fluid container-fluid-5">
            <div className="row row5 mt-2 acc-stat">
              <div className="col-12">
                <div className="form-group">
                  <label>Current Password</label>{" "}
                  <input
                    type="password"
                    className="form-control chbtn"
                    style={{ borderBottom: "1px solid #2c3d50" }}
                    onChange={(e) => setCurrPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>{" "}
                  <input
                    type="password"
                    className="form-control chbtn"
                    style={{ borderBottom: "1px solid #2c3d50" }}
                    onChange={(e) => setNewpasswords(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>{" "}
                  <input
                    type="password"
                    className="form-control chbtn"
                    style={{ borderBottom: "1px solid #2c3d50" }}
                    onChange={(e) => setConformPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row row5 mt-2 acc-stat">
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block btn-sm"
                  onClick={handleClick}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
