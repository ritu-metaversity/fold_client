import React from 'react'
import '../LiveCasino/LiveCasino.css'
import '../DtList/DtList.css'

import SideBar from '../../sidebar/SideBar'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'

function Worlilist() {
  return (
    <div>
      <NavBar/>
      <div className="main">
   <div className="container-fluid container-fluid-5">
      <div className="row row5">
         <div className="sidebar col-md-2">
            <SideBar/>
         </div>
         <div className="col-md-10 featured-box">
            <div>
               <div>
                  <div className="coupon-card">
                     <div className="game-heading"><span className="card-header-title">
                     Worli
                        </span>
                     </div>
                  </div>
                  <div>
                     <div className="m-b-30 div-figure">
                        <a href="/casino/superover" className="">
                            <img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/worli-matka.jpg" className="img-fluid" alt='' />
                        </a>
                     </div>
                     <div className="m-b-30 div-figure">
                        <a href="/casino/cricketv3" className="">
                            <img src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/banners/instant-worli.jpg" className="img-fluid" alt='' />
                        </a>
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

export default Worlilist
