import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import Accordion from "react-bootstrap/Accordion";

import axios from "axios";
import { Modal } from "react-bootstrap";
import CasinoModals from "../../component/Items/Slot/CasinoModals/CasinoModals";

function SideBar() {
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [toggle, setToggle] = useState();
  const [matchList, setMatchList] = useState("");
  const [casinoData, setCasinoData] = useState([]);
  const [SportId, setSportId] = useState();
  const [ShowCollepes, setShowCollepes] = useState(false);
  const [closeAllSportData, setCloseAllSportData] = useState(true);
  const [casinoId, setCasinoId] = useState();
  const [show, setShow] = useState(false);
  const [Casinoshow, setCasinoShow] = useState(false);
  
  const [SportName, setSportName] = useState("");

  function collapse() {
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
      setVisible2(false)
    }
  }
  function collapse2() {
    if (visible2 === true) {
      setVisible2(false);
    } else {
      setVisible2(true);
      setVisible(false)
    }
  }
  const handleSportId = (id, val) => {
    setToggle(id);
    localStorage.setItem("SportId", val);
    setSportId(val);
    setShowCollepes(!ShowCollepes);
    setCloseAllSportData(false);
  };

  useEffect(() => {
    axios
      .post(
        "https://api.247365.exchange/admin-new-apis/enduser/left-menu-data-open"
      )
      .then((res) => {
        setMatchList(res?.data?.data);
      });
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://admin-api-banners-new.s3.ap-south-1.amazonaws.com/diamond.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setCasinoData(res?.data);
        setIsLoading(false);
      });
  }, []);


  const token = localStorage.getItem("token");
  const handleClose = () => setCasinoShow(false);

  const finishLoading = () => {
    setIsLoading(false);
  };

  const nav = useNavigate()
  const handleData = (id, gameName, e) => {
    setCasinoId(id)
    setSportName(gameName)
    if(localStorage.getItem("token") !== null){
      setShow(true)
    }else{
      nav('/login')
    }
    e.preventDefault();
  };

  const handleAgree=()=>{
    setCasinoShow(true)
    setShow(false)
  }



  return (
    <div className="">
      <div
        data-toggle="collapse"
        data-target=".casino"
        onClick={collapse}
        className={`sidebar-title ${visible ? "" : "collapsed"}`}
        aria-expanded={`${visible ? true : false}`}>
        <h5 className="d-inline-block m-b-0">Others</h5>
        <p className="arrow-line">
          {visible ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </p>
      </div>
      <nav className={`casino ${visible ? "collapse show" : "d-none"}`}>
        <ul>
          {/* <li className="nav-item">
            <Link to="/livecasino" className="nav-link">
              <span className="new-launch-text">Live Casino</span>
            </Link>
          </li> */}
          {casinoData?.map((res, id) => {
            return (
              <li className="nav-item c-pointer" key={id} onClick={(e)=>handleData(res.gameId,res.gameName, e)}>
                <p to={`/casino/${res?.gameId}`} className="nav-link">
                  <span className="new-launch-text">{res?.gameName}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="sidebar-title m-t-5 theme2bg"
        onClick={collapse2}
        aria-controls="events"
        aria-expanded="true"
        role="button">
        <h5 className="text-white d-inline-block m-b-0">All Sports</h5>
        <p className="arrow-line">
          {visible2 ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </p>
      </div>
      <Accordion defaultActiveKey="0"  className="main_sport_header">
      {matchList?.length && visible2 &&
        matchList?.map((e, id) => {
          return (
            <Accordion.Item eventKey={id}>
                <Accordion.Header onClick={() => handleSportId(id, e?.sportId)} className="sport_header">
                { toggle === id ?<AiOutlineMinusSquare />: <AiOutlinePlusSquare />}
                   {e?.sportName}
                </Accordion.Header>
                {e?.matchList?.map((item, index) => {
                  return (
                    <Accordion.Body>
                      <p className="nav-item" key={index}>
                        <Link
                          to={`/gamedetail/${item?.matchId}`}
                          className="sub-nav-link">
                          <span className="new-launch-text">
                            {item?.matchName}
                          </span>
                        </Link>
                      </p>
                    </Accordion.Body>
                  );
                })}
              </Accordion.Item>
          );
        })}
        </Accordion>


        <Modal centered show={show}   onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals/>
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={()=>setShow(false)}>No, I Don't Agree</button>
          </div>
        </Modal.Body>
      </Modal>


        <Modal show={Casinoshow} size="xl" className="slot-modal" onHide={handleClose}>
      <Modal.Header className="mob_none" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {SportName}
        </Modal.Title>
      </Modal.Header>
        <button  onClick={()=>setShow(false)} className="close_btn desk_none">X</button>
        <Modal.Body>
        {isLoading ? (
        <p className="lodder">
        <i className="fa fa-spinner fa-spin"></i>
      </p>
      ) : (
        <iframe
          src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${casinoId}`}
          className="mobile_if"
          width="100%"
          title="mobile"
          allowFullScreen={true}
          onLoad={finishLoading} />
      )}

      <iframe
        src={`https://d2.fawk.app/#/splash-screen/${token}/9482?opentable=${casinoId}`}
        className="desktop_if"
        width="100%"
        title="desktop"
        onLoad={finishLoading}
      />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SideBar;
