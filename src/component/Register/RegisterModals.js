import React from "react";
import './RegisterModals.css'

const RegisterModals = () => {

  const pass = localStorage.getItem("UserPassword")
  const userName = localStorage.getItem("UserName")


  return (
    <>
      <div className={`place-bet pt-2 pb-2`}>
        <div className={`container-fluid container-fluid-5`}>
          <div className="row row5">
            <div className="user-id user">
                <p>User Name:</p>
                <p>{userName}</p>
            </div>
            <div className="user-id">
                <p>Password:</p>
                <p>{pass}</p>
            </div>
          </div>
        </div>
        <hr/>
        <div className="text-danger">
            <p>Please save the details and login with this username and password </p>
        </div>
      </div>
    </>
  );
};

export default RegisterModals;
