import { MarketCollapse } from "./MarketCollapse";
import { Collapse, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import "./rules.css";
import { FaChevronDown } from "react-icons/fa";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";

const data = [
  {
    name: "Football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
  {
    name: "Football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
  {
    name: "Football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
  {
    name: "Football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
  {
    name: "Football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
];

const Faq = () => {
  const [open, setOpen] = useState<boolean[]>([]);
  useEffect(() => {
    setOpen(data.map((i) => false));
  }, [data]);

  console.log(open, "open");
  return (
    <>
      <div className="britishdiv">
        <img className="britishimg" src="/assets/images/british.png" alt="" />
        <Typography color="white" fontSize="15px">
          English
        </Typography>
        <FaChevronDown size={"13px"} />
      </div>
      {data.map((sport, index) => (
        <React.Fragment key={sport.name + index}>
          <p
            className="iconForCollapse"
            onClick={() => {
              console.log("clicked");
              setOpen((o) => {
                let newO = [...o];
                return newO.map((item, index2) =>
                  index2 !== index ? false : !item
                );
              });
            }}
            style={{ cursor: "pointer" }}
          >
            {open[index] ? (
              <HiMinusCircle className="iconForCollapse" />
            ) : (
              <HiPlusCircle className="iconForCollapse" />
            )}
            {sport.name}
          </p>

          <Collapse unmountOnExit in={open[index]}>
            <div className="rulesMarketDiv">
              <MarketCollapse markets={sport.rules} />
            </div>
          </Collapse>
        </React.Fragment>
      ))}
    </>
  );
};

export default Faq;
