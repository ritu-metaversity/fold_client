import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./NavbarDesk.css";
import { GameAPI } from "../../apis/gameAPI";
import { UserAPI } from "../../apis/UserAPI";
import ExpForDesk from "./ExpForDesk/ExpForDesk";
import NavLoginForm from "./NavLoginForm/NavLoginForm";

const NavbarDesk = (props) => {
  const [close, setClose] = useState(false);
  const [droup, setDrop] = useState(false);
  const [userbalance, setUserbalance] = useState("0.00");
  const [ActiveSport, setActiveSport] = useState([]);
  const [error, setError] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [showExpModals, setShowExpModals] = useState(false);
  const [logo, setLogo] = useState();
  const [SeachDetail, setSeachDetail] = useState("");
  const [Exp, setExp] = useState("0.00");

  function toggle(e) {
    e.preventDefault();
    setSeachDetail("")
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
    GameAPI.ACTIVE_SPORT_LIST().then((res) => {
      setActiveSport(res);
    });
  }, []);

  const handleShowSingleSpor = (id) => {
    props.gameIdFor(id);
  };

  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    UserAPI.Self_By_App_Url().then((res) => {
      setStatus(res?.data?.selfAllowed);
      setLogo(res?.data?.logo);
    });

    UserAPI.User_Message().then((res) => {
      setUserMessage(res);
    });

    if (localStorage.getItem("token") === null) {
      nav("/login");
    }


    if (token !== null && localStorage.getItem("Password-type" ) !== "old") {
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
    if (token !== null && localStorage.getItem("Password-type" ) !== "old") {
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

   
  }, [nav]);

  const handleSportId = (sportid) => {
    localStorage.setItem("SportId", sportid);
  };

  const handleExpModal = () => setShowExpModals(false);
  const [isDeleted, setIsDeleted] = useState(false)
  const handleExpShow = (e, val) => {
    setShowExpModals(true);
    setIsDeleted(val)
    e.preventDefault();
  };

  return (
    <>
      {droup && <div className="overLay" onClick={() => setDrop(false)}></div>}

      <div className="wrapper">
        <header className="header desk-view">
          <div className="container-fluid">
            <div className="row">
              <div className="header-top main_header col-md-12">
                <div className="float-left">
                  <Link
                    to="/home"
                    className="logo desk-logo router-link-exact-active router-link-active">
                    <img src={logo} className="logo-icon" alt="logo" />
                  </Link>
                </div>
                {localStorage.getItem("token") === null ? (
                  <NavLoginForm />
                ) : (
                  <ul className="float-right d-flex mt-0 align-items-center">
                    <li className="search float-left">
                      <input
                        name="game_keyword"
                        placeholder="All Events"
                        autoComplete="off"
                        type="text"
                        value={SeachDetail}
                        onChange={(e)=>setSeachDetail(e.target.value)}
                        className={!close ? "" : "search-input-show"}
                      />
                      <Link onClick={toggle}>
                        <i className="fa fa-search-plus"></i>
                      </Link>
                    </li>
                    {/* <li className="float-left download-apklink">
                      <Link to="/home" onClick={() => setXlShow(true)}>
                        Rules
                      </Link>
                    </li> */}
                    <li className="ballance float-left">
                      <div>
                        <span>Balance:</span>{" "}
                        <b>
                          <span>
                            {error
                              ? "0.00"
                              : userbalance === ""
                              ? "0.00"
                              : userbalance}
                          </span>
                        </b>
                      </div>
                      <div className="mt-1" onClick={(e) => handleExpShow(e, false)}>
                        <p className="cPointer" onClick={() => setLgShow(true)}>
                         
                            <span className="t-underline">Exp:</span>{" "}
                            <b>
                              <span className="t-underline">
                                {parseFloat(Exp)?.toFixed(2)}
                              </span>
                            </b>
                         
                        </p>
                      </div>

                      <Modal
                        size="xl"
                        show={showExpModals}
                        dialogClassName="modal-90w"
                        onHide={handleExpModal}
                        style={{
                          marginTop: "12px",
                          marginInline: "2%",
                          width: "95%",
                        }}>
                        <Modal.Header
                          closeButton
                          closeVariant="white"
                          className="head-result">
                          <Modal.Title className="acc-result">
                            Exposure
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="account-popup">
                          <ExpForDesk isDeleted={isDeleted} />
                        </Modal.Body>
                      </Modal>
                    </li>

                    <li className="account float-left">
                      <span style={{fontWeight:"600"}} onClick={droupMenu}>
                        {localStorage.getItem("UserId")}
                        <i className="fa fa-chevron-down"></i>
                      </span>
                      {droup && (
                        <ul className="d-block" style={{top: "65px"}}>
                          {status === true && localStorage.getItem("UsertypeInfo") == 1 ? (
                            <>
                              <Link
                                to="/deposit"
                                onClick={() => setDrop(false)}
                                className="dropdown-item router-link-exact-active router-link-active depositMNav desk-viewBtn">
                                Deposit
                              </Link>
                              <Link
                                to="/withdraw"
                                onClick={() => setDrop(false)}
                                className="dropdown-item router-link-exact-active router-link-active withdrawNav desk-viewBtn">
                                Withdraw
                              </Link>
                            </>
                          ):""}

                          <li>
                            <Link
                              to="/accountstatement"
                              className=""
                              onClick={() => setDrop(false)}>
                              Account Statement
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/profitloss"
                              className=""
                              onClick={() => setDrop(false)}>
                              Profit Loss Report
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/bethistory"
                              className=""
                              onClick={() => setDrop(false)}>
                              Bet History
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/unsetteledbet"
                              className=""
                              onClick={() => setDrop(false)}>
                              Unsetteled Bet
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/changebtnvalue"
                              className=""
                              onClick={() => setDrop(false)}>
                              Set Button Values
                            </Link>
                          </li>

                          <li
                            style={{
                              borderBottom: "1px solid #ddd",
                              padding: "0px 0px 14px 0px",
                            }}>
                            <Link
                              to="/changepassword"
                              className=""
                              onClick={() => setDrop(false)}>
                              Change Password
                            </Link>
                          </li>
                          <li style={{ padding: "14px 0px 0px 0px" }}>
                            <Link to="/SignOut" onClick={() => setDrop(false)}>
                              signout
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </div>
              {/* eslint-disable-next-line */}
              <marquee scrollamount="3" className="user_message">
                <i>{userMessage}</i>
              </marquee>
            </div>
          </div>
          <div></div>
          <div className="modal-market"></div>
        </header>
        <div className="header-bottom bottom-header  col-md-12">
          <nav className="navbar navbar-expand-md btco-hover-menu">
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="navbar-toggler">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="list-unstyled navbar-nav">
                <li className="nav-item list1">
                  <Link to="/home" className="">
                    Home
                  </Link>
                </li>
                <li className="nav-item list1">
                  <Link to="/inplay" className="">
                    In-Play
                  </Link>
                </li>
                {ActiveSport.map((res, id) => {
                  return (
                    <li
                      key={id}
                      className="nav-item list1"
                      onClick={() => handleSportId(res?.sportId)}>
                      <Link
                        to={`/${res?.sportName.replace(" ", "")}`}
                        className=""
                      >
                        {res?.sportName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavbarDesk;
