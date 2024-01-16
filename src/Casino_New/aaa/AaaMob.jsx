import clsx from "clsx";
import React from "react";

const AaaMob = ({ t2, abc }) => {
  console.log(t2, "Dsfsdfdfdsfs");
  return (
    <div className="table-responsive aaa-odds">
      <table className="table1 table-bordered mb-0">
        <thead>
          <tr>
            <th colSpan={3} className="box-10" style={{fontSize:"14px", padding:"4px 2px"}}>
            Min: {t2[0]?.min} Max: {t2[0]?.max}
            </th>
          </tr>
        </thead>{" "}
        <tbody>
          {t2?.map((item, id) => {
            if(item?.gtype !== "aaa") return <></>
            return (
              <tr   className={clsx({
                "aaa-table": true,
                clearfix: true,
                suspended: item?.gstatus !== "ACTIVE",
              })}>
                <td className="box-6" style={{fontSize:"12px"}}>
                  <b>{abc[id]}.</b>
                  <b>{item?.nation}</b>{" "}
                  <p className="mb-0">
                    <b style={{ color: "black" }} />
                  </p>
                </td>{" "}
                <td className="box-2 back text-center back">
                  <span className="odds d-block" style={{fontSize:"12px"}}>
                    <b>{item?.b1}</b>
                  </span>
                </td>{" "}
                <td className="box-2 lay text-center lay">
                  <span className="odds d-block" style={{fontSize:"12px"}}>
                    <b>{item?.l1}</b>
                  </span>
                </td>
              </tr>
            );
          })}{" "}
        </tbody>
      </table>
    </div>
  );
};

export default AaaMob;
