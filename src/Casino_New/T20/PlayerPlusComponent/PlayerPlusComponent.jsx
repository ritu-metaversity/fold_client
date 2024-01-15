import clsx from "clsx";
import "./PlayerPlus.css";


const PlayerPlusComponent= ({
  t2,
  showRateForSecondT2Also,
  title,
  showRateForFirstT2,
  setShowBetSection,
  setBetState,
  setOpen
}) => {
  const handleClick = (t2) => {
    setBetState &&
      setBetState((prev) => ({
        ...prev,
        nation:t2?.nation,
        casinoName: 2,
        isBack: true,
        odds: Number(t2.rate) || Number(t2.b1),
        marketId: t2.mid,
        placeTime: new Date().toString(),
        selectionId: t2.sid,
        colorName:"back"
      }));
      setOpen(true)
  };
  return (
    <tr
      className={clsx({
        suspended: !t2[0]?.gstatus,
      })}
    >
      <td>{title || t2[0]?.nationEle || t2[0]?.nation}</td>
      <td
        className={clsx({
          suspended:
            // t2[0]?.gstatus &&
            !t2[0]?.gstatus || t2[0]?.gstatus !== "ACTIVE",
        })}
        onClick={() => handleClick(t2[0])}
      >
        <p>{showRateForFirstT2 ? t2[0]?.rate || t2[0].b1 : t2[0]?.nation}</p>
        <span>{t2[0]?.pnl}</span>
      </td>
      <td
        onClick={() => handleClick(t2[1])}
        className={clsx({
          suspended:
            // t2[0]?.gstatus &&
            !t2[1]?.gstatus || t2[1]?.gstatus !== "ACTIVE",
        })}
      >
        <p>
          {showRateForSecondT2Also ? t2[1]?.rate || t2[1].b1 : t2[1]?.nation}
        </p>
        <span>{t2[1]?.pnl}</span>
      </td>
    </tr>
  );
};

export default PlayerPlusComponent;
