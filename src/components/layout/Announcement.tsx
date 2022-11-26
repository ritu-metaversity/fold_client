import { Typography } from "@mui/material";
import React from "react";
import Marquee from "react-fast-marquee";
import { AnnouncementBox } from "./styledComponents";
export function Announcement({}) {
  return (
    <AnnouncementBox>
      <Marquee gradient={false} speed={150}>
        ball lottery started play now and grab your coupons
      </Marquee>
        <img
          alt=""
          style={{
            width: "30px",
            marginRight: "-10px",
            marginTop: "-0.5em",
            textAlign:"right"
          }}
          src={"/assets/images/speaker.svg"}
        />
    </AnnouncementBox>
  );
}
