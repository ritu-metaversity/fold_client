import React from "react";
import { useNavigate } from "react-router-dom";
import { slotProviderList } from "../desktopLayout/LiveCasino/SlotProvider";

const SlotHome = ({path}) => {
    const nav = useNavigate();
    const handelFantsy = (id,val)=>{
        nav(path, { state: { id:id, gameId:val } })
    }
  return (
    <div>
      <h4 className="casino_name">Slot</h4>

      <div className="live_casino_home">
        {slotProviderList.map((item, id) => {
          return (
            <div
              key={id}
              onClick={() => handelFantsy(id, item?.name)}
              className="sub_live_casino">
              <img
                className="live_casino_logo"
                src={item?.logo}
              />
              <p style={{ fontWeight: "900", paddingTop: "2px" }}>
                {item?.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlotHome;
