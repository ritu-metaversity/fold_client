import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { LetterAndColorById, tableIdtoUrl } from "../Constant/Constant";
import ResultModalContainer from "./ResultModalContainer";

const LastResult = ({ matchId }) => {
  // const id =  window.location.pathname.replace("/", "");
  const { id } = useParams();
  const [first, setFirst] = useState("");
  const [resultList, setResultList] = useState([]);
  // const { matchId } = useContext(globalContext);

  // console.log(matchId, "matchId")

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    if (matchId)
      axios
        .get("http://43.205.157.72:3434/casino/meta-" + tableIdtoUrl[id])
        .then((res) => {
          setResultList(res?.data?.data?.result);

          //   const bets: MatchedBetObj[][] = Object.values(res.data) || [[]];
          //   setBetlist(bets?.[0] || []);
        })
        .catch((error) => {
          console.log(error);
          setResultList([]);
        });

    return () => {};
  }, [matchId]);

  console.log(resultList, "dsfdsfsdfsdfdsfsdfdsf");

  return (
    <>
      <ResultModalContainer
        mid={first}
        setMid={(mid) => setFirst(mid)}
      />
      <div
        className="w-100  text-white p-2 d-flex"
        style={{ background: "#0088cc" }}>
        Last Result
        <Link to={`/result?token=${token}`} className="ms-auto text-white">
          View All
        </Link>
      </div>
      <div className="w-100 text-end">
        {resultList?.map((item) => {
          return (
            <span
              style={{
                color: LetterAndColorById[id]?.[item.result]?.color,
              }}
              onClick={() => setFirst(item.mid)}
              className="ball_result">
              {LetterAndColorById[id]?.[item.result]?.label}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default LastResult;
