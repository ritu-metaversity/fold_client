import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FgameData } from "./FantsyGameProvider";
import FantsyList from "./FantsyList";
import { useLocation } from "react-router-dom";
import { CasinoApi } from "../../apis/CasinoApi";

const FantsyTabs = () => {
  const [activeClass, setActiveClass] = useState(0);
  const [providerFilter, setProviderFilter] = useState("SPB");
  const [scrollX, setscrollX] = useState(0);
  const [hideButton, setSetHideBtton] = useState();

  const { state } = useLocation();

  useEffect(() => {
    if (state != null) {
      setActiveClass(state?.id);
      setProviderFilter(state?.gameId);
    } else {
      setActiveClass(0);
      setProviderFilter("SPB");
    }
  }, [state]);
  const handleCasino = (id, val) => {
    setActiveClass(id);
    setProviderFilter(val);
  };

  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    ref.current.scroll({ left: ref.current.scrollLeft + scrollOffset });
    setscrollX(scrollX + scrollOffset);
  };

  useEffect(() => {
    const hideButton = window.location.pathname?.includes("/m");
    setSetHideBtton(hideButton);
  }, [hideButton]);

  const [providerList, setProviderList] = useState({})
  useEffect(()=>{
    CasinoApi.ProvideList({
      gameType:"ALL"
    }).then((res)=>{
      setProviderList(res?.data?.data)
    })

  }, [])

  return (
    <>
      <div className="casino_tabs">
        {hideButton ? (
          ""
        ) : (
          <button onClick={() => scroll(-20)} className="casino_left_tab">
            <MdKeyboardArrowLeft />
          </button>
        )}
        <ul ref={ref}>
          {FgameData?.map((ele) =>
            Object?.values(providerList)
              ?.reduce((a, c) => [...a, ...c], [])
              .find((item1) => ele.filterType == item1?.providerId)
          )?.map((item, id) => {
            return (
              <>
                <li
                  className={activeClass == id ? "casino_active" : ""}
                  onClick={() => handleCasino(id, item?.providerId)}>
                  {item?.providerName}
                </li>
              </>
            );
          })}
        </ul>

        {/* <ul ref={ref}>
          {
            FgameData?.map((item, id) => {
              return (
                <>
                  <li
                    className={activeClass == id ? "casino_active" : ""}
                    onClick={() => handleCasino(id, item?.filterType)}>
                    {item?.name}
                  </li>
                </>
              );
            })}
          
        </ul> */}
        {hideButton ? (
          ""
        ) : (
          <button onClick={() => scroll(20)} className="casino_left_tab">
            <MdKeyboardArrowRight />
          </button>
        )}
      </div>
      <FantsyList providerFilter={providerFilter} />
    </>
  );
};

export default FantsyTabs;
