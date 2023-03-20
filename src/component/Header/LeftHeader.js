import {React, useState} from 'react'
import Footer from '../footer/Footer'
import Item from '../item/Item'
// import NavBar from '../navBar/NavBar'
import SideBar from '../sidebar/SideBar'
// import axios from 'axios'

function LeftHeader(props) {

    const [game, setGame] = useState('');

    const sendData=(id)=>{
        setGame(id)
    }
    const id = props.id;

    // const token = localStorage.getItem("token");

// useEffect(() => {
//     const logindata = {
//       token
//     };
  
//     axios
//       .post(
//         "http://api.a2zscore.com/admin-new-apis/enduser/active-sport-list",
//         logindata
//       )
//       .then((res) => {
//         var matchData = res.data.data;
//         matchData.map((e)=>{
//           console.log(e.sportId);
//           console.log(e.sportName);
//           localStorage.setItem("sportId", e. );
//           localStorage.setItem("sportName", e.sportName);
//         })
//         // console.log(matchData);
//       }); // eslint-disable-next-line
//   }, []);
  


    return (
        <div>
            {/* <NavBar sendDataFn={sendData}  /> */}
            <div className="main">
                <div className="container-fluid container-fluid-5">
                    <div className="row row5">
                        <div className="sidebar col-md-2">
                            <SideBar />
                        </div>
                        <div className="col-md-10 featured-box">
                            <ul role="tablist" id="home-events" class="nav nav-tabs">
                                <li class="nav-item"><a href="/" data-toggle="tab" class="nav-link active">{game}</a></li>
                            </ul>
                            <Item />
                        </div>
                        <div className="mobile-view-item">
                         <Item  id={id} />

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LeftHeader