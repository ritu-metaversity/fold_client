import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import Mobilenav from "../../navBar/MobileNav/Mobilenav";
import NavBar from "../../navBar/NavBar";
import "./Deposit.css";
import PayManually from "./PayManually";
import Modal from "react-bootstrap/Modal";

const Deposit = () => {
  const [paymentListDetails, setPaymentListDetails] = useState({});
  const [showModals, setShowModals] = useState(false);

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
  const handleShow = (e) => {
    e.preventDefault();
    setShowModals(true);
  };

  return (
    <>
      <NavBar />
      <Mobilenav />
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
                      className="text-left">
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
                            src={item.image}
                            className="screenshot"
                            onClick={(e) => handleShow(e)}
                          />
                        </td>
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
                            <img src={item.image} width="250px" />
                          </Modal.Body>
                        </Modal>

                        <td aria-colindex="3" className="text-left">
                          {moment(item.time).format("MM Do YYYY, h:mm")}
                          {/* { moment().formet("mm dd yyyy hh mm")}  */}
                        </td>
                        <td
                          aria-colindex="4"
                          className="text-right text-danger">
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
