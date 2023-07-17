import React, { useEffect, useState } from "react";
import { UserAPI } from "../../apis/UserAPI";
import { GameAPI } from "../../apis/gameAPI";
import { Link } from "react-router-dom";

const ResponsibleGaming = () => {
  const [logo, setLogo] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [resData, setResData] = useState();

  useEffect(() => {
    UserAPI.Self_By_App_Url().then((res) => {
      setLogo(res?.data?.logo);
    });

    GameAPI.RESPONSIBLE()
      .then((res) => {
        setIsloading(false);
        setResData(res?.data?.responsiblegaming);
      })
      .catch((error) => {
        setIsloading(false);
      });
  }, []);
  return (
    <>
      
        <div className="main_about_section1">
          <div className="about_heading">
            <h3>Responsible Gaming</h3>
          </div>
          {isLoading ? (
        <p className="lodder lodder_footer">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
          <div
            className="tearm_data"
            dangerouslySetInnerHTML={{ __html: resData }}
          />)}
        </div>
      
    </>
  );
};

export default ResponsibleGaming;
