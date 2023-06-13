import React, { useEffect, useState } from "react";
import { GameAPI } from "../../apis/gameAPI";
import { UserAPI } from "../../apis/UserAPI";

const DestTermsAndConditions = () => {
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
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
            <div className="card">
              <div className="card-header header-card ">
                <h4 className="mb-0 pl-0">Term And Condition</h4>
              </div>
              <div className="card-body container-fluid container-fluid-5 ">
                {isLoading ? (
                  <p className="lodder lodder_footer">
                    <i className="fa fa-spinner fa-spin"></i>
                  </p>
                ) : (
                  <div
                    className="tearm_data"
                    dangerouslySetInnerHTML={{ __html: tncData }}
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

export default DestTermsAndConditions;
