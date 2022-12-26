import { Box, Divider, Grid, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { userServices } from "../../utils/api/user/services";
import { topNavHeight } from "../layout/header";
import HomeLayout from "../layout/homeLayout";

interface ProfileInterface {
  
  username:string;
  userId: string;
  mobile: string;
  city: string;
  doj: string;

}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileInterface|null>(null);
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

  const theme = useTheme()
  if (!profileData) {
    return <h4 style={{marginTop:"50%"}}>LOADING ...</h4>
  }
  return (
    <HomeLayout>
      <Box p={{xs:"40px 0px", lg:5}} minHeight={`calc(100vh - ${topNavHeight} - ${theme.mixins.toolbar.minHeight}px)`} >
        <Grid container fontSize={{xs:"0.8rem", sm: "1rem"}} rowGap={{xs:2,lg:3}}>
          <Grid xs={4} item>
            User Name:
          </Grid>
          <Grid xs={7} item>
            {profileData?.username}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={4} item>
            User ID:
          </Grid>
          <Grid xs={7} item>
            {profileData?.userId}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={4} item>
            Mobile No.
          </Grid>
          <Grid xs={7} item>
            {profileData?.mobile}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={4} item>
            Date of Joining:
          </Grid>
          <Grid xs={7} item>
            {profileData?.doj}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid xs={4} item>
            City:
          </Grid>
          <Grid xs={7} item>
            {profileData?.city}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Box>
    </HomeLayout>
  );
};

export default Profile;
