import PlayerPlusComponent from "../T20/PlayerPlusComponent/PlayerPlusComponent";
import { SingleButton } from "../TwoButtonContainer/TwoButtonContainer";
import PlayerBackLayTR from "../pokert20/PlayerBackLayTR";
import ToolTip from "../tooltip/Tooltip";
import DT1DaySpecial4Component from "./DT1DaySpecial4Component";
import "./dt1day.css";

const DT1Day = ({ odds, setShowBetSection, setBetState, setOpen }) => {
  const { t2BySid } = odds?.data;
  return (
    <>
      <div className="t20_container ">
        <div className="d-flex dt1day_container flex-wrap">
          <table>
            <thead>
              <tr>
                <th>
                  <span className="desk-view-casino">
                    <ToolTip
                      placement="start"
                      title={`Min: ${t2BySid[1]?.min} Max: ${t2BySid[1]?.max}`}
                    />
                  </span>
                  <span className="mob-view-casino">
                    Min:{t2BySid[1]?.min} Max: {t2BySid[1]?.max}
                  </span>
                </th>
                <th style={{textTransform:"uppercase" }}>Back</th>
                <th className="lay" style={{textTransform:"uppercase" }}>Lay</th>
              </tr>
            </thead>
            <tbody>
              <PlayerBackLayTR
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                showRateForFirstT2
                showRateForSecondT2Also
                setOpen={setOpen}
                t2={t2BySid["1"]}
              />
              <PlayerBackLayTR
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                showRateForFirstT2
                showRateForSecondT2Also
                setOpen={setOpen}
                t2={t2BySid["2"]}
              />
              {/* {Array(9)} */}
              {/* {[...Array(9).keys()].map((index) => {
              if (index <= 4)
                return (
                  <PlayerPlusComponent
                    showRateForSecondT2Also
                    t2={[t2BySid[index + 11 + ""], t2BySid[+index + 21 + ""]]}
                  />
                );
            })} */}
            </tbody>
          </table>
          <div className="content_container flex-fill">
            <div className="w-100 desk-view-casino">
              <ToolTip
                title={`Min:${t2BySid[3]?.min} Max:${t2BySid[3]?.max}`}
              />
            </div>
            <SingleButton
              setOpen={setOpen}
              odd={t2BySid["3"]}
              setShowBetSection={setShowBetSection}
              setBetState={setBetState}
            />
            <div className="mob-view-casino" style={{textAlign:"right", padding: "12px 3px 0px"}}>
              <span>
              Min:{t2BySid[3]?.min} Max:{t2BySid[3]?.max}
              </span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  <span className="desk-view-casino">
                    <ToolTip
                      placement="start"
                      title={`Min: ${t2BySid[4]?.min} Max: ${t2BySid[4]?.max}`}
                    />
                  </span>
                  <span className="mob-view-casino">
                    Min:{t2BySid[4]?.min} Max:{t2BySid[4]?.max}
                  </span>
                </th>
                <th>Even </th>
                <th>Odd</th>
              </tr>
            </thead>
            <tbody>
              {/* {Array(9)} */}
              <PlayerPlusComponent
                setOpen={setOpen}
                showRateForFirstT2
                showRateForSecondT2Also
                title="Dragon"
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                t2={[t2BySid["4"], t2BySid["5"]]}
              />{" "}
              <PlayerPlusComponent
                setOpen={setOpen}
                title="Tiger"
                showRateForFirstT2
                showRateForSecondT2Also
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                t2={[t2BySid["12"], t2BySid["13"]]}
              />
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>
                  <span className="desk-view-casino">
                    <ToolTip
                      placement="start"
                      title={`Min: ${t2BySid[6]?.min} Max: ${t2BySid[6]?.max}`}
                    />
                  </span>
                  <span className="mob-view-casino">
                    Min:{t2BySid[6]?.min} Max:{t2BySid[6]?.max}
                  </span>
                </th>
                <th>
                  Red
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/pan.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/eat.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                </th>
                <th>
                  Black
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/hukum.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/cdee.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <PlayerPlusComponent
                setOpen={setOpen}
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                showRateForFirstT2
                showRateForSecondT2Also
                title="Dragon"
                t2={[t2BySid["6"], t2BySid["7"]]}
              />{" "}
              <PlayerPlusComponent
                setOpen={setOpen}
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                title="Tiger"
                showRateForFirstT2
                showRateForSecondT2Also
                t2={[t2BySid["14"], t2BySid["15"]]}
              />
            </tbody>
          </table>
          <table className="w-100">
            <thead>
              <tr className="dt1dayCompTr">
                <th>
                  <ToolTip
                    placement="start"
                    title={`Min: ${t2BySid[8]?.min} Max: ${t2BySid[8]?.max}`}
                  />
                </th>
                <th>
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/hukum.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                </th>
                <th>
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/pan.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                </th>
                <th>
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/cdee.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                </th>
                <th>
                  <img
                    src={`http://admin.kalyanexch.com/images/cards/eat.png`}
                    alt=""
                    className="small_icon_image_card"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <DT1DaySpecial4Component
                setOpen={setOpen}
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                title="Dragon"
                t2={[t2BySid["8"], t2BySid["9"], t2BySid["10"], t2BySid["11"]]}
              />{" "}
              <DT1DaySpecial4Component
                setOpen={setOpen}
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                title="Tiger"
                t2={[
                  t2BySid["16"],
                  t2BySid["17"],
                  t2BySid["18"],
                  t2BySid["19"],
                ]}
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DT1Day;
