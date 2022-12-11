// import { Typography } from "@mui/material";
import React from "react";
import Marquee from "react-fast-marquee";
import { AnnouncementBox, SpeakerIcon } from "./styledComponents";
export function Announcement() {
  return (
    <AnnouncementBox>
      <Marquee gradient={false} speed={150}
        style={{ overflow: "hidden" }}
      >
        ball lottery started play now and grab your coupons
      </Marquee>
        <SpeakerIcon
          alt=""
          
          src={"/assets/images/speaker.svg"}
        />
    </AnnouncementBox>
  );
}
