import { Search } from "@mui/icons-material";
import {
  Button,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import Calendar from "react-calendar"
import { Box } from "@mui/system";
import React from "react";
import { colorHex } from "../../constants";
import { PdfIcon } from "./styledComponents";
import DatePicker from "react-date-picker"

const LabelText = styled(Typography)(({ theme }) => ({
  color: "text.secondary",
  fontSize: "0.8rem",
  textAlign: "left",
  marginBlock: 4,
}));

const Filter = () => {
  const matches = useMediaQuery("(min-width : 1280)");
  return (
    <Box p={1} py={{ xs: 1, md: 2, lg: 1 }} px={{ xs: 1, md: 4, lg: 1 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
        <Typography
          variant="h6"
          flex={1}
          color={"text.secondary"}
          textAlign="left"
        >
          Account Statement
        </Typography>

        <TextField
          size="small"
          placeholder="Search"
          sx={{
            border: "none",
            flex: 1,
            maxWidth: { md: 320 },
            ml: "auto",
            outline: "none",
          }}
          fullWidth
          InputProps={{
            style: {
              background: colorHex.bg6,
            },
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container>
        <Grid item xs={6} lg={1.5} textAlign="left" pr={1}>
          <LabelText>From</LabelText>
          <TextField
            size="small"
            fullWidth
            aria-labelledby="from-date-label"
            type="date"
          />
        </Grid>
        <Grid item xs={6} pr={2} lg={1.5} textAlign="left">
          <LabelText>To</LabelText>
          <DatePicker/>
          {/* <Calendar /> */}
          {/* <TextField size="small"  type="date" />
           */}
        </Grid>
        <Grid item xs={12} pr={2} lg={2}>
          <LabelText>Type</LabelText>
          <Select margin="dense" size="small" defaultValue={"0"} fullWidth>
            <MenuItem value="0">All</MenuItem>
            <MenuItem value="1">Deposit/Withdrawal Report</MenuItem>
            <MenuItem value="2">Game report</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} pr={2} lg={1.5} display="flex" alignItems="flex-end">
          <Button
            fullWidth
            sx={{ mt: "auto" }}
            type="submit"
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
          <Select defaultValue={5000} sx={{ mx:1, maxHeight: 30 }}>
            <MenuItem value="0">25</MenuItem>
            <MenuItem>50</MenuItem>
            <MenuItem>100</MenuItem>
            <MenuItem>500</MenuItem>
            <MenuItem>1000</MenuItem>
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
