import React from "react";
import classes from "./ProviderCard.module.css";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  bg: string;
  heading?: string;
  para?: string;
}

function ProviderCard({ bg, heading, para, ...props }: Props) {
  return (
    <div className={classes["card"]} {...props}>
      <div
        className={classes["card_inner"]}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className={classes["content"]}>
          <div className={classes["cn_div"]}>
            <h1>{heading}</h1>
            <p>{para}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderCard;
