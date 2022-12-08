import React from "react";
import {
  GiCricketBat,
  GiVolleyballBall,
  GiEightBall,
  GiHockey,
} from "react-icons/gi";
import { BiTennisBall } from "react-icons/bi";
import { IoIosFootball, IoIosBasketball } from "react-icons/io";
import { MdSportsKabaddi } from "react-icons/md";
import { FaTableTennis } from "react-icons/fa";

export const sportsTabList = [
  {
    name: "Cricket",
    icon: <GiCricketBat />,
    color: "#20327B",
  },
  {
    name: "Soccer",
    icon: <IoIosFootball />,
    color: "#03B37F",
  },
  {
    name: "Football",
    icon: <IoIosFootball />,
    color: "#03B37F",
  },
  {
    name: "Tennis",
    icon: <BiTennisBall />,
    color: "#F18521",
  },
  {
    name: "Kabaddi",
    icon: <MdSportsKabaddi />,
    color: "#6e2e26",
  },
  {
    name: "Table Tennis",
    icon: <FaTableTennis />,
    color: "#DB2752",
  },
  {
    name: "Basketball",
    icon: <IoIosBasketball />,
    color: "#FBB03B",
  },
  {
    name: "Volleyball",
    icon: <GiVolleyballBall />,
    color: "#074A60",
  },
  {
    name: "Snookers",
    icon: <GiEightBall />,
    color: "#11B24B",
  },
  {
    name: "Ice Hockey",
    icon: <GiHockey />,
    color: "#3D2B58",
  },
];
