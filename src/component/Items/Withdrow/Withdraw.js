import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import NavBar from '../../navBar/NavBar'
import "./Withdraw.css";

const Withdraw = () => {
  const [tableDatashow, setTabledataShow] = useState(false);
  const [amount, setAmount] = useState();
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("Saving");
  const [accountNumber, setAccountNumber] = useState();
  const [ifsc, setIFSC] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [withdrawReq, setWithdrawReq] = useState();
  const [dataLength, setDataLength] = useState();


  const handleClick = () => {
    UserAPI.Self_Withdraw_App({
      accountHolderName: accountHolderName,
      bankName: bankName,
      accountType: accountType,
      amount: amount,
      ifsc: ifsc,
      accountNumber: accountNumber,
    }).then((res) => {
      if (res.status === true) {
        setTabledataShow(true);
      }
      UserAPI.Withdraw_Request().then((res) => {
        setWithdrawReq(res.data);
        setDataLength(res.data.length)
  
      });
      console.log(res);
    });
  };

  useEffect(() => {
    UserAPI.Withdraw_Request().then((res) => {
      setWithdrawReq(res.data);
      setDataLength(res.data.length)

    });
  }, []);

  console.log(withdrawReq);

  return (
    <>
    <NavBar/>
      <div className="wrapper">
        <div className="card-body container-fluid container-fluid-5">
          <div className="main-account-containor">
            <div className="mx-input-wrapper account-field">
              <label className="account-lable">Amount</label>
              <br />
              <input
                type="number"
                className="account-input"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mx-input-wrapper account-field">
              <label className="account-lable">Account Number</label>
              <br />
              <input
                type="number"
                className="account-input"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="mx-input-wrapper account-field">
              <label className="account-lable">Account Name</label>
              <br />
              <input
                type="text"
                className="account-input"
                onChange={(e) => setAccountHolderName(e.target.value)}
              />
            </div>
            <div className="mx-input-wrapper account-field">
              <label className="account-lable">Bank Name</label>
              <br />
              <input
                type="type"
                className="account-input"
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="mx-input-wrapper account-field">
              <label className="account-lable">IFSC</label>
              <br />
              <input
                type="type"
                className="account-input"
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
              <div className="table-responsive">
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
                        className="text-left ">
                        Remark
                      </th>
                      <th
                        role="columnheader"
                        scope="col"
                        aria-colindex="6"
                        className="text-left ">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${dataLength===0?"d-none":""}`}>
                    {withdrawReq?.length &&
                      withdrawReq.map((item) => {
                        return (
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
                            <td
                              aria-colindex="6"
                              className="text-lift">
                                {moment(item.time).format("YYYY-MM-DD h:mm:s")}
                              {}
                            </td>
                            <td
                              aria-colindex="6"
                              className="text-lift withdraw-data">
                                {item.remark}
                            </td>
                            <td
                              aria-colindex="6"
                              className={`text-left ${item.status==="Pending"?"pending":item.status==="Approved"?"approved":"rejected"}`}>
                              {item.status}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tbody>
                    <tr role="row" className={`${dataLength===0?"":"d-none"}`}>
                      <td
                        aria-colindex="1"
                        colSpan="9"
                        className="text-left withdraw-data">
                        <p className="no-record-found">No records found</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
