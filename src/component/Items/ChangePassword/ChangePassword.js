import React, { useState } from "react";
import "../AaccountStatement/AaccountStatement.css";
import AlertBtn from "../../Alert/AlertBtn";
import { AuthorAPI } from "../../../apis/AuthorAPI";
import { useNavigate } from "react-router-dom";

function ChangePassword(props) {
  const [currPassword, setCurrPassword] = useState("");
  const [newPasswords, setNewpasswords] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [ShowError, setShowError] = useState(false);
  const [message, setMessege] = useState("");
  const [color, setColor] = useState("");
  const passType = localStorage.getItem("Password-type");
  const userId = localStorage.getItem("UserId");
  const Token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false)

  const nav = useNavigate();


  const handleClick = () => {
    if (currPassword === "") {
      setShowError(true);
      setColor("danger");
      setMessege("Current Password is required");
      setIsLoading(false)
    } else if (newPasswords === "") {
      setShowError(true);
      setColor("danger");
      setMessege("New Password is required");
      setIsLoading(false)
    } 
    else if (newPasswords !== currPassword) {
      setShowError(true);
      setColor("danger");
      setMessege("New Password and Password Confirmation should be same");
      setIsLoading(false)
    }
  
    if (conformPassword !== "" && newPasswords !== "") {
      setIsLoading(true)
      if (localStorage.getItem("Password-type") === "old") {
     
        AuthorAPI.FIRST_LOGIN({
          currentPassword: currPassword,
          newPassword: newPasswords,
          confirmPassword: conformPassword,
          userid: userId,
          token: Token,
          oldPassword: currPassword,
        }).then((res) => {
          // console.log(res.message)
          props.statusMsg(res.status)
          if (res.status === true) {
            setMessege(res.message);
            setTimeout(function () {
              setIsLoading(false)
              AuthorAPI.LOGOUT();
              console.log("change-pass")
              localStorage.clear();
              nav("/login");
            }, 200);
          }
        });
      } else {
        if (newPasswords === conformPassword) {
          AuthorAPI.Change_Passwords({
            currentPassword: currPassword,
            newPassword: newPasswords,
          }).then((res) => {
            if (res.status === true) {
              setMessege(res.message);
              setTimeout(function () {
                console.log("change-pass2")
                setIsLoading(false)
                localStorage.clear();
                AuthorAPI.LOGOUT();
                nav("/login");
              }, 200);
            }
          });
        }
      }
      // }
    }
    props.statusMsg(true)
  };


  props.message(message)

  const popupClose = (vl) => {
    setShowError(vl);
  };
  return (
    <div>
      {ShowError !== false ? (
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
            <h4 className="mb-0 heading-ch">Change Password</h4>
          </div>
          {
          isLoading && <p className="change-pass-loading"><i className="fa fa-spinner fa-spin"></i></p>
        }
          <div className="card-body container-fluid container-fluid-5">
            <div className="row row5 mt-2 acc-stat">
              <div className="col-12 ch-pass">
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
