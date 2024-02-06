import {  useEffect } from "react";
import "./CasinoModal.css";

const CasinoModal = ({ open, handleClose, children, title, size }) => {
  useEffect(() => {
    if (open) {
      document.querySelector("body")?.classList.add("modal-open-sus");
    } else {
      document.querySelector("body")?.classList.remove("modal-open-sus");
    }
    return () => {};
  }, [open]);
  return (
    <>
      {open && (
        <div className="modal_overall">
          <div className="modal_overlay"></div>
          <div className={"modal_container " + size}>
            <div className="modal_header " style={{background:"#08c"}}>
              {title}
              <i className="fa fa-times" onClick={handleClose} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CasinoModal;