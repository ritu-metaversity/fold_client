import { WithdrawForm } from "./WithdrawForm";
import React, { useEffect, useState } from "react";
import HomeLayout from "../layout/homeLayout";
import { columns } from "./columns";
import ActivityTable from "../activityLog/activityLogTable";
import { Box } from "@mui/material";
import { colorHex } from "../../utils/constants";
import { userServices } from "../../utils/api/user/services";
import { StatusTypography } from "../Deposit";

const Withdraw = () => {
  // const { values, handleChange, handleSubmit, errors } = useFormik({
  //     initialValues: {

  //     },
  //     onSubmit: () => {

  //     },

  // })
  const [withdrawList, setWithdrawList] = useState([]);

  const getWithdrawList = async () => {
    const { response } = await userServices.getWithdrawList();
    console.log(response, "withdraw data");
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
          <WithdrawForm getWithdrawList={getWithdrawList} />
        </Box>

        <ActivityTable
          columns={columns}
          rows={
            withdrawList.map((item: any) => {
              item.status = <StatusTypography status={item.status} />;
              return item;
            }) || []
          }
        />
      </Box>
    </HomeLayout>
  );
};

export default Withdraw;
