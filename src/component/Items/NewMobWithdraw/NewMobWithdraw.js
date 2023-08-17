import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlertBtn from "../../Alert/AlertBtn";
import { UserAPI } from "../../../apis/UserAPI";

const NewMobWithdraw = () => {
  const [withdrawData, setWithdrawData] = useState();
  // const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [withType, setwithType] = useState("");
  const [withCoinValue, setwithCoinValue] = useState("");
  const [accountNumber, setAccountNumber] = useState();
  const [accountHolderName, setAccountHolderName] = useState("");
  const [ifsc, setIFSC] = useState();
  const [bankName, setBankName] = useState("");
  const [AccountType, setAccountType] = useState("Saving");
  const [errorAlert, setErrorAlert] = useState(false);
  const [message, setMessage] = useState();
  const [colorName, setColorName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [bankID, setBankId] = useState();
  const [stackValue, setStackValue] = useState();
  const [openForm, setOpenForm] = useState(false);
  const [withdrawType, setWithdrawType] = useState("Normal");
  const [getAccountData, setGetAccountData] = useState();
  const [userBalance, setuserBalance] = useState();
  const [dataLenth, setDataLenth] = useState();
  const [saveDetailMessage, setSaveDetailMessage] = useState(false);
  const [showWithdraw, setshowWithdraw] = useState(false);
  const [withdrawReq, setWithdrawReq] = useState();
  const [dataLength, setDataLength] = useState();
  const [activeBank, setActiveBank] = useState();
  const [maxWidthValue, setMaxWidthValue] = useState(0);
  const [bankSaveMessage, setBankSaveMessage] = useState("");
  const [symbolsArrUpiId] = useState(["."]);

  const handleClose = () => {
    setShow(false);
    setMessage("Withdraw Request Submited Successfully");
    setErrorAlert(true);
    setIsLoading(false);
    setColorName("success");
    setAccountHolderName("");
    setAccountNumber("");
    setIFSC("");
    setBankName("");
    setwithCoinValue(0);
  };

  const handlePaymentDetails = (val, id, id1) => {
    setwithType(val);
    setBankId(id);
    setOpenForm(true);
    setAccountHolderName("");
    setAccountNumber("");
    setIFSC("");
    setBankName("");
    setActiveBank(id1);
  };

  // const handleCancel = () => {
  //   setshowWidthRequest(false);
  // };
  useEffect(() => {
    // const token = localStorage.getItem("token");

    UserAPI.GET_BANK_DETAIL().then((res) => {
      setWithdrawData(res?.data);
    });

    UserAPI.WITHDRAW_STACK_REQUEST().then((res) => {
      setStackValue(res?.data);
      setMaxWidthValue(res?.data[res?.data?.length - 1].value);
    });

    UserAPI.User_Balance().then((res) => {
      setuserBalance(res?.data?.balance);
    });

    UserAPI.Withdraw_Request().then((res) => {
      setIsLoading(false);
      setWithdrawReq(res.data);
      setDataLength(res?.data?.length);
    });
  }, []);

  const handleStaticAmountInput = (e) => {
    let Inputvalue = e.target.value;
    setwithCoinValue(parseInt(Inputvalue));
  };

  const handleSaveDetail = () => {
    UserAPI.GET_BANK_DETAIL().then((res) => {
      setWithdrawData(res?.data);
    });
    setAccountHolderName("");
    setAccountNumber("");
    setIFSC("");
    setBankName("");
    setwithCoinValue(0);
    UserAPI.SAVE_BANK_DETAIL({
      accountHolderName: accountHolderName,
      bankName: bankName,
      accountType: AccountType,
      amount: withCoinValue,
      ifsc: ifsc,
      accountNumber: accountNumber,
      withdrawType: bankID,
    })
      .then((res) => {
        UserAPI.Withdraw_Request().then((res) => {
          setIsLoading(false);
          setWithdrawReq(res.data);
          setDataLength(res?.data?.length);
        });
        setShow(false);
        setSaveDetailMessage(true);
        setErrorAlert(true);
        setIsLoading(false);
        setColorName("success");
        setAccountHolderName("");
        setAccountNumber("");
        setIFSC("");
        setBankName("");
        // setBankSaveMessage(res?.message);
        setMessage(`Withdraw Request Submited Successfully and ${res?.message}`);
      })
      .catch((error) => {
        setErrorAlert(true);
        setColorName("danger");
        setMessage(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    UserAPI.GET_CLIENT_BANK().then((res) => {
      setGetAccountData(res?.data);
      setDataLenth(res?.data?.length);
    });
  }, []);

  const [dataId, setDataId] = useState();
  const handlePending = (val) => {
    setshowWithdraw(true);
    setDataId(val);
  };

  const handleCloseSubmit = () => {
    setIsLoading(true);
    UserAPI.USER_CANCEL_WITHDRAW_REQUIEST({
      id: dataId,
    })
      .then((res) => {
        setIsLoading(false);
        setMessage(res.message);
        setErrorAlert(true);
        setColorName("success");
        setshowWithdraw(false);

        UserAPI.Withdraw_Request().then((res) => {
          setWithdrawReq(res.data);
          setDataLength(res.data.length);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorAlert(true);
        setMessage(error.response.data.message);
        setColorName("danger");
        setShow(false);
      });
  };

  const handleBtnValue = (val) => {
    setwithCoinValue(
      (withCoinValue) => (Number(withCoinValue) || 0) + Number(val)
    );
  };

  const popupClose = (vl) => {
    setErrorAlert(vl);
  };

  const handleValidate = () => {
    if (userBalance < withCoinValue) {
      setMessage("insufficient balance");
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
      return false;
    } else if (withCoinValue > maxWidthValue) {
      setMessage(`Amount exceeded maximum withdrawal limit ${maxWidthValue}.`);
      setErrorAlert(true);
      setColorName("danger");
      setIsLoading(false);
      return false;
    }

    if (withType === "BANK") {
      if (
        withCoinValue === "" ||
        withCoinValue === undefined ||
        withCoinValue === 0
      ) {
        setMessage("The Amount field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (accountNumber === "") {
        setMessage("The Account Number is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (accountHolderName === "") {
        setMessage("The Account Name field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (bankName === "") {
        setMessage("The Bank Name field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (ifsc === "") {
        setMessage("The IFSC field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (ifsc?.match(/^[A-Z]{4}0[A-Z0-9]{6}$/) === null) {
        setMessage("Enter Valid IFSC Code");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      }
    } else if (withType === "PAYTM") {
      if (
        withCoinValue === "" ||
        withCoinValue === undefined ||
        withCoinValue === 0
      ) {
        setMessage("The Amount field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (accountNumber === "") {
        setMessage("Mobile Number is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (accountHolderName === "") {
        setMessage("The Account Name field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (accountNumber.length !== 10) {
        setMessage("Enter Valid Mobile number");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      }
    } else if (withType == "UPI") {
      if (
        withCoinValue === "" ||
        withCoinValue === undefined ||
        withCoinValue === 0
      ) {
        setMessage("The Amount field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (accountNumber === "") {
        setMessage("UPI ID is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (accountHolderName === "") {
        setMessage("The Account Name field is required");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      } else if (
        accountNumber.match(/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/) ===
        null
      ) {
        setMessage("Enter Valid UPI ID");
        setErrorAlert(true);
        setColorName("danger");
        setIsLoading(false);
        return false;
      }
    }
    return true;
  };
  const handleClick = () => {
    setErrorAlert(false);
    setIsLoading(true);
    if (handleValidate()) {
      UserAPI.SELF_WITHDRAW_APP({
        accountHolderName: accountHolderName,
        bankName: bankName ? bankName : "",
        accountType: withType === "BANK" ? AccountType : "",
        amount: withCoinValue,
        ifsc: ifsc ? ifsc : "",
        accountNumber: accountNumber,
        withdrawType: bankID,
        withdrawMode: withdrawType,
      })
        .then((res) => {
          UserAPI.Withdraw_Request().then((res) => {
            setWithdrawReq(res.data);
            setDataLength(res.data.length);
            
          });
          if (res?.data.bankExist === false) {
            setShow(true);
          } else {
            setMessage(res?.message);
            setErrorAlert(true);
            setColorName("success");
            setIsLoading(false);
            setAccountHolderName("");
            setAccountNumber("");
            setIFSC("");
            setBankName("");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorAlert(true);
          setIsLoading(false);
          setColorName("danger");
          setMessage(error?.response?.data?.message);
        });
    }
  };

  const handleClose1 = () => {
    setshowWithdraw(false);
  };
  const handleCancel = () => {
    setshowWithdraw(false);
  };

  const handleWithdrawData = (
    accNumber,
    accHolderName,
    BankName,
    ifscNum,
    accType
  ) => {
    setAccountHolderName(accHolderName);
    setAccountNumber(accNumber);
    setBankName(BankName);
    setIFSC(ifscNum);
    setAccountType(accType);
  };

  return (
    <>
      {errorAlert ? (
        <AlertBtn color={colorName} popupClose={popupClose} val={message} />
      ) : (
        ""
      )}
      <br/>
       {saveDetailMessage ? (
        <AlertBtn className="savemessage" color={colorName} popupClose={popupClose} val={bankSaveMessage} />
      ) : (
        ""
      )}
      <div className="main">
        <div className="card-header header-card">
          <h4 className="mb-0">Withdraw</h4>
        </div>
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
            <div className="card">
              <div className="card-body container-fluid container-fluid-5">
                <div className="withdrow_coin">
                  <div className="withdrow_title">
                    <p style={{ marginLeft: "-1px", marginBottom: "10px" }}>
                      Withdraw Coins
                    </p>
                    <input
                      placeholder="0"
                      value={withCoinValue}
                      onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                      onChange={handleStaticAmountInput}
                      type="number"
                    />
                  </div>
                  <div>
                    <p
                      className="choose_val"
                      style={{ marginLeft: "0px", marginBottom: "10px" }}>
                      Choose From your favourite transaction{" "}
                    </p>
                    <div className="coin_value">
                      {stackValue?.map((res) => {
                        return (
                          <button onClick={() => handleBtnValue(res?.value)}>
                            {res?.key}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className="withdrow_type"
                  style={{ marginBottom: "12px", width: "100%" }}>
                  <select onChange={(e) => setWithdrawType(e.target.value)}>
                    <option value="Normal">Normal</option>
                    <option value="Instant">Instant</option>
                  </select>
                </div>
                <div className="with_paymethod">
                  <Container>
                    <div className="bank-logo with_bank_logo">
                      <Row>
                        {withdrawData?.map((res, id1) => {
                          return (
                            <>
                              <Col
                                className={`withdraw_image ${
                                  activeBank === id1 ? "activeBank" : ""
                                }`}
                                onClick={() =>
                                  handlePaymentDetails(
                                    res?.withdrawType,
                                    res?.id,
                                    id1
                                  )
                                }>
                                <div className="css-1502y4u">
                                  <img
                                    src={res?.image}
                                    className="css-37vfbv"
                                    alt="Bank"
                                  />
                                  <p className="Typography-root ">
                                    {res?.withdrawType}
                                  </p>
                                </div>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </div>
                  </Container>
                </div>

                {withType === "BANK" ? (
                  <div
                    className={`mainAccount main_withdrow ${
                      openForm === true ? "" : "d-none"
                    }`}>
                    <div className="mx-input-wrapper account-field">
                      <label className="account-lable">Account Number</label>
                      <br />
                      <input
                        className="account-input"
                        value={accountNumber?.toString().replace(".", "")}
                        onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                        onChange={(e) =>
                          e.target.value.match(/^[0-9]*$/) &&
                          setAccountNumber(Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="mx-input-wrapper account-field">
                      <label className="account-lable">Account Name</label>
                      <br />
                      <input
                        type="text"
                        className="account-input"
                        value={accountHolderName.trimStart()}
                        onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                        onChange={(e) =>
                          e.target.value.match(/^[a-zA-Z ]*$/) &&
                          setAccountHolderName(e.target.value)
                        }
                      />
                    </div>
                    <div className="mx-input-wrapper account-field">
                      <label className="account-lable">Bank Name</label>
                      <br />
                      <input
                        type="type"
                        className="account-input"
                        value={bankName.trimStart()}
                        onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                        onChange={(e) =>
                          e.target.value.match(/^[a-zA-Z ]*$/) &&
                          setBankName(e.target.value)
                        }
                      />
                    </div>
                    <div className="mx-input-wrapper account-field">
                      <label className="account-lable">IFSC</label>
                      <br />
                      <input
                        type="type"
                        className="account-input"
                        value={ifsc.trim()}
                        onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                        onChange={(e) => setIFSC(e.target.value)}
                      />
                    </div>
                    <div className="mx-input-wrapper account-field">
                      <label className="account-lable">Account Type</label>
                      <br />
                      <select
                        name="reportType"
                        className="custom-select select-type"
                        onChange={(e) => setAccountType(e.target.value)}
                        value={AccountType}>
                        <option value="Saving">Saving</option>
                        <option value="Current">Current</option>
                      </select>
                      <div className="upDownbtn btnSecected">
                        <i className="fa fa-caret-up"></i>
                        <i className="fa fa-caret-down"></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`mainAccount main_withdrow ${
                      openForm === true ? "" : "d-none"
                    }`}>
                    <div className="mx-input-wrapper account-field">
                      <label className="account-lable">
                        {withType === "PAYTM" ? "Mobile No" : "UPI ID"}
                      </label>
                      <br />

                      {withType === "PAYTM" ? (
                        <input
                          type="text"
                          className="account-input"
                          value={accountNumber}
                          onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                          onChange={(e) =>
                            e.target.value.match(/^[0-9]*$/) &&
                            setAccountNumber(e.target.value)
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          className="account-input"
                          value={accountNumber}
                          onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                          onChange={(e) =>
                            e.target.value.match(/^[a-zA-Z0-9@_]*$/)&&
                            setAccountNumber(
                              e.target.value)
                          }
                        />
                      )}
                    </div>
                    <div className="mx-input-wrapper account-field">
                      <label className="account-lable">
                        {withType === "PAYTM" ? "Name" : "Account Name"}
                      </label>
                      <br />
                      <input
                        type="text"
                        className="account-input"
                        value={accountHolderName.trimStart()}
                        onKeyDown={(e)=>symbolsArrUpiId.includes(e.key) && e.preventDefault()}
                        onChange={(e) =>
                          e.target.value.match(/^[a-zA-Z ]*$/) &&
                          setAccountHolderName(e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                <div className={openForm ? "" : "d-none"}>
                  <div className="row row5 mt-2">
                    <div className="col-12">
                      <div className="table-responsive withdrow-table">
                        <table
                          role="table"
                          aria-busy="false"
                          aria-colcount="6"
                          className="table b-table table-bordered"
                          id="__BVID__104">
                          <thead>
                            <tr role="row" className="account-detail">
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="1"
                                className="text-left bg_color_ch">
                                Account Number
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="2"
                                className="text-left bg_color_ch">
                                Account Name
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="4"
                                className={`text-left bg_color_ch ${
                                  withType === "BANK" ? "" : "d-none"
                                }`}>
                                Bank Name
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="5"
                                className={`text-left bg_color_ch ${
                                  withType === "BANK" ? "" : "d-none"
                                }`}>
                                IFSC Code
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="6"
                                className={`text-left bg_color_ch ${
                                  withType === "BANK" ? "" : "d-none"
                                }`}>
                                Account Type
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="6"
                                className="text-left bg_color_ch">
                                Action
                              </th>
                            </tr>
                          </thead>
                          {getAccountData?.map((item) => {
                            if (item.withdrawType !== withType) return <></>;
                            return (
                              <tbody
                                className={dataLenth === 0 ? "d-none" : ""}>
                                <tr role="row">
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
                                    aria-colindex="4"
                                    className={`text-left withdraw-data ${
                                      withType === "BANK" ? "" : "d-none"
                                    }`}>
                                    {item?.bankName}
                                  </td>
                                  <td
                                    aria-colindex="5"
                                    className={`text-left withdraw-data ${
                                      withType === "BANK" ? "" : "d-none"
                                    }`}>
                                    {item?.ifsc}
                                  </td>
                                  <td
                                    aria-colindex="5"
                                    className={`text-left withdraw-data ${
                                      withType === "BANK" ? "" : "d-none"
                                    }`}>
                                    {item?.accountType}
                                  </td>
                                  <td
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleWithdrawData(
                                        item.accountNumber,
                                        item.accountHolderName,
                                        item?.bankName,
                                        item?.ifsc,
                                        item?.accountType
                                      )
                                    }
                                    aria-colindex="5"
                                    className="text-left">
                                    <div className="custom-control custom-control-inline custom-radio">
                                      <input type="radio" name="radio_btn" />{" "}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}

                          <tbody>
                            <tr
                              role="row"
                              className={`${dataLenth === 0 ? "" : "d-none"}`}>
                              <td
                                aria-colindex="1"
                                colSpan="6"
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

                <div className="withdraw_coin_btn">
                  {isLoading && (
                    <p className="lodder depositLoading withloading withdraw_deposit">
                      <i className="fa fa-spinner fa-spin"></i>
                    </p>
                  )}
                  <button
                    onClick={handleClick}
                    className={openForm ? "" : "disable_btn"}
                    disabled={!openForm}>
                    Withdraw Coins
                  </button>
                </div>

                <div className="row row5 mt-2">
                  <div className="col-12">
                    <div className="previous-deposite">
                      <p style={{ padding: "7px 12px", fontWeight: "500" }}>
                        Previous Withdraw
                      </p>
                    </div>
                    <div className="table-responsive withdrow-table">
                      <table
                        role="table"
                        aria-busy="false"
                        aria-colcount="6"
                        className="table b-table table-bordered"
                        id="__BVID__104">
                        <thead>
                          <tr role="row" className="account-detail">
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              className="text-left bg_color_ch">
                              Account Number
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="2"
                              className="text-left bg_color_ch">
                              Account Name
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="3"
                              className="text-right bg_color_ch">
                              Amount
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="4"
                              className="text-left bg_color_ch">
                              Bank Name/ Address
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="5"
                              className="text-left bg_color_ch">
                              IFSC Code
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left bg_color_ch">
                              Account Type / Currency
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left withdraw-data bg_color_ch">
                              Date
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left bg_color_ch"
                              style={{ paddingRight: "82px" }}>
                              Remark
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left bg_color_ch">
                              Status
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left bg_color_ch">
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
                                      {item.time}
                                      {}
                                    </td>
                                    <td
                                      aria-colindex="6"
                                      className="text-lift"
                                      style={{ paddingRight: "" }}>
                                      {item.remark}
                                    </td>
                                    <td aria-colindex="6" className="text-left">
                                      <p
                                        className={`${
                                          item.status === "Pending"
                                            ? "pending"
                                            : item.status === "APPROVED"
                                            ? "approved"
                                            : "rejected"
                                        }`}>
                                        {item.status}
                                      </p>
                                    </td>
                                    <td
                                      aria-colindex="6"
                                      className={`text-left ${
                                        item.status === "Pending"
                                          ? ""
                                          : "d-none"
                                      }`}
                                      onClick={() => handlePending(item?.id)}>
                                      <button className="cancelBtnTd">
                                        Cancel
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          <Modal show={showWithdraw} onHide={handleClose1}>
                            <Modal.Header closeButton className="cancelRequest">
                              <Modal.Title>Cancel Request</Modal.Title>
                            </Modal.Header>
                            {isLoading ? (
                              <p className="lodder with_modal_loder">
                                <i className="fa fa-spinner fa-spin"></i>
                              </p>
                            ) : (
                              ""
                            )}
                            <Modal.Body>
                              Are you sure you want to cancel this request?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                className="modalBtn"
                                onClick={handleCancel}>
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
                            className={`${
                              dataLength === 0 || withdrawReq === null
                                ? ""
                                : "d-none"
                            }`}>
                            <td
                              aria-colindex="1"
                              colSpan="10"
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>Do you want to save the Bank Details?</Modal.Body>
          <Modal.Footer>
            <Button
              style={{ padding: "2px 7px", fontSize: "14px" }}
              variant="secondary"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              style={{ padding: "2px 7px", fontSize: "14px" }}
              variant="primary"
              onClick={handleSaveDetail}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default NewMobWithdraw;
