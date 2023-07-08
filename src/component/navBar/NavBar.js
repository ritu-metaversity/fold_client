import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";
import { UserAPI } from "../../apis/UserAPI";
import { AuthorAPI } from "../../apis/AuthorAPI";
import Modal from "react-bootstrap/Modal";
import ExposureModal from "../Items/ExposureModal/ExposureModal";

const NavBar = () => {
  const [close, setClose] = useState(false);
  const [droup, setDrop] = useState(false);
  const [userbalance, setUserbalance] = useState(0);
  // eslint-disable-next-line
  const [userdetail, setUserDetail] = useState(localStorage.getItem("UserId"));
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  const [Exp, setExp] = useState("0.0");
  const [balanceShow, setBalanceShow] = useState(true);
  const [expShow, setExpShowShow] = useState(true);
  const [showExpModals, setShowExpModals] = useState(false);
  const [NavLogo, setNavLogo] = useState();
  const [searchValue, setSearchValue] = useState("");

  const nav = useNavigate();
  const { pathname } = useLocation();

  // const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    // const scrolled = document.documentElement.scrollTop;
    if (document.documentElement.scrollTop >= 200) {
      setClose(false);
    } else {
      setClose(false);
    }
  };

  const scrollToTop = () => {
    if (close === false) {
      setClose(true);
    } else if (document.documentElement.scrollTop >= 200) {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    } else {
      setClose(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);

  

  function toggle(e) {
    e.preventDefault();
    if (close === false) {
      setClose(true);
    } else {
      setClose(false);
    }
  }

  function droupMenu(e) {
    setSearchValue("")
    e.preventDefault();
    if (droup === false) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  }

  useEffect(()=>{
    UserAPI.Self_By_App_Url().then((res) => {
      setStatus(res?.data?.selfAllowed);
      setNavLogo(res?.data?.logo);
    });
    UserAPI.User_Message().then((res) => {
      setUserMessage(res);
    });
  },[])

  useEffect(() => {

    if (localStorage.getItem("token") === null) {
      nav("/login");
    }



  }, [nav]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && localStorage.getItem("Password-type") !== "old") {
      UserAPI.User_Balance()
        .then((res) => {
          setUserbalance(res?.data?.balance);
          setExp(res?.data?.libality);
        })
        .catch((error) => {
          if(error?.response?.status === 401){
            setError(true);
            nav("/login");
            localStorage.clear();
          }
          setError(true);
        });
    }

    const time = setInterval(() => {
      if (token !== null && localStorage.getItem("Password-type") !== "old") {
        UserAPI.User_Balance()
          .then((res) => {
            setUserbalance(res?.data?.balance);
            setExp(res?.data?.libality);
          })
          .catch((error) => {
          if(error?.response?.status === 401){
            setError(true);
            nav("/login");
            localStorage.clear();
          }
          setError(true);

          });
      }
    }, 1500);

    return () => clearInterval(time);
  }, []);

  const handleSignOut = () => {
    if (localStorage.getItem("token") !== null)
      AuthorAPI.LOGOUT().then((res) => {});
    localStorage.clear();
    nav("/m/login");
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

  const [stackySideBar, setStackySideBar] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const controlNavbar = () => {
    if (pathname.includes("casino") == true) {
      if (window.scrollY > 15) {
        setStackySideBar("Nav-fixed");
      } else {
        setStackySideBar("");
      }
    } else {
      if (window.scrollY > 150) {
        setStackySideBar("Nav-fixed");
      } else if (window.scrollY < 3) {
        setStackySideBar("");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);


  return (
    <>
      <div className={`wrapper ${stackySideBar}`}>
        <div className="">
          <header className="header">
            <div className="container-fluid">
              <div className="row row5 pt-1 pb-1 mb-4">
                <div className="logo col-6">
                  <Link
                    to="/"
                    className="router-link-exact-active router-link-active">
                    <i className="fa fa-home mr-1"></i>
                    <img
                      src={NavLogo && NavLogo}
                      alt="Exchange"
                      className="img-fluid logo"
                    />
                  </Link>
                </div>
                <div
                  className={`col-6 text-right bal-expo ${
                    localStorage.getItem("token") === null ? "d-none" : ""
                  }`}>
                  <p className={`mb-0 ${!balanceShow ? "d-none" : ""}`}>
                    <i className="fa fa-bank mr-1"></i>
                    <b>{userbalance === "" ? "0.00" : userbalance}</b>
                  </p>
                  <div className="exp">
                    <span
                      onClick={(e) => handleExpShow(e)}
                      className={expShow ? "" : "d-none"}>
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
                        <ExposureModal />
                      </Modal.Body>
                    </Modal>

                    <div
                      className={close ? "overlayopen" : "overlayclose"}
                      onClick={() => setClose(false)}></div>
                    <div
                      className="dropdown d-inline-block"
                      onClick={scrollToTop}>
                      <p data-toggle="dropdown" className="dropdown-toggle">
                        <u>{userdetail?.length && userdetail}</u>
                      </p>
                      {close ? (
                        <div
                          className={
                            !close ? "dropdown-menu" : "dropdown-menu show"
                          }>
                          <Link
                            to="/m/home"
                            className="dropdown-item router-link-exact-active router-link-active"
                            onClick={() => setClose(false)}>
                            Home
                          </Link>
                          {localStorage.getItem("UsertypeInfo") == 2 ? (
                            ""
                          ) : (
                            <>
                              <Link
                                to="/m/reports/deposit"
                                className={`dropdown-item router-link-exact-active router-link-active depositMNav ${
                                  status ? "" : "d-none"
                                }`}>
                                Deposit
                              </Link>
                              <Link
                                to="/m/reports/withdraw"
                                className={`dropdown-item router-link-exact-active router-link-active withdrawNav ${
                                  status ? "" : "d-none"
                                }`}>
                                Withdraw
                              </Link>
                            </>
                          )}

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
                                className={
                                  expShow ? "custom-control-input" : ""
                                }
                              />
                              <label
                                htmlFor="customCheck1"
                                className="custom-control-label"></label>
                            </div>
                          </Link>
                          {/* <Link to="/m/home" className="dropdown-item">
                            Rules
                          </Link> */}
                          <Link
                            to="/m/SignOut"
                            onClick={handleSignOut}
                            className="dropdown-item mt-2 text-danger">
                            <b>Logout</b>
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`col-6 text-right ${
                    localStorage.getItem("token") === null ? "" : "d-none"
                  }`}>
                  <div className="d-flex login-register">
                    <Link
                      to="/m/register"
                      className={`mt-2 text-white ${status ? "" : "d-none"}`}>
                      <b>Register</b>
                    </Link>
                    <Link
                      to="/login"
                      onClick={handleSignOut}
                      className="mt-2 text-white">
                      <b>Login</b>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row row5 header-bottom">
                <div className="col-12">
                  <div className="search-box-container">
                    <div className="search-box float-left">
                      <input
                        type="text"
                        onChange={(e)=>setSearchValue(e.target.value)}
                        value={searchValue}
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
      <Outlet />
    </>
  );
};

export default NavBar;
