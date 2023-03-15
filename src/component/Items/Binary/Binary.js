import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'
import SideBar from '../../sidebar/SideBar'
import './Binary.css'

function Binary() {
    return (
        <div>
            <NavBar/>
            <div className="main">
                <div className="container-fluid container-fluid-5">
                    <div className="row row5">
                        <div className="sidebar col-md-2">
                            <SideBar/>
                        </div>
                        <div  className="col-md-10 featured-box">
                            <div >
                                <div >
                                    <div  className="game-heading"><span  className="card-header-title">
                                        Binary Market
                                    </span>
                                    </div>
                                    <div  className="card-content">
                                        <table  className="table ">
                                            <tbody >
                                                <tr >
                                                    <td ><Link  to="/" className="text-dark" style={{fontSize: "20px"}} ><b >Binary / 2023-02-02</b></Link> <span  className="blinking clickhere"><i  className="fas fa-hand-point-left"></i> Click Here
                                                    </span>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td ><Link to="/" className="text-dark" style={{fontSize: "20px"}}><b >Binary / 2023-02-03</b></Link> <span  className="blinking clickhere"><i  className="fas fa-hand-point-left"></i> Click Here
                                                    </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default Binary
