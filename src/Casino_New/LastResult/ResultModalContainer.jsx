import {  useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { titleById } from "../Constant/Constant";
import ResultModal2CardContent from "./ResulTModalContent2Card";
import ResulTModalContent3Card from "./ResulTModalContent3Card";
import ResultModalContent from "./ResultModalContent";
import CasinoModal from "../CasinoBetSlip/Modal/CasinoModal";


const ResultModalContainer= ({ mid, setMid, tableId }) => {
  const [resultByMid, setREsultByMid] = useState(null);
  const id = tableId || window.location.pathname.replace("/", "");

  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (mid) {
      setLoading(true);
      axios
        .post(
          "http://18.139.200.104/admin-new-apis/diamond/api/mid",
          {
            mid: mid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);

          console.log(res);
          setREsultByMid(res.data?.data || null);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }

    return () => {
      setREsultByMid(null);
    };
  }, [mid]);

  return (
    <div>
      {loading && (
        <p className="place-lodder">
          <div>
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        </p>
      )}
      <CasinoModal
        title={`${titleById[id]} Result`}
        open={!!mid}
        size="md"
        handleClose={() => setMid("")}
      >
        {(id === "51" || id === "57") && resultByMid && (
          <ResulTModalContent3Card result={resultByMid} />
        )}
        {id === "52" && resultByMid && (
          <ResultModal2CardContent result={resultByMid} />
        )}
        {(id === "54" || id === "53" || id === "55") && resultByMid && (
          <ResultModalContent result={resultByMid} />
        )}
      </CasinoModal>
    </div>
  );
};

export default ResultModalContainer;
