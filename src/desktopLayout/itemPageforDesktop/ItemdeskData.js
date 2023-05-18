import React from 'react'
import SideBar from '../sidebar/SideBar'
import Itemdesk from './Itemdesk'
import NewLunch from '../Newlunch/NewLunch'

const ItemdeskData = () => {
  return (
    <>
    <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
            <SideBar/>
            </div>
            <div className="col-md-10 featured-box load game-page">
              <Itemdesk/>
              <NewLunch/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemdeskData