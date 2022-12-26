import { Search } from "@mui/icons-material";
import {
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
import { Form } from "react-bootstrap";
import { colorHex } from "../../constants";
import { PdfIcon } from "../accountSummary/styledComponents";
import "../accountSummary/formCheck.css";
import {
  CategoryTabs,
  CurrentBetCategoryTabsContainer,
} from "./styledComponents";
import { SearchFiltersCurrentBets } from "./types";

const LabelText = styled(Typography)(({ theme }) => ({
  color: "text.secondary",
  fontSize: "0.8rem",
  textAlign: "left",
  marginBlock: 4,
}));

interface Props {
  searchFilters: SearchFiltersCurrentBets;
  setSearchFilters: Dispatch<SetStateAction<SearchFiltersCurrentBets>>;
}
const Filter = ({ searchFilters, setSearchFilters }: Props) => {
  const [pageSize, setPageSize] = useState<number>(25);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchFilters({ ...searchFilters });
  };
  const handlePageSizeChange = (e: SelectChangeEvent<number>) => {
    setPageSize(Number(e.target.value));
    setSearchFilters({ ...searchFilters, pageSize: Number(e.target.value) });
  };
  return (
    <Box py={{ xs: 1, md: 2, lg: 1 }}>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          px={{ xs: 1, md: 4, lg: 1 }}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Typography
            // variant="h6"
            fontSize={{ xs: "1.15rem", md: "1.4rem" }}
            fontWeight="500"
            flex={1}
            color={"text.secondary"}
            textAlign="left"
          >
            Current Bets
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
          <CurrentBetCategoryTabsContainer item xs={12}>
            <CategoryTabs
              onClick={() =>
                setSearchFilters({ ...searchFilters, category: "sports" })
              }
              sx={
                searchFilters.category === "sports"
                  ? { borderBottom: "2px solid #AAAFB5 ", fontWeight: "600" }
                  : {}
              }
            >
              Sports
            </CategoryTabs>
            <CategoryTabs
              onClick={() =>
                setSearchFilters({ ...searchFilters, category: "casino" })
              }
              sx={
                searchFilters.category === "casino"
                  ? { borderBottom: "2px solid #AAAFB5", fontWeight: "600" }
                  : {}
              }
            >
              Casino
            </CategoryTabs>
          </CurrentBetCategoryTabsContainer>
        </Grid>
        <Box
          px={{ xs: 1, md: 4, lg: 1 }}
          py={{ xs: 1, md: 2, lg: 1 }}
          display="flex"
        >
          <Form.Check
            className="pl-5"
            type={"radio"}
            label={`Matched`}
            onChange={() =>
              setSearchFilters({ ...searchFilters, status: "matched" })
            }
            checked={searchFilters.status === "matched"}
          />
          <Form.Check
            className="pl-5 font"
            type={"radio"}
            label={`Deleted`}
            onChange={() =>
              setSearchFilters({ ...searchFilters, status: "deleted" })
            }
            checked={searchFilters.status === "deleted"}
          />
        </Box>
      </form>
      <Box
        display="flex"
        justifyContent={"space-between"}
        py={0.5}
        px={{ xs: 1, md: 0, lg: 1 }}
        my={1}
        borderTop={{ xs: `1px solid ${colorHex.borderLine}`, lg: "none" }}
      >
        <Grid container rowGap={0.5} display="flex" alignItems="center">
          <Grid item xs={12} md={4} display="flex" alignItems="center">
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
          </Grid>
          <Grid item display="flex" xs={12} md={4}>
            <Form.Check
              type={"radio"}
              label={`All`}
              onChange={() =>
                setSearchFilters({ ...searchFilters, type: "all" })
              }
              checked={searchFilters.type === "all"}
            />
            <Form.Check
              className="pl-5 font"
              type={"radio"}
              label={`Back`}
              onChange={() =>
                setSearchFilters({ ...searchFilters, type: "back" })
              }
              checked={searchFilters.type === "back"}
            />
            <Form.Check
              className="pl-5 font"
              type={"radio"}
              label={`Lay`}
              onChange={() =>
                setSearchFilters({ ...searchFilters, type: "lay" })
              }
              checked={searchFilters.type === "lay"}
            />
          </Grid>
          <Grid item textAlign={"left"} xs={12} md={4} fontSize={"0.8rem"}>
            Total Bets: 0 Total Amount: 0
          </Grid>
        </Grid>
        <Box whiteSpace={"nowrap"}>
          <PdfIcon src="/assets/images/pdf.png" />
          <PdfIcon src="/assets/images/xl.png" />
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
