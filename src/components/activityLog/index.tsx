import { Box, Divider, Grid, Pagination, PaginationItem, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Filter from "./Filter";
import { AccountContainer } from "../accountSummary/styledComponents";
import { Announcement } from "../layout/Announcement";
import Footer from "../layout/Footer";
import { columns } from "./columns";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ActivityTable from "./activityLogTable";
import CustomizedDialog2 from "../common/Dailog2";
import { StyledLabel } from "./styledComponents";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { utilServices } from "../../utils/api/util/services";
import { BootstrapTooltip } from "../accountSummary/StatementPopUp";

export type searchFilters = { type: string };

const Activity = () => {
  const matches = useMediaQuery("(min-width:1280px)");
  const [searchFilters, setSearchFilters] = useState<searchFilters>({
    type: "login",
  });
  const [rows, setRows] = useState<any[]>([]);
  const [originalRows, setOriginalRows] = useState<any[]>([]);

  const { isSignedIn } = useContext(UserContext);
  const nav = useNavigate();
  useEffect(() => {
    if (isSignedIn === false) nav("/");
    return () => {};
  }, [isSignedIn]);
  const [open, setOpen] = React.useState<number>(-1);
  const handleClose = () => {
    setOpen(-1);
  };
  // const handleClick = () => {
  //   setOpen(true);
  // };

  useEffect(() => {
    const getList = async () => {
      if (searchFilters.type === "login") {
        const { response } = await utilServices.loginHistory();
        console.log(response);
        if (response?.data) {
          setOriginalRows(response.data)
          setRows(
            response.data.map((row: any, index: number) => {
              const newRow: any = { ...row };
              newRow.date = new Date(row.lastLogin).toLocaleString();
              newRow.username = row.userid;
              newRow.ip = (
                <span>
                  {row.ip}{" "}
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => setOpen(index)}
                  />
                </span>
              );
              return newRow;
            })
          );
        }
      } else if (searchFilters.type === "password") {
        const { response } = await utilServices.passwordHistory();
        console.log(response);
        if (response?.data) {
          setRows(
            response.data.map((row: any,index:number) => {
              const newRow: any = { ...row };
              newRow.username = row.userId
              newRow.date = new Date(row.createdOn).toLocaleString();
              newRow.ip = (
                <span>
                  {row.ipAddress}{" "}
                  <VisibilityIcon fontSize="small" onClick={()=>setOpen(index)} />
                </span>
              );
              newRow.detail = (
                <BootstrapTooltip title={row.deviceInfo} enterTouchDelay={1} >
                  <Box sx={{ textDecoration: "underline", cursor: "pointer", width:"min-content" }}>
                    Detail
                  </Box>
                </BootstrapTooltip>
              );
              return newRow;
            })
          );
        }
      }
    };
    getList();
  }, [searchFilters.type]);

  return (
    <>
      <AccountContainer>
        <CustomizedDialog2
          open={open>=0}
          handleClose={handleClose}
          title="IP Detail"
        >
          <Grid container fontSize="0.8rem" rowGap={1}>
            <Grid sx={{ opacity: 0.6 }} xs={6} item>
              IP:
            </Grid>{" "}
            <Grid xs={6} item>
              {originalRows[open]?.ip}
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
          <Filter
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          ></Filter>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <ActivityTable
              rows={rows}
              columns={
                searchFilters.type === "login"
                  ? columns.filter((i) => i.id !== "detail")
                  : columns
              }
            />
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
                  {columns
                    .filter((item) =>
                      searchFilters.type === "login"
                        ? item.id !== "detail"
                        : true
                    )
                    .map((column) => (
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
