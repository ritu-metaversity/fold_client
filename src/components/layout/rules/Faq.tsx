import { MarketCollapse } from "./MarketCollapse";
import { Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import "./rules.css";

const data = [
  {
    name: "football",
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
    name: "football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
  {
    name: "football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
  {
    name: "football",
    rules: [
      {
        name: "match odds ",
        rule: "<p>asdfasdfasdfasdfasdfasdfasdas </p>",
      },
    ],
  },
  {
    name: "football",
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
              <RemoveCircleIcon className="iconForCollapse" />
            ) : (
              <AddCircleIcon className="iconForCollapse" />
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
