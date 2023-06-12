import React, { useEffect, useState } from 'react'
import { GameAPI } from '../../apis/gameAPI';

const FancyModalsForDesk = ({matchId, FancyID}) => {

    const [FancyData, setFancyData] = useState([]);

    useEffect(() => {
      GameAPI.USER_FANCY_BOOK({
        matchId: matchId,
        fancyId: FancyID,
      }).then((res) => {
        setFancyData(Object.values(res));
      });
    }, []);




  return (
    <div>
      
    <div id="__BVID__287___BV_modal_body_">
      <div>
      { FancyData?.length === 0 ? (<p className="no-found">No real-time records found</p>): (
        <div className={`place-bet pt-2 pb-2`}>
          <div className={`container-fluid container-fluid-5`}>
            <div className="row row5">
              <div className="row row5 mt-2">
                <div className="col-12">
                  <div className="table-responsive">
                    <table
                      role="table"
                      aria-busy="false"
                      aria-colcount="6"
                      className="table b-table"
                      id="__BVID__104">
                      <thead>
                        <tr role="row" className="s-table">
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="2"
                            className="text-left nation-name">
                            Run
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="1"
                            className="text-left rate">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {FancyData?.map((item, id) => {
                          return (
                            <tr role="row" key={id} className="bet-details">
                              <td className="text-left">{item.odds}</td>
                              <td className={`text-left ${item.pnl < 0?"danger":"success"}`}>{item.pnl}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default FancyModalsForDesk