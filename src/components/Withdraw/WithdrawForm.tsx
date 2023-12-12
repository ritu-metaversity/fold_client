import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  SelfWithdrawPayload,
  userServices,
} from "../../utils/api/user/services";
import { colorHex } from "../../utils/constants";
import { LabelText } from "../activityLog/Filter";
import { WithdrawInput } from "./styledComponent";
import {
  CardContainerContainer,
  StyledButtonSmall,
} from "../Deposit/styledComponents";
import Card from "../Deposit/card";
import ActivityTable from "../activityLog/activityLogTable";
import { savedColumns } from "./savedColumns";
import CustomizedDialogs from "../common/Dailog";

const err = {
  invalidName:
    "The Account Holder Name field may only contain alphabetic characters as well as spaces",
  noName: "The Account Holder Name field is required",
  noBank: "The Bank Name field is required",
  noIfsc: "The IFSC field is required",
  invalidIfsc: "The IFSC field format is invalid",
  noAccount: "The Account Number field is required",
  invalidAccount: "The Account Number field may only contain 8 to 16 digits",
  invalidUpi: "The UPI field format is invalid",
  noAmount: "The Amount field is required",
  invalidAmount: "The Amount field may only contain numeric characters",
};

interface WithdrawTypeItem {
  id: string;
  withdrawType: string;
  image: string;
  adminActive: boolean;
  active: boolean;
}

interface SavedWithdrawItem {
  accountHolderName: string | null;
  bankName: string | null;
  accountType: string | null;
  accountNumber: string | null;
  ifsc: string | null;
  amount: number;
  withdrawType: string | null;
  withdrawMode: string;
}

const regexByType = {
  bank: /^[0-9]*$/,
  paytm: /^[0-9]*$/,
  upi: /^[a-zA-Z0-9@._-]*$/,
};

