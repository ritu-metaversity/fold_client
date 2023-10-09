import React, { useEffect, useRef, useState } from "react";
import "./CasinoTabs.css";
import { casinoProviderList } from "../CasinoProvider";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProviderTabs from "./providerTabs/ProviderTabs";
import GameList from "./gameList/GameList";
import { slotProviderList } from "../SlotProvider";

const CasinoTabs = ({ gameLists, category, setProviderTags, liveCasino }) => {
  const [activeClass, setActiveClass] = useState(0);
  const [providerFilter, setProviderFilter] = useState("ALL");
  const [scrollX, setscrollX] = useState(0);
  const [hideButton, setSetHideBtton] = useState();

  const handleCasino = (id, val) => {
    setActiveClass(id);
    setProviderTags(val);
  };

  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    ref.current.scroll({left:ref.current.scrollLeft + scrollOffset })
    setscrollX(scrollX + scrollOffset);
  };

//   console.log((window.location.pathname?.includes('/m')), "dsadad")

useEffect(()=>{
    const hideButton = window.location.pathname?.includes('/m');
    setSetHideBtton(hideButton)
}, [hideButton])

  return (
    <>
      <div className="casino_tabs">
        {
            hideButton ? "":<button  onClick={() => scroll(-20)} className="casino_left_tab">
            <MdKeyboardArrowLeft />
          </button>
        }
        
        <ul ref={ref}>
          {liveCasino &&
            casinoProviderList?.map((item, id) => {
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
          {!liveCasino &&
            slotProviderList?.map((item, id) => {
              return (
                <li
                  className={activeClass == id ? "casino_active" : ""}
                  onClick={() => handleCasino(id, item?.filterType)}>
                  {item?.name}
                </li>
              );
            })}
        </ul>
        {
            hideButton ?"":  <button onClick={() => scroll(20)} className="casino_left_tab">
            <MdKeyboardArrowRight />
          </button>
        }
      
      </div>
      <ProviderTabs setProviderFilter={setProviderFilter} category={category} />
      <GameList providerFilter={providerFilter} gameLists={gameLists} />
    </>
  );
};

export default CasinoTabs;
