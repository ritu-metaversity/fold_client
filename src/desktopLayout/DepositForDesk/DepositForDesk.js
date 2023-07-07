import moment from "moment";
import React, { useEffect, useState } from "react";
import "./DepositForDesk.css";
import PaymanuallyDesk from "./PaymanuallyDesk";
import Modal from "react-bootstrap/Modal";
import { UserAPI } from "../../apis/UserAPI";

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
      {/* <Mobilenav /> */}
      <>
        <div className="card-header wit">
          <h4 className="mb-0">Deposit</h4>
        </div>
        <div className="wrapper main-conatiner desk_deposit deposit">
          <PaymanuallyDesk UpdateDetails={UpdateDetails} />

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
                      <th colSpan="4" className="text-white">
                        Previous Deposit
                      </th>
                    </tr>
                    <tr role="row" className="deposit-list" style={{background: "#2c3d50"}}>
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
                        className="text-center deposit-data">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paymentListDetails?.data &&
                      paymentListDetails?.data.map((item, id) => {
                        return (
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
                              {item.time}
                              
                            </td>
                            <td aria-colindex="4" className="text-center">
                              <p
                                className={`status_btn ${
                                  item.status === "Pending"
                                    ? "pending"
                                    : item.status === "APPROVED"
                                    ? "approved"
                                    : "rejected"
                                }`}>
                                {item.status}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DepositForDesk;
