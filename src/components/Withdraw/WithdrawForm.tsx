import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { userServices } from "../../utils/api/user/services";
import { colorHex } from "../../utils/constants";
import { LabelText } from "../activityLog/Filter";
import { WithdrawInput } from "./styledComponent";

const err = {
  invalidName:
    "The Account Name field may only contain alphabetic characters as well as spaces",
  noName: "The Account Name field is required",
  noBank: "The Bank Name field is required",
  noIfsc: "The IFSC field is required",
  invalidIfsc: "The IFSC field format is invalid",
  noAccount: "The Account Number field is required",
  invalidAccount:
    "The Account Number field may only contain numeric characters",
  noAmount: "The Amount field is required",
  invalidAmount: "The Amount field may only contain numeric characters",
};

export function WithdrawForm() {
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      accountHolderName: "",
      bankName: "",
      accountType: "savings",
      accountNumber: "",
      ifsc: "",
      amount: 0,
    },
    validate(values) {
      return {
        accountHolderName: values.accountHolderName
          ? values.accountHolderName.match(/^[a-zA-Z ]*$/)
            ? ""
            : err.invalidName
          : err.noName,
        accountNumber: values.accountNumber
          ? values.accountNumber.match(/^[0-9]*$/)
            ? ""
            : err.invalidAccount
          : err.noAccount,
        amount: values.amount
          ? values.amount.toString().match(/^[0-9]*$/)
            ? ""
            : err.invalidAmount
          : err.noAmount,
        bankName: values.accountHolderName ? "" : err.noBank,
        ifsc: values.ifsc
          ? values.ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)
            ? ""
            : err.invalidIfsc
          : err.noIfsc,
      };
    },
    validateOnChange: true,
    onSubmit: async () => {
      setLoading(true);
      const { response } = await userServices.selfWidthraw(values);
      if (response) {
        resetForm();
      }
      setLoading(false);
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            flexWrap: "wrap",
            alignItems: {
              // lg: "baseline",
            },
            gap: 1,
            rowGap: 2,
            mb: { lg: 4 },
          }}
        >
          <Box>
            <Typography m={1} variant="caption">
              Amount
            </Typography>
            <WithdrawInput
              value={values.amount}
              name="amount"
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              onChange={handleChange}
              margin="dense"
              placeholder="Amount"
            />
          </Box>
          <Box>
            <Typography variant="caption" m={1}>
              Account Number
            </Typography>
            <WithdrawInput
              value={values.accountNumber}
              name="accountNumber"
              onChange={handleChange}
              error={Boolean(errors.accountNumber)}
              helperText={errors.accountNumber}
              margin="dense"
              placeholder="Account Number"
            />
          </Box>
          <Box>
            <Typography variant="caption" m={1}>
              Account Name
            </Typography>
            <WithdrawInput
              value={values.accountHolderName}
              name="accountHolderName"
              onChange={handleChange}
              error={Boolean(errors.accountHolderName)}
              helperText={errors.accountHolderName}
              margin="dense"
              placeholder="Account Name"
            />
          </Box>
          <Box>
            <Typography variant="caption" m={1}>
              Bank Name
            </Typography>
            <WithdrawInput
              value={values.bankName}
              name="bankName"
              onChange={handleChange}
              error={Boolean(errors.bankName)}
              helperText={errors.bankName}
              margin="dense"
              placeholder="Bank Name"
            />
          </Box>
          <Box>
            <Typography variant="caption" m={1}>
              IFSC
            </Typography>
            <WithdrawInput
              value={values.ifsc}
              name="ifsc"
              onChange={handleChange}
              error={Boolean(errors.ifsc)}
              helperText={errors.ifsc}
              margin="dense"
              placeholder="IFSC Code"
            />
          </Box>
          <Box>
            <Typography variant="caption" m={1}>
              Account Type / Currency
            </Typography>
            <WithdrawInput
              value={values.accountType}
              name="accountType"
              sx={{}}
              onChange={handleChange}
              error={Boolean(errors.accountType)}
              helperText={errors.accountType}
              margin="dense"
              select
            >
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="current">Current</MenuItem>
            </WithdrawInput>
          </Box>
          <Box>
            <Button
              color="secondary"
              disabled={loading}
              type="submit"
              endIcon={loading && <CircularProgress size={"1rem"} />}
              variant="contained"
              disableElevation
              sx={{
                height: 48,
                borderRadius: "8px",
                mt: "32px",
                // mb: { xs: 1, lg: 0.65 },
                color: "white",
                fontSize: "1.2rem",
                width: 156,
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      <Box
        py={3}
        mt={3}
        borderTop={{ xs: `1px solid ${colorHex.borderLine}`, lg: "none" }}
      >
        <Box display="flex" alignItems="center">
          <LabelText>Show</LabelText>
          <Select
            defaultValue={5000}
            // onChange={handlePageSizeChange}
            // value={pageSize}
            sx={{
              mx: 0.2,
              minWidth: 100,
              textAlign: "start",
              fontSize: { xs: "0.8rem", lg: "1rem" },
              maxHeight: { xs: 30, lg: 36 },
            }}
          >
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={5000}>5000</MenuItem>
          </Select>
          <LabelText>Entries</LabelText>
        </Box>
      </Box>
    </>
  );
}
