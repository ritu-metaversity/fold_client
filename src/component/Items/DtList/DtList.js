import React from 'react'
import SideBar from '../../sidebar/SideBar'
import '../LiveCasino/LiveCasino.css'
import './DtList.css'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'

function DtList() {
    return (
        <div>
            <NavBar/>
            <div className="main">
                <div className="container-fluid container-fluid-5">
                    <div className="row row5">
                        <div className="sidebar col-md-2">
                            <SideBar />
                        </div>
                        <div className="col-md-10 featured-box">
                            <div className="coupon-card">
                                <div className="game-heading"><span className="card-header-title">
                                    Dragon Tiger
                                </span>
                                </div>
                            </div>
                            <div>
                                <div className="m-b-30 div-figure">
                                    <a href="/casino/dt202" className=""><img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/dt202.jpg" className="img-fluid" alt='' /></a>
                                </div>
                                <div className="m-b-30 div-figure">
                                    <a href="/casino/dtl20" className=""><img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/dtl20.jpg" className="img-fluid" alt='' /></a>
                                </div>
                                <div className="m-b-30 div-figure">
                                    <a href="/casino/dt20" className=""><img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/dt20.jpg" className="img-fluid" alt='' /></a>
                                </div>
                                <div className="m-b-30 div-figure">
                                    <a href="/casino/dt6" className=""><img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/dt6.jpg" className="img-fluid" alt='' /></a>
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

export default DtList
