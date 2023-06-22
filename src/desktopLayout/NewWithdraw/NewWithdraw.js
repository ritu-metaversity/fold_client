import React, { useEffect, useState } from "react";
import "./NewWithdraw.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NewWithdraw = () => {
  const [withdrawData, setWithdrawData] = useState();
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [withType, setwithType] = useState("");
  const [withCoinValue, setwithCoinValue] = useState()
//   const [inputValue, setInputValue] = useState()

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const handlePaymentDetails = (val, id) => {
    setShow(true);
    setwithType(val);
    setActive(id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://192.168.68.158/withtype-subadmin/get",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setWithdrawData(res?.data?.data);
      });
  }, []);

  const handleStaticAmountInput = (e) => {
    let Inputvalue = e.target.value;
    setwithCoinValue(parseInt(Inputvalue));
  };

  const handleBtnValue = (val)=>{
    // setwithCoinValue(val)
    setwithCoinValue((withCoinValue) => (Number(withCoinValue) || 0) + Number(val));
  }

  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
            <div className="card">
              <div className="card-header header-card">
                <h4 className="mb-0">Withdraw</h4>
              </div>
              <div className="card-body container-fluid container-fluid-5">
                <div className="withdrow_coin">
                  <div className="withdrow_title">
                    <p style={{marginLeft:"-1px", marginBottom:"10px"}}>Withdraw Coins</p>
                    <input placeholder="Withdraw Coins" value={withCoinValue} onChange={handleStaticAmountInput} type="number" />
                  </div>
                  <div>
                    <p className="choose_val" style={{ marginLeft: "0px", marginBottom:"10px"}}>
                      Choose From your favourate transaction{" "}
                    </p>
                    <div className="coin_value">
                      <button onClick={()=>handleBtnValue(100)}>+100</button>
                      <button onClick={()=>handleBtnValue(500)}>+500</button>
                      <button onClick={()=>handleBtnValue(1000)}>+1k</button>
                      <button onClick={()=>handleBtnValue(5000)}>+5k</button>
                      <button onClick={()=>handleBtnValue(10000)}>+10k</button>
                      <button onClick={()=>handleBtnValue(25000)}>+25k</button>
                    </div>
                  </div>
                </div>
                <div className="withdrow_type">
                  <h5> Select withdraw value</h5>
                </div>

                <div className="with_paymethod">
                  <Container>
                    <div className="bank-logo with_bank_logo">
                      <Row>
                        {withdrawData?.map((res, id) => {
                          return (
                            <>
                            <Col 
                              className="withdraw_image"
                              onClick={() =>
                                handlePaymentDetails(res?.withdrawType, id)
                              }>
                              <div
                                className="css-1502y4u"
                                >
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

                <div className="withdraw_coin_btn">
                    <button>Withdraw Coins</button>
                </div>

                {/* <Modal size="md" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{withType}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {withType === "BANK" && (
                      <div className="withdraw_table">
                        <Form.Label htmlFor="inputPassword5">Amount</Form.Label>
                        <Form.Control type="nimber" id="1" />
                        <Form.Label htmlFor="inputPassword5">
                          Account Number
                        </Form.Label>
                        <Form.Control type="number" id="2" />
                        <Form.Label htmlFor="inputPassword5">
                          Account Name
                        </Form.Label>
                        <Form.Control type="text" id="3" />
                        <Form.Label htmlFor="inputPassword5">
                          Bank Name
                        </Form.Label>
                        <Form.Control type="text" id="4" />
                        <Form.Label htmlFor="inputPassword5">IFSC</Form.Label>
                        <Form.Control type="text" id="5" />
                        <Form.Label htmlFor="inputPassword5">
                          Account Type
                        </Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option value="1">Saving</option>
                          <option value="2">Current</option>
                        </Form.Select>
                      </div>
                    )}
                    {withType === "PAYTM" && (
                      <div className="withdraw_table">
                        <Form.Label htmlFor="inputPassword5">Amount</Form.Label>
                        <Form.Control type="nimber" id="1" />
                        <Form.Label htmlFor="inputPassword5">
                          UPI ID
                        </Form.Label>
                        <Form.Control disabled type="text" id="2" />
                        <Form.Label htmlFor="inputPassword5">
                        Account Holder Name
                        </Form.Label>
                        <Form.Control  type="text" id="3" />
                      </div>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal> */}

                {/* <div className="mainAccount">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewWithdraw;
