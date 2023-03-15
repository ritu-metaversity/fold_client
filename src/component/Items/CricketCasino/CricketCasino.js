import React from 'react'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'
import SideBar from '../../sidebar/SideBar'
import Bet from '../bet/Bet'
import './CricketCasino.css'

function CricketCasino() {
    return (
        <div>
            <NavBar/>
            <div class="main">
                <div class="container-fluid container-fluid-5">
                    <div class="row row5">
                        <div class="sidebar col-md-2">
                            <SideBar />
                        </div>

                        <div class="col-md-10 featured-box">
                            <div >
                                <div >
                                    <div class="row row5">
                                        <div class="coupon-card col-md-9 featured-box-detail">
                                            <div class="game-heading"><span class="card-header-title">Cricket Casino</span> <span class="rules-warning">Please check rules before bet</span></div>
                                            <div class="card-content m-t-10 row">
                                                <div class="col-md-12">
                                                    <div class="form-group row">
                                                        <label for="sel1" class="p-t-10 p-l-20 p-r-20">Event Name: </label>
                                                        <select name="cars" class="form-control col-md-9 criccasino-select">
                                                            <option value="" disabled="disabled">Select</option>
                                                            <option value="4.209135096">
                                                                Zimbabwe v West Indies / 2023-02-04 13:30:00
                                                            </option>
                                                            <option value="4.209479494">
                                                                Otago v Canterbury / 2023-02-06 07:10:00
                                                            </option>
                                                            <option value="4.209488932">
                                                                Sharjah Warriors v Gulf Giants / 2023-02-06 19:30:00
                                                            </option>
                                                            <option value="4.209490558">
                                                                Johannesburg Super Kings v MI Cape Town / 2023-02-06 21:00:00
                                                            </option>
                                                            <option value="4.209527585">
                                                                New Zealand Women v West Indies Women / 2023-02-06 13:30:00
                                                            </option>
                                                        </select>
                                                        <div class="p-l-20"><button type="button" class="btn btn-success">Submit</button></div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3 criccasino-left-sidebar">

                                                </div>

                                            </div>
                                        </div>
                                        <div id="sidebar-right" class="col-md-3 sidebar-right">
                                            <div class="ps">
                                                <Bet />
                                            </div>
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
    )
}

export default CricketCasino
