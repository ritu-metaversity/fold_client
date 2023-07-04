import { CustomizedDatePicker } from "./CustomizedDatePicker";
import Search from "@mui/icons-material/Search";
import "./accountDatePicker.css";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import React, { FC, useState } from "react";
import { colorHex } from "../../utils/constants";
import { AccountStatementFilter, subtractMonths, subtractWeeks } from ".";
import moment from "moment";

const LabelText = styled(Typography)(({ theme }) => ({
  color: "text.secondary",
  fontSize: "0.8rem",
  textAlign: "left",
  marginBlock: 4,
}));
interface Props {
  searchFilters: AccountStatementFilter;
  setSearchFilters: React.Dispatch<
    React.SetStateAction<AccountStatementFilter>
  >;
}
const Filter: FC<Props> = ({ searchFilters, setSearchFilters }) => {
  const [toDate, setToDate] = useState(new Date(Date.now()));
  const [fromDate, setFromDate] = useState(subtractWeeks(2));
  const handleSubmit = () => {
    setSearchFilters({
      ...searchFilters,
      toDate: moment(toDate).format("YYYY-MM-DD"),
      fromDate: moment(fromDate).format("YYYY-MM-DD"),
    });
  };
  return (
    <Box p={1} py={{ xs: 1, md: 2, lg: 1 }} px={{ xs: 1, md: 4, lg: 1 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
        <Typography
          // variant="h6"
          fontSize={"1.15rem"}
          fontWeight="500"
          flex={1}
          color={"text.secondary"}
          textAlign="left"
        >
          Account Statement
        </Typography>

        <TextField
          size={"small"}
          placeholder="Search"
          sx={{
            fontSize: "0.8rem",
            "& fieldset": {
              border: "none",
            },
            flex: 1,
            my: 1,
            maxWidth: { lg: 320 },
          }}
          fullWidth
          InputProps={{
            style: {
              fontSize: "0.8rem",
              background: colorHex.bg6,
            },
            endAdornment: (
              <InputAdornment position="end">
                <Search htmlColor={"#aaafb5"} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container rowGap={1}>
        <Grid item xs={6} lg={1.5} textAlign="left" pr={1}>
          <LabelText>From</LabelText>
          <CustomizedDatePicker
            value={fromDate}
            minDate={subtractMonths(2)}
            maxDate={new Date()}
            onChange={setFromDate}
          />
        </Grid>
        <Grid item xs={6} pr={{ lg: 2 }} lg={1.5} textAlign="left">
          <LabelText>To</LabelText>
          <CustomizedDatePicker
            minDate={subtractMonths(2)}
            value={toDate}
            maxDate={new Date()}
            onChange={setToDate}
          />
        </Grid>
        <Grid item xs={12} pr={{ lg: 2 }} lg={2}>
          <LabelText>Type</LabelText>

          <Select
            margin="dense"
            size="small"
            value={searchFilters.type + ""}
            onChange={(e) =>
              setSearchFilters({
                ...searchFilters,
                type: Number(e.target.value),
              })
            }
            sx={{
              maxHeight: { xs: 30, lg: 36 },
              textAlign: "start",
              fontSize: { xs: "0.8rem", lg: "1rem" },
            }}
            defaultValue={"0"}
            fullWidth
          >
            <MenuItem value="1">All</MenuItem>
            <MenuItem value="3">Deposit/Withdrawal Report</MenuItem>
            <MenuItem value="2">Game report</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          pr={{ lg: 2 }}
          lg={1.5}
          display="flex"
          alignItems="flex-end"
        >
          <Button
            fullWidth
            sx={{ mt: "auto", color: "white", fontSize: "1rem" }}
            type="submit"
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent={"space-between"}
        py={0.5}
        my={1}
        borderTop={{ xs: `1px solid ${colorHex.borderLine}`, lg: "none" }}
      >
        <Box display="flex" alignItems="center">
          <LabelText>Show</LabelText>
          <Select
            value={searchFilters.noOfRecords}
            onChange={(e) => {
              setSearchFilters({
                ...searchFilters,
                noOfRecords: Number(e.target.value),
              });
            }}
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
        {/* <Box>
          <PdfIcon src="/assets/images/pdf.png" />
          <PdfIcon src="/assets/images/xl.png" />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Filter;
