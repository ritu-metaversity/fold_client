import { useContext, useMemo } from "react";
import "../aaa/aaa.css";
import clsx from "clsx";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";
import ToolTip from "../tooltip/Tooltip";
import TwoButtonContainer from "../TwoButtonContainer/TwoButtonContainer";
import BCardContainer from "./BCardContainer";


const abc = ["a", "b", "c", "d", "e", "f"];
const BTable = ({ odds,  setBetState,setShowBetSection, setOpen }) => {
  const t2 = odds?.data?.t2 || [];

  const t2BySid = useMemo(() => {
    return t2.reduce((accu, curr) => {
      accu[curr.sid] = curr;
      return accu;
    }, {});
  }, [odds]);

  const { setBetDetails } = useContext(globalContext);
  const handleClick = (odd, isBack) => {
    setBetDetails &&
      Number(odd.rate) &&
      setBetDetails({
        casinoName: 2,
        isBack,
        odds: Number(odd.rate),
        marketId: odd.mid,
        placeTime: new Date().toString(),
        selectionId: odd.sid,
        nation: odd.nation,
      });
      setOpen(true)
  };
  return (
    <>
      <div className="content_container">
        <div className="w-100">
          <ToolTip title={`Min: ${t2[0].min} Max: ${t2[0].max}`} />
        </div>
        <div className="row">
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
                  })}
                >
                  <button
                    onClick={() =>
                      handleClick({ ...item, rate: item.b1 || "" }, true)
                    }
                    className="back"
                  >
                    <span className="odd">{item.b1}</span>
                  </button>
                  <button
                    onClick={() =>
                      handleClick({ ...item, rate: item.l1 || "" }, false)
                    }
                    className="lay"
                  >
                    <span className="odd">{item.l1}</span>
                  </button>
                </div>
                <div style={{color: "black"}}>0</div>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
      <div className="fancy_aaa_container">
        <div className="content_container">
          <div className="w-100">
            <ToolTip
              title={`Min: ${t2BySid["7"].min} Max: ${t2BySid["7"].max}`}
            />
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <div>
                <span className="d-block aaa-font">
                  <b>{t2BySid["7"].nation}</b>
                </span>
              </div>
              <div
                // className="aaa-button clearfix suspended"
                className={clsx({
                  "aaa-button": true,
                  clearfix: true,
                  suspended: t2BySid["7"].gstatus !== "ACTIVE",
                })}
              >
                <button
                  onClick={() =>
                    handleClick(
                      { ...t2BySid["7"], rate: t2BySid["7"].b1 || "" },
                      true
                    )
                  }
                  className="back"
                >
                  <span className="odd">{t2BySid["7"].b1}</span>
                </button>
                <button
                  onClick={() =>
                    handleClick(
                      { ...t2BySid["7"], rate: t2BySid["7"].l1 || "" },
                      false
                    )
                  }
                  className="lay"
                >
                  <span className="odd">{t2BySid["7"].l1}</span>
                </button>
              </div>
              <div style={{color: "black"}}>0</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <TwoButtonContainer
            toolTipshow={false}  className={"d-flex"} setBetState={setBetState}
          setShowBetSection={setShowBetSection} t2={[t2BySid["14"], t2BySid["15"]]} />
        </div>

        {/* <TwoButtonContainer
            toolTipshow={false} t2={[t2BySid["4"], t2BySid["5"]]} />
        <TwoButtonContainer
            toolTipshow={false} t2={[t2BySid["21"], t2BySid["22"]]} /> */}
      </div>
      <div className="fancy_aaa_container">
        <TwoButtonContainer
            toolTipshow={false}  className={"d-flex"} setBetState={setBetState}
          setShowBetSection={setShowBetSection} t2={[t2BySid["8"], t2BySid["9"]]} />

        <BCardContainer
        setBetState={setBetState}
        setShowBetSection={setShowBetSection}
        setOpen={setOpen}
          t2={t2.filter((item) => item.nation.toLowerCase().includes("card"))}
        />
      </div>
    </>
  );
};

export default BTable;
