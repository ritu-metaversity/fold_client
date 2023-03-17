import React, { useEffect, useState } from "react";
import "../AaccountStatement/AaccountStatement.css";
import NavBar from "../../navBar/NavBar";
import { GameAPI } from "../../../apis/gameAPI";
import AlertBtn from "../../Alert/AlertBtn";

function ChangeBtnValue() {
  // eslint-disable-next-line
  const [MessageShow, setMessageShow] = useState(false);
  const [color, setColor] = useState("danger");
  const [getStackValue, setGetStackValue] = useState("");
  const [getKey, setGetKey] = useState("");
  const [updateStack, setUpdateStack] = useState({});
  const [timeOut, setTimeOut] = useState(null)


  useEffect(() => {
    GameAPI.Get_Stack_Value().then((res) => {
      setGetStackValue(res);
      setGetKey(Object.keys(res));
      setUpdateStack(res || {}, [res]);
    });
  }, []);

  const handleSetValue = () => {
   
    GameAPI.Set_Stack_Value({ updateStack }).then((res) => {
      if(res.status===true){
        setMessageShow(true);
        setColor("success")
      }
    });
  };
  const handleInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setUpdateStack((prev) => ({ ...prev, [inputName]: inputValue }));
  };
 
  setTimeout(() => {
    setTimeOut(1)
    setMessageShow(false)
  }, 15000)
  

  return (
    <div>
      <NavBar />
      <div className="main">
        {/* <div className="container-fluid container-fluid-5 ">
          <div className="row row5">
            <div className="sidebar col-md-2">
              <SideBar />
            </div>
            <div className="col-md-10 report-main-content m-t-5 desk-top-view">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Change Button Values</h4>
                </div>
                <div className="card-body container-fluid container-fluid-5 button-value">
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="button-title">
                        <span>
                          <b>Price Label</b>
                        </span>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="button-title">
                        <span>
                          <b>Price Value</b>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="1000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="1000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="5000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="5000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="10000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="10000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="25000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="25000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="50000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="50000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="100000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="100000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="200000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="200000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="500000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="500000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="1000000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="1000000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mb-1">
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="2500000"
                          type="text"
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <input
                          placeholder="2500000"
                          type="number"
                          min="1"
                          max="99999999"
                          maxLength="9"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mt-2">
                    <div className="col-12">
                      <button className="btn btn-primary">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer /> */}

        <div className="report-container wrapper">
          {
            MessageShow?timeOut !== 1 && <AlertBtn color={color} val="Successfully updated!" style={{width: "50px"}}/>:""
          }
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Change Button Values</h4>
            </div>
            <div className="card-body container-fluid container-fluid-5 button-value">
              <div className="row row5 mb-1">
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
              <div className="row row5 mb-1">
              <div className="col-6">
              {getKey?.length &&
                getKey.map((item) => {
                  return (
                      <div className="form-group mb-0" key={item}>
                        <input
                          placeholder="Button Value"
                          value={item}
                          maxLength="7"
                          className="form-control"
                        />
                      </div>
                    
                    // </div>
                  );
                })}
                </div>
                <div className="col-6">
                {getStackValue
                ? Object.keys(getStackValue).map((key, index) => {
                    return (
                        <div className="form-group mb-0" key={key+index}>
                          <input
                            name={key}
                            type="number"
                            text="number"
                            value={updateStack[key]}
                            onChange={handleInput}
                            className="form-control"
                          />
                        </div>
                    );
                  })
                : ""}
                 </div>
              </div>

              <div className="row row5 mt-2">
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
    </div>
  );
}

export default ChangeBtnValue;
