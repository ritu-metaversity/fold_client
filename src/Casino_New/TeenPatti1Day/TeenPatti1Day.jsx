import PlayerBackLayTR from "../pokert20/PlayerBackLayTR";

const TeenPatti1Day = ({
  odds,
  setShowBetSection,
  setBetState,
  setOpen,
  setUpdated,
}) => {
  const { t2BySid } = odds.data;

  return (
    <div>
      <div className="t20_container">
        <table>
          <thead>
            <tr>
              <th>{`Min:${t2BySid[1]?.min} Max:${t2BySid[1]?.max}`}</th>
              <th>Back </th>
              <th className="lay">Lay </th>
            </tr>
          </thead>
          <tbody>
            <PlayerBackLayTR
              showRateForFirstT2
              showRateForSecondT2Also
              t2={t2BySid["1"]}
              setShowBetSection={setShowBetSection}
              setBetState={setBetState}
              setOpen={setOpen}
              setUpdated={setUpdated}
            />
            <PlayerBackLayTR
              showRateForFirstT2
              showRateForSecondT2Also
              t2={t2BySid["2"]}
              setShowBetSection={setShowBetSection}
              setBetState={setBetState}
              setOpen={setOpen}
              setUpdated={setUpdated}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeenPatti1Day;
