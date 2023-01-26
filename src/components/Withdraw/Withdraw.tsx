import { WithdrawForm } from "./WithdrawForm";
import React from "react";
import HomeLayout from "../layout/homeLayout";
import { columns } from "./columns";
import ActivityTable from "../activityLog/activityLogTable";
import { AccountContainer } from "../accountSummary/styledComponents";
import { Box, Typography } from "@mui/material";

const Withdraw = () => {
  // const { values, handleChange, handleSubmit, errors } = useFormik({
  //     initialValues: {

  //     },
  //     onSubmit: () => {

  //     },

  // })
  return (
    <HomeLayout>
      <AccountContainer>
        <Box sx={{ textAlign: "left", my: 2 }}>
          <Box mx={2}>
            {/* <Typography variant="h5" my={2} color="primary.main">
              Normal Withdraw
            </Typography> */}
            <WithdrawForm />
          </Box>

          <ActivityTable columns={columns} rows={[]} />
        </Box>
      </AccountContainer>
    </HomeLayout>
  );
};

export default Withdraw;
