import React, { FC, useEffect, useState } from "react";
import { userServices } from "../../utils/api/user/services";
import ActivityTable from "../activityLog/activityLogTable";

interface Props {
  fancyId: string;
  matchId: string;
}
const PnlModal: FC<Props> = ({ fancyId, matchId }) => {
  const [pnlBook, setPnlBook] = useState<{ odds: number; pnl: number }[]>([]);
  const getPnlBook = async () => {
    if (!fancyId) return;
    const { response } = await userServices.fancyPnlBook({ fancyId, matchId });
    if (response?.data) {
      setPnlBook(response.data);
    }
  };
  useEffect(() => {
    getPnlBook();
    return () => {
      setPnlBook([]);
    };
  }, [fancyId]);

  return (
    <ActivityTable
      columns={[
        { id: "odds", label: "Run" },
        { id: "pnl", label: "Amount" },
      ]}
      rows={pnlBook}
    />
  );
};

export default PnlModal;
