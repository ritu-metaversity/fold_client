import React from "react";
import './RegisterModals.css'

const RegisterModals = (props) => {
    
  return (
    <>
      <div className={`place-bet pt-2 pb-2`}>
        <div className={`container-fluid container-fluid-5`}>
          <div className="row row5">
            <div className="user-id user">
                <p>User Name:</p>
                <p>{props.userId}</p>
            </div>
            <div className="user-id">
                <p>Password:</p>
                <p>{props.password}</p>
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
