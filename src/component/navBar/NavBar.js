import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Nav.css";
import { UserAPI } from "../../apis/UserAPI";
import { AuthorAPI } from "../../apis/AuthorAPI";
import Modal from "react-bootstrap/Modal";
import ExposureModal from "../Items/ExposureModal/ExposureModal";

const NavBar = () => {
  const [close, setClose] = useState(false);
  const [droup, setDrop] = useState(false);
  const [userbalance, setUserbalance] = useState("0.00");
  // eslint-disable-next-line
  const [userdetail, setUserDetail] = useState(localStorage.getItem("UserId"));
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  const [Exp, setExp] = useState("");
  const [balanceShow, setBalanceShow] = useState(true);
  const [expShow, setExpShowShow] = useState(true);
  const [showExpModals, setShowExpModals] = useState(false);

  const nav = useNavigate();


  function toggle(e) {
    e.preventDefault();
    if (close === false) {
      setClose(true);
    } else {
      setClose(false);
    }
  }
  function droupMenu(e) {
    e.preventDefault();
    if (droup === false) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    UserAPI.Self_By_App_Url().then((res) => {
      setStatus(res.data.selfAllowed);
    });

    if (token !== null || localStorage.getItem("Password-type" !== "old")) {
      UserAPI.User_Balance()
        .then((res) => {
          setUserbalance(res.data.balance);
          setExp(res?.data?.libality);
        })
        .catch((error) => {
          setError(true);
        });
    }


    UserAPI.User_Message().then((res) => {
      setUserMessage(res);
    });

    if (localStorage.getItem("token") === null) {
      nav("/login");
    }
  }, [nav]);




  const handleSignOut = () => {
    if(localStorage.getItem("token") !== null)
    AuthorAPI.LOGOUT().then((res) => {
    });
  };

 

  const balanceHideShow = (e) => {
    e.preventDefault();
    if (balanceShow === true) {
      setBalanceShow(false);
    } else {
      setBalanceShow(true);
    }
  };

  const expHideShow = (e) => {
    e.preventDefault();
    if (expShow === true) {
      setExpShowShow(false);
    } else {
      setExpShowShow(true);
    }
  };

  const handleExpModal = () => setShowExpModals(false);
  const handleExpShow = (e) => {
    setShowExpModals(true);
    e.preventDefault();
  };
  return (
    <>
      <div className="wrapper">
        <div className="">
          <header className="header">
            <div className="container-fluid">
              <div className="row row5 pt-1 pb-1 mb-4">
                <div className="logo col-6">
                  <Link
                    to="/home"
                    className="router-link-exact-active router-link-active">
                    <i className="fa fa-home mr-1"></i>
                    <img
                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/mobile/logo.png"
                      alt="Exchange"
                      className="img-fluid logo"
                    />
                  </Link>
                </div>
                <div className="col-6 text-right bal-expo">
                  <p className={`mb-0 ${!balanceShow ? "d-none" : ""}`}>
                    <i className="fa fa-bank mr-1"></i>
                    <b>
                      {error
                        ? "0.00"
                        : userbalance === ""
                        ? "0.00"
                        : userbalance}
                    </b>
                  </p>
                  <div className="exp" >
                    <span onClick={(e) =>handleExpShow(e)} className={expShow?"":"d-none"}>
                      <u>Exp: {parseFloat(Exp)?.toFixed(2)}</u>
                    </span>

                    <Modal
                      show={showExpModals}
                      dialogClassName="modal-90w"
                      onHide={handleExpModal}
                      style={{
                        marginTop: "12px",
                        marginInline: "2%",
                        width: "95%",
                      }}>
                      <Modal.Header closeButton closeVariant="white">
                        <Modal.Title>Exposure</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="account-popup">
                      <ExposureModal/>
                      </Modal.Body>
                    </Modal>

                    <div className={close ? "overlayopen" :"overlayclose"} onClick={()=>setClose(false)}></div>
                    <div className="dropdown d-inline-block" onClick={(e)=>toggle(e)}>
                      <p data-toggle="dropdown" className="dropdown-toggle">
                        <u>{userdetail?.length && userdetail}</u>
                      </p>
                      {
                        close ?<div
                        className={!close ? "dropdown-menu" : "dropdown-menu show"}>
                        <Link
                          to="/home"
                          className="dropdown-item router-link-exact-active router-link-active">
                          Home
                        </Link>
                        <Link
                          to="/deposit"
                          className={`dropdown-item router-link-exact-active router-link-active ${
                            status ? "" : "d-none"
                          }`}>
                          Deposit
                        </Link>
                        <Link
                          to="/withdraw"
                          className={`dropdown-item router-link-exact-active router-link-active ${
                            status ? "" : "d-none"
                          }`}>
                          Withdraw
                        </Link>
                        <Link
                          to="/m/reports/accountstatement"
                          className="dropdown-item">
                          Account Statement
                        </Link>
                        <Link
                          to="/m/reports/profitloss"
                          className="dropdown-item">
                          Profit Loss Report
                        </Link>
                        <Link
                          to="/m/reports/bethistory"
                          className="dropdown-item">
                          Bet History
                        </Link>
                        <Link
                          to="/m/reports/unsetteledbet"
                          className="dropdown-item">
                          Unsetteled Bet
                        </Link>
                        <Link
                          to="/m/setting/changebtnvalue"
                          className="dropdown-item">
                          Set Button Values
                        </Link>
                        <Link
                          to="/m/setting/changepassword"
                          className="dropdown-item">
                          Change Password
                        </Link>
                        <Link
                          className="dropdown-item"
                          onClick={balanceHideShow}>
                          Balance
                          <div className="custom-control custom-checkbox float-right">
                            <input
                              defaultChecked
                              type="checkbox"
                              id="customCheck"
                              className={
                                balanceShow ? "custom-control-input" : ""
                              }
                            />
                            <label
                              htmlFor="customCheck"
                              className="custom-control-label"></label>
                          </div>
                        </Link>
                        <Link className="dropdown-item" onClick={expHideShow}>
                          Exposure
                          <div className="custom-control custom-checkbox float-right">
                            <input
                              type="checkbox"
                              defaultChecked
                              id="customCheck1"
                              className={expShow ? "custom-control-input" : ""}
                            />
                            <label
                              htmlFor="customCheck1"
                              className="custom-control-label"></label>
                          </div>
                        </Link>
                        <Link to="/home" className="dropdown-item">
                          Rules
                        </Link>
                        <Link
                          to="/SignOut"
                          onClick={handleSignOut}
                          className="dropdown-item mt-2 text-danger">
                          <b>Logout</b>
                        </Link>
                      </div>:""
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row5 header-bottom">
                <div className="col-12">
                  <div className="search-box-container">
                    <div className="search-box float-left">
                      <input
                        type="text"
                        className={
                          !droup
                            ? "search_input"
                            : "search_input search_input-hover"
                        }
                      />
                      <Link className="search_icon" onClick={droupMenu}>
                        <i
                          className={
                            !droup ? "fa fa-search" : "fa fa-times"
                          }></i>
                      </Link>
                    </div>
                  </div>
                  {/* eslint-disable-next-line */}
                  <marquee scrollamount="3" className="searchClose">
                    {userMessage}
                  </marquee>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      <Outlet/>
    </>
  );
};

export default NavBar;