export function WithdrawForm({
  getWithdrawList,
}: {
  getWithdrawList: () => Promise<void>;
}) {
  const [saveWithdrawData, setSaveWithdrawData] =
    useState<SelfWithdrawPayload | null>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [savedCheck, setSavedCheck] = useState("");
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      accountHolderName: "",
      bankName: "",
      accountType: "savings",
      accountNumber: "",
      ifsc: "",
      amount: 0,
      withdrawType: "",
      withdrawMode: "NORMAL",
    },
    validate: (values) => {
      const newError = {
        accountHolderName: values.accountHolderName
          ? values.accountHolderName?.match(/^[a-zA-Z ]*$/)
            ? undefined
            : err.invalidName
          : err.noName,
        accountNumber: values.accountNumber
          ? values.withdrawType.toLowerCase() === "upi"
            ? values.accountNumber?.match(
                /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/
              )
              ? undefined
              : err.invalidUpi
            : values.withdrawType.toLowerCase() === "paytm"
            ? values.accountNumber?.match(/^[0-9]{10}$/)
              ? undefined
              : "Mobile no should be 10 digits."
            : values.accountNumber?.match(/^[0-9]{8,16}$/)
            ? undefined
            : err.invalidAccount
          : err.noAccount,

        amount: values.amount
          ? values.amount.toString()?.match(/^[0-9]*$/)
            ? undefined
            : err.invalidAmount
          : err.noAmount,
        bankName:
          values.withdrawType.toLowerCase() !== "bank"
            ? undefined
            : values.bankName
            ? values.bankName.match(/^(?=.*[a-zA-Z])[a-zA-Z\d ]*$/)
              ? undefined
              : "Bank name should contain atleast one alphabet."
            : err.noBank,
        ifsc:
          values.ifsc || values.withdrawType.toLowerCase() !== "bank"
            ? values.ifsc?.match(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/) ||
              values.withdrawType.toLowerCase() !== "bank"
              ? undefined
              : err.invalidIfsc
            : err.noIfsc,
      };

      return Object.fromEntries(
        Object.entries(newError).filter(([_, v]) => v != null)
      );
    },
    validateOnChange: true,

    onSubmit: async (values) => {
      const newValues: SelfWithdrawPayload = { ...values };
      setLoading(true);
      newValues.ifsc = newValues.ifsc?.toUpperCase();
      if (newValues.withdrawType.toLowerCase() !== "bank") {
        newValues.accountType = "";
        newValues.ifsc = "";
        newValues.bankName = "";
      }
      newValues.withdrawType =
        withdrawTypes.find((item) => item.withdrawType === values.withdrawType)
          ?.id || "";
      setSaveWithdrawData(newValues);
      const { response } = await userServices.selfWithdraw(newValues);
      if (response) {
        if (response.data.bankExist === false) {
          setOpen(true);
        }
        resetForm();
        setSavedCheck("");
        getWithdrawList();
      }
      setLoading(false);
    },
  });
  const [stack, setStack] = useState([]);
  const [withdrawTypes, setWithdrawTypes] = useState<WithdrawTypeItem[]>([]);
  const [savedInfo, setSavedInfo] = useState<SavedWithdrawItem[]>([]);

  const saveClientBankDetail = async () => {
    if (loadingSave) return;
    setLoadingSave(true);
    if (saveWithdrawData) {
      const { response } = await userServices.saveWithdrawMethod(
        saveWithdrawData
      );
      if (response) {
        setOpen(false);
        getSavedInfo();
      }
    }
    setLoadingSave(false);
  };
  const getStack = async () => {
    const { response } = await userServices.getWithdrawStack();
    if (response?.data) {
      setStack(response.data);
    }
  };
  const getTypes = async () => {
    const { response } = await userServices.getWithdrawTypes();
    if (response?.data) {
      setWithdrawTypes(response.data);
    }
  };
  const getSavedInfo = async () => {
    const { response } = await userServices.getWithdrawSaved();
    if (response?.data) {
      setSavedInfo(response.data);
    }
  };
  useEffect(() => {
    getTypes();
    getStack();
    getSavedInfo();
  }, []);

  return (
    <>
      <CustomizedDialogs
        open={open}
        handleClose={() => setOpen(false)}
        title="Save Details"
      >
        <Box textAlign={"center"}>
          <Typography my={5}>Do you want to save these details ??</Typography>
          <Button
            variant="contained"
            onClick={() => saveClientBankDetail()}
            endIcon={loadingSave && <CircularProgress size={"1rem"} />}
            disabled={loadingSave}
          >
            Save
          </Button>
        </Box>
      </CustomizedDialogs>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography m={1} variant="caption">
              Amount
            </Typography>
            <WithdrawInput
              value={Number(values.amount) || ""}
              name="amount"
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              onChange={handleChange}
              onKeyDown={(e) => {
                if ([".", " "].includes(e.key)) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              margin="dense"
              placeholder="Amount"
            />
          </Box>
          <Box flexWrap={"wrap"} display={"flex"}>
            {stack.map(({ key, value }) => (
              <StyledButtonSmall
                key={`${key + value}-button`}
                onClick={() =>
                  setFieldValue("amount", Number(values.amount) + Number(value))
                }
              >
                {key}
              </StyledButtonSmall>
            ))}
          </Box>
        </Box>
        <Box width={"100%"} my={2}>
          <Typography variant="caption" m={1}>
            Withdraw Type
          </Typography>
          <WithdrawInput
            sx={{ width: "100% !important" }}
            value={values.withdrawMode}
            name="withdrawMode"
            placeholder="Select Withdraw Type"
            onChange={handleChange}
            error={Boolean(errors.withdrawMode)}
            helperText={errors.withdrawMode}
            margin="dense"
            select
          >
            <MenuItem sx={{ fontSize: "0.8rem" }} value="NORMAL">
              NORMAL
            </MenuItem>
            <MenuItem sx={{ fontSize: "0.8rem" }} value="INSTANT">
              INSTANT
            </MenuItem>
          </WithdrawInput>
        </Box>
        <CardContainerContainer>
          {withdrawTypes?.map((elem) => {
            if (!elem.active) return <></>;
            return (
              <Card
                selected={values.withdrawType === elem.withdrawType}
                details={{
                  methodName: elem.withdrawType,
                  logo: elem.image,
                }}
                handleClick={() => {
                  setFieldValue("accountHolderName", "");
                  setFieldValue("bankName", "");
                  setFieldValue("accountType", "");
                  setFieldValue("accountNumber", "");
                  setFieldValue("ifsc", "");
                  setFieldValue("withdrawType", elem.withdrawType);
                }}
              />
            );
          })}
        </CardContainerContainer>
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
            justifyContent: "center",
            gap: 1,
            rowGap: 2,
            my: { lg: 4 },
          }}
        >
          {values.withdrawType.toLowerCase() === "bank" && (
            <>
              <Box>
                <Typography variant="caption" m={1}>
                  Account Number
                </Typography>
                <WithdrawInput
                  value={values.accountNumber}
                  name="accountNumber"
                  onChange={(e) =>
                    e.target.value.match(regexByType.bank) && handleChange(e)
                  }
                  error={Boolean(errors.accountNumber)}
                  helperText={errors.accountNumber}
                  margin="dense"
                  placeholder="Account Number"
                />
              </Box>
              <Box>
                <Typography variant="caption" m={1}>
                  Account Holder Name
                </Typography>
                <WithdrawInput
                  value={values.accountHolderName.trimStart()}
                  name="accountHolderName"
                  onChange={handleChange}
                  error={Boolean(errors.accountHolderName)}
                  helperText={errors.accountHolderName}
                  margin="dense"
                  placeholder="Account Holder Name"
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
                  value={values.ifsc.toUpperCase()}
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
                  <MenuItem sx={{ fontSize: "0.8rem" }} value="savings">
                    Savings
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "0.8rem" }} value="current">
                    Current
                  </MenuItem>
                </WithdrawInput>
              </Box>
            </>
          )}
          {values.withdrawType.toLowerCase() === "upi" && (
            <>
              <Box>
                <Typography variant="caption" m={1}>
                  Upi Id
                </Typography>
                <WithdrawInput
                  value={values.accountNumber}
                  name="accountNumber"
                  onChange={(e) =>
                    e.target.value.match(regexByType.upi) && handleChange(e)
                  }
                  error={Boolean(errors.accountNumber)}
                  helperText={errors.accountNumber}
                  margin="dense"
                  placeholder="Account Number"
                />
              </Box>
              <Box>
                <Typography variant="caption" m={1}>
                  Account Holder Name
                </Typography>
                <WithdrawInput
                  value={values.accountHolderName.trimStart()}
                  name="accountHolderName"
                  onChange={handleChange}
                  error={Boolean(errors.accountHolderName)}
                  helperText={errors.accountHolderName}
                  margin="dense"
                  placeholder="Account Holder Name"
                />
              </Box>
            </>
          )}
          {values.withdrawType.toLowerCase() === "paytm" && (
            <>
              <Box>
                <Typography variant="caption" m={1}>
                  Mobile Number
                </Typography>
                <WithdrawInput
                  value={values.accountNumber}
                  name="accountNumber"
                  onChange={(e) =>
                    e.target.value.match(regexByType.paytm) && handleChange(e)
                  }
                  error={Boolean(errors.accountNumber)}
                  helperText={errors.accountNumber}
                  margin="dense"
                  placeholder="Mobile Number"
                />
              </Box>
              <Box>
                <Typography variant="caption" m={1}>
                  Account Holder Name
                </Typography>
                <WithdrawInput
                  value={values.accountHolderName.trimStart()}
                  name="accountHolderName"
                  onChange={handleChange}
                  error={Boolean(errors.accountHolderName)}
                  helperText={errors.accountHolderName}
                  margin="dense"
                  placeholder="Account Holder Name"
                />
              </Box>
            </>
          )}
        </Box>
        {savedInfo.find(
          (item) => item.withdrawType === values.withdrawType
        ) && (
          <Box my={2}>
            <ActivityTable
              onRowClick={(row: any) => {
                if (row) {
                  setSavedCheck(row.id);
                  setFieldValue("accountHolderName", row.accountHolderName);
                  setFieldValue("bankName", row.bankName);
                  setFieldValue("accountType", row.accountType);
                  setFieldValue("accountNumber", row.accountNumber);
                  setFieldValue("ifsc", row.ifsc);
                  setFieldValue("withdrawType", row.withdrawType);
                }
              }}
              columns={savedColumns.filter((column) => {
                if (values.withdrawType.toLowerCase() !== "bank") {
                  if (
                    ["accountHolderName", "accountNumber", "action"].includes(
                      column.id
                    )
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                } else {
                  return true;
                }
              })}
              minHeight={1}
              rows={savedInfo
                .filter((item) => item.withdrawType === values.withdrawType)
                .map((item) => {
                  const newItem: any = { ...item };
                  newItem["action"] = (
                    <Radio checked={newItem.id === savedCheck} />
                  );
                  return newItem;
                })}
            />
          </Box>
        )}
        <Box textAlign={"center"}>
          <Button
            color="secondary"
            disabled={loading}
            type="submit"
            endIcon={loading && <CircularProgress size={"1rem"} />}
            variant="contained"
            disableElevation
            sx={{
              height: 48,
              mx: "auto",
              borderRadius: "8px",
              mt: "2rem",
              // mb: { xs: 1, lg: 0.65 },
              color: "white",
              fontSize: "1.2rem",
              width: 156,
            }}
          >
            Submit
          </Button>
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
