import React, { useEffect, useState } from "react";
import { UserAPI } from "../../apis/UserAPI";
import { GameAPI } from "../../apis/gameAPI";
import "./AboutPageForDesk.css";

const AboutPageForDesk = () => {
  const [logo, setLogo] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [aboutData, setAboutData] = useState();

  useEffect(() => {
    UserAPI.Self_By_App_Url().then((res) => {
      setLogo(res?.data?.logo);
    });

    GameAPI.ABOUT_US()
      .then((res) => {
        setIsloading(false);
        setAboutData(res?.data?.aboutus);
      })
      .catch((error) => {
        setIsloading(false);
      });
  }, []);
  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
            <div className="card">
              <div className="card-header header-card ">
                <h4 className="mb-0">About US</h4>
              </div>
              <div className="card-body container-fluid container-fluid-5 ">
                {isLoading ? (
                  <p className="lodder lodder_footer">
                    <i className="fa fa-spinner fa-spin"></i>
                  </p>
                ) : (
                  <div
                    className="tearm_data"
                    dangerouslySetInnerHTML={{ __html: aboutData }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageForDesk;
