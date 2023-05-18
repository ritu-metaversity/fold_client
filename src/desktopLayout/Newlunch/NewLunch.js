import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameAPI } from "../../apis/gameAPI";
import "./NewLunch.css"

function NewLunch() {
  // const [casinoList, setCasinoList] = useState("");
  //   const [ActiveClass, setActiveClass] = useState(323334);
  const [casinoListId, setCasinoListId] = useState(323334);
  const [casinoData, setCasinoData] = useState([]);
  //   const [casinoName, setCasinoName] = useState("Indian Casino");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GameAPI.CASINO_LIST_BY_TYPE({
      id: casinoListId,
    }).then((res) => {
      setCasinoData(res);
      setIsLoading(false);
    });
  }, [casinoListId]);

const nav = useNavigate();

const handleCasino = (id)=>{
    nav(`/casino/${id}`);
}

  return (
    <div>
      <div className="home-products-container">
        <div className="row row5">
          <div className="col-md-12 newLunch-icon">
            {casinoData?.map((res, id) => {
              return (
                  <div key={id} className="casinoicon" onClick={()=>handleCasino(res?.gameId)}>
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
    </div>
  );
}

export default NewLunch;
