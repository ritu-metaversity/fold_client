import React, { useEffect, useState } from "react";
import { UserAPI } from "../../apis/UserAPI";
import "./AboutUsPageForMob.css";
import { GameAPI } from "../../apis/gameAPI";
import { Link } from "react-router-dom";

const AboutUsPageForMob = () => {
  const [logo, setLogo] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [aboutData, setAboutData] = useState()

  useEffect(() => {
    UserAPI.Self_By_App_Url().then((res) => {
      setLogo(res?.data?.logo);
    });

    GameAPI.ABOUT_US().then((res)=>{
      setIsloading(false)
      setAboutData(res?.data?.aboutus)
    }).catch((error)=>{
      setIsloading(false)
    })

  }, []);

  return (
    <>
    {
      isLoading?(
        <p className="lodder lodder_footer">
        <i className="fa fa-spinner fa-spin"></i>
      </p>):(
         <div className="main_about_section">
         <div className="about_heading">
          <h3>About US</h3>
         </div>
         <div className="tearm_data" dangerouslySetInnerHTML={{ __html: aboutData }} />
       </div>
      )
    }
     
    </>
  );
};

export default AboutUsPageForMob;
