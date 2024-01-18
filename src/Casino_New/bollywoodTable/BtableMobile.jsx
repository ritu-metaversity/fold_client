import clsx from "clsx";
import React from "react";

const BtableMobile = ({ t2, handleClick, t2BySid }) => {
  const abc = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="table-responsive aaa-odds">
      <table className="table1 table-bordered mb-0">
        <thead>
          <tr>
            <th
              colSpan={3}
              className="box-10"
              style={{ fontSize: "14px", padding: "4px 2px" }}>
              Min: {t2[0]?.min} Max: {t2[0]?.max}
            </th>
          </tr>
        </thead>
        <tbody>
          {t2?.map((item, id) => {
            if (item.gtype !== "btable") return <></>;
            return (
              <tr
                className={clsx({
                  "aaa-table": true,
                  clearfix: true,
                  suspended: item?.gstatus !== "ACTIVE",
                })}>
                <td className="box-6" style={{ fontSize: "12px" }}>
                  <b>{abc[id]}.</b>
                  <b>{item?.nation}</b>{" "}
                  <p className="mb-0">
                    <b style={{ color: "black" }} />
                  </p>
                </td>
                <td
                  className="box-2 back text-center back"
                  onClick={() =>
                    handleClick({ ...item, rate: item?.b1 || "" }, true)
                  }>
                  <span className="odds d-block" style={{ fontSize: "12px" }}>
                    <b>{item?.b1}</b>
                  </span>
                </td>{" "}
                <td
                  className="box-2 lay text-center lay"
                  onClick={() =>
                    handleClick({ ...item, rate: item?.l1 || "" }, false)
                  }>
                  <span className="odds d-block" style={{ fontSize: "12px" }}>
                    <b>{item?.l1}</b>
                  </span>
                </td>
              </tr>
            );
          })}
          <tr className="aaa-table box-2" style={{ height: "20px", border:"1px solid #aaa" }}></tr>
        </tbody>
      </table>

      <table className="table1 table-bordered mb-0">
        <thead>
          <tr>
            <th
              colSpan={3}
              className="box-10"
              style={{ fontSize: "14px", padding: "4px 2px" }}>
              Min: {t2BySid["7"]?.min} Max: {t2BySid["7"]?.max}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            className={clsx({
              "aaa-table": true,
              clearfix: true,
              suspended: t2BySid["7"]?.gstatus !== "ACTIVE",
            })}>
            <td className="box-6" style={{ fontSize: "12px" }}>
              {/* <b>{abc[id]}.</b> */}
              <b>{t2BySid["7"]?.nation}</b>
              <p className="mb-0">
                <b style={{ color: "black" }} />
              </p>
            </td>
            <td
              className="box-2 back text-center back"
              onClick={() =>
                handleClick(
                  { ...t2BySid["7"], rate: t2BySid["7"]?.b1 || "" },
                  true
                )
              }>
              <span className="odds d-block" style={{ fontSize: "12px" }}>
                <b>{t2BySid["7"]?.b1}</b>
              </span>
            </td>{" "}
            <td
              className="box-2 lay text-center lay"
              onClick={() =>
                handleClick(
                  { ...t2BySid["7"], rate: t2BySid["7"]?.l1 || "" },
                  false
                )
              }>
              <span className="odds d-block" style={{ fontSize: "12px" }}>
                <b>{t2BySid["7"]?.l1}</b>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BtableMobile;
