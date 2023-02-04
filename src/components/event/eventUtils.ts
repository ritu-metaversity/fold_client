import { CreateProfitProps, FancyOddsInterface, FancyPnl, ProfitInterface } from "./types";

export const transformMatchOdds = (odds: any) => {
  if (!odds.length) {
    return null;
  }

  return odds.map((newOdds: any) => {
    newOdds.runners = odds[0].runners.map((item: any) => {
      item.ex.availableToBack = [
        ...item.ex.availableToBack,
        { price: "", size: "" },
        { price: "", size: "" },
        { price: "", size: "" },
      ].slice(0, 3);
      item.ex.availableToLay = [
        ...item.ex.availableToLay,
        { price: "", size: "" },
        { price: "", size: "" },
        { price: "", size: "" },
      ].slice(0, 3);
      return item;
    });
    return newOdds;
  });

  // const newOdds = {
  //   ...odds[0],
  // };
  // // managing for dynamic no of odds

  // newOdds.runners = odds[0].runners.map((item: any) => {
  //   item.ex.availableToBack = [
  //     ...item.ex.availableToBack,
  //     { price: "", size: "" },
  //     { price: "", size: "" },
  //     { price: "", size: "" },
  //   ].slice(0, 3);
  //   item.ex.availableToLay = [
  //     ...item.ex.availableToLay,
  //     { price: "", size: "" },
  //     { price: "", size: "" },
  //     { price: "", size: "" },
  //   ].slice(0, 3);
  //   return item;
  // });
  // return newOdds;
};

export const createProfits = ({
  fancyOdds,
  pnl,
  betDetails,
  fancyPnl,
  profits,
  setProfits,
}: CreateProfitProps) => {
  if (!fancyOdds) return;
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
  if (betDetails?.stake) {
    const isBack = betDetails?.isBack || false,
      odds = betDetails?.odds || 0,
      stake = betDetails?.stake || 0;

    if (betDetails?.marketName === "Bookmaker") {
      const Bookmaker: ProfitInterface[] = [];
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
      fancyOdds?.Bookmaker.forEach((odd: FancyOddsInterface) => {
        if (odd.mid !== betDetails.marketId) return;
        const current = plnBookmakerArray.find(
          (item: any) => item.selectionId == odd.sid
        );
        if (odd.sid == betDetails?.selectionId) {
          Bookmaker.push({
            title: odd.nation,
            value: (current?.pnl || 0) + (isBack ? 1 : -1) * (odds - 1) * stake,
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
      setProfits({ ...profits, Bookmaker });
    } else if (!betDetails?.isFancy) {
      setProfits({
        ...profits,
        Odds: {
          ...profits.Odds,
          [betDetails?.marketId || "really"]: [
            ...fancyOdds.Odds.find(
              (i: any) => i.marketId === betDetails?.marketId
            )?.runners?.map((element: any) => {
              const currentProfit: ProfitInterface = {
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
      });
    }
  } else {
    setProfits({
      Odds: {
        ...(fancyOdds?.Odds?.reduce((accu: any, current: any) => {
          console.log(accu, current, "kdjkf");
          const pnlsOddCurrent = pnl?.find(
            (element) => element?.marketId == current?.marketId
          );
          if (!pnlsOddCurrent) return accu;

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
          accu[current.marketId] = current?.runners?.map((element: any) => {
            const currentProfit: ProfitInterface = {
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
      Bookmaker: [
        ...fancyOdds?.Bookmaker?.map((element: FancyOddsInterface) => {
          const pnlsBookmaker = pnl?.find(
            (pnl) => pnl?.marketId == element.mid
          );
          if (!pnlsBookmaker) return;

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
          const currentProfit: ProfitInterface = {
            title: element.nation,
            sid: element.sid,
            mid: element.mid,
            value:
              plnBookmakerArray.find((item) => item.selectionId == element.sid)
                ?.pnl || 0,
          };
          return currentProfit;
        }),
      ],
      Fancy:
        fancyPnl?.map((element: FancyPnl) => {
          const currentProfit: ProfitInterface = {
            title: element.marketId,
            sid: element.marketId,
            value: element.pnl || 0,
          };
          return currentProfit;
        }) || [],
    });
  }
};
