import { SingleButton } from "../TwoButtonContainer/TwoButtonContainer";


const DT20SpecialButton = ({ t2, noToolTip, setBetState,  setOpen, setShowBetSection, setUpdated }) => {
  return (
    <div className="content_container">
      {!noToolTip && (
        <div className="w-100">
          {/* <ToolTip title={`Min:${t2[0].min} Max:${t2[0].max}`} /> */}
        </div>
      )}
      <div className="gap-3 casino_row">
        <div className={window?.innerWidth > 800?"row ":""}>
          <div className="col-md-9 row dt_20">
            <div className="col-5 casino_name_dt">
              <SingleButton setUpdated={setUpdated} setShowBetSection={setShowBetSection}  setOpen={setOpen} setBetState={setBetState} odd={t2[0]} />
            </div>
            <div className="col-2 casino_name_dt_md">
              <SingleButton setUpdated={setUpdated} setShowBetSection={setShowBetSection}  setOpen={setOpen} setBetState={setBetState} odd={t2[1]} />
            </div>
            <div className="col-5 dt-special-border b_color casino_name_dt">
              <SingleButton setUpdated={setUpdated} setShowBetSection={setShowBetSection}   setOpen={setOpen} setBetState={setBetState} odd={t2[2]} />
            </div>
          </div>
          <div className="col-md-3 pair_dt">
            <SingleButton setUpdated={setUpdated} setShowBetSection={setShowBetSection}  setOpen={setOpen} setBetState={setBetState} odd={t2[3]} />
          </div>
        </div>
      </div>
      {noToolTip && (
       <div className="w-100 text-end min-max-casino" style={{marginTop:"6px"}}>
       <span className="fw">Min:</span> <span>{t2[0]?.min}</span>{" "}
       <span className="fw">Max:</span> <span>{t2[0]?.max}</span>
     </div>
      )}
    </div>
  );
};

export default DT20SpecialButton;
