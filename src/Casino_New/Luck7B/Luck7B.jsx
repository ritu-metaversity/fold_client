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
      <ThreeButtonContainer setOpen={setOpen} setBetState={setBetState} setShowBetSection={setShowBetSection} noToolTip t2={[t2BySid, t2BySid["2"]]} />
      <div className="fancy_aaa_container m-1 mt-2">
        <TwoButtonContainer
            toolTipshow={false}  setOpen={setOpen} className={"d-flex"} setBetState={setBetState} setShowBetSection={setShowBetSection} noToolTip t2={[t2BySid["3"], t2BySid["4"]]} />
        <TwoButtonContainer
            toolTipshow={false}  setOpen={setOpen} className={"d-flex"}  setBetState={setBetState} setShowBetSection={setShowBetSection} noToolTip t2={[t2BySid["5"], t2BySid["6"]]} />
      </div>
      <div className="mt-2">
      <BCardContainer
      setOpen={setOpen}
      setBetState={setBetState} setShowBetSection={setShowBetSection}
        noToolTip
        t2={t2.filter((item) => item.nation.toLowerCase().includes("card "))}
      />
      </div>
      
    </>
  );
};

export default Luck7B;
