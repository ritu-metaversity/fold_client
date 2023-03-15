import React from "react";
import './ExposureModal.css'

function ExposureModal() {
  return (
    <>
      <div style={{display: "block"}}>
        <div class="modal-dialog modal-lg">
          <div>
            <div id="myMarketModal___BV_modal_body_">
              <table class="table table-hover">
                <thead>
                  <tr class="theme1font">
                    <th>Event Type</th>
                    <th>Event Name</th>
                    <th>Match Name</th>
                    <th>Trade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="4" class="text-center no-real">
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
