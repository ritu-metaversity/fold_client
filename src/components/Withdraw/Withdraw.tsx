import { WithdrawForm } from "./WithdrawForm";
import React from "react";
import HomeLayout from "../layout/homeLayout";
import { columns } from "./columns";
import ActivityTable from "../activityLog/activityLogTable";
import { Box } from "@mui/material";
import { colorHex } from "../../utils/constants";

const Withdraw = () => {
  // const { values, handleChange, handleSubmit, errors } = useFormik({
  //     initialValues: {

  //     },
  //     onSubmit: () => {

  //     },

  // })
  return (
    <HomeLayout>
      <Box
        sx={{
          textAlign: "left",
          py: 2,
          backgroundColor: colorHex.bg1,
        }}
      >
        <Box mx={2}>
          {/* <Typography variant="h5" my={2} color="primary.main">
              Normal Withdraw
            </Typography> */}
          <WithdrawForm />
        </Box>

        <ActivityTable columns={columns} rows={[]} />
      </Box>
    </HomeLayout>
  );
};

export default Withdraw;
