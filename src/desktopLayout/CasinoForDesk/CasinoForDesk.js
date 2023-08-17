import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../sidebar/SideBar";

const CasinoForDesk = () => {
  const { id } = useParams("id");

  const token = localStorage.getItem("token");
  return (
    <>
      <div className="itemHome">
      
        
          <div className="">
            <div className="col-md-12 featured-box-detail sports-wrapper m-b-10">
              <iframe
                src={`https://m.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
                className="mobile_if"
                width="100%"
                title="mobile"
                allowFullScreen={true}></iframe>
              <iframe
                src={`https://d.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
                className="desktop_if"
                width="100%"
                title="desktop"
              />
            </div>
          </div>
      </div>
    </>
  );
};

export default CasinoForDesk;
