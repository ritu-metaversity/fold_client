import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { userServices } from "../../utils/api/user/services";
import { topNavHeight } from "../layout/header";
import HomeLayout from "../layout/homeLayout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
interface ProfileInterface {
  username: string;
  userId: string;
  mobile: string;
  city: string;
  doj: string;
  balance: string;
  win: string;
  exposure: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileInterface | null>(null);
  const getProfile = async () => {
    const { response } = await userServices.profile();
    if (response) {
      setProfileData(response.data);
    }
  };
  useEffect(() => {
    getProfile();
    return () => {};
  }, []);

  const theme = useTheme();
  if (!profileData) {
    return <h4 style={{ marginTop: "50%" }}>LOADING ...</h4>;
  }
  return (
    <HomeLayout>
      <Box
        p={{ xs: "40px 0px", lg: 5 }}
        minHeight={`calc(100vh - ${topNavHeight} - ${theme.mixins.toolbar.minHeight}px)`}
      >
        <Box m="auto" pb={5}>
          <AccountCircleIcon sx={{ fontSize: "150px" }} />
          <Typography variant="h4"> {profileData?.username}</Typography>
        </Box>
        <Grid
          container
          fontSize={{ xs: "0.8rem", sm: "1rem" }}
          rowGap={{ xs: 1.5, lg: 2.5 }}
          gap={"3%"}
        >
          <Grid textAlign={"right"} xs={5.8} item>
            User Name:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.username}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            Date of Joining:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.doj}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            User ID:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.userId}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            Mobile No:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.mobile}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            City:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.city}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            Available Balance:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.balance}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            Win:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.win}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            Exposure:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.exposure}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
          <Grid textAlign={"right"} xs={5.8} item>
            Total Balance:
          </Grid>
          <Grid textAlign={"left"} xs={5.8} item>
            {profileData?.exposure + profileData?.balance}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "white", borderWidth: "1px" }} />
          </Grid>
        </Grid>
      </Box>
    </HomeLayout>
  );
};

export default Profile;
