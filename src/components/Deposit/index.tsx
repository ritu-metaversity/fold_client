import React from "react";
import { Box } from "@mui/material";
import HomeLayout from "../layout/homeLayout";
import DepositManually from "./DepositManually";

const Deposit = () => {
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
        <DepositManually />
      </Box>
    </HomeLayout>
  );
};

export default Deposit;
