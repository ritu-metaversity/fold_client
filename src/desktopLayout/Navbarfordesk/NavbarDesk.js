import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import Modals from "../Modals/Modals";
// import ExposureModal from "../Modals/ExposureModal/ExposureModal";
import "./NavbarDesk.css";
import { GameAPI } from "../../apis/gameAPI";
import { UserAPI } from "../../apis/UserAPI";

const NavbarDesk = (props) => {
  const [close, setClose] = useState(false);
  const [droup, setDrop] = useState(false);
  const [userdetail, setUserDetail] = useState(localStorage.getItem("UserId"));
  const [userbalance, setUserbalance] = useState("0.00");
  const [ActiveSport, setActiveSport] = useState([]);
  const [error, setError] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [xlShow, setXlShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [balanceShow, setBalanceShow] = useState(true);
  const [expShow, setExpShowShow] = useState(true);
  const [Exp, setExp] = useState("");






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
  // eslint-disable-next-line

//   const TopNavList = [
//     "Home",
//     "Cricket",
//     "Tennis",
//     "Football",
//     "Kabaddi",
//     "Basketball",
//     "Volleyball",
//     "Baccarat",
//     "32 Cards",
//     "TeenPatti",
//     "Lucky 7",
//   ];

  useEffect(() => {
    GameAPI.ACTIVE_SPORT_LIST().then((res) => {
      setActiveSport(res);
    });
  }, []);

  const handleShowSingleSpor = (id) => {
    props.gameIdFor(id);
  };
  const balanceHideShow = () => {
    if (balanceShow === true) {
      setBalanceShow(false);
    } else {
      setBalanceShow(true);
    }
  };

  const expHideShow = () => {
    if (expShow === true) {
      setExpShowShow(false);
    } else {
      setExpShowShow(true);
    }
  };

  const nav = useNavigate()

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

  const handleSportId =(sportid)=>{
    localStorage.setItem("SportId", sportid);

  }


  return (
    <>
    {
      droup && <div className="overLay" onClick={()=>setDrop(false)}></div>
    }
      
      <div className="wrapper">

        <header className="header desk-view">
          <div className="container-fluid">
            <div className="row">
              <div className="header-top col-md-12">
                <div className="float-left">
                  <Link
                    to="/"
                    className="logo desk-logo router-link-exact-active router-link-active">
                    <img
                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/front/logo.png"
                      className="logo-icon"
                      alt="logo"
                    />
                  </Link>
                </div>
                <ul className="float-right d-flex align-items-center">
                  <li className="search float-left">
                    {close ? (
                      <input
                        name="game_keyword"
                        placeholder="All Events"
                        autoComplete="off"
                        type="text"
                        className={
                          !close ? "search-input" : "search-input-show"
                        }
                      />
                    ) : (
                      ""
                    )}

                    <Link to="/" onClick={toggle}>
                      <i className="fa fa-search-plus"></i>
                    </Link>
                  </li>

                  <li className="float-left download-apklink">
                    <Link to="/" onClick={() => setXlShow(true)}>
                      Rules
                    </Link>
                  </li>
                  <li className="ballance float-left">
                    <div>
                      <span>Balance:</span>{" "}
                      <b>
                        <span>{error
                        ? "0.00"
                        : userbalance === ""
                        ? "0.00"
                        : userbalance}</span>
                      </b>
                    </div>
                    <div>
                      <Link to="/" onClick={() => setLgShow(true)}>
                        <span className="t-underline">Exposure:</span>{" "}
                        <b>
                          <span className="t-underline">{parseFloat(Exp)?.toFixed(2)}</span>
                        </b>
                      </Link>
                    </div>
                  </li>

                  <li className="account float-left">
                    <span onClick={droupMenu}>
                    {userdetail?.length && userdetail}
                      <i className="fa fa-chevron-down"></i>
                    </span>
                    {droup && (
                      <ul className="d-block">
                        <Link
                          to="/deposit"
                          className={`dropdown-item router-link-exact-active router-link-active depositMNav desk-viewBtn ${
                            status ? "" : "d-none"
                          }`}>
                          Deposit
                        </Link>
                        <Link
                          to="/withdraw"
                          className={`dropdown-item router-link-exact-active router-link-active withdrawNav desk-viewBtn ${
                            status ? "" : "d-none"
                          }`}>
                          Withdraw
                        </Link>
                        <li>
                          <Link to="/accountstatement" className="">
                            Account Statement
                          </Link>
                        </li>
                        <li>
                          <Link to="/profitloss" className="">
                            Profit Loss Report
                          </Link>
                        </li>
                        <li>
                          <Link to="/bethistory" className="">
                            Bet History
                          </Link>
                        </li>
                        <li>
                          <Link to="/unsetteledbet" className="">
                            Unsetteled Bet
                          </Link>
                        </li>
                        <li>
                          <Link to="/changebtnvalue" className="">
                            Set Button Values
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="/" className="">
                            Security Auth Verification
                          </Link>
                        </li> */}
                        <li
                          style={{
                            borderBottom: "1px solid #ddd",
                            padding: "0px 0px 14px 0px",
                          }}>
                          <Link to="/changepassword" className="">
                            Change Password
                          </Link>
                        </li>
                        <li style={{ padding: "14px 0px 0px 0px" }}>
                          <Link to="/SignOut">signout</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
                {/* eslint-disable-next-line */}
                <marquee scrollamount="3">
                  <i>
                  {userMessage}
                  </i>
                </marquee>
              </div>
              <div className="header-bottom m-t-10 col-md-12">
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
                        <Link
                          to="/home"
                          className="nav-link active nav-b"
                          //   onClick={() => {
                          //     handleShowSingleSpor(e,id);
                          //   }}
                        >
                          Home
                        </Link>
                      </li>

                      {ActiveSport.map((res) => {
                        return (
                          <li className="nav-item list1" onClick={()=>handleSportId(res?.sportId)}>
                            <Link
                              to={`/${res?.sportName}`}
                              className="nav-link active nav-b"
                              //   onClick={() => {
                              //     handleShowSingleSpor(e,id);
                              //   }}
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
          </div>
          <div></div>
          <div className="modal-market"></div>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default NavbarDesk;
