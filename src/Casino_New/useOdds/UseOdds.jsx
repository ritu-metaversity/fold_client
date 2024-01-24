import { useEffect, useState } from "react";
import { CasinoLiveApi } from "../../apis/CasinoLiveApi";

export const UseOdds = (value) => {
  const [odds, setOdds] = useState(null);
  const [pnl, setPnl] = useState({});
  const [betPlace, setBetPlace] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      value &&
      CasinoLiveApi.Casino_Data({
        value
      }).then((res) => {
        if (Array.isArray(res?.data?.data?.bf)) {
          convertBfToT2(res.data);
        }
        if (Array.isArray(res?.data?.data?.t2)) {
          if (Array.isArray(res?.data?.data?.t3)) {
            res.data.data.t2 = [...res.data.data.t2, ...res.data.data.t3];
          }
          res.data.data.t2BySid = {};
          res?.data?.data?.t2?.forEach((item) => {
            if (!item.nation && item.nat) {
              item.nation = item.nat;
            }
            item.gstatus =
              Number(item.gstatus) === 1
                ? true
                : Number(item.gstatus) === 0
                ? false
                : item.gstatus;
            item.pnl = pnl[item.sid] || 0;
            res.data.data.t2BySid[item.sid] = item;
          });
        }
        setOdds(res?.data);
      })
          
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [pnl, value]);

  useEffect(()=>{
    return ()=>setOdds(null)
  }, [value])

  useEffect(() => {
    const timer = setInterval(() => {
      Number(odds?.data?.t1?.[0]?.mid) &&
      CasinoLiveApi.Casino_Libility({
        roundId: odds?.data?.t1?.[0]?.mid
      }).then((res) => {
        if (res.data) {
          const pnl = {};
          let i;
          for (i of res.data) {
            pnl[i?.sid] = i?.liability;
          }
          setPnl(pnl);
        } else {
          setPnl({});
        }
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [betPlace, odds?.data?.t1?.[0]?.mid, value]);
  return { odds, setBetPlace };
};

const convertBfToT2 = (oddData) => {
  if (oddData?.data?.bf && oddData?.data?.bf?.length > 0) {
    oddData?.data.bf.forEach((bfElement, index) => {
      const t2Obj = {
        mid: bfElement.marketId,
        sid: bfElement.sectionId,
        max: +bfElement.max,
        min: +bfElement.min,
        gstatus: bfElement.gstatus,
        gtype: bfElement.gameType,
        nation: bfElement.nation,
        rate: "",
        b1: `${bfElement.b1}`,
        l1: `${bfElement.l1}`,
        bs1: `${bfElement.bs1}`,
        ls1: `${bfElement.ls1}`,
      };
      const t1Obj = {
        mid: bfElement.marketId,
        autotime: bfElement.UpdateTime,
        gtype: bfElement.gameType,
        remark: bfElement.remark,
        max: +bfElement.max,
        min: +bfElement.min,
      };

      if (index === 0) {
        t1Obj.C1 = bfElement.C1;
        t1Obj.C3 = bfElement.C2;
        t1Obj.C5 = bfElement.C3;
      }
      if (index === 1) {
        t1Obj.C2 = bfElement.C1;
        t1Obj.C4 = bfElement.C2;
        t1Obj.C6 = bfElement.C3;
      }
      if (Array.isArray(oddData?.data.t1)) {
        const newt1Obj = [{ ...oddData?.data.t1?.[0], ...t1Obj }];
        oddData.data.t1 = newt1Obj;
      } else {
        oddData.data.t1 = [t1Obj];
      }

      if (Array.isArray(oddData?.data.t2)) {
        oddData.data.t2.push(t2Obj);
      } else {
        oddData.data.t2 = [t2Obj];
      }
    });
  }
};
