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
  const [avQtech, setAvQtech] = useState("");
  const [gameId, setGameId] = useState("");
  const [show, setShow] = useState(false);
  const [ruleShow, setRuleShow] = useState(false);



  const handleCasino = (id, val, name, gameCode) => {
    setAvQtech(name)
    setActiveClass(id);
    setProviderTags(val);
    if(name === "AVIATOR" || name === "Q Tech"){
      setGameId(gameCode);
      setRuleShow(true)
    }
    
  };
  

  console.log(gameId, "sdsssdsadas")

  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    ref.current.scroll({left:ref.current.scrollLeft + scrollOffset })
    setscrollX(scrollX + scrollOffset);
  };


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
              // console.log(item, "dsfsffw")
              return (
                <>
                  <li
                    className={activeClass == id ? "casino_active" : ""}
                    onClick={() => handleCasino(id, item?.filterType, item?.name, item?.gameCode)}>
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
      <GameList ruleShow={ruleShow} setRuleShow={setRuleShow} show={show} setShow={setShow} gameId={gameId} setGameId={setGameId} avQtech={avQtech} providerFilter={providerFilter} gameLists={gameLists} />
    </>
  );
};

export default CasinoTabs;
