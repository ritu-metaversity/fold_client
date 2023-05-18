import React, { useEffect, useState } from "react";
import "./DepositForDesk.css";
import SideBar from "../sidebar/SideBar";
import Modal from "react-bootstrap/Modal";
import { UserAPI } from "../../apis/UserAPI";
import PaymanuallyDesk from "./PaymanuallyDesk";
import moment from "moment";

const DepositForDesk = () => {
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
  const handleShow = (e, img) => {
    e.preventDefault();
    setShowModals(true);
    setModalImg(img);
  };

  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
              <SideBar />
            </div>

            <div className="col-md-10 report-main-content m-t-5 desk-top-view">
              <div className="card">
                <div className="card-header header-card">
                  <h4 className="mb-0">Deposite</h4>
                </div>
                <div className="wrapper">
                  <PaymanuallyDesk UpdateDetails={UpdateDetails} />

                  <div className="row row5 mt-2">
                    <div className="col-12">
                      <div className="previous-deposite-desk">
                        <p>Previous Deposit</p>
                      </div>
                      <div className="table-responsive">
                        <table
                          role="table"
                          aria-busy="false"
                          aria-colcount="6"
                          className="table depositTable b-table table-bordered">
                          <thead>
                            <tr role="row" className="deposit-list">
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="1"
                                className="text-left deposit-data">
                                Amount
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="2"
                                className="text-center  deposit-data">
                                Image
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="3"
                                className="text-left deposit-data withdraw-data">
                                Data
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="4"
                                className="text-right deposit-data">
                                Status
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {paymentListDetails?.data &&
                              paymentListDetails?.data.map((item, id) => (
                                <tr role="row" key={id}>
                                  <td aria-colindex="1" className="text-left">
                                    {item.amount}
                                  </td>
                                  <td aria-colindex="2" className="text-center">
                                    <img
                                      onClick={(e) => handleShow(e, item.image)}
                                      src={item.image}
                                      className="screenshot"
                                      alt="screenshort-images"
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
                                        <img
                                          src={modalImg}
                                          width="100%"
                                          alt="screen-short"
                                        />
                                      </Modal.Body>
                                    </Modal>
                                  </td>
                                  <td aria-colindex="3" className="text-left">
                                    {moment(item.time).format(
                                      "YYYY-MM-DD, h:mm:ss"
                                    )}
                                  </td>
                                  <td
                                    aria-colindex="4"
                                    className={`text-right ${
                                      item.status === "Pending"
                                        ? "pending"
                                        : item.status === "APPROVED"
                                        ? "approved"
                                        : "rejected"
                                    }`}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositForDesk;
