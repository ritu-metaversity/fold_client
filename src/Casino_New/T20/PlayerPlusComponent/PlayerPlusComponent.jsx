import clsx from "clsx";
import "./PlayerPlus.css";


const PlayerPlusComponent= ({
  t2,
  showRateForSecondT2Also,
  title,
  showRateForFirstT2,
  setShowBetSection,
  setBetState,
  setOpen,
  setUpdated
}) => {
  const handleClick = (t2) => {
    setBetState &&
      setBetState((prev) => ({
        ...prev,
        nation:t2?.nation,
        casinoName: 2,
        isBack: true,
        odds: Number(t2?.rate) || Number(t2?.b1),
        marketId: t2?.mid,
        selectionId: t2?.sid,
        colorName:"back"
      }));
      setOpen(true);
      setShowBetSection(true);
      setUpdated(0)
  };
  return (
    <tr
      className={clsx({
        suspended: !t2[0]?.gstatus,
      })}
    >
      <td className="dt1_head">{title || t2[0]?.nationEle || t2[0]?.nation}</td>
      <td
        className={clsx({
          "dt1_head":true,
          suspended:
            // t2[0]?.gstatus &&
            !t2[0]?.gstatus || t2[0]?.gstatus !== "ACTIVE",
        })}
        onClick={() => handleClick(t2[0])}
      >
        <p>{showRateForFirstT2 ? t2[0]?.rate || t2[0]?.b1 : t2[0]?.nation}</p>
        <span className={t2[0]?.pnl >= 0? "text-success":"text-danger"}>{t2[0]?.pnl}</span>
      </td>
      <td
        onClick={() => handleClick(t2[1])}
        className={clsx({
          "dt1_head":true,
          suspended:
            // t2[0]?.gstatus &&
            !t2[1]?.gstatus || t2[1]?.gstatus !== "ACTIVE",
        })}
      >
        <p>
          {showRateForSecondT2Also ? t2[1]?.rate || t2[1]?.b1 : t2[1]?.nation}
        </p>
        <span className={t2[1]?.pnl >= 0? "text-success":"text-danger"}>{t2[1]?.pnl}</span>
      </td>
    </tr>
  );
};

export default PlayerPlusComponent;
