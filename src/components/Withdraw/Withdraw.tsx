import { WithdrawForm } from "./WithdrawForm";
import React, { useContext, useEffect, useState } from "react";
import HomeLayout from "../layout/homeLayout";
import { columns } from "./columns";
import ActivityTable from "../activityLog/activityLogTable";
import { Box, Button, Grid, Typography } from "@mui/material";
import { colorHex } from "../../utils/constants";
import { userServices } from "../../utils/api/user/services";
import { StatusTypography } from "../Deposit";
import CustomizedDialog2 from "../common/Dailog2";
import snackBarUtil from "../layout/snackBarUtil";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Withdraw = () => {
  const [withdrawList, setWithdrawList] = useState([]);

  const [cancelWithdrawl, setCancelWithdrawl] = useState(0);

  const nav = useNavigate();
  const getWithdrawList = async () => {
    const { response } = await userServices.getWithdrawList();
    if (response.data) {
      setWithdrawList(response.data);
    }
  };
  useEffect(() => {
    getWithdrawList();

    return () => {
      setWithdrawList([]);
    };
  }, []);
  const { user } = useContext(UserContext);
  const handleSubmit = async () => {
    if (cancelWithdrawl) {
      const { response } = await userServices.cancelWithdrawlRequest(
        cancelWithdrawl
      );
      if (response) {
        setCancelWithdrawl(0);
        getWithdrawList();
      }
    } else {
      snackBarUtil.error("Please select the withdrawl request again.");
    }
  };

  useEffect(() => {
    if (user.userTypeInfo === 2) {
      nav("/");
    }
  }, []);

  if (!user || user.userTypeInfo === 2) {
    return <></>;
  }
  const handleClose = () => setCancelWithdrawl(0);
  return (
    <HomeLayout>
      <CustomizedDialog2
        title="Cancel Request"
        open={Boolean(cancelWithdrawl)}
        handleClose={() => setCancelWithdrawl(0)}
      >
        <Typography my={2}>
          Are you sure you want to cancel this request ??
        </Typography>
        <Grid container mt={5}>
          <Grid item xs={6}></Grid>
          <Grid item xs={3} p={1}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
          <Grid item xs={3} p={1}>
            <Button
              fullWidth
              style={{ color: "white" }}
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CustomizedDialog2>
      <Box
        sx={{
          textAlign: "left",
          py: 2,
          backgroundColor: colorHex.bg1,
        }}
      >
        <Box mx={2}>
          <WithdrawForm getWithdrawList={getWithdrawList} />
        </Box>

        <ActivityTable
          columns={columns}
          rows={
            withdrawList.map((item: any) => {
              const newItem: any = { ...item };
              newItem.status = <StatusTypography status={item.status} />;
              newItem.action = item.status === "Pending" && (
                <Button
                  variant="outlined"
                  onClick={() => setCancelWithdrawl(item.id)}
                >
                  Cancel
                </Button>
              );
              return newItem;
            }) || []
          }
        />
      </Box>
    </HomeLayout>
  );
};

export default Withdraw;
