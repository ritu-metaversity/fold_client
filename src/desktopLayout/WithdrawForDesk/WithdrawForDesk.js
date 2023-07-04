import React, { useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import { UserAPI } from "../../apis/UserAPI";
import AlertBtn from "../../component/Alert/AlertBtn";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import moment from "moment";
import "./WithdrawForDesk.css";

const WithdrawForDesk = () => {
  const [amount, setAmount] = useState();
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("Saving");
  const [accountNumber, setAccountNumber] = useState();
  const [ifsc, setIFSC] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [withdrawReq, setWithdrawReq] = useState();
  const [dataLength, setDataLength] = useState();
  const [errorAlert, setErrorAlert] = useState(false);
  const [message, setMessage] = useState({});
  const [colorName, setColorName] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [userBalance, setUserBalance] = useState();

useEffect(()=>{
  UserAPI.User_Balance().then((res) => {
    setUserBalance(res?.data?.balance - res?.data?.libality);
  }).catch((error)=>{
    
    if(error?.response?.status === 401){
      localStorage.clear();
      navigator('/login')
    }
  });
}, []);

  // const validateForm = () => {
  //   let error = {};

  //   var letters = /^[A-Za-z]+$/;

  //   if (amount === "") {
  //     setErrorAlert(true);
  //     setColorName("danger");
  //     error = "The Amount field is required";
  //   }

  //   if (bankName === "") {
  //     setErrorAlert(true);
  //     setColorName("danger");
  //     error = "The Bank Name field is required";
  //   } else if (!letters.test(bankName)) {
  //     setErrorAlert(true);
  //     setColorName("danger");
  //     error = "Invaild Bank Name";
  //   }

  //   if (ifsc === "") {
  //     setErrorAlert(true);
  //     setColorName("danger");
  //     error = "The IFSC field is required";
  //   }

  //   if (accountHolderName === "") {
  //     setErrorAlert(true);
  //     setColorName("danger");
  //     error = "The Account Name field is required";
  //   } else if (!letters.test(accountHolderName)) {
  //     setErrorAlert(true);
  //     setColorName("danger");
  //     error = "Invaild Name";
  //   }
  //   if (accountNumber === "") {
  //     setErrorAlert(true);
  //     setColorName("danger");
  //     error = "The Account Number field is required";
  //   }

  //   setMessage(error);
  //   return Object.keys(error).length === 0;
  // };

  const handleClick = () => {
    setErrorAlert(false)
    setIsLoading(true);
    if (userBalance === 0) {
      setMessage("Insufficient balance ");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
    }
    else if(accountNumber === ""){
      setMessage("The Account Number is required");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
    }
    else if(accountHolderName === ""){
      setMessage("The Account Name field is required");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
    }
    else if(bankName === ""){
      setMessage("The Bank Name field is required");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
    }else if(amount === ""){
      setMessage("The Amount field is required");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
    }else if(ifsc === ""){
      setMessage("The IFSC field is required");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
    }
    
     else if (userBalance < amount) {
      setMessage("Insufficient balance ");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
    }

    if (userBalance >= amount && amount !=="" && bankName !== "" && ifsc !== "" && accountHolderName !== "" && accountNumber !== "") {
      UserAPI.Self_Withdraw_App({
        accountHolderName: accountHolderName,
        bankName: bankName,
        accountType: accountType,
        amount: amount,
        ifsc: ifsc,
        accountNumber: accountNumber,
      })
        .then((res) => {
          UserAPI.Withdraw_Request().then((res) => {
            setWithdrawReq(res.data);
            setDataLength(res.data.length);
          });
          setMessage(res.message);
          setErrorAlert(true);
          setColorName("success");
          if (res.status === true) {
            setAmount("");
            setBankName("");
            setAccountNumber("");
            setIFSC("");
            setAccountHolderName("");
          }
        })
        .catch((error) => {
          setColorName("danger")
          setErrorAlert(true);
          setMessage(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    UserAPI.Withdraw_Request().then((res) => {
      setWithdrawReq(res.data);
      setDataLength(res.data.length);
    });
  }, []);

  const popupClose = (vl) => {
    setErrorAlert(vl);
  };

  const [show, setShow] = useState(false);
  const [dataId, setDataId] = useState();
  const handleClose = () => setShow(false);

  const handlePending = (val) => {
    setShow(true);
    setDataId(val);
  };

  const handleCloseSubmit = () => {
    UserAPI.USER_CANCEL_WITHDRAW_REQUIEST({
      id: dataId,
    })
      .then((res) => {
        setMessage(res.message);
        setErrorAlert(true);
        setColorName("success");
        setShow(false);

        UserAPI.Withdraw_Request().then((res) => {
          setWithdrawReq(res.data);
          setDataLength(res.data.length);
        });
      })
      .catch((error) => {
        setErrorAlert(true);
        setMessage(error.response.data.message);
        setColorName("danger");
        setShow(false);
      });
  };

  return (
    <>
      {errorAlert ? (
        <AlertBtn color={colorName} popupClose={popupClose} val={message} />
      ) : (
        ""
      )}
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
            <div className="card">
              <div className="card-header header-card">
                <h4 className="mb-0">Withdraw</h4>
              </div>
              <div className="card-body container-fluid container-fluid-5">
                <div className="mainAccount">
                  <div className="mx-input-wrapper account-field">
                    <label className="account-lable">Amount</label>
                    <br />
                    <input
                      type="number"
                      className="account-input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mx-input-wrapper account-field">
                    <label className="account-lable">Account Number</label>
                    <br />
                    <input
                      type="number"
                      className="account-input"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="mx-input-wrapper account-field">
                    <label className="account-lable">Account Name</label>
                    <br />
                    <input
                      type="text"
                      className="account-input"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                    />
                  </div>
                  <div className="mx-input-wrapper account-field">
                    <label className="account-lable">Bank Name</label>
                    <br />
                    <input
                      type="type"
                      className="account-input"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  <div className="mx-input-wrapper account-field">
                    <label className="account-lable">IFSC</label>
                    <br />
                    <input
                      type="type"
                      className="account-input"
                      value={ifsc}
                      onChange={(e) => setIFSC(e.target.value)}
                    />
                  </div>
                  <div className="mx-input-wrapper account-field">
                    <label className="account-lable">Account Type</label>
                    <br />
                    <select
                      name="reportType"
                      className="custom-select select-type"
                      onChange={(e) => setAccountType(e.target.value)}>
                      <option value="Saving1">Saving</option>
                      <option value="Current">Current</option>
                    </select>
                    <div className="upDownbtn btnSecected">
                      <i class="fa fa-caret-up"></i>
                      <i class="fa fa-caret-down"></i>
                    </div>
                  </div>
                  <div className="mx-input-wrapper account-field">
                    <button
                      className="btn btn-primary btn-block btn-sm btn-w"
                      onClick={handleClick}>
                      Submit
                    </button>
                  </div>
                </div>

                <div className="row row5 mt-2">
                  <div className="col-12">
                    <div className="previous-deposite-desk">
                      <p>Previous Withdraw</p>
                    </div>
                    <div className="table-responsive withdrow-table">
                      <table
                        role="table"
                        aria-busy="false"
                        aria-colcount="6"
                        className="table b-table table-bordered"
                        id="__BVID__104">
                        <thead>
                          {/* <tr className="previous-deposite">
                              <th colSpan="10">Previous Withdraw</th>
                            </tr> */}
                          <tr role="row" className="account-detail">
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              className="text-left ">
                              Account Number
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="2"
                              className="text-left ">
                              Account Name
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="3"
                              className="text-right ">
                              Amount
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="4"
                              className="text-left ">
                              Bank Name/ Address
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="5"
                              className="text-left ">
                              IFSC Code
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left ">
                              Account Type / Currency
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left withdraw-data">
                              Date
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left"
                              style={{ paddingRight: "82px" }}>
                              Remark
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-center">
                              Status
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left ">
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody
                          className={`${dataLength === 0 ? "d-none" : ""}`}>
                          {withdrawReq?.length &&
                            withdrawReq.map((item, index) => {
                              return (
                                <>
                                  <tr role="row" key={index}>
                                    <td
                                      aria-colindex="1"
                                      className="text-left withdraw-data">
                                      {item.accountNumber}
                                    </td>
                                    <td
                                      aria-colindex="2"
                                      className="text-left withdraw-data">
                                      {item.accountHolderName}
                                    </td>
                                    <td
                                      aria-colindex="3"
                                      className="text-right ">
                                      {item.amount}
                                    </td>
                                    <td
                                      aria-colindex="4"
                                      className="text-left withdraw-data">
                                      {item.bankName}
                                    </td>
                                    <td
                                      aria-colindex="5"
                                      className="text-left  withdraw-data">
                                      {item.ifsc}
                                    </td>
                                    <td
                                      aria-colindex="6"
                                      className="text-lift withdraw-data">
                                      {item.accountType}
                                    </td>
                                    <td aria-colindex="6" className="text-lift">
                                      {moment(item.time).format(
                                        "YYYY-MM-DD h:mm:s"
                                      )}
                                      {}
                                    </td>
                                    <td
                                      aria-colindex="6"
                                      className="text-lift"
                                      style={{ paddingRight: "" }}>
                                      {item.remark}
                                    </td>
                                    <td
                                      aria-colindex="6" className="text-center"
                                      >
                                      <p className={`${item.status === "Pending"? "pending": item.status === "APPROVED"? "approved": "rejected"}`}>{item.status}</p>
                                    </td>
                                    <td
                                      aria-colindex="6"
                                      className={`text-left ${
                                        item.status === "Pending"
                                          ? ""
                                          : "d-none"
                                      }`}
                                      onClick={() => handlePending(item?.id)}>
                                      <button className="canBtn">Cancel</button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton className="cancelRequest">
                              <Modal.Title>Cancel Request</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to cancel this request?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                className="modalBtn"
                                onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                type="button"
                                className="modalBtn"
                                onClick={handleCloseSubmit}>
                                Submit
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </tbody>
                        <tbody>
                          <tr
                            role="row"
                            className={`${dataLength === 0 ? "" : "d-none"}`}>
                            <td
                              aria-colindex="1"
                              colSpan="9"
                              className="text-left withdraw-data">
                              <p className="no-record-found">
                                No records found
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawForDesk;
