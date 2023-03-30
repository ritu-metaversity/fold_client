import React, { useContext, useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "../../App";
import Aboutus from "./aboutus";
import ResponsibleGaming from "./responsibleGaming";
import Terms from "./terms";
import "./terms.css";
const IndexForTerms = () => {
  return (
    <Routes>
      <Route path="" element={<NewLayout />}>
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="about-us" element={<Aboutus />} />
        <Route path="responsible-gaming" element={<ResponsibleGaming />} />
        <Route path="*" element={<ThrowToLogin />} />
      </Route>
    </Routes>
  );
};

const ThrowToLogin = () => {
  const nav = useNavigate();
  useEffect(() => {
    // nav("/");
  }, []);

  return <></>;
};
const NewLayout = () => {
  const { appData } = useContext(UserContext);
  const { pathname } = useLocation();
  return !["", "/"].includes(pathname) ? (
    <div className="about-us-container">
      <div className="container">
        <div className="text-center logo">
          <img src={appData?.logo} alt="logo" />
        </div>
        <Outlet />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default IndexForTerms;
