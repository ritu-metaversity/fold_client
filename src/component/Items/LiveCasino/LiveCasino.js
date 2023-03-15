import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'
import SideBar from '../../sidebar/SideBar'
import './LiveCasino.css'

function LiveCasino() {
    console.log("routee")
    return (
        <div>
            <NavBar/>
            <div className="main">
                <div className="container-fluid container-fluid-5">
                    <div className="row row5">
                        <div className="sidebar col-md-2">
                            <SideBar />
                        </div>
                        <div className="col-md-10 featured-box live-casino">
                            <div >
                                <div >
                                    <div className="coupon-card">
                                        <div className="game-heading"><span className="card-header-title">
                                            Live Casino
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row row5">
                                        <div className="col-4">
                                            <div className="casino-icon">
                                                <Link to="/">
                                                    <img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/img/livecasino/livecasinogaming.jpg" alt='' className="img-fluid" />
                                                    <div className="casino-name">SuperSpade Casino</div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="casino-icon">
                                                <Link to="/">
                                                    <img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/img/livecasino/euzgi_casino.png" alt='' className="img-fluid" />
                                                    <div className="casino-name">Ezugi Casino</div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="casino-icon">
                                                <Link to="/">
                                                    <img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/img/livecasino/evolution_casino.png" alt='' className="img-fluid" />
                                                    <div className="casino-name">Evolution Casino</div>
                                                </Link>
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

export default LiveCasino
