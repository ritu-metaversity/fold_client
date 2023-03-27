import { Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface Props {
  markets: {
    name: string;
    rule: string;
  }[];
}
export function MarketCollapse({ markets }: Props) {
  const [open, setOpen] = useState<boolean[]>([]);
  useEffect(() => {
    setOpen(markets.map((i) => false));
  }, [markets]);
  return (
    <>
      {markets.map((market, index) => (
        <React.Fragment key={market.name + index}>
          <p
            className="iconForCollapse"
            onClick={() => {
              setOpen((o) => {
                let newO = [...o];
                return newO.map((item, index2) =>
                  index2 !== index ? false : !item
                );
              });
            }}
          >
            {open[index] ? (
              <RemoveCircleIcon className="iconForCollapse" />
            ) : (
              <AddCircleIcon className="iconForCollapse" />
            )}
            {market.name}
          </p>
          <Collapse in={open[index]} unmountOnExit>
            <div
              className="rulesDiv"
              dangerouslySetInnerHTML={{
                __html: market.rule,
              }}
            ></div>
          </Collapse>
        </React.Fragment>
      ))}
    </>
  );
}
