import React from 'react'
import './Race.css'
import SideBar from '../../sidebar/SideBar'
import { Link } from 'react-router-dom'
import Bet from '../bet/Bet'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'

function Race() {
    return (
        <div>
            <NavBar/>
            <div className="main">
                <div className="container-fluid container-fluid-5">
                    <div className="row row5">
                        <div className="sidebar col-md-2">
                            
                            <SideBar/>
                        </div>
                        <div  className="col-md-10 featured-box white-bg">
                            <div  className="row row5">
                                <div  className="col-md-9 casino-container coupon-card featured-box-detail">
                                    <div  className="coupon-card  new-casino race">
                                        <div  className="casino-video">
                                            <div  className="casino-video-title">
                                                <span  className="casino-name">Race 20-20</span>
                                                <div  className="casino-video-rid">Round ID:
                                                    <span >230202124313</span>
                                                </div>
                                                <div  className="total-points">
                                                    <div >
                                                        <div >Total Card:</div>
                                                        <div >9</div>
                                                    </div>
                                                    <div >
                                                        <div >Total Point:</div>
                                                        <div >50</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div  title="Rules" className="casino-video-rules-icon" role="button" tabIndex="0"><i  className="fas fa-info-circle"></i></div>
                                            
                                            <div  className="video-box-container">
                                                <div  className="video-box">
                                                    {/* eslint-disable-next-line */}
                                                    <iframe  src="https://diamondexch9.com/mediaplayer/race20/1C0166F0-3E00-450B-BD9B-75B381E4ECDB==dfront?ip=115.246.121.179" width="100%" style={{border: "0px"}}></iframe>
                                                </div>
                                            </div>
                                            <div  className="clock clock2digit flip-clock-wrapper">
                                                <ul className="flip play">
                                                    <li className="flip-clock-before">
                                                        <Link to="/">
                                                            <div className="up">
                                                                <div className="shadow"></div>
                                                                <div className="inn">9</div>
                                                            </div>
                                                            {/* <div className="down">
                                                                <div className="shadow"></div>
                                                                <div className="inn">9</div>
                                                            </div> */}
                                                        </Link>
                                                    </li>
                                                    <li className="flip-clock-active">
                                                        <Link to="/">
                                                            {/* <div className="up">
                                                                <div className="shadow"></div>
                                                                <div className="inn">0</div>
                                                            </div>
                                                            <div className="down">
                                                                <div className="shadow"></div>
                                                                <div className="inn">0</div>
                                                            </div> */}
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <ul className="flip play">
                                                    <li className="flip-clock-before">
                                                        <Link to="/">
                                                            <div className="up">
                                                                <div className="shadow"></div>
                                                                <div className="inn">1</div>
                                                            </div>
                                                            {/* <div className="down">
                                                                <div className="shadow"></div>
                                                                <div className="inn">1</div>
                                                            </div> */}
                                                        </Link>
                                                    </li>
                                                    <li className="flip-clock-active">
                                                        <Link to="/">
                                                            {/* <div className="up">
                                                                <div className="shadow"></div>
                                                                <div className="inn">0</div>
                                                            </div>
                                                            <div className="down">
                                                                <div className="shadow"></div>
                                                                <div className="inn">0</div>
                                                            </div> */}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div  className="video-overlay">
                                                <div  className="mb-1"><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/spade.png" alt='' /></span> <span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/JHH.png" alt='' /></span><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/4HH.png" alt='' /></span><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/7HH.png" alt='' /></span> <span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/KHH.png" alt='' /></span></div>
                                                <div  className="mb-1"><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/heart.png" alt='' /></span> <span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/7DD.png" alt='' /></span><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/8DD.png" alt='' /></span> <span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/KDD.png" alt='' /></span></div>
                                                <div  className="mb-1"><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/club.png" alt='' /></span> <span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/4CC.png" alt='' /></span><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/3CC.png" alt='' /></span><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/5CC.png" alt='' /></span><span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/ACC.png" alt='' /></span> <span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/KCC.png" alt='' /></span></div>
                                                <div  className="mb-1">
                                                    <span ><img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/diamond.png" alt='' /></span>  
                                                </div>
                                            </div>
                                        </div>
                                        <div  className="card-content m-t-10">
                                            <div  className="casino-odds-box-wrapper">
                                                <div  className="casino-odds-box-container casino-odds-box-container-double">
                                                    <div  className="casino-odds-box-bhav">
                                                        <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/KHH.png" style={{width: "35px"}} alt="" />
                                                            <div  className="range-icon">
                                                                <i  data-toggle="collapse" data-target="#demo0" className="fas fa-info-circle float-right"></i>
                                                                <div  id="demo0" className="collapse icon-range">
                                                                    Range:<span >100</span>-<span >100K</span>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div  className="casino-odds-box suspended">
                                                        <div  className="back-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                        <div  className="lay-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                    </div>
                                                    <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                </div>
                                                <div  className="casino-odds-box-container casino-odds-box-container-double">
                                                    <div  className="casino-odds-box-bhav">
                                                        <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/KDD.png" style={{width: "35px"}} alt="" />
                                                            <div  className="range-icon">
                                                                <i  data-toggle="collapse" data-target="#demo1" className="fas fa-info-circle float-right"></i>
                                                                <div  id="demo1" className="collapse icon-range">
                                                                    Range:<span >100</span>-<span >100K</span>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div  className="casino-odds-box suspended">
                                                        <div  className="back-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                        <div  className="lay-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                    </div>
                                                    <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                </div>
                                                <div  className="casino-odds-box-container casino-odds-box-container-double">
                                                    <div  className="casino-odds-box-bhav">
                                                        <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/KCC.png" style={{width: "35px"}} alt="" />
                                                            <div  className="range-icon">
                                                                <i  data-toggle="collapse" data-target="#demo2" className="fas fa-info-circle float-right"></i>
                                                                <div  id="demo2" className="collapse icon-range">
                                                                    Range:<span >100</span>-<span >100K</span>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div  className="casino-odds-box suspended">
                                                        <div  className="back-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                        <div  className="lay-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                    </div>
                                                    <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                </div>
                                                <div  className="casino-odds-box-container casino-odds-box-container-double">
                                                    <div  className="casino-odds-box-bhav">
                                                        <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/KSS.png" style={{width: "35px"}} alt="" />
                                                            <div  className="range-icon">
                                                                <i  data-toggle="collapse" data-target="#demo3" className="fas fa-info-circle float-right"></i>
                                                                <div  id="demo3" className="collapse icon-range">
                                                                    Range:<span >100</span>-<span >100K</span>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div  className="casino-odds-box suspended">
                                                        <div  className="back-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                        <div  className="lay-border"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                    </div>
                                                    <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div  className="row row5 mt-2">
                                            <div  className="col-4">
                                                <div  className="card-content">
                                                    <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                        <div  className="casino-yn">
                                                            <div ></div>
                                                            <div  className="casino-odds-box-bhav"><b >No</b></div>
                                                            <div  className="casino-odds-box-bhav"><b >Yes</b></div>
                                                        </div>
                                                        <div  className="casino-odds-box casino-yn">
                                                            <div  className="casino-odds-box-bhav">
                                                                <b >Total Point</b>
                                                                <div  className="range-icon">
                                                                    <i  data-toggle="collapse" data-target="#demo4" className="fas fa-info-circle float-right"></i>
                                                                    <div  id="demo4" className="collapse icon-range">
                                                                        Range:<span >100</span>-<span >100K</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div  className="lay-border suspended"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                            <div  className="back-border suspended"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                        </div>
                                                        <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                    </div>
                                                    <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                        <div  className="casino-yn">
                                                            <div ></div>
                                                            <div  className="casino-odds-box-bhav"><b >No</b></div>
                                                            <div  className="casino-odds-box-bhav"><b >Yes</b></div>
                                                        </div>
                                                        <div  className="casino-odds-box casino-yn">
                                                            <div  className="casino-odds-box-bhav">
                                                                <b >Total Card</b>
                                                                <div  className="range-icon">
                                                                    <i  data-toggle="collapse" data-target="#demo5" className="fas fa-info-circle float-right"></i>
                                                                    <div  id="demo5" className="collapse icon-range">
                                                                        Range:<span >100</span>-<span >100K</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div  className="lay-border suspended"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                            <div  className="back-border suspended"><span  className="casino-odds-box-odd">0.00</span> <span >0</span></div>
                                                        </div>
                                                        <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div  className="col-8">
                                                <div  className="card-content">
                                                    <div  className="row row5">
                                                        <div  className="col-4">
                                                            <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                                <div  className="casino-odds-box-bhav">
                                                                    <b >Win with 5</b>
                                                                    <div  className="range-icon">
                                                                        <i  data-toggle="collapse" data-target="#demo6" className="fas fa-info-circle float-right"></i>
                                                                        <div  id="demo6" className="collapse icon-range">
                                                                            Range:<span >10</span>-<span >25K</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div  className="casino-odds-box back-border suspended"><span  className="casino-odds-box-odd">0.00</span></div>
                                                                <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                            </div>
                                                            <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                                <div  className="casino-odds-box-bhav">
                                                                    <b >Win with 15</b>
                                                                    <div  className="range-icon">
                                                                        <i  data-toggle="collapse" data-target="#demo9" className="fas fa-info-circle float-right"></i>
                                                                        <div  id="demo9" className="collapse icon-range">
                                                                            Range:<span >10</span>-<span >25K</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div  className="casino-odds-box back-border suspended"><span  className="casino-odds-box-odd">0.00</span></div>
                                                                <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                            </div>
                                                        </div>
                                                        <div  className="col-4">
                                                            <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                                <div  className="casino-odds-box-bhav">
                                                                    <b >Win with 6</b>
                                                                    <div  className="range-icon">
                                                                        <i  data-toggle="collapse" data-target="#demo7" className="fas fa-info-circle float-right"></i>
                                                                        <div  id="demo7" className="collapse icon-range">
                                                                            Range:<span >10</span>-<span >25K</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div  className="casino-odds-box back-border suspended"><span  className="casino-odds-box-odd">0.00</span></div>
                                                                <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                            </div>
                                                            <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                                <div  className="casino-odds-box-bhav">
                                                                    <b >Win with 16</b>
                                                                    <div  className="range-icon">
                                                                        <i  data-toggle="collapse" data-target="#demo10" className="fas fa-info-circle float-right"></i>
                                                                        <div  id="demo10" className="collapse icon-range">
                                                                            Range:<span >10</span>-<span >25K</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div  className="casino-odds-box back-border suspended"><span  className="casino-odds-box-odd">0.00</span></div>
                                                                <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                            </div>
                                                        </div>
                                                        <div  className="col-4">
                                                            <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                                <div  className="casino-odds-box-bhav">
                                                                    <b >Win with 7</b>
                                                                    <div  className="range-icon">
                                                                        <i  data-toggle="collapse" data-target="#demo8" className="fas fa-info-circle float-right"></i>
                                                                        <div  id="demo8" className="collapse icon-range">
                                                                            Range:<span >10</span>-<span >25K</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div  className="casino-odds-box back-border suspended"><span  className="casino-odds-box-odd">0.00</span></div>
                                                                <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                            </div>
                                                            <div  className="casino-odds-box-container casino-odds-box-container-extra">
                                                                <div  className="casino-odds-box-bhav">
                                                                    <b >Win with 17</b>
                                                                    <div  className="range-icon">
                                                                        <i  data-toggle="collapse" data-target="#demo11" className="fas fa-info-circle float-right"></i>
                                                                        <div  id="demo11" className="collapse icon-range">
                                                                            Range:<span >10</span>-<span >25K</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div  className="casino-odds-box back-border suspended"><span  className="casino-odds-box-odd">0.00</span></div>
                                                                <div  className="casino-odds-book" style={{color: "black"}}>0</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* eslint-disable-next-line */}
                                        <marquee  scrollamount="3" className="casino-remark m-b-10">
                                            Hi.
                                        </marquee>
                                        <div  className="fancy-marker-title">
                                            <h4 >
                                                Last Result
                                                <Link  to="/casinoresults/race20" className="result-view-all">View
                                                    All</Link>
                                            </h4>
                                        </div>
                                        <div  className="m-b-10">
                                            <p  id="last-result" className="text-right">
                                                <span  className="last-result ball-runs playersuit">
                                                    <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/heart.png" alt='' />  
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                    <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/spade.png" alt='' />   
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                     <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/diamond.png" alt="" className="diamond"/>
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                     <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/club.png" alt=''/> 
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                     <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/diamond.png" alt="" className="diamond"/>
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                    <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/spade.png" alt=''/>   
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                   <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/heart.png" alt='' />  
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                    <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/club.png" alt='' /> 
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                   <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/club.png" alt='' /> 
                                                </span>
                                                <span  className="last-result ball-runs playersuit">
                                                    <img  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/cards/diamond.png" alt="" className="diamond"/>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div  id="sidebar-right" className="col-md-3 sidebar-right">
                                    <Bet/>
                                </div>
                                <div >
                                    
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

export default Race
