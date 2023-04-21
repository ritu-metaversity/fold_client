import React from "react";
import './ExposureModal.css'

function ExposureModal() {
  return (
    <>
      <div style={{display: "block"}}>
        <div className="modal-dialog modal-lg">
          <div>
            <div id="myMarketModal___BV_modal_body_">
              <table className="table table-hover">
                <thead>
                  <tr className="theme1font">
                    <th>Event Type</th>
                    <th>Event Name</th>
                    <th>Match Name</th>
                    <th>Trade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="4" className="text-center no-real">
                      No real-time records found
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExposureModal;
