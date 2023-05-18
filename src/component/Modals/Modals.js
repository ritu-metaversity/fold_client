import React from "react";
import ModalSideBar from "./ModalSideBar/ModalSideBar";
import "../Modals/Modals.css";
import ModalsBody from "./ModalsBody/ModalsBody";

function Modals() {
  return (
    <>
      <div>
        <div
          role="dialog"
          className="modal fade show custom-modal-class"
          style={{display: "block"}}>
          <div className="modal-dialog modal-full">
            <span tabIndex="0"></span>
            <div
              role="document"
              tabIndex="-1"
              className="modal-content">
              <div  className="modal-body">
                <div className="">
                  <div data-typeid="" className="row rules-container">
                    <div
                      className="sidebar col-md-2 sidebar-title"
                      style={{marginTop: "0px"}}>
                      <ModalSideBar />
                    </div>
                    <div className="col-md-10 nopading rules-description">
                      <ModalsBody />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span tabIndex="0"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modals;
