import { useContext, useMemo, useState } from "react";
import "../aaa/aaa.css";
import clsx from "clsx";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";
import ToolTip from "../tooltip/Tooltip";
import TwoButtonContainer from "../TwoButtonContainer/TwoButtonContainer";
import BCardContainer from "./BCardContainer";
import BtableMobile from "./BtableMobile";

const abc = ["a", "b", "c", "d", "e", "f"];
const BTable = ({
  odds,
  setBetState,
  setShowBetSection,
  setOpen,
  setUpdated,
}) => {
  const t2 = odds?.data?.t2 || [];
  const t2BySid = useMemo(() => {
    return t2.reduce((accu, curr) => {
      accu[curr.sid] = curr;
      return accu;
    });
  }, [odds]);

  const { setBetDetails } = useContext(globalContext);
  const handleClick = (odd, isBack) => {
    setBetState &&
      setBetState((prev) => ({
        ...prev,
        nation: odd?.nation,
        casinoName: 2,
        isBack: isBack,
        odds: Number(odd?.rate) || Number(odd?.b1),
        marketId: odd?.mid,
        selectionId: odd?.sid,
        colorName: isBack ? "back":"lay",
      }));
    setOpen(true);
    setUpdated(0);
    setShowBetSection(true);
  };

  return (
    <>
      <div className="content_container desk-view-casino">
        <div className="w-100">
          <ToolTip title={`Min: ${t2[0]?.min} Max: ${t2[0]?.max}`} />
        </div>
        
          <div className="row ">
            {t2.map((item, index) =>
              item.gtype === "btable" ? (
                <div className="col-4 text-center aaa-font">
                  <div>
                    <span className="d-block">
                      <b>
                        <span className="text-danger text-capitalize">
                          {abc[index]}.
                        </span>
                        {item.nation}
                      </b>
                    </span>
                  </div>
                  <div
                    // className="aaa-button clearfix suspended"
                    className={clsx({
                      "aaa-button": true,
                      clearfix: true,
                      suspended: item.gstatus !== "ACTIVE",
                    })}>
                    <button
                      onClick={() =>
                        handleClick({ ...item, rate: item?.b1 || "" }, true)
                      }
                      className="back">
                      <span className="odd">{item?.b1}</span>
                    </button>
                    <button
                      onClick={() =>
                        handleClick({ ...item, rate: item?.l1 || "" }, false)
                      }
                      className="lay">
                      <span className="odd">{item?.l1}</span>
                    </button>
                  </div>
                  <div style={{ color: "black" }}>0</div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
      </div>
      <div className="mob-view-casino mb-3">
        <BtableMobile t2={t2} handleClick={handleClick} t2BySid={t2BySid}/>
      </div>
      <div className={`fancy_aaa_container ${window.innerWidth < 800 ?"mb-2":null}`}>
        <div className="content_container desk-view-casino">
          <div className="w-100">
            <ToolTip
              title={`Min: ${t2BySid["7"]?.min} Max: ${t2BySid["7"]?.max}`}
            />
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <div>
                <span className="d-block aaa-font">
                  <b>{t2BySid["7"]?.nation}</b>
                </span>
              </div>
              <div
                // className="aaa-button clearfix suspended"
                className={clsx({
                  "aaa-button": true,
                  clearfix: true,
                  suspended: t2BySid["7"]?.gstatus !== "ACTIVE",
                })}>
                <button
                  onClick={() =>
                    handleClick(
                      { ...t2BySid["7"], rate: t2BySid["7"]?.b1 || "" },
                      true
                    )
                  }
                  className="back">
                  <span className="odd">{t2BySid["7"]?.b1}</span>
                </button>
                <button
                  onClick={() =>
                    handleClick(
                      { ...t2BySid["7"], rate: t2BySid["7"]?.l1 || "" },
                      false
                    )
                  }
                  className="lay">
                  <span className="odd">{t2BySid["7"]?.l1}</span>
                </button>
              </div>
              <div style={{ color: "black" }}>0</div>
            </div>
          </div>
        </div>
        <div  style={{ flex: 2 }}>
          <TwoButtonContainer
            setUpdated={setUpdated}
            setOpen={setOpen}
            toolTipshow={true}
            className={"d-flex"}
            setBetState={setBetState}
            setShowBetSection={setShowBetSection}
            t2={[t2BySid["14"], t2BySid["15"]]}
          />
        </div>

      </div>
      <div className="fancy_aaa_container d-flex-mob">
        <div  className={window.innerWidth < 800 ?"mb-2":null}>
        <TwoButtonContainer
          setUpdated={setUpdated}
          setOpen={setOpen}
          toolTipshow={true}
          className={"d-flex"}
          setBetState={setBetState}
          setShowBetSection={setShowBetSection}
          t2={[t2BySid["8"], t2BySid["9"]]}
        />
        </div>
       

        <BCardContainer
          setBetState={setBetState}
          setShowBetSection={setShowBetSection}
          setOpen={setOpen}
          setUpdated={setUpdated}
          t2={t2.filter((item) =>
            item?.nation?.toLowerCase()?.includes("card")
          )}
        />
      </div>
    </>
  );
};

export default BTable;
