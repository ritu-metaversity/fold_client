import ToolTip from "../tooltip/Tooltip";
import { SingleButton } from "../TwoButtonContainer/TwoButtonContainer";

const ThreeButtonContainer = ({
  t2,
  noToolTip,
  setBetState,
  setShowBetSection,
  setOpen,
  setUpdated
}) => {
  console.log(t2, "t2t2t2");
  return (
    <div className="content_container">
      {!noToolTip && (
        <div className="w-100">
          <ToolTip title={`Min:${t2[0].min} Max:${t2[0].max}`} />
        </div>
      )}
      <div className="d-flex gap-3">
        <SingleButton
          setOpen={setOpen}
          setBetState={setBetState}
          setShowBetSection={setShowBetSection}
          odd={t2[0]}
          setUpdated={setUpdated}
        />
        <div className="card_card_card">
          <p>&nbsp;</p>
          <img className="lucky_card_image" src={"/img/CARD 7.png"} alt="" />
        </div>
        <SingleButton
          setOpen={setOpen}
          setBetState={setBetState}
          setShowBetSection={setShowBetSection}
          odd={t2[1]}
          setUpdated={setUpdated}
        />
      </div>
      {noToolTip && (
        <div className="w-100 text-end min-max-casino">
          {`Min:${t2[0]?.min} Max:${t2[0]?.max}`}
        </div>
      )}
    </div>
  );
};

export default ThreeButtonContainer;
