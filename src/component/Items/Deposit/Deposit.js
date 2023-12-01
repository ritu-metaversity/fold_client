import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import "./Deposit.css";
import PayManually from "./PayManually";
import Modal from "react-bootstrap/Modal";
import {
  CloseCircleFilled
} from '@ant-design/icons';

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
      {/* <Mobilenav /> */}
      <><div className="card-header wit"><h4 className="mb-0">Deposit</h4></div>
      <div className="wrapper deposit">
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
                    <th colSpan="4" className="text-white">Previous Deposit</th>
                  </tr>
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
                      className="text-center deposit-data">
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
                          
                        </td>
                        <td aria-colindex="3" className="text-left">
                          {item.time}
                        </td>
                        <td
                          aria-colindex="4"
                          className="text-center">
                          <p className={`${item.status==="Pending"?"pending":item.status==="APPROVED"?"approved":"rejected"}`}>{item.status}</p>
                        </td>
                      </tr>
                    ))}
                    <Modal
                          show={showModals}
                          onHide={handleCloseModal}
                          centered
                          style={{
                            marginTop: "12px",
                            marginInline: "2%",
                            width: "95%",
                          }}>
                          <Modal.Body style={{position:"relative"}}>
                          <button onClick={handleCloseModal} className="close_btn_modal"><CloseCircleFilled /></button>
                            {" "}
                            <img src={modalImg} width="100%" alt="screen-short"/>
                          </Modal.Body>
                        </Modal>
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

export default Deposit;
