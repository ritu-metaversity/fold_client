import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { UserAPI } from "../../apis/UserAPI";
import { AuthorAPI } from "../../apis/AuthorAPI";


const NavBar = () => {
  const [close, setClose] = useState(false);
  const [droup, setDrop] = useState(false);
  const [userbalance, setUserbalance] = useState("0.00");
  // eslint-disable-next-line
  const [userdetail, setUserDetail] = useState(localStorage.getItem("UserId"));
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);

  

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
  useEffect(()=>{
    UserAPI.Self_By_App_Url().then((res)=>{
      setStatus(res.data.selfAllowed)
    })
  },[])

  const token = localStorage.getItem("token")

  useEffect(() => {
    setInterval(() => {
     
    }, 1000)
  }, []);

  useEffect(() => {
    const time = setInterval(() => {
      if(token !== null){
        UserAPI.User_Balance().then((res) => {
          setUserbalance(res.data.balance);
        }).catch((error)=>{
          setError(true)
        })
      }
    }, 1000);
    return ()=>clearInterval(time)
    // eslint-disable-next-line
  }, []);


  const nav = useNavigate()

  const handleSignOut = ()=>{
    AuthorAPI.LOGOUT().then((res)=>{
      console.log(res);
    })
  }

 
  
  // console.log(userbalance);


  useEffect(() => {
    UserAPI.User_Message().then((res) => {
      setUserMessage(res);
    });
  },[]);

  
  const [balanceShow, setBalanceShow] = useState(true);
  const [expShow, setExpShowShow] = useState(true);

  const balanceHideShow = (e) => {
    e.preventDefault()
    if (balanceShow === true) {
      setBalanceShow(false);
    } else {
      setBalanceShow(true);
    }
  };

  const expHideShow = (e) => {
    e.preventDefault()
    if (expShow === true) {
      setExpShowShow(false);
    } else {
      setExpShowShow(true);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="">
          <header className="header">
            <div className="container-fluid">
              <div className="row row5 pt-1 pb-1">
                <div className="logo col-6">
                  <Link
                    to="/home"
                    className="router-link-exact-active router-link-active">
                    <i class="fa fa-home mr-1"></i>
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
                    <b>{error? "0.00": userbalance===""?"0.00":userbalance}</b>
                  </p>
                  <div className="exp">
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
                          My Market
                          <i className="fas fa-sync-alt ml-1 resetbtn"></i>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="exp-mod">
                        <ExposureModal />
                      </Modal.Body>
                    </Modal> */}
                    <div className="dropdown d-inline-block" onClick={toggle}>
                      <p data-toggle="dropdown" className="dropdown-toggle">
                        <u>{userdetail?.length && userdetail}</u>
                      </p>
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
                          to="/deposit"
                          className={`dropdown-item router-link-exact-active router-link-active ${status?"":"d-none"}`}>
                          Deposit
                        </Link>
                        <Link
                          to="/withdraw"
                          className={`dropdown-item router-link-exact-active router-link-active ${status?"":"d-none"}`}>
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
                        {/* <Link
                          to=""
                          className="dropdown-item">
                          Casino Report History
                        </Link> */}
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
                        <Link
                          className="dropdown-item"
                          onClick={expHideShow}>
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
                        <Link to='/home' className="dropdown-item">
                          Rules
                        </Link>
                        <Link
                          to="/SignOut"
                          onClick={handleSignOut}
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
                      <Link  className="search_icon" onClick={droupMenu}>
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
    </>
  );
};

export default NavBar;
