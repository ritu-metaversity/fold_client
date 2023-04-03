import React from "react";
import "./score.css";
const ScoreComponent = () => {
  return (
    <div className="markets">
      <div className="header">
        <div className="match-centre ng-scope" ng-if="vm.state.hasStats">
          <div className="event-header">
            <h1 className="ng-binding">
              <i className="apl-icon-custom-play"></i> Chennai Super Kings v
              Lucknow Super Giants
            </h1>
            <i
              analytics-on=""
              analytics-event="Expand"
              analytics-category="Match Stats"
              analytics-label="Expand Match Centre"
              className="match-stats-body-button apl-icon-chevron-up"
              ng-click="vm.toggleStatsBody()"
              ng-if="!vm.isIconHidden()"
            ></i>
          </div>

          <div
            className="match-centre-header ng-scope"
            ng-if="vm.isHeadVisible"
          >
            <div className="toss">
              <h2
                ng-if="vm.stats.battingTeam !== null"
                className="ng-binding ng-scope"
              >
                Chennai Super Kings, 79-0 (6.0 Ovs)
              </h2>

              <p className="ng-binding">
                <span
                  ng-className="vm.stats.decision.statusStyle"
                  className="ng-binding"
                ></span>
                Lucknow Super Giants opt to bowl
              </p>
            </div>
            <div>
              <table ng-if="vm.stats.battingTeam !== null" className="ng-scope">
                <thead>
                  <tr className="_align-center">
                    <th translate={undefined} className="ng-scope ng-binding">
                      PROJ SCR
                    </th>
                    <th translate={undefined} className="ng-scope">
                      P'SHIP
                    </th>
                    <th className="ng-binding">CRR</th>
                    <th translate={undefined} className="ng-scope">
                      LAST WKT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="_align-center ng-binding">263</td>
                    <td className="_align-center ng-binding">
                      79
                      <span
                        ng-if="vm.stats.battingTeam.partnerShipBalls"
                        className="ng-binding ng-scope"
                      >
                        (36)
                      </span>
                    </td>
                    <td className="_align-center ng-binding">13.17</td>
                    <td className="_align-center ng-binding">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="match-centre-body ng-scope" ng-if="vm.isBodyVisible">
            <div className="overs">
              <div className="over ng-scope" ng-if="vm.stats.currentOver">
                <p
                  title="Mark Wood to Devon Conway and Ruturaj Gaikwad"
                  className="ng-binding"
                >
                  Mark Wood to Devon Conway and Ruturaj Gaikwad
                </p>
                <div className="over-detail">
                  <div className="ng-binding">Ov6:</div>
                  <ol className="balls">
                    <li
                      ng-repeat="ball in vm.stats.currentOver.balls"
                      className="ball INFIELDBOUNDARY_4"
                    >
                      4
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.currentOver.balls"
                      className="ball BYE"
                    >
                      4B
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.currentOver.balls"
                      className="ball INFIELDBOUNDARY_4"
                    >
                      4
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.currentOver.balls"
                      className="ball INFIELDBOUNDARY_1"
                    >
                      1
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.currentOver.balls"
                      className="ball INFIELDBOUNDARY_6"
                    >
                      6
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.currentOver.balls"
                      className="ball INFIELDBOUNDARY_0"
                    >
                      0
                    </li>
                  </ol>
                  <div className="runs-score">
                    <div className="ng-binding">19 runs</div>
                    <div className="ng-binding">79-0</div>
                  </div>
                </div>
              </div>

              <div className="over ng-scope" ng-if="vm.stats.lastOver">
                <p
                  title="Krishnappa Gowtham to Ruturaj Gaikwad"
                  className="ng-binding"
                >
                  Krishnappa Gowtham to Ruturaj Gaikwad
                </p>
                <div className="over-detail">
                  <div className="ng-binding">Ov5:</div>
                  <ol className="balls">
                    <li
                      ng-repeat="ball in vm.stats.lastOver.balls"
                      className="ball INFIELDBOUNDARY_0"
                    >
                      0
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.lastOver.balls"
                      className="ball INFIELDBOUNDARY_6"
                    >
                      6
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.lastOver.balls"
                      className="ball INFIELDBOUNDARY_0"
                    >
                      0
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.lastOver.balls"
                      className="ball INFIELDBOUNDARY_6"
                    >
                      6
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.lastOver.balls"
                      className="ball INFIELDBOUNDARY_2"
                    >
                      2
                    </li>
                    <li
                      ng-repeat="ball in vm.stats.lastOver.balls"
                      className="ball INFIELDBOUNDARY_6"
                    >
                      6
                    </li>
                  </ol>
                  <div className="runs-score">
                    <div className="ng-binding">20 runs</div>
                    <div className="ng-binding">60-0</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              ng-if="vm.stats.bowler &amp;&amp; vm.stats.batsmen.length > 0"
              className="ng-scope"
            >
              <table>
                <tbody>
                  <tr className="row-highlight">
                    <td translate={undefined} className="ng-scope">
                      Batsmen
                    </td>
                    <td
                      translate={undefined}
                      className="_align-center ng-scope"
                    >
                      R
                    </td>
                    <td
                      translate={undefined}
                      className="_align-center ng-scope"
                    >
                      B
                    </td>
                    <td
                      translate={undefined}
                      className="_align-center ng-scope"
                    >
                      4s
                    </td>
                    <td
                      translate={undefined}
                      className="_align-center ng-scope"
                    >
                      6s
                    </td>
                    <td
                      translate={undefined}
                      className="_align-center ng-scope"
                    >
                      SR
                    </td>
                  </tr>

                  <tr
                    ng-repeat="batsman in vm.stats.batsmen track by $index"
                    className="ng-scope"
                  >
                    <td className="ng-binding">Ruturaj Gaikwad </td>
                    <td className="_align-center ng-binding">46</td>
                    <td className="_align-center ng-binding">20</td>
                    <td className="_align-center ng-binding">2</td>
                    <td className="_align-center ng-binding">4</td>
                    <td className="_align-center ng-binding">230.00</td>
                  </tr>
                  <tr
                    ng-repeat="batsman in vm.stats.batsmen track by $index"
                    className="ng-scope"
                  >
                    <td className="ng-binding">Devon Conway *</td>
                    <td className="_align-center ng-binding">23</td>
                    <td className="_align-center ng-binding">16</td>
                    <td className="_align-center ng-binding">4</td>
                    <td className="_align-center ng-binding">0</td>
                    <td className="_align-center ng-binding">143.75</td>
                  </tr>

                  <tr className="row-highlight">
                    <td translate={undefined} className="ng-scope">
                      Bowler
                    </td>
                    <td
                      className="_align-center ng-scope"
                      translate={undefined}
                    >
                      O
                    </td>
                    <td
                      className="_align-center ng-scope"
                      translate={undefined}
                    >
                      M
                    </td>
                    <td
                      className="_align-center ng-scope"
                      translate={undefined}
                    >
                      R
                    </td>
                    <td
                      className="_align-center ng-scope"
                      translate={undefined}
                    >
                      W
                    </td>
                    <td
                      className="_align-center ng-scope"
                      translate={undefined}
                    >
                      ECO
                    </td>
                  </tr>
                  <tr>
                    <td className="ng-binding">Yash Thakur</td>
                    <td className="_align-center ng-binding">0</td>
                    <td className="_align-center ng-binding">0</td>
                    <td className="_align-center ng-binding">0</td>
                    <td className="_align-center ng-binding">0</td>
                    <td className="_align-center ng-binding"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreComponent;
