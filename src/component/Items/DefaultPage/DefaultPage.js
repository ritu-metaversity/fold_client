import React from 'react'
import SportData from '../../Sports/SportData'
import Slot from '../Slot/Slot'
import Mobilenav from '../../navBar/MobileNav/Mobilenav'
import DefauilNav from './DefaultNav'

const DefaultPage = () => {
  return (
    <>
    <DefauilNav/>
    <SportData/>
    </>
  )
}

export default DefaultPage