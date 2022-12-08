import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Account from '../accountSummary';
import Event from '../event';
import Home from '../home'

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports/details/" element={<Event />} />
        <Route path="/report" >
          <Route path="accountstatement" element={<Account />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Pages