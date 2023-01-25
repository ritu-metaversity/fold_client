import { WithdrawForm } from "./WithdrawForm";
import React from "react";
import HomeLayout from "../layout/homeLayout";
import { WithdrawInput } from "./styledComponent";
import { columns } from "./columns";
import ActivityTable from "../activityLog/activityLogTable";

const Withdraw = () => {
  // const { values, handleChange, handleSubmit, errors } = useFormik({
  //     initialValues: {

  //     },
  //     onSubmit: () => {

  //     },

  // })
  return (
    <HomeLayout>
      <div style={{ textAlign: "left", margin: "16px" }}>
        <WithdrawForm />

        <ActivityTable columns={columns} rows={[]} />
      </div>
    </HomeLayout>
  );
};

export default Withdraw;
