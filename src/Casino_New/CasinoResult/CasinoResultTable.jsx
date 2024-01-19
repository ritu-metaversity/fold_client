import clsx from 'clsx'
import React from 'react'

const CasinoResultTable = ({resultList, setMid, handlePrev, index, handleNext, setIndex}) => {
  return (
    <>
     <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Round Id</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {resultList.map((item) => (
                <tr>
                  <td
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "deepskyblue",
                      width: "17%",
                      height: "40px",
                    }}
                    onClick={() => setMid(item.mid)}>
                    {item.mid.split(".")[1]}
                  </td>
                  <td>{item.nat}</td>
                </tr>
              ))}
              {!(resultList?.length > 0) && (
                <tr>
                  <td className="text-center" colSpan={2}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-100 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  onClick={handlePrev}
                  className={clsx("page-item", !index && "disabled")}>
                  <div className="page-link" style={{marginLeft: "unset"}}>
                    Previous
                  </div>
                </li>
                <li className="page-item" onClick={() => setIndex(0)}>
                  <div className="page-link" >
                    {index + 1}
                  </div>
                </li>
                <li
                  onClick={handleNext}
                  className={clsx("page-item", index >= 100 && "disabled")}>
                  <div className="page-link">
                    Next
                  </div>
                </li>
              </ul>
            </nav>
          </div>
    </>
  )
}

export default CasinoResultTable