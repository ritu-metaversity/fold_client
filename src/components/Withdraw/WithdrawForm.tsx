import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { colorHex } from "../../utils/constants";
import { LabelText } from "../activityLog/Filter";
import { WithdrawInput } from "./styledComponent";
export function WithdrawForm({ }) {
  
  return (
    <>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            flexWrap: "wrap",
            alignItems: {
              lg: "flex-end",
            },
            gap: 1,
            rowGap: 3,
          }}
        >
          <Box>
            <Typography m={1} variant="subtitle2">
              Amount:
            </Typography>
            <WithdrawInput placeholder="Amount" />
          </Box>
          <Box>
            <Typography variant="subtitle2" m={1}>
              Account Number:
            </Typography>
            <WithdrawInput placeholder="Account Number" />
          </Box>
          <Box>
            <Typography variant="subtitle2" m={1}>
              Account Name
            </Typography>
            <WithdrawInput placeholder="Account Name" />
          </Box>
          <Box>
            <Typography variant="subtitle2" m={1}>
              Bank Name
            </Typography>
            <WithdrawInput placeholder="Bank Name" />
          </Box>
          <Box>
            <Typography variant="subtitle2" m={1}>
              IFSC
            </Typography>
            <WithdrawInput placeholder="IFSC Code" />
          </Box>
          <Box>
            <Typography variant="subtitle2" m={1}>
              Account Type / Currency
            </Typography>
            <WithdrawInput defaultValue="saving" select placeholder="Amount">
              <MenuItem value="saving">Savings</MenuItem>
              <MenuItem value="current">Current</MenuItem>
            </WithdrawInput>
          </Box>
          <Box>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                my: 1,
                color: "white",
                width: 156,
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
      </form>
      <Box
        py={3}
        my={3}
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
