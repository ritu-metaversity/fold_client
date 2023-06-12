import React, { useEffect, useState } from "react";
import "../AaccountStatement/AaccountStatement.css";
import { GameAPI } from "../../../apis/gameAPI";
import AlertBtn from "../../Alert/AlertBtn";

function ChangeBtnValue() {
  // eslint-disable-next-line
  const [MessageShow, setMessageShow] = useState(false);
  const [color, setColor] = useState("danger");
  const [getStackValue, setGetStackValue] = useState("");
  const [getKey, setGetKey] = useState("");
  const [updateStack, setUpdateStack] = useState({});
  // eslint-disable-next-line
  const [timeOut, setTimeOut] = useState(null);
  const [Message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingonChange, setIsLoadingonChange] = useState(false)

  useEffect(() => {
    GameAPI.Get_Stack_Value().then((res) => {
      setIsLoading(false);
      setGetStackValue(res);
      setGetKey(Object.keys(res));
      setUpdateStack(res || {}, [res]);
    });
  }, []);

  const handleSetValue = () => {
    setIsLoadingonChange(true);
    GameAPI.Set_Stack_Value({ updateStack }).then((res) => {
      if (res.status === true) {
        setIsLoadingonChange(false);
        setMessageShow(true);
        setMessage("Successfully updated!");
        setColor("success");
      }
    }).catch((err)=>{
      setIsLoadingonChange(false);
      setMessageShow(true);
      setColor("danger");
      setMessage(err.response.data.message)

    });
  };
  const handleInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setUpdateStack((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  setTimeout(() => {
    setTimeOut(1);
    setMessageShow(false);
  }, 15000);

  const popupClose = (vl) => {
    setMessageShow(vl);
  };

  return (
    <div>
      {isLoading ? (
        <p className="lodder">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
        <div className="main">
          <div className="report-container wrapper">
            {MessageShow ? (
              <AlertBtn
                color={color}
                popupClose={popupClose}
                val={Message}
                style={{ width: "50px" }}
              />
            ) : (
              ""
            )}
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0 heading-ch">Change Button Values</h4>
              </div>
              {
                isLoadingonChange && <p className="place-lodder stack-change">
                <i className="fa fa-spinner fa-spin"></i>
              </p>
              }
              <div className="card-body container-fluid container-fluid-5 button-value max_height">
                <div className="row row5 mb-1 ">
                  <div className="col-6">
                    <div className="button-title">
                      <span>
                        <b>Price Label</b>
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="button-title">
                      <span>
                        <b>Price Value</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row row5 mb-1 ">
                  <div className="col-6">
                    {getKey?.length &&
                      getKey.map((item) => {
                        return (
                          <div className="form-group mb-0" key={item}>
                            <input
                              placeholder="Button Value"
                              value={item}
                              maxLength="7"
                              className="form-control chanbtn"
                              readOnly
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="col-6">
                    {getStackValue
                      ? Object.keys(getStackValue).map((key, index) => {
                          return (
                            <div className="form-group mb-0" key={key + index}>
                              <input
                                name={key}
                                type="number"
                                text="number"
                                value={updateStack[key]}
                                onChange={handleInput}
                                className="form-control chanbtn"
                              />
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>

                <div className="row row5 mt-2 ">
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-block btn-sm"
                      onClick={handleSetValue}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeBtnValue;
