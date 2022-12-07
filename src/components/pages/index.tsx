import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Event from '../event';
import Home from '../home'

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports/details/" element={<Event />} />
      </Routes>
    </div>
  );
}

export default Pages