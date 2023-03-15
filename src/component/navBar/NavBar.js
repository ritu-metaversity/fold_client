import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserAPI } from "../../apis/UserAPI";

const NavBar = (props) => {
  const [close, setClose] = useState(false);
  const [droup, setDrop] = useState(false);
  const [userbalance, setUserbalance] = useState();
  // eslint-disable-next-line
  const [userdetail, setUserDetail] = useState(localStorage.getItem("UserId"));
  const [userMessage, setUserMessage] = useState("");

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

  // const TopNavList = [
  //   "Home",
  //   "Cricket",
  //   "Tennis",
  //   "Football",
  //   "Kabaddi",
  //   "Basketball",
  //   "Volleyball",
  //   "Baccarat",
  //   "32 Cards",
  //   "TeenPatti",
  //   "Lucky 7",
  // ];

  const token = localStorage.getItem("token")

  useEffect(() => {
    UserAPI.User_Balance().then((res) => {
      setUserbalance(res.data.balance);
    // console.log(res.data.balance)
    });
  }, [token]);


  useEffect(() => {
    UserAPI.User_Message().then((res) => {
      setUserMessage(res);
    });
  },[]);

  

  const [lgShow, setLgShow] = useState(false);
  const [balanceShow, setBalanceShow] = useState(true);
  const [expShow, setExpShowShow] = useState(true);

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

  return (
    <>
      <div className="wrapper">
        {/* <header className="header desk-view">
          <div className="container-fluid">
            <div className="row">
              <div className="header-top col-md-12">
                <div className="float-left">
                  <Link
                    to="/"
                    className="logo router-link-exact-active router-link-active">
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

                    <Modal
                      size="xl"
                      className="rule-modal"
                      show={xlShow}
                      onHide={() => setXlShow(false)}
                      aria-labelledby="example-modal-sizes-title-xl">
                      <Modal.Header closeButton closeVariant="white">
                        <Modal.Title iid="example-modal-sizes-title-xl">
                          Rules
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body
                        style={{ height: "100vh" }}
                        className="rul-mod">
                        <Modals />
                      </Modal.Body>
                    </Modal>
                  </li>
                  <li className="ballance float-left">
                    <div>
                      <span>Balance:</span>{" "}
                      <b>
                        <span>{userbalance===""?"0.00":userbalance}</span>
                      </b>
                    </div>
                    <div>
                      <Link to="/" onClick={() => setLgShow(true)}>
                        <span className="t-underline">Exposure:</span>{" "}
                        <b>
                          <span className="t-underline">0</span>
                        </b>
                      </Link>

                      <Modal
                        className="exp-modal"
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg">
                        <Modal.Header closeButton closeVariant="white">
                          <Modal.Title id="example-modal-sizes-title-lg">
                            My Market
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="exp-mod">
                          <ExposureModal />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>

                  <li className="account float-left">
                    <span onClick={droupMenu}>
                      {userdetail}
                      <i className="fa fa-chevron-down"></i>
                    </span>
                    {droup && (
                      <ul className="d-block">
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
                        <li>
                          <Link to="/" className="">
                            Security Auth Verification
                          </Link>
                        </li>
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
                          
                          to="/Home"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Home");
                          }}>
                          Home
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                          
                          to="/Cricket"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Cricket", "4");
                          }}>
                          Cricket
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                          
                          to="/Tennis"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Tennis", "2");
                          }}>
                          Tennis
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                         
                          to="/Football"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Football", "1");
                          }}>
                          Football
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                         
                          to="/Kabaddi"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Kabaddi");
                          }}>
                          Kabaddi
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                         
                          to="/Home"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Basketball");
                          }}>
                          Basketball
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                          
                          to="/Volleyball"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Volleyball");
                          }}>
                          Volleyball
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                          
                          to="/Baccarat"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Baccarat");
                          }}>
                          Baccarat
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                          
                          to="/32Cards"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("32 Cards");
                          }}>
                          32 Cards
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                          
                          to="/TeenPatti"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("TeenPatti");
                          }}>
                          TeenPatti
                        </Link>
                      </li>
                      <li className="nav-item list1">
                        <Link
                          
                          to="/Lucky7"
                          className="nav-link active nav-b"
                          onClick={() => {
                            handleShowSingleSpor("Lucky 7");
                          }}>
                          Lucky 7
                        </Link>
                      </li>

                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div></div>
          <div className="modal-market"></div>
        </header> */}

        {/* mobile view */}

        {/* -------------------------------------------------------- */}

        <div className="">
          <header className="header">
            <div className="container-fluid">
              <div className="row row5 pt-1 pb-1">
                <div className="logo col-6">
                  <Link
                    to="/home"
                    className="router-link-exact-active router-link-active">
                    <i className="fas fa-home mr-1"></i>{" "}
                    <img
                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/themes/diamondexch9.com/mobile/logo.png"
                      alt="Exchange"
                      className="img-fluid logo"
                    />
                  </Link>
                </div>
                <div className="col-6 text-right bal-expo">
                  <p className={`mb-0 ${!balanceShow ? "d-none" : ""}`}>
                    <i className="fas fa-landmark mr-1"></i>{" "}
                    <b>{userbalance===""?"0.00":userbalance}</b>
                  </p>
                  <div className="">
                    <span className={`mr-1 ${!expShow ? "d-none" : ""}`}>
                      <u >Exp:0</u>
                    </span>
                    {/* <Modal
                      style={{
                        marginTop: "50px",
                        width: "91%",
                        marginInline: "3%",
                      }}
                      className="exp-modal1"
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg">
                      <Modal.Header closeButton closeVariant="white">
                        <Modal.Title id="example-modal-sizes-title-lg">
                          My Market{" "}
                          <i className="fas fa-sync-alt ml-1 resetbtn"></i>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="exp-mod">
                        <ExposureModal />
                      </Modal.Body>
                    </Modal> */}
                    <div className="dropdown d-inline-block" onClick={toggle}>
                      <Link data-toggle="dropdown" className="dropdown-toggle">
                        <u>{userdetail?.length && userdetail}</u>
                      </Link>
                      <div
                        className={
                          !close ? "dropdown-menu" : "dropdown-menu show"
                        }>
                        <Link
                          to="/home"
                          className="dropdown-item router-link-exact-active router-link-active">
                          Home
                        </Link>
                        <Link
                          to="/m/reports/accountstatement"
                          className="dropdown-item">
                          Account Statement
                        </Link>{" "}
                        <Link
                          to="/m/reports/profitloss"
                          className="dropdown-item">
                          Profit Loss Report
                        </Link>{" "}
                        <Link
                          to="/m/reports/bethistory"
                          className="dropdown-item">
                          Bet History
                        </Link>{" "}
                        <Link
                          to="/m/reports/unsetteledbet"
                          className="dropdown-item">
                          Unsetteled Bet
                        </Link>{" "}
                        <Link
                          to="/m/reports/casinoresults"
                          className="dropdown-item">
                          Casino Report History
                        </Link>{" "}
                        <Link
                          to="/m/setting/changebtnvalue"
                          className="dropdown-item">
                          Set Button Values
                        </Link>{" "}
                        <Link
                          to="/m/setting/changepassword"
                          className="dropdown-item">
                          Change Password
                        </Link>
                        <Link
                          to="/"
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
                            />{" "}
                            <label
                              htmlFor="customCheck"
                              className="custom-control-label"></label>
                          </div>
                        </Link>
                        <Link
                          to="/"
                          className="dropdown-item"
                          onClick={expHideShow}>
                          Exposure
                          <div className="custom-control custom-checkbox float-right">
                            <input
                              type="checkbox"
                              defaultChecked
                              id="customCheck1"
                              className={expShow ? "custom-control-input" : ""}
                            />{" "}
                            <label
                              htmlFor="customCheck1"
                              className="custom-control-label"></label>
                          </div>
                        </Link>
                        <Link to="/m/rules" className="dropdown-item">
                          Rules
                        </Link>{" "}
                        <Link
                          to="/SignOut"
                          className="dropdown-item mt-2 text-danger">
                          <b>Logout</b>
                        </Link>
                      </div>
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
                      <Link to="/" className="search_icon" onClick={droupMenu}>
                        <i
                          className={
                            !droup ? "fas fa-search" : "fas fa-times"
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
    </>
  );
};

export default NavBar;
