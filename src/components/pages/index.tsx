import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Account from '../accountSummary';
import Activity from '../activityLog';
import Casino from '../casino/Casino';
import CurrentBets from '../currentBets';
import Event from '../event';
import Home from '../home'
import Profile from "../profile/Profile";

const Pages = () => {
  return (
    <div>
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
      </Routes>
    </div>
  );
}

export default Pages