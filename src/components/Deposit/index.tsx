import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import HomeLayout from "../layout/homeLayout";
import DepositManually from "./DepositManually";
import { userServices } from "../../utils/api/user/services";
import ActivityTable from "../activityLog/activityLogTable";
import { columnIds, columns } from "./columns";
import { IconSmall } from "../layout/styledComponents";
import { colorHex } from "../../utils/constants";

interface DepositListInterface {
  image: string;
  time: string;
  status: "Rejected" | "Pending" | "Success";
  amount: number;
}

const colorStatus = {
  Rejected: "error.main",
  Pending: "warning.main",
  Success: "success.main",
};

const Deposit = () => {
  const [depositList, setDepositList] = useState<DepositListInterface[]>([]);

  const getDepositList = async () => {
    const { response } = await userServices.getDepositList();
    console.log(response, "deposit data");
    if (response.data) {
      setDepositList(response.data);
    }
  };
  useEffect(() => {
    getDepositList();

    return () => {
      setDepositList([]);
    };
  }, []);

  return (
    <HomeLayout>
      <Box
        marginX="auto"
        rowGap={5}
        position="relative"
        display={"flex"}
        flexDirection="column"
        width={{ xs: "95%" }}
        minHeight={"90vh"}
      >
        <DepositManually getDepositList={getDepositList} />
        <ActivityTable
          columns={columns}
          rows={
            depositList.map((item: DepositListInterface) => {
              const newItem: any = { ...item };
              newItem.status = <StatusTypography status={item.status} />;
              newItem.image = (
                <a target={"_blank"} href={item.image}>
                  <img style={{ width: 50, height: 50 }} src={item.image} />
                </a>
              );
              return newItem;
            }) || []
          }
        />
      </Box>
    </HomeLayout>
  );
};

export default Deposit;

export function StatusTypography({
  status,
}: {
  status: DepositListInterface["status"];
}) {
  return (
    <Typography
      sx={{
        bgcolor: colorHex.bg3,
        borderRadius: 1,
        p: 0.5,
        width: "min-content",
      }}
      color={colorStatus[status]}
    >
      {status}
    </Typography>
  );
}
