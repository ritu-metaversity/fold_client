import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameAPI } from "../../apis/gameAPI";
import "./NewLunch.css"
import { Modal } from "react-bootstrap";

function NewLunch() {
  // const [casinoList, setCasinoList] = useState("");
  //   const [ActiveClass, setActiveClass] = useState(323334);
  const [casinoListId, setCasinoListId] = useState(323334);
  const [casinoData, setCasinoData] = useState([]);
  //   const [casinoName, setCasinoName] = useState("Indian Casino");
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [casinoId, setCasinoId] = useState();
  const [SportName, setSportName] = useState("");

  // useEffect(() => {
  //   GameAPI.CASINO_LIST_BY_TYPE({
  //     id: casinoListId,
  //   }).then((res) => {
  //     setCasinoData(res);
  //     setIsLoading(false);
  //   });
  // }, [casinoListId]);


  useEffect(() => {
    fetch("https://admin-api-banners-new.s3.ap-south-1.amazonaws.com/diamond.json")
      .then((res) => res.json())
      .then((res) => {
        setCasinoData(res?.data)
      setIsLoading(false)

      });
  }, []);

  const finishLoading = () => {
    setIsLoading(false);
  };

const nav = useNavigate();
const token = localStorage.getItem("token");
const handleClose = () => setShow(false);
const handleCasino = (id, gameName)=>{
    // nav(`/casino/${id}`);
    setCasinoId(id)
    setSportName(gameName)
    if(localStorage.getItem("token") !== null){
      setShow(true)
    }else{
      nav("/login")
    }
}

  return (
    <div>
      <div className="home-products-container">
        <div className="row row5">
          <div className="col-md-12 newLunch-icon">
            {casinoData?.map((res, id) => {
              return (
                  <div key={id} className="casinoicon" onClick={()=>handleCasino(res?.gameId, res.gameName)}>
                    <div className="d-inline-block casinoicons">
                      <img
                        src={res?.imageUrl}
                        alt="card"
                        className="img-fluid"
                      />
                      <div className="casino-name newLunchName">{res?.gameName}</div>
                    </div>
                  </div>
              );
            })}

            {/* <Link to="/casino/superover" className="">
              <div className="d-inline-block casinoicons">
                <img
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/casinoicons/img/superover.jpg"
                  alt="card"
                  className="img-fluid"
                />
                <div className="casino-name">Super Over</div>
                <div className="new-launch-casino">
                  <img
                    src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/img/offer-patch.png"
                    alt="card"
                  />
                </div>
              </div>
            </Link> */}
          </div>
        </div>
      </div>
      <Modal show={show} size="xl" className="slot-modal" onHide={handleClose}>
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

export default NewLunch;
