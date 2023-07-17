import React, { useEffect, useState } from "react";
import { UserAPI } from "../../apis/UserAPI";
import { GameAPI } from "../../apis/gameAPI";
import { Link } from "react-router-dom";

const TermAndCondition = () => {
  const [logo, setLogo] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [tncData, setTncData] = useState();

  useEffect(() => {
    UserAPI.Self_By_App_Url().then((res) => {
      setLogo(res?.data?.logo);
    });

    GameAPI.TERM_CONDITION()
      .then((res) => {
        setTncData(res?.data?.termandcondition);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
      });
  }, []);


  return (
    <>
      
        <div className="main_about_section1 ">
          <div className="about_heading">
          <h3>Terms And Conditions</h3>
         </div>
         {isLoading ? (
        <p className="lodder lodder_footer">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
          <div className="tearm_data" dangerouslySetInnerHTML={{ __html: tncData }} />  )}
        </div>
     
    </>
  );
};

export default TermAndCondition;
