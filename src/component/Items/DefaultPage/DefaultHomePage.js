import React from 'react'
import Item from '../../item/Item'
import DefaultNav from './DefaultNav'
import TopNav from '../../navBar/TopNav'
import Home from '../../Home/Home'
import BannerList from '../../BannerSection/BannerList'

const DefaultHomePage = () => {
  return (


    <div>
        <DefaultNav/>
        <Home/>
    </div>
  )
}

export default DefaultHomePage