import React from 'react'
import Itemdesk from '../itemPageforDesktop/Itemdesk'
import SideBar from '../sidebar/SideBar'


const HomePage = () => {

    const SportId = localStorage.getItem("SportId")

  return (
    <>
    <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
            <SideBar/>
            </div>
            <div className="col-md-10 featured-box load game-page">
                <Itemdesk SportId={SportId}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage