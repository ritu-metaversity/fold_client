import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'
import './HorseRace.css'

function HorseRace() {
    return (
        <div>
            <NavBar/>
            <div className="tab-content">
                <div>
                    <ul role="tablist" className="nav nav-tabs mt-2">
                        <li className="nav-item active"><Link to="#goku6106757" data-toggle="tab" className="nav-link active">
                            AU
                        </Link>
                        </li>
                        <li className="nav-item"><Link to="#goku6667679" data-toggle="tab" className="nav-link">
                            GB
                        </Link>
                        </li>
                        <li className="nav-item"><Link to="#goku6468355" data-toggle="tab" className="nav-link">
                            ZA
                        </Link>
                        </li>
                        <li className="nav-item"><Link to="#goku7689931" data-toggle="tab" className="nav-link">
                            FR
                        </Link>
                        </li>
                        <li className="nav-item"><Link to="#goku8714764" data-toggle="tab" className="nav-link">
                            IN
                        </Link>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="goku6106757" className="bet-table tab-pane fade horse-table show">
                            <div className="coupon-card coupon-card-first">
                                <div className="card-content">
                                    <table className="table coupon-table table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{width: "30%"}}>
                                                <Link to="/" className="text-dark">
                                                    Shepparton
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail">
                                                        <Link to="/race-detail/10/506641420" className="timer">
                                                            <span className="timer">15:36</span>
                                                        </Link>
                                                        <Link to="/race-detail/10/465447453" className="timer">
                                                            <span className="timer">16:07</span>
                                                        </Link>
                                                        <Link to="/race-detail/10/578514523" className="timer">
                                                            <span className="timer">16:37</span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width: "30%"}}>
                                                    <Link to="/" className="text-dark">
                                                        Pakenham
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail">
                                                        <Link to="/race-detail/10/694592146" className="timer">
                                                            <span className="timer">15:45</span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width: "30%"}}>
                                                <Link to="/" className="text-dark">
                                                    Penrith
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail">
                                                        <Link to="/" className="timer">
                                                            <span className="timer">15:51</span>
                                                        </Link>
                                                        <Link to="/" className="timer">
                                                            <span className="timer">16:20</span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="goku6667679" className="bet-table tab-pane fade horse-table">
                            <div className="coupon-card coupon-card-first">
                                <div className="card-content">
                                    <table className="table coupon-table table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{width: "30%"}}>
                                                <Link to="/" className="text-dark">
                                                    Wincanton
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/race-detail/10/764124695" className="timer"><span className="timer">19:00</span></Link><Link to="/race-detail/10/475778878" className="timer"><span className="timer">19:30</span></Link><Link to="/race-detail/10/867753978" className="timer"><span className="timer">20:00</span></Link><Link to="/race-detail/10/762410194" className="timer"><span className="timer">20:30</span></Link><Link to="/race-detail/10/877338310" className="timer"><span className="timer">21:05</span></Link><Link to="/race-detail/10/875618103" className="timer"><span className="timer">21:40</span></Link><Link to="/race-detail/10/537325100" className="timer"><span className="timer">22:15</span></Link></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width: "30%"}}>
                                                    <Link to="/" className="text-dark">
                                                    Southwell
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/" className="timer"><span className="timer">18:50</span></Link><Link to="/" className="timer"><span className="timer">19:20</span></Link><Link to="/" className="timer"><span className="timer">19:50</span></Link><Link to="/race-detail/10/879980422" className="timer"><span className="timer">20:20</span></Link><Link to="/" className="timer"><span className="timer">20:55</span></Link><Link to="/" className="timer"><span className="timer">21:30</span></Link><Link to="/" className="timer"><span className="timer">22:05</span></Link><Link to="/" className="timer"><span className="timer">22:35</span></Link></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:"30%"}}><Link to="/" className="text-dark">
                                                    Chelmsford City
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/" className="timer"><span className="timer">23:00</span></Link><Link to="/" className="timer"><span className="timer">23:30</span></Link><Link to="/" className="timer"><span className="timer">00:00</span></Link><Link to="/" className="timer"><span className="timer">00:30</span></Link><Link to="/" className="timer"><span className="timer">01:00</span></Link><Link to="/" className="timer"><span className="timer">01:30</span></Link><Link to="/" className="timer"><span className="timer">02:00</span></Link></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width: "30%"}}><Link to="/" className="text-dark">
                                                    Fakenham
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/" className="timer"><span className="timer">19:10</span></Link><Link to="/" className="timer"><span className="timer">19:40</span></Link><Link to="/" className="timer"><span className="timer">20:10</span></Link><Link to="/" className="timer"><span className="timer">20:45</span></Link><Link to="/" className="timer"><span className="timer">21:20</span></Link><Link to="/" className="timer"><span className="timer">21:55</span></Link></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="goku6468355" className="bet-table tab-pane fade horse-table">
                            <div className="coupon-card coupon-card-first">
                                <div className="card-content">
                                    <table className="table coupon-table table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{width: "30%"}}><Link to="/" className="text-dark">
                                                    Vaal
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/" className="timer"><span className="timer">15:45</span></Link><Link to="/" className="timer"><span className="timer">16:20</span></Link><Link to="/" className="timer"><span className="timer">16:55</span></Link><Link to="/" className="timer"><span className="timer">17:30</span></Link><Link to="/" className="timer"><span className="timer">18:05</span></Link><Link to="/" className="timer"><span className="timer">18:40</span></Link><Link to="/" className="timer"><span className="timer">19:15</span></Link><Link to="/" className="timer"><span className="timer">19:45</span></Link><Link to="/" className="timer"><span className="timer">20:15</span></Link></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="goku7689931" className="bet-table tab-pane fade horse-table">
                            <div className="coupon-card coupon-card-first">
                                <div className="card-content">
                                    <table className="table coupon-table table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{width: "30%"}}><Link to="/" className="text-dark">
                                                    Cagnes-sur-Mer
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/" className="timer"><span className="timer">16:20</span></Link><Link to="/" className="timer"><span className="timer">16:50</span></Link><Link to="/" className="timer"><span className="timer">17:20</span></Link><Link to="/" className="timer"><span className="timer">17:55</span></Link><Link to="/" className="timer"><span className="timer">18:37</span></Link><Link to="/" className="timer"><span className="timer">19:12</span></Link><Link to="/" className="timer"><span className="timer">19:47</span></Link><Link to="/" className="timer"><span className="timer">20:22</span></Link></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="goku8714764" className="bet-table tab-pane fade horse-table">
                            <div className="coupon-card coupon-card-first">
                                <div className="card-content">
                                    <table className="table coupon-table table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td style={{width: "30%"}}><Link to="/" className="text-dark">
                                                    DELHI
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/" className="timer"><span className="timer">15:45</span></Link><Link to="/" className="timer"><span className="timer">16:15</span></Link><Link to="/" className="timer"><span className="timer">16:45</span></Link></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width: "30%"}}><Link to="/" className="text-dark">
                                                    KOLKATA
                                                </Link>
                                                </td>
                                                <td>
                                                    <div className="horse-time-detail"><Link to="/" className="timer"><span className="active">15:30</span></Link><Link to="/" className="timer"><span className="timer">16:00</span></Link></div>
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
            <Footer/>
        </div>
    )
}

export default HorseRace
