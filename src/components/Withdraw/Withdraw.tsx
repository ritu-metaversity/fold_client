import { Box, Typography } from "@mui/material";
import React from "react";
import HomeLayout from "../layout/homeLayout";
import { WithdrawInput } from "./styledComponent";

const Withdraw = () => {
  // const { values, handleChange, handleSubmit, errors } = useFormik({
  //     initialValues: {

  //     },
  //     onSubmit: () => {

  //     },

  // })
  return (
    <HomeLayout>
      <div style={{ textAlign: "left" }}>
        <form>
          <Box>
            <Typography>Amount:</Typography>
            <WithdrawInput placeholder="Amount" />
          </Box>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Withdraw;
