import { Box } from "@mui/system";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../layout/loading";
import Withdraw from "../Withdraw/Withdraw";

const Account = React.lazy(() => import("../accountSummary"));
const Activity = React.lazy(() => import("../activityLog"));
const Casino = React.lazy(() => import("../casino/Casino"));
const CurrentBets = React.lazy(() => import("../currentBets"));
const Event = React.lazy(() => import("../event"));
const Home = React.lazy(() => import("../home"));
const Profile = React.lazy(() => import("../profile/Profile"));
const Deposit = React.lazy(() => import("../Deposit/index"));

const Pages = () => {
  return (
    <div>
      <Suspense
        fallback={
          <Box flex={1} height="100vh">
            <Loading />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sports/details/" element={<Event />} />
          <Route path="/report">
            <Route path="accountstatement" element={<Account />} />
            <Route path="activity" element={<Activity />} />
            <Route path="currentbets" element={<CurrentBets />} />
          </Route>
          <Route path="/casino" element={<Casino />} />
          <Route path="/virtual-casino" element={<Casino />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw-request" element={<Withdraw/>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Pages;
