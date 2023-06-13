// import React, { useEffect } from "react";
// import SideBar from "../sidebar/SideBar";
// import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import LoginForDesk from "../LoginForDesk/LoginForDesk";
// // import NavbarDesk from "../Navbarfordesk/NavbarDesk";
// import ItemPageForHome from "../HomePage/ItemPageForHome";
// import GamedetailPage from "../gameDetailPage/GamedetailPage";
// import AccountStatementDesk from "../AccountStatementforDesktop/AccountStatementDesk";
// import BetHistorydesk from "../betHistoryforDesktop/BetHistorydesk";
// import HomePage from "../HomePage/HomePage";
// import CasinoForDesk from "../CasinoForDesk/CasinoForDesk";
// import LiveCasino from "../LiveCasino/LiveCasino";
// import ProfitLossHome from "../ProfitAndLoss/ProfitLossHome/ProfitLossHome";
// import UnsetteledBetForDesk from "../UnsettelBetForDesk/UnsetteledBetForDesk";
// import ChangeBtnValueForDesk from "../ChangeBtnValue/ChangeBtnValueForDesk";
// import ChangePasswordForDesk from "../ChangePasswordForDesk/ChangePasswordForDesk";
// import SignoutForDesk from "../SignoutForDesk/SignoutForDesk";
// import WithdrawForDesk from "../WithdrawForDesk/WithdrawForDesk";
// import DepositForDesk from "../DepositForDesk/DepositForDesk";
// // import DefaultHomePage from "../../component/Items/DefaultPage/DefaultHomePage";
// import DefaultHomePageForDesk from "../DefaultHomePage/DefaultHomePageForDesk";

// const HomePageForDesk = () => {
//   const { pathname } = useLocation();

//   const screenWidth = window.innerWidth;

//   const nav = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("token") === null && screenWidth > 799) {
//       if (pathname === "/defalut") {
//         nav("/defalut");
//       }
//     }
//   }, [pathname]);

//   return (
//     <>
//       <div className="main">
//         <div className={`${pathname === "/login" ? "" : "row row5"} `}>
//           {pathname === "/login" ? (
//             ""
//           ) : (
//             <div className="sidebar col-md-2">
//               <SideBar />
//             </div>
//           )}

//           <div
//             className={`${
//               pathname === "/login"
//                 ? ""
//                 : "col-md-10 featured-box load game-page"
//             }`}
//             >
//             <Routes>
//               <Route to="/defalut" element={<ItemPageForHome/>} />
//               <Route path="/" element={<LoginForDesk />} />
//               <Route path="/login" element={<LoginForDesk />} />
//               <Route path="/home" element={<ItemPageForHome />} />
//               <Route path="/gamedetail/:id" element={<GamedetailPage />} />
//               <Route
//                 path="/accountstatement"
//                 element={<AccountStatementDesk />}
//               />
//               <Route path="/bethistory" element={<BetHistorydesk />} />
//               <Route path="/Cricket" element={<HomePage />} />
//               <Route path="/Tennis" element={<HomePage />} />
//               <Route path="/Football" element={<HomePage />} />
//               <Route path="/Kabaddi" element={<HomePage />} />
//               <Route path="/casino/:id" element={<CasinoForDesk />} />
//               <Route path="/livecasino" element={<LiveCasino />} />
//               <Route path="/profitloss" element={<ProfitLossHome />} />
//               <Route path="/unsetteledbet" element={<UnsetteledBetForDesk />} />
//               <Route
//                 path="/changebtnvalue"
//                 element={<ChangeBtnValueForDesk />}
//               />
//               <Route
//                 path="/changepassword"
//                 element={<ChangePasswordForDesk />}
//               />
//               <Route path="/SignOut" element={<SignoutForDesk />} />
//               <Route path="/withdraw" element={<WithdrawForDesk />} />
//               <Route path="/deposit" element={<DepositForDesk />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePageForDesk;
