import { React, useState } from 'react'
import Footer from '../footer/Footer'
import Item from '../item/Item'
// import NavBar from '../navBar/NavBar'
import SideBar from '../sidebar/SideBar'

function RightHeader() {
    const [game, setGame] = useState('');

    const sendData = (id) => {
        setGame(id)
        console.log(id)
    }
    return (
        <div>
            <div className="main">
                <div className="container-fluid container-fluid-5">
                    <div className="row row5">
                        <div className="sidebar col-md-2">
                            <SideBar />
                        </div>
                        <div className="col-md-10 featured-box">
                            <div>
        
                                <div class="game-heading"><span class="card-header-title">
                                    {game}
                                </span>
                                </div>
                            </div>

                            <Item />
                        </div>
                        <div className='mobile-view-item'>
                        <Item />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RightHeader