import React from 'react'
import '../DtList/DtList.css'
import './BollywoodTable.css'
import SideBar from '../../sidebar/SideBar'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'

function BollywoodTable() {
    return (
        <div>
            <NavBar/>
            <div className="main">
                <div className="container-fluid container-fluid-5">
                    <div className="row row5">
                        <div className="sidebar col-md-2">
                            <SideBar />
                        </div>
                        <div className="col-md-10 featured-box featured-box1">
                        <div className="bollywood-tbl">
                            <div >
                                <div className="row row5 justify-content-center" style={{marginTop: "10%" }}>
                                    <div className="col-md-4 m-b-20 div-figure"><a href="/casino/aaa" className=""><img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/aaa.jpg" className="img-fluid" alt='' /></a></div>
                                </div>
                                <div className="row row5 justify-content-center">
                                    <div className="col-md-4 m-b-30 div-figure"><a href="/casino/ddb" className=""><img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/ddb.jpg" className="img-fluid" alt='' /></a></div>
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

export default BollywoodTable