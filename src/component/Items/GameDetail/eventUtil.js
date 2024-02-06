export const createProfits = ({
    fancyOdds,
    pnl,
    betDetails,
    rechange,
    fancyPnl,
    setProfits,
  }) => {
    if (!fancyOdds) return;
    if(!Array.isArray(pnl)){
        return;
    }
    const pnlsOdds = pnl?.find(
      (element) => element?.marketId == betDetails?.marketId
    );
    const plnOddsArray = pnlsOdds
      ? [
          { pnl: pnlsOdds.pnl1, selectionId: pnlsOdds.selection1 },
          { pnl: pnlsOdds.pnl2, selectionId: pnlsOdds.selection2 },
          { pnl: pnlsOdds.pnl3, selectionId: pnlsOdds.selection3 },
        ]
      : [];
    if (betDetails?.stake != null && !rechange) {
      const isBack = betDetails?.isBack || false,
        odds = betDetails?.odds || 0,
        stake = betDetails?.stake || 0;
  
      if (betDetails?.marketName === "Bookmaker") {
        const Bookmaker = [];
        const pnlsBookmaker = pnl?.find(
          (element) => element?.marketId == betDetails.marketId
        );
        const plnBookmakerArray = pnlsBookmaker
          ? [
              { pnl: pnlsBookmaker.pnl1, selectionId: pnlsBookmaker.selection1 },
              { pnl: pnlsBookmaker.pnl2, selectionId: pnlsBookmaker.selection2 },
              { pnl: pnlsBookmaker.pnl3, selectionId: pnlsBookmaker.selection3 },
            ]
          : [];
        fancyOdds?.Bookmaker.forEach((odd) => {
          if (odd.mid !== betDetails.marketId) return;
          const current = plnBookmakerArray.find(
            (item) => item.selectionId == odd.sid
          );
          if (odd.sid == betDetails?.selectionId) {
            Bookmaker.push({
              title: odd.nation,
              value:
                (current?.pnl || 0) + ((isBack ? 1 : -1) * odds * stake) / 100,
              sid: odd.sid,
              mid: odd.mid,
            });
          } else {
            Bookmaker.push({
              title: odd.nation,
              value: (current?.pnl || 0) + (isBack ? -1 : 1) * stake,
              sid: odd.sid,
              mid: odd.mid,
            });
          }
        });
        setProfits((profits) => ({
          ...profits,
          Bookmaker,
        }));
      } else if (!betDetails?.isFancy) {
        setProfits((profits) => ({
          ...profits,
          Odds: {
            ...profits.Odds,
            [betDetails?.marketId || "really"]: [
              ...fancyOdds.Odds.find(
                (i) => i.marketId === betDetails?.marketId
              )?.runners?.map((element) => {
                const currentProfit = {
                  title: element.name,
                  sid: element.selectionId,
                  value:
                    plnOddsArray.find(
                      (item) => item.selectionId == element.selectionId
                    )?.pnl || 0,
                };
  
                if (element.selectionId === betDetails?.selectionId) {
                  currentProfit.value =
                    currentProfit.value + (isBack ? 1 : -1) * (odds - 1) * stake;
                } else {
                  currentProfit.value =
                    currentProfit.value + (isBack ? -1 : 1) * stake;
                }
                return currentProfit;
              }),
            ],
          },
        }));
      }
    } else {
      const newItem = {
        Odds: {
          ...(fancyOdds?.Odds?.reduce((accu, current) => {
            const pnlsOddCurrent = pnl?.find(
              (element) => element?.marketId == current?.marketId
            )||{};
            // if (!pnlsOddCurrent) return accu;
  
            const plnArrayCurrent = pnlsOddCurrent
              ? [
                  {
                    pnl: pnlsOddCurrent.pnl1,
                    selectionId: pnlsOddCurrent.selection1,
                  },
                  {
                    pnl: pnlsOddCurrent.pnl2,
                    selectionId: pnlsOddCurrent.selection2,
                  },
                  {
                    pnl: pnlsOddCurrent.pnl3,
                    selectionId: pnlsOddCurrent.selection3,
                  },
                ]
              : [];
            accu[current.marketId] = current?.runners?.map((element) => {
              const currentProfit = {
                title: element.name,
                sid: element.selectionId,
                value:
                  plnArrayCurrent.find(
                    (item) => item.selectionId == element.selectionId
                  )?.pnl || 0,
              };
              return currentProfit;
            });
            return accu;
          }, {}) || {}),
        },
        Bookmaker: fancyOdds?.Bookmaker?.map((element) => {
          const pnlsBookmaker = pnl?.find((pnl) => pnl?.marketId == element.mid)||{};
          if (!pnlsBookmaker) return null;
          const plnBookmakerArray = [
            {
              pnl: pnlsBookmaker.pnl1,
              selectionId: pnlsBookmaker.selection1,
            },
            {
              pnl: pnlsBookmaker.pnl2,
              selectionId: pnlsBookmaker.selection2,
            },
            {
              pnl: pnlsBookmaker.pnl3,
              selectionId: pnlsBookmaker.selection3,
            },
          ];
          const currentProfit = {
            title: element.nation,
            sid: element.sid,
            mid: element.mid,
            value:
              plnBookmakerArray.find((item) => item.selectionId == element.sid)
                ?.pnl || 0,
          };
          return currentProfit;
        }),
        Fancy:
          fancyPnl?.map((element) => {
            const currentProfit = {
              title: element.marketId,
              sid: element.marketId,
              value: element.pnl || 0,
            };
            return currentProfit;
          }) || [],
      };
      setProfits(newItem);
    }
  };