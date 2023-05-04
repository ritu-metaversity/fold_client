// import React, { useState } from "react";
// import GamedetailPage from "./GamedetailPage";
// import Sidebar from '../sidebar/SideBar'
// import Bet from '../Bet/Bet'

// function GameHead({ SportId, matchLength }) {
//   const [ActiveNavbar, setActiveNavBar] = useState(1);
//   const [betLength, setBetlenght] = useState(0);
//   const [TvHideShow, setTvHideShow] = useState(false);
//   const [stackValue, setstackValue] = useState([]);
//   const handleClick = (val) => {
//     setActiveNavBar(val);
//   };

//   const handleTvHideShow = () => {
//     if (TvHideShow === false) {
//       setTvHideShow(true);
//     } else {
//       setTvHideShow(false);
//     }
//   };

//   const stackValDesk = (val)=>{
//     stackValue(val)
//   }
//   return (
//     <>
//       <div className="main">
//         {/* <div className="container-fluid container-fluid-5">
//           <div className="row row5">
//             <div className="sidebar col-md-2">
//             <Sidebar/>
//             </div>
//             <div className="col-md-10 featured-box load game-page">
//               <div className="row row5">
//                 <div className="col-md-9 featured-box-detail sports-wrapper m-b-10">
                    
//                     <GamedetailPage/>
//                 </div>
                
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </>
//   );
// }

// export default GameHead;
