import { Search } from "@mui/icons-material";
import "../accountSummary/accountDatePicker.css";
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { colorHex } from "../../constants";
import { PdfIcon } from "../accountSummary/styledComponents";
import { CustomizedDatePicker } from "../accountSummary/CustomizedDatePicker";
import { searchFilters } from ".";

const LabelText = styled(Typography)(({ theme }) => ({
  color: "text.secondary",
  fontSize: "0.8rem",
  textAlign: "left",
  marginBlock: 4,
}));

interface Props { 
  searchFilters: searchFilters;
  setSearchFilters: Dispatch<SetStateAction<searchFilters>>;
}
const Filter = ({searchFilters,setSearchFilters}:Props) => {
  const [toDate, setToDate] = useState(new Date());
  const [type, setType] = useState("login");
  const [pageSize, setPageSize] = useState< number>(25);
  const [fromDate, setFromDate] = useState(new Date());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchFilters({...searchFilters,type}) 
  }
  const handlePageSizeChange = (e: SelectChangeEvent<number>) => {
    setPageSize(Number(e.target.value));
    setSearchFilters({ ...searchFilters, pageSize: Number(e.target.value)});
  };
  return (
    <Box p={1} py={{ xs: 1, md: 2, lg: 1 }} px={{ xs: 1, md: 4, lg: 1 }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
          <Typography
            // variant="h6"
            fontSize={{ xs: "1.15rem", md: "1.4rem" }}
            fontWeight="500"
            flex={1}
            color={"text.secondary"}
            textAlign="left"
          >
            Activity Log
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
            <CustomizedDatePicker value={fromDate} onChange={setFromDate} />
          </Grid>
          <Grid item xs={6} pr={{ lg: 2 }} lg={1.5} textAlign="left">
            <LabelText>To</LabelText>
            <CustomizedDatePicker value={toDate} onChange={setToDate} />
          </Grid>
          <Grid item xs={12} pr={{ lg: 2 }} lg={2}>
            <LabelText>Type</LabelText>

            <Select
              margin="dense"
              size="small"
              sx={{
                maxHeight: { xs: 30, lg: 36 },
                textAlign: "start",
                fontSize: { xs: "0.8rem", lg: "1rem" },
              }}
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
            >
              <MenuItem value="login">Login</MenuItem>
              <MenuItem value="password">Change Password</MenuItem>
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
              color="secondary"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
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
            defaultValue={5000}
            onChange={handlePageSizeChange}
            value={pageSize}
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
        <Box>
          <PdfIcon src="/assets/images/pdf.png" />
          <PdfIcon src="/assets/images/xl.png" />
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
