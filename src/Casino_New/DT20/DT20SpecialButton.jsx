import { SingleButton } from "../TwoButtonContainer/TwoButtonContainer";


const DT20SpecialButton = ({ t2, noToolTip, setBetState,  setOpen }) => {
  return (
    <div className="content_container">
      {!noToolTip && (
        <div className="w-100">
          {/* <ToolTip title={`Min:${t2[0].min} Max:${t2[0].max}`} /> */}
        </div>
      )}
      <div className="gap-3 casino_row">
        <div className="row ">
          <div className="col-md-9 row dt_20">
            <div className="col-md-5 col-sm-3">
              <SingleButton  setOpen={setOpen} setBetState={setBetState} odd={t2[0]} />
            </div>
            <div className="col-md-2 col-sm-3">
              <SingleButton  setOpen={setOpen} setBetState={setBetState} odd={t2[1]} />
            </div>
            <div className="col-md-5 col-sm-3 dt-special-border b_color">
              <SingleButton   setOpen={setOpen} setBetState={setBetState} odd={t2[2]} />
            </div>
          </div>
          <div className="col-md-3 pair_dt">
            <SingleButton  setOpen={setOpen} setBetState={setBetState} odd={t2[3]} />
          </div>
        </div>
      </div>
      {noToolTip && (
       <div className="w-100 text-end" style={{marginTop:"6px"}}>
       <span className="fw">Min:</span> <span>{t2[0].min}</span>{" "}
       <span className="fw">Max:</span> <span>{t2[0].max}</span>
     </div>
      )}
    </div>
  );
};

export default DT20SpecialButton;
