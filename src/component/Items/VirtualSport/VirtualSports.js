import React from "react";
import Footer from "../../footer/Footer";
import NavBar from "../../navBar/NavBar";
import SideBar from '../../sidebar/SideBar'
import "../LiveCasino/LiveCasino.css";
import "../VirtualSport/VirtualSports.css";

function VirtualSports() {
  return (
    <div>
      <NavBar/>
      <div class="main">
        <div class="container-fluid container-fluid-5">
          <div class="row row5">
            <div class="sidebar col-md-2">
              <SideBar />
            </div>
            <div data-v-322e3627="" class="col-md-10 featured-box">
              <div data-v-322e3627="" class="coupon-card coupon-card-first">
                <div data-v-322e3627="" class="game-heading">
                  <span data-v-322e3627="" class="card-header-title">
                    Virtual Sports
                  </span>
                </div>
                <div
                  data-v-322e3627=""
                  id="slotGamesAll"
                  class="card-content container-fluid">
                  <div data-v-322e3627="" class="row">
                    <div data-v-322e3627="" class="col-md-2">
                      <figure data-v-322e3627="">
                        <img
                          data-v-322e3627=""
                          src="https://qtgameimage.gameproviderservice.com/QT/BVS/BVS-virtualbasketballleague.png"
                          className="casino-img"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div data-v-322e3627="" class="col-md-2">
                      <figure data-v-322e3627="">
                        <img
                          data-v-322e3627=""
                          src="https://qtgameimage.gameproviderservice.com/QT/BVS/BVS-virtualdograces.png"
                          className="casino-img"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div data-v-322e3627="" class="col-md-2">
                      <figure data-v-322e3627="">
                        <img
                          data-v-322e3627=""
                          src="https://qtgameimage.gameproviderservice.com/QT/BVS/BVS-virtualfootballasiancup.png"
                          className="casino-img"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div data-v-322e3627="" class="col-md-2">
                      <figure data-v-322e3627="">
                        <img
                          data-v-322e3627=""
                          src="https://qtgameimage.gameproviderservice.com/QT/BVS/BVS-virtualfootballleague.png"
                          className="casino-img"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div data-v-322e3627="" class="col-md-2">
                      <figure data-v-322e3627="">
                        <img
                          data-v-322e3627=""
                          src="https://qtgameimage.gameproviderservice.com/QT/BVS/BVS-virtualfootballworldcup.png"
                          className="casino-img"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div data-v-322e3627="" class="col-md-2">
                      <figure data-v-322e3627="">
                        <img
                          data-v-322e3627=""
                          src="https://qtgameimage.gameproviderservice.com/QT/BVS/BVS-virtualhorseclassics.png"
                          className="casino-img"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div data-v-322e3627="" class="col-md-2">
                      <figure data-v-322e3627="">
                        <img
                          data-v-322e3627=""
                          src="https://qtgameimage.gameproviderservice.com/QT/BVS/BVS-virtualtennisopen.png"
                          className="casino-img"
                          alt=""
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default VirtualSports;
