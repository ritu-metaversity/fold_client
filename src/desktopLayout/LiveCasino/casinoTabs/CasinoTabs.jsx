import React, { useEffect, useRef, useState } from "react";
import "./CasinoTabs.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProviderTabs from "./providerTabs/ProviderTabs";
import GameList from "./gameList/GameList";
import { CasinoApi } from "../../../apis/CasinoApi";

const CasinoTabs = ({
  gameLists,
  category,
  setProviderTags,
  liveCasino,
  showid,
  state,
}) => {
  const [activeClass, setActiveClass] = useState(0);
  const [providerFilter, setProviderFilter] = useState("ALL");
  const [scrollX, setscrollX] = useState(0);
  const [hideButton, setSetHideBtton] = useState();
  const [avQtech, setAvQtech] = useState("");
  const [gameId, setGameId] = useState("");
  const [show, setShow] = useState(false);
  const [ruleShow, setRuleShow] = useState(false);
  const [providerList, setProviderList] = useState([]);

  const handleCasino = (id, val, name, gameCode) => {
    setAvQtech(name);
    setActiveClass(id);
    setProviderTags(val);
    if (name === "AVIATOR" || name === "Q Tech") {
      setGameId(gameCode);
      setRuleShow(true);
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    if (state != null) {
      setActiveClass(state?.id);
      setProviderTags(state?.gameId);
    } else {
      setActiveClass(0);
      setProviderTags("YUILD");
    }
  }, [state]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    ref.current.scroll({ left: ref.current.scrollLeft + scrollOffset });
    setscrollX(scrollX + scrollOffset);
  };

  useEffect(() => {
    const hideButton = window.location.pathname?.includes("/m");
    setSetHideBtton(hideButton);
  }, [hideButton]);

  const token = localStorage.getItem("token")

  useEffect(() => {
    if(token !== null){
      CasinoApi.ProvideList({
        gameType: liveCasino,
      }).then((res) => {
        setProviderList(res?.data?.data);
      });
    }
    
  }, [liveCasino, token]);

  return (
    <>
      {showid == 2 && (
        <div className="casino_tabs">
          {hideButton ? (
            ""
          ) : (
            <button onClick={() => scroll(-20)} className="casino_left_tab">
              <MdKeyboardArrowLeft />
            </button>
          )}

          <ul ref={ref}>
            {providerList &&providerList?.map((item, id) => {
              return (
                <>
                  <li
                    className={activeClass == id ? "casino_active" : ""}
                    onClick={() =>
                      handleCasino(
                        id,
                        item?.providerId,
                        item?.providerName,
                        item?.gameCode
                      )
                    }>
                    {item?.providerName}
                  </li>
                </>
              );
            })}
            {/* {liveCasino == "LIVECASINO" &&
              casinoProviderList?.map((item, id) => {
                return (
                  <>
                    <li
                      className={activeClass == id ? "casino_active" : ""}
                      onClick={() =>
                        handleCasino(
                          id,
                          item?.filterType,
                          item?.name,
                          item?.gameCode
                        )
                      }>
                      {item?.name}
                    </li>
                  </>
                );
              })}

            {liveCasino == "SLOT" &&
              slotProviderList?.map((item, id) => {
                return (
                  <li
                    className={activeClass == id ? "casino_active" : ""}
                    onClick={() => handleCasino(id, item?.filterType)}>
                    {item?.name}
                  </li>
                );
              })}

            {liveCasino == "LOTTERY" &&
              Lottry?.map((item, id) => {
                return (
                  <li
                    className={activeClass == id ? "casino_active" : ""}
                    onClick={() => handleCasino(id, item?.filterType)}>
                    {item?.name}
                  </li>
                );
              })} */}
          </ul>
          {hideButton ? (
            ""
          ) : (
            <button onClick={() => scroll(20)} className="casino_left_tab">
              <MdKeyboardArrowRight />
            </button>
          )}
        </div>
      )}

      {showid == 2 && (
        <ProviderTabs
          setProviderFilter={setProviderFilter}
          category={category}
        />
      )}
      <GameList
        ruleShow={ruleShow}
        setRuleShow={setRuleShow}
        show={show}
        setShow={setShow}
        gameId={gameId}
        setGameId={setGameId}
        avQtech={avQtech}
        providerFilter={providerFilter}
        gameLists={gameLists}
      />
    </>
  );
};

export default CasinoTabs;
