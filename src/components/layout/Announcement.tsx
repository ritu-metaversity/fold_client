// import { Typography } from "@mui/material";
import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import { UserContext } from "../../App";
import { AnnouncementBox, SpeakerIcon } from "./styledComponents";
export function Announcement() {
  const { announcement, isSignedIn } = useContext(UserContext);
  const host = window.location.hostname;
  return (
    <AnnouncementBox isSignedIn={!!isSignedIn}>
      <Marquee
        gradient={false}
        speed={50}
        style={{ overflow: "hidden", color: "white", fontSize: "0.8rem" }}
      >
        {host?.includes("onlysession.in")?<span><b style={{marginLeft:"12px"}}>Radhe Radhe</b> Welcomes You All to OnlySession Wish You All The Best.</span> :announcement}
      </Marquee>
      <SpeakerIcon alt="" src={"/assets/images/speaker.svg"} />
    </AnnouncementBox>
  );
}
