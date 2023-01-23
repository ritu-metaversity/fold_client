import React from "react";
import {
  GiCricketBat,
  GiVolleyballBall,
  GiEightBall,
  GiHockey,
  GiBoxingGloveSurprise,
} from "react-icons/gi";
import { BiTennisBall } from "react-icons/bi";
import { IoIosFootball, IoIosBasketball } from "react-icons/io";
import { MdSportsEsports, MdSportsKabaddi } from "react-icons/md";
import {
  FaFootballBall,
  FaHorse,
  FaMotorcycle,
  FaTableTennis,
} from "react-icons/fa";
import { GiGolfFlag } from "react-icons/gi";

export const sportsTabList = [
  {
    name: "Cricket",
    icon: <GiCricketBat />,
    iconClass: "d-icon icon-4",
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
    name: "Boxing",
    icon: <GiBoxingGloveSurprise />,
    color: "#e44e24",
  },
  {
    name: "Golf",
    icon: <GiGolfFlag />,
    color: "#015900",
  },
  {
    name: "Kabaddi",
    icon: <MdSportsKabaddi />,
    color: "#6e2e26",
  },
  {
    name: "Rugby League",
    icon: <FaFootballBall />,
    color: "#ED5F62",
  },
  {
    name: "Motor Sport",
    icon: <FaMotorcycle />,
    color: "#9FBE3C",
  },
  {
    name: "Esports",
    iconClass: "d-icon icon-11",
    icon: <MdSportsEsports />,
    color: "#623CEA",
  },
  {
    name: "Horse Racing",
    iconClass: "d-icon icon-10",
    icon: <FaHorse />,
    color: "#9E4025",
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
