import { Box } from "@mui/system";
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Loading from "../layout/loading";
import { NewLayout, ThrowToLogin } from "../terms";
// import Aboutus from "./aboutus";
// import ResponsibleGaming from "./responsibleGaming";
// import Terms from "./terms";

const Account = React.lazy(() => import("../accountSummary"));
const Terms = React.lazy(() => import("../terms/terms"));
const ResponsibleGaming = React.lazy(
  () => import("../terms/responsibleGaming")
);
const Aboutus = React.lazy(() => import("../terms/aboutus"));
const CasinoGame = React.lazy(() => import("../casino/game/CasinoGame"));
const Withdraw = React.lazy(() => import("../Withdraw/Withdraw"));
const Activity = React.lazy(() => import("../activityLog"));
const Casino = React.lazy(() => import("../casino/Casino"));
const CurrentBets = React.lazy(() => import("../currentBets"));
const Event = React.lazy(() => import("../event"));
const Home = React.lazy(() => import("../home"));
const Profile = React.lazy(() => import("../profile/Profile"));
const Deposit = React.lazy(() => import("../Deposit/index"));

const Pages = () => {
  useEffect(() => {
    console.log("Ran page");
  }, []);
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
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sports/details/" element={<Event />} />
            <Route path="/report">
              <Route path="accountstatement" element={<Account />} />
              <Route path="activity" element={<Activity />} />
              <Route path="currentbets" element={<CurrentBets />} />
            </Route>
            <Route path="/casino" element={<Casino />} />
            {/* <Route path="/casino/:id" element={<CasinoGame />} /> */}
            <Route path="/virtual-casino" element={<Casino />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw-request" element={<Withdraw />} />
          </Route>
          <Route path="" element={<NewLayout />}>
            <Route path="terms-and-conditions" element={<Terms />} />
            <Route path="responsible-gaming" element={<ResponsibleGaming />} />
            <Route path="about-us" element={<Aboutus />} />
            <Route path="*" element={<ThrowToLogin />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default Pages;
