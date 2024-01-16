import clsx from "clsx";
// import "./PlayerPlus.css";
import "./dt1dayComp.css";

const DT1DaySpecial4Component= ({ t2, title,setShowBetSection, setBetState, setOpen }) => {

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
        dt1dayCompTr: true,
      })}
    >
      <td>{title}</td>
      <td
        className={clsx({
          "dt1_head":true,
          suspended: t2[0]?.gstatus !== "ACTIVE",
        })}
        onClick={() => handleClick(t2[0])}
      >
        <p className="dt1_head">{t2[0]?.rate || t2[0].b1}</p>
        <span>{t2[0]?.pnl}</span>
      </td>
      <td
        onClick={() => handleClick(t2[1])}
        className={clsx({
          suspended: t2[1]?.gstatus !== "ACTIVE",
        })}
      >
        <p className="dt1_head">{t2[1]?.rate || t2[1].b1}</p>
        <span>{t2[1]?.pnl}</span>
      </td>
      <td
        onClick={() => handleClick(t2[2])}
        className={clsx({
          suspended: t2[2]?.gstatus !== "ACTIVE",
        })}
      >
        <p className="dt1_head">{t2[2]?.rate || t2[2].b1}</p>
        <span>{t2[2]?.pnl}</span>
      </td>
      <td
        onClick={() => handleClick(t2[3])}
        className={clsx({
          suspended: t2[3]?.gstatus !== "ACTIVE",
        })}
      >
        <p className="dt1_head">{t2[3]?.rate || t2[3].b1}</p>
        <span>{t2[3]?.pnl}</span>
      </td>
    </tr>
  );
};

export default DT1DaySpecial4Component;
