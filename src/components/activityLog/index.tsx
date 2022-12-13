import { Box, Divider, Grid, Pagination, PaginationItem, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Filter from "./Filter";
import { AccountContainer } from "../accountSummary/styledComponents";
import { Announcement } from "../layout/Announcement";
import Footer from "../layout/Footer";
import { columns } from "./columns";
import { rows as originalRows } from "./rows";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ActivityTable from "./activityLogTable";
import CustomizedDialog2 from "../common/Dailog2";
import { StyledLabel } from "./styledComponents";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Activity = () => {
  const matches = useMediaQuery("(min-width:1280px)");
  const [rows, setRows] = useState<any[]>([]);
  const { isSignedIn } = useContext(UserContext);
  const nav = useNavigate();
  //   useEffect(() => {
  //     if (isSignedIn === false) nav("/");
  //     return () => {};
  //   }, [isSignedIn]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    setRows(
      originalRows.map((row) => {
        const newRow: any = { ...row };
        newRow.ip = (
          <span>
            {row.ip} <VisibilityIcon fontSize="small" onClick={handleClick} />
          </span>
        );
        return newRow;
      })
    );
  }, []);

  return (
    <>
      <AccountContainer>
        <CustomizedDialog2
          open={open}
          handleClose={handleClose}
          title="IP Detail"
        >
          <Grid container fontSize="0.8rem" rowGap={1}>
            <Grid sx={{ opacity: 0.6 }} xs={6} item>
              IP:
            </Grid>{" "}
            <Grid xs={6} item>
              115.246.121.179
            </Grid>{" "}
            <Grid sx={{ opacity: 0.6 }} xs={6} item>
              City:
            </Grid>{" "}
            <Grid xs={6} item>
              Delhi
            </Grid>{" "}
            <Grid sx={{ opacity: 0.6 }} xs={6} item>
              Country:
            </Grid>{" "}
            <Grid xs={6} item>
              India
            </Grid>
          </Grid>
        </CustomizedDialog2>
        {!matches && <Announcement />}

        <Box minHeight="calc(100vh - 60px)">
          <Filter></Filter>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <ActivityTable rows={rows} columns={columns} />
          </Box>
          <Box
            textAlign={"left"}
            sx={{ display: { xs: "block", lg: "none" } }}
            fontSize="0.75rem"
          >
            {rows.map((row) => (
              <>
                <Box
                  py={{ xs: 0.5, md: 2, lg: 1 }}
                  px={{ xs: 1, md: 4, lg: 1 }}
                >
                  {columns.map((column) => (
                    <Box py={0.3}>
                      <StyledLabel>{column.label}</StyledLabel>
                      <Box
                        display="inline-block"
                        maxWidth={"calc(100% - 130px)"}
                        component="span"
                      >
                        {row[column.id]}{" "}
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Divider />
              </>
            ))}
          </Box>

          <Pagination
            count={4}
            siblingCount={0}
            color="secondary"
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  first: KeyboardDoubleArrowLeftIcon,
                  last: KeyboardDoubleArrowRightIcon,
                }}
                {...item}
              />
            )}
            sx={{
              display: "inline-block",
              maxWidth: "100%",
              m: "auto",
              justifyContent: "center",
            }}
            showFirstButton
            showLastButton
          />
        </Box>
      </AccountContainer>
      <Footer />
    </>
  );
};

export default Activity;
