import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UserAPI } from "../../../apis/UserAPI";
import "./PayManually.css";
import { Input } from "antd";
import Modal from "react-bootstrap/Modal";
import AlertBtn from "../../Alert/AlertBtn";
import { setLocale } from "yup";

const PayManually = (props) => {
  const [payMethods, setPayMethods] = useState();
  const [UpiDetail, setUpiDetail] = useState();
  const [Bitvalue, setBitValue] = useState(0);
  const [allDatataa, setAllDatataa] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [showModals, setShowModals] = useState(false);
  const [active, setActive] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [color, setColor] = useState();
  const [messege, setMessege] = useState();
  const [alertBtnshow, setAlertBtnshow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState(null);

  const increment = () => {
    setBitValue(Number(Bitvalue) + 10);
  };
  const decrement = () => {
    if (Bitvalue != 0 && Bitvalue > 9) setBitValue(Number(Bitvalue) - 10);
  };

  const handleStaticAmount = (vl) => {
    setBitValue((Bitvalue) => (Number(Bitvalue) || 0) + Number(vl));
  };

  const handleStaticAmountInput = (e) => {
    let Inputvalue = e.target.value;
    setBitValue(parseInt(Inputvalue));
  };
  useEffect(() => {
    UserAPI.Get_Payment_Detail_By_Id().then((res) => {
      setPayMethods(res.data.paymentMethods);
      setUpiDetail(res.data.upiDetail);
      setAllDatataa(res.data);
    });
  }, []);

  const handlePaymentDetails = (vl, id) => {
    setPaymentMode(vl);
    setActive(id);
  };

  console.log(Bitvalue, "adsefgesrt");

  const handleSubmit = () => {
    setAlertBtnshow(false);
    setIsLoading(true);
    if (Bitvalue === 0 || Bitvalue === NaN) {
      setColor("danger");
      setMessege("Amount should be greater than 99");
      setAlertBtnshow(true);
      setIsLoading(false);
    } else if (files === null) {
      setColor("danger");
      setMessege("Payment Screenshot is required");
      setAlertBtnshow(true);
      setIsLoading(false);
    } else if (Bitvalue < 99) {
      setColor("danger");
      setMessege("Minimum Deposit Amount is 100");
      setAlertBtnshow(true);
      setIsLoading(false);
    }

    const data = new FormData();
    data.append("amount", Bitvalue);
    data.append("image", files || "");
    if (Bitvalue > 99 && Bitvalue !== "" && Bitvalue != NaN) {
      UserAPI.Self_Deposit_App({ data })
        .then((res) => {
          setIsLoading(false);
          props.UpdateDetails(true);
          setMessege(res.message);
          setColor("success");
          setAlertBtnshow(true);
          if (res.status === true) {
            setBitValue(0);
            setFiles(null);
            setPaymentMode("UPI");
            setActive(0);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setMessege(error.respose.data.message);
          setColor("danger");
          setAlertBtnshow(true);
        });
    }
  };

  const [AllBetData, setAllBetData] = useState([]);
  useEffect(() => {
    UserAPI.WITHDRAW_STACK_REQUEST().then((res) => {
      setAllBetData(res?.data);
    });
  }, []);

  const handleCloseModal = () => setShowModals(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShowModals(true);
  };

  const popupClose = (vl) => {
    setAlertBtnshow(false);
  };

  return (
    <div>
      {alertBtnshow ? (
        <AlertBtn color={color} val={messege} popupClose={popupClose} />
      ) : (
        ""
      )}
      {isLoading ? (
        <p className="lodder depositLoading">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
        ""
      )}
      <p className="enter-amount">Enter Amount</p>
      <div className="row row5 main-pricecontainor">
        <div className="text-lef col-6 colval price-input">
          <div className="float-left d-flex inputfield">
            <button
              className="stakeactionminus priceminus btn"
              onClick={decrement}>
              <span
                className="fa fa-minus"
                aria-hidden="true"
                onClick={decrement}></span>
            </button>
            <input
              type="number"
              placeholder="0"
              className="priceinput"
              onChange={handleStaticAmountInput}
              value={Number(Bitvalue)}
            />
            <button
              className="stakeactionminus priceminus btn"
              onClick={increment}>
              <span
                className="fa fa-plus"
                aria-hidden="true"
                onClick={increment}></span>
            </button>
          </div>
        </div>
        <div className="col-6 marTop deposit-value">
          <div className="row price-values">
            {AllBetData.map(({ value, key }) => (
              <div className="col-3 price-data">
                <button
                  className="btn btn-secondary btn-block mb-2"
                  value="1000"
                  onClick={() => handleStaticAmount(value)}>
                  {key}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="paymethods">
        <Container>
          <div className="amount">
            <h1>Pay {Bitvalue || 0}/-</h1>
            <p>Pay Manually</p>
          </div>
          <div className="bank-logo">
            <Row>
              {payMethods?.length &&
                payMethods?.map((item, id) => {
                  return (
                    <Col
                      className={item.methodName === "Bank" ? "d-none" : ""}
                      key={item.methodName + id}
                      onClick={() => handlePaymentDetails(item.methodName, id)}>
                      <div
                        className={`css-1502y4u ${
                          active === id ? "active3" : ""
                        } `}>
                        <img
                          src={item.logo}
                          className="css-37vfbv"
                          alt="Bank"
                        />
                        <p className="Typography-root ">{item.methodName}</p>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Container>
      </div>
      <div className="paymethods">
        {paymentMode === "UPI" ? (
          <Container>
            <div className="bank-logo mode">
              <Row className="upi-detail head-deposit">
                <Col className="name-d">
                  <div className="">
                    <p className="Typography-root ">Mode</p>
                  </div>
                </Col>
                <Col className="name-d">
                  <div className="">
                    <p className="Typography-root ">Display Name</p>
                  </div>
                </Col>
                <Col className="name-d">
                  <div className="">
                    <p className="Typography-root ">UPI Detail</p>
                  </div>
                </Col>
              </Row>

              <Row className="upi-detail">
                <Col className="name-d">
                  <div className="">
                    <p className="Typography-root ">{UpiDetail?.upiName}</p>
                  </div>
                </Col>
                <Col className="name-d">
                  <div className="">
                    <p className="Typography-root ">{UpiDetail?.displayName}</p>
                  </div>
                </Col>
                <Col className="name-d">
                  <div className="">
                    <p className="Typography-root">{UpiDetail?.upiId}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        ) : (
          ""
        )}
        {/* {paymentMode === "Bank" ? (
          <Container className="bank-detail">
            <Row>
              <Col className="name-d">
                <div className="">
                  <p className="Typography-root root">Bank Name</p>
                </div>
              </Col>
              <Col>
                <div className="">
                  <p className="Typography-root text-right">
                    {allDatataa?.bankDetail?.bankName}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="name-d">
                <div className="">
                  <p className="Typography-root root">Account Number</p>
                </div>
              </Col>
              <Col>
                <div className="">
                  <p className="Typography-root text-right">
                    {allDatataa?.bankDetail?.accountNumber}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="name-d">
                <div className="">
                  <p className="Typography-root root">IFSC Code</p>
                </div>
              </Col>
              <Col>
                <div className="">
                  <p className="Typography-root text-right">
                    {allDatataa?.bankDetail?.ifscCode}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="name-d">
                <div className="">
                  <p className="Typography-root root">Account Holder Name</p>
                </div>
              </Col>
              <Col>
                <div className="">
                  <p className="Typography-root text-right">
                    {allDatataa?.bankDetail?.accountHolderName}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          ""
        )} */}
        {paymentMode === "QR" ? (
          <Container className="bank-detail">
            <Row>
              <p>QR Code For Payment</p>
              <Col className="name-d">
                <div className="">
                  <img
                    src={
                      allDatataa &&
                      allDatataa?.qrCode &&
                      allDatataa?.qrCode?.qrCodeImage
                    }
                    style={{ width: "150px" }}
                    onClick={(e) => handleShow(e)}
                    alt="QR-Code"
                  />
                </div>
              </Col>
              <Modal
                show={showModals}
                onHide={handleCloseModal}
                centered
                style={{
                  marginTop: "12px",
                  marginInline: "2%",
                  width: "95%",
                }}>
                <Modal.Body className="image-body">
                  {" "}
                  <img
                    src={
                      allDatataa &&
                      allDatataa?.qrCode &&
                      allDatataa?.qrCode?.qrCodeImage
                    }
                    className="modals-image"
                    alt="QR-code"
                  />
                </Modal.Body>
              </Modal>
              <Col className="qr-payment">
                <Row>
                  <Col>
                    <div className="">
                      <p>Display Name</p>
                      <Input
                        value={
                          allDatataa &&
                          allDatataa?.qrCode &&
                          allDatataa?.qrCode?.displayName
                        }
                        readOnly
                        type="text"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          ""
        )}
      </div>

      <div className="paymethods">
        <Container>
          <div className="">
            <Row className="upi-detail ">
              <Col className="name-d">
                <label className="images-section">
                  {!files && (
                    <div className="image-text">
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      <p>Click here to upload payment screenshot</p>
                    </div>
                  )}

                  {files && (
                    <img
                      style={{ maxWidth: "90%", margin: "auto" }}
                      src={URL.createObjectURL(files)}
                      alt="uploaded_img"
                    />
                  )}
                  <input
                    onChange={(e) =>
                      e.target.files && setFiles(e.target.files[0])
                    }
                    readOnly
                    type="file"
                    style={{ display: "none" }}
                  />
                </label>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="row row5 mt-2">
        <div className="col-12">
          <button
            className="btn btn-primary btn-block btn-sm deposit-button"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayManually;
