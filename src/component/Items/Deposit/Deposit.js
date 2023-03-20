import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import NavBar from "../../navBar/NavBar";
import "./Deposit.css";
import PayManually from "./PayManually";
import Modal from "react-bootstrap/Modal";

const Deposit = () => {
  const [paymentListDetails, setPaymentListDetails] = useState({});
  const [showModals, setShowModals] = useState(false);
  const [modalImg, setModalImg] = useState("");

  const UpdateDetails = (vl) => {
    if (vl === true) {
      UserAPI.Deposit_Request().then((res) => {
        setPaymentListDetails(res);
      });
    }
  };
  useEffect(() => {
    UserAPI.Deposit_Request().then((res) => {
      setPaymentListDetails(res);
    });
  }, []);

  const handleCloseModal = () => setShowModals(false);
  const handleShow = (e,img) => {
    e.preventDefault();
    setShowModals(true);
    setModalImg(img)
  };

  return (
    <>
      <NavBar />
      {/* <Mobilenav /> */}
      <div className="wrapper main-conatiner">
        <PayManually UpdateDetails={UpdateDetails} />

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
                  <tr className="previous-deposite">
                    <th colSpan="4">Previous Deposite</th>
                  </tr>
                  <tr role="row" className="deposit-list">
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="1"
                      className="text-left">
                      Amount
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="2"
                      className="text-left">
                      Image
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="3"
                      className="text-left withdraw-data">
                      Data
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="4"
                      className="text-right">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paymentListDetails?.data &&
                    paymentListDetails?.data.map((item) => (
                      <tr role="row">
                        <td aria-colindex="1" className="text-left">
                          {item.amount}
                        </td>
                        <td aria-colindex="2" className="text-left">
                          <img
                          onClick={(e) => handleShow(e, item.image)}
                            src={item.image}
                            className="screenshot"
                            
                          />
                          <Modal
                          show={showModals}
                          onHide={handleCloseModal}
                          centered
                          style={{
                            marginTop: "12px",
                            marginInline: "2%",
                            width: "95%",
                          }}>
                          <Modal.Body>
                            {" "}
                            <img src={modalImg} width="100%" />
                          </Modal.Body>
                        </Modal>
                        </td>
                        <td aria-colindex="3" className="text-left">
                          {moment(item.time).format("YYYY-MM-DD, h:mm:ss")}
                        </td>
                        <td
                          aria-colindex="4"
                          className={`text-right ${item.status==="Pending"?"pending":item.status==="Approved"?"approved":"rejected"}`}>
                          {item.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
