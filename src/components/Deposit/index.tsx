import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import HomeLayout from "../layout/homeLayout";
import DepositManually from "./DepositManually";
import { userServices } from "../../utils/api/user/services";
import ActivityTable from "../activityLog/activityLogTable";
import { columns } from "./columns";
import { colorHex } from "../../utils/constants";
import ImageModal from "./ImageModal";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

interface DepositListInterface {
  image: string;
  time: string;
  status: "Rejected" | "Pending" | "APPROVED";
  amount: number;
}

const colorStatus = {
  Rejected: "error.main",
  Pending: "warning.main",
  APPROVED: "success.main",
};

const Deposit = () => {
  const [depositList, setDepositList] = useState<DepositListInterface[]>([]);
  const { user } = useContext(UserContext);

  const nav = useNavigate();
  const getDepositList = async () => {
    const { response } = await userServices.getDepositList();
    if (response.data) {
      setDepositList(response.data);
    }
  };

  const [imageSelected, setImageSelected] = useState("");

  const handleClose = () => {
    setImageSelected("");
  };
  useEffect(() => {
    getDepositList();

    return () => {
      setDepositList([]);
    };
  }, []);

  useEffect(() => {
    if (user.userTypeInfo === 2) {
      nav("/");
    }
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
        <ImageModal
          open={Boolean(imageSelected)}
          src={imageSelected}
          handleClose={handleClose}
        />
        <ActivityTable
          columns={columns}
          rows={
            depositList.map((item: DepositListInterface) => {
              const newItem: any = { ...item };
              newItem.status = <StatusTypography status={item.status} />;
              newItem.image = (
                // <a target={"_blank"} href={item.image}>
                <img
                  onClick={() => setImageSelected(item.image)}
                  style={{ width: 50, height: 50 }}
                  src={item.image}
                  alt="deposit_image"
                />
                // </a>
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
        fontSize: { xs: "0.8rem", lf: "0.9rem" },
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
