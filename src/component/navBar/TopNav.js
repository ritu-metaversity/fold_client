import { React, useState, useEffect } from "react";
import "../item/Item.css";
import { GameAPI } from "../../apis/gameAPI";

function TopNav(props) {
  const [Active, setActive] = useState(4);
  const [activeSport, setActiveSport] = useState([]);


  useEffect(() => {
    GameAPI.ACTIVE_SPORT_LIST().then((res) => {
      setActiveSport(res);
    });
  }, []);

  const handleClick = (val) => {
    props.gameId(val);
    setActive(val);
  };

  return (
    <div>
      {/* <div className="desk-view-topNav">
        <ul role="tablist" id="home-events" className="nav nav-tabs">
          {NavList.map((myList, id) => {
            return (
              <li
                className="nav-item"
                key={id}
                onClick={() => handleShowSingleSport(id)}>
                <Link
                  to="/home"
                  data-toggle="tab"
                  key={id}
                  className={toggle === id ? "nav-link1 active1" : "nav-link1"}>
                  {myList}
                </Link>
              </li>
            );
          })}
        </ul>
      </div> */}

      {/* Mobile view TopNav Bar */}
      {/* --------------------------------------- */}
      {/* --------------------------------------- */}
      {/* --------------------------------------- */}

      <div className="sports active">
        <ul className="nav nav-tabs game-nav-bar">
          {activeSport.map((res, id) => {
              return (
                <li className="nav-item text-center" key={id}>
                  <a
                    data-toggle="tab"
                    href="#1"
                    className={`nav-link nav1 ${
                      Active === res.sportId ? "active" : null
                    }`}
                    onClick={() => handleClick(res.sportId)}>
                    <div>
                      {
                        res.sportId===4?<img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/4.png"
                         alt="" />:res.sportId===1?
                        <img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/59.png" alt="" />:
                        <img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/2.png" alt="" />
                      }
                      
                    </div>
                    <div>{res.sportName}</div>
                  </a>
                </li>
              );
          })}

          
          {/* <li  className="nav-item text-center" >
            <a
              
              data-toggle="tab"
              href="#10"
              className={`nav-link nav1 ${Active===10?"active":null}`}
              onClick={()=>handleClick(10)}
              >
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/10.png"
                  alt=""
                />
              </div>
              <div >Horse Racing</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center" >
            <a
              
              data-toggle="tab"
              href="#8"
              className={`nav-link nav1 ${Active===8?"active":null}`}
              onClick={()=>handleClick(8)}>
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/8.png"
                  alt=""
                />
              </div>
              <div >Table Tennis</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center"
          >
            <a
              
              data-toggle="tab"
              href="#15"
              className={`nav-link nav1 ${Active===15?"active":null}`}
              onClick={()=>handleClick(15)}>
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/15.png"
                  alt=""
                />
              </div>
              <div >Basketball</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center"
          >
            <a
              
              data-toggle="tab"
              onClick={()=>handleClick(18)}
              href="#18"
              className={`nav-link nav1 ${Active===18?"active":null}`}>
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/18.png"
                  alt=""
                />
              </div>
              <div >Volleyball</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center" >
            <a
              
              data-toggle="tab"
              href="#66"
              className={`nav-link nav1 ${Active===66?"active":null}`}
              onClick={()=>handleClick(66)}
             >
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/66.png"
                  alt=""
                />
              </div>
              <div >Kabaddi</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center">
            <a
              
              data-toggle="tab"
              href="#19"
              className={`nav-link nav1 ${Active===19?"active":null}`}
              onClick={()=>handleClick(19)}
              >
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/19.png"
                  alt=""
                />
              </div>
              <div >Ice Hockey</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center" >
            <a
              
              data-toggle="tab"
              href="#9"
              className={`nav-link nav1 ${Active===9?"active":null}`}
              onClick={()=>handleClick(9)}
              >
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/9.png"
                  alt=""
                />
              </div>
              <div >Futsal</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center" >
            <a
              
              data-toggle="tab"
              href="#11"
              className={`nav-link nav1 ${Active===11?"active":""}`}
              onClick={()=>handleClick(11)}>
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/11.png"
                  alt=""
                />
              </div>
              <div >E Games</div>
            </a>
          </li> */}
          {/* <li  className="nav-item text-center" >
            <a
              
              data-toggle="tab"
              href="#59"
              className={`nav-link nav1 ${Active===59?"active":null}`}
              onClick={()=>handleClick(59)}>
              <div >
                <img
                  
                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/gameImg/59.png"
                  alt=""
                />
              </div>
              <div >Snooker</div>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default TopNav;
