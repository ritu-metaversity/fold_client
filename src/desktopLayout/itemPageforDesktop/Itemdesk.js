import { React, useEffect, useState } from "react";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Itemdesk.css'
import axios from "axios";

function Itemdesk({SportId}) {
  const [gameName, setGameName] = useState("");
  const [SportIdd, setSportIdd] = useState(4);
//   const token = localStorage.getItem("token");


console.log(SportId);


// useEffect(() => {
//   axios
//     .get(
//       `http://43.205.50.127:9000/betfair_api/active_match/4`,
//       {token : localStorage.getItem("token")}
//     )
//     .then((res) => {
//       setGameName(res?.data?.data);

//       console.log(res.data?.data, "dfsfsd")
//     });

// }, []);

  useEffect(() => {
      axios
        .get(
          `http://43.205.50.127:9000/betfair_api/active_match/${SportId === undefined ?4:SportId}`,
          {token : localStorage.getItem("token")}
        )
        .then((res) => {
          setGameName(res?.data?.data);

          console.log(res.data?.data, "dfsfsd")
        });

  }, [SportId]);


const nav = useNavigate()

const {pathname} = useLocation()

const tab = pathname.slice(1)

console.log(pathname)

const handleData=(id)=>{
    nav(`/gamedetail/${id}`)

}

  return (
    <div>
      <div className="desk-top-view">
        <ul role="tablist" id="home-events" className="nav nav-tabs game_name" >
          <li className="nav-item " >
            <Link to={`/${tab}`} data-toggle="tab" className="nav-link"
              >
              {tab == "home"?"Cricket":tab}
            </Link>
          </li>
        </ul>
        
        <div className="tab-content">
          <div className="tab-pane active">
            <div className="coupon-card coupon-card-first">
              <div className="card-content" style={{ overflow: "scroll" }}>
                <table className="table item-table coupon-table">
                  <thead>
                    <tr>
                      <th style={{ width: "63%" }}>Game</th>
                      <th colSpan="2">1</th>
                      <th colSpan="2">X</th>
                      <th colSpan="2">2</th>
                    </tr>
                  </thead>
                  <tbody>
                   {
                    gameName && gameName?.map((item)=>{
                        return(
                            <tr key={item.matchId}>
                            <td>
                              <div className="game-name gName" 
                              onClick={()=>handleData(item?.matchId)}
                              >
                                <Link className="text-dark" >
                                  {item.matchName} /{" "}
                                  {moment(item.openDate).format(
                                    "MMM DD YYYY h:mm a"
                                  )}
                                 
                                </Link>
                              </div>
                              <div className="game-icons gIcon">
                                <span className="game-icon">
                                  <span
                                    className={
                                      item.inPlay === false ? "" : "active"
                                    }>
                                    {" "}
                                  </span>
                                </span>
                                <span className="game-icon">
                                  <i className="fas fa-tv v-m icon-tv"></i>
                                </span>
                                <span className="game-icon">
                                  <img
                                    src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_fancy.png"
                                    alt=""
                                    className="fancy-icon"
                                  />
                                </span>
                                <span className="game-icon">
                                  <img
                                    src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_bm.png"
                                    alt=""
                                    className={
                                      item.bm ? "bookmaker-icon " : "d-none"
                                    }
                                  />
                                </span>
                                <span className="game-icon">
                                  <img
                                    src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_vir.png"
                                    alt=""
                                    className="ic-card"
                                  />
                                </span>
                              </div>
                            </td>
                            <td>
                              <button className="back">
                                <span className="odd">
                                  {item.team1Back === 0
                                    ? "-"
                                    : item.team1Back}
                                </span>
                              </button>
                            </td>
                            <td>
                              <button className="lay">
                                <span className="odd">
                                  {item.team1Lay === 0 ? "-" : item.team1Lay}
                                </span>
                              </button>
                            </td>
                            <td>
                              <button className="back">
                                <span className="odd">
                                  {item.drawBack === 0 ? "-" : item.drawBack}
                                </span>
                              </button>
                            </td>
                            <td>
                              <button className="lay">
                                <span className="odd">
                                  {item.drawLay === 0 ? "-" : item.drawLay}
                                </span>
                              </button>
                            </td>
                            <td>
                              <button className="back">
                                <span className="odd">
                                  {item.team2Back === 0
                                    ? "-"
                                    : item.team2Back}
                                </span>
                              </button>
                            </td>
                            <td>
                              <button className="lay">
                                <span className="odd">
                                  {item.team2Lay === 0 ? "-" : item.team2Lay}
                                </span>
                              </button>
                            </td>
                          </tr>
                        )
                    })
                   }
                           
                          
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itemdesk;