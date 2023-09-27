import { Box } from "@mui/system";
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Loading from "../layout/loading";
import { NewLayout, ThrowToLogin } from "../terms";
import Games from "../qTech/games/Games";

// import Aboutus from "./aboutus";
// import ResponsibleGaming from "./responsibleGaming";
// import Terms from "./terms";

const Account = React.lazy(() => import("../accountSummary"));
const Terms = React.lazy(() => import("../terms/terms"));
const ResponsibleGaming = React.lazy(
  () => import("../terms/responsibleGaming")
);
const Aboutus = React.lazy(() => import("../terms/aboutus"));
// const CasinoGame = React.lazy(() => import("../casino/game/CasinoGame"));
const Withdraw = React.lazy(() => import("../Withdraw/Withdraw"));
const Activity = React.lazy(() => import("../activityLog"));
const Casino = React.lazy(() => import("../casino/Casino"));
const CurrentBets = React.lazy(() => import("../currentBets"));
const Event = React.lazy(() => import("../event"));
const Home = React.lazy(() => import("../home"));
const Profile = React.lazy(() => import("../profile/Profile"));
const Deposit = React.lazy(() => import("../Deposit/index"));
const QtechGames = React.lazy(() => import("../qTech/qtechGames/QtechGames"));
const ProviderGames = React.lazy(
  () => import("../qTech/providerGames/ProviderGames")
);
const Fantasy = React.lazy(() => import("../qTech/fantasy/fantasy"));
const Slot = React.lazy(() => import("../qTech/slot/Slot"));
const LiveCasino = React.lazy(() => import("../qTech/liveCasino/LiveCasino"));
const Lottery = React.lazy(() => import("../qTech/lottery/lottery"));

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
            <Route path="/games" element={<Games />} />
            <Route path="/q-tech-games" element={<QtechGames />} />
            <Route path="/provider/:name" element={<ProviderGames />} />
            <Route path="/sports/details/" element={<Event />} />
            <Route path="/report">
              <Route path="accountstatement" element={<Account />} />
              <Route path="activity" element={<Activity />} />
              <Route path="currentbets" element={<CurrentBets />} />
            </Route>
            <Route path="/casino" element={<LiveCasino />} />
            <Route path="/fantasy" element={<Fantasy />} />
            <Route path="/slot" element={<Slot />} />
            {/* <Route path="/casino/:id" element={<CasinoGame />} /> */}
            <Route path="/virtual-casino" element={<Casino />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw-request" element={<Withdraw />} />
            <Route path="/lottery" element={<Lottery />} />
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
