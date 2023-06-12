import React from "react";
import Itemdesk from "./Itemdesk";
import NewLunch from "../Newlunch/NewLunch";

const ItemdeskData = () => {
  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className=" itemHome">
            <Itemdesk />
            <NewLunch />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemdeskData;
