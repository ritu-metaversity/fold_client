import React from "react";
import { useNavigate } from "react-router-dom";
import { slotProviderList } from "../desktopLayout/LiveCasino/SlotProvider";

const SlotHome = ({ providerList }) => {
  const nav = useNavigate();
  const handelFantsy = (id, val, path) => {
    nav(`/${path}`, { state: { id: id, gameId: val } });

    console.log(path, "path")
  };

  return (
    <div>
      {providerList && Object?.keys(providerList)?.map((key) => {
        if (key === "liveCasino") return <></>;
        return (
          <>
            <h4 className="casino_name">{key?.toUpperCase()}</h4>
            <div className="live_casino_home">
              {providerList?.[key]?.map((item, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => handelFantsy(id, item?.providerName, key)}
                    className="sub_live_casino">
                    <img className="live_casino_logo" src={item?.image} />
                    <p style={{ fontWeight: "900", paddingTop: "2px" }}>
                      {item?.providerName}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}

      {localStorage.getItem("token") === null && (
        <>
          <h4 className="casino_name">Slot</h4>

          <div className="live_casino_home">
            {slotProviderList.map((item, id) => {
              return (
                <div
                  key={id}
                  onClick={() => handelFantsy(id, item?.name)}
                  className="sub_live_casino">
                  <img className="live_casino_logo" src={item?.logo} />
                  <p style={{ fontWeight: "900", paddingTop: "2px" }}>
                    {item?.name}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SlotHome;
