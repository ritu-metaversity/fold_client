import {  useMemo } from "react";
import ThreeButtonContainer from "./ThreeButtonContainer";
import TwoButtonContainer from "../TwoButtonContainer/TwoButtonContainer";
import BCardContainer from "../bollywoodTable/BCardContainer";

const Luck7B = ({ odds, setBetState,setShowBetSection, setOpen }) => {
  const t2 = odds?.data?.t2 || [];
  const t2BySid = useMemo(() => {
    return t2.reduce((accu, curr) => {
      accu[curr.sid] = curr;
      return accu;
    });
  }, [odds]);

  
  return (
    <>
      {/* <div className="content_container">
        <div className="p-2">
          <div className="d-flex">
            <button className="btn btn-primary"></button>
            <button className="btn btn-primary"></button>
          </div>
        </div>
      </div> */}
      <ThreeButtonContainer setOpen={setOpen} setBetState={setBetState} setShowBetSection={setShowBetSection} noToolTip t2={[t2BySid["1"], t2BySid["2"]]} />
      <div className="fancy_aaa_container">
        <TwoButtonContainer  setOpen={setOpen} className={"d-flex"} setBetState={setBetState} setShowBetSection={setShowBetSection} noToolTip t2={[t2BySid["3"], t2BySid["4"]]} />
        <TwoButtonContainer  setOpen={setOpen} className={"d-flex"}  setBetState={setBetState} setShowBetSection={setShowBetSection} noToolTip t2={[t2BySid["5"], t2BySid["6"]]} />
      </div>
      <br/>
      <BCardContainer
      setOpen={setOpen}
      setBetState={setBetState} setShowBetSection={setShowBetSection}
        noToolTip
        t2={t2.filter((item) => item.nation.toLowerCase().includes("card "))}
      />
    </>
  );
};

export default Luck7B;
