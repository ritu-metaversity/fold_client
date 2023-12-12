import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import NewLunch from "../Newlunch/NewLunch";
import SuperNowa from "./SuperNowa";


const IndianCasinoTabs = () => {
  const [activeClass, setActiveClass] = useState(0);
  const [providerFilter, setProviderFilter] = useState("SPB");
  const [scrollX, setscrollX] = useState(0);
  const [hideButton, setSetHideBtton] = useState();

  const handleCasino = (id, val) => {
    setActiveClass(id);
    setProviderFilter(val);
  };

  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    ref.current.scroll({left:ref.current.scrollLeft + scrollOffset })
    setscrollX(scrollX + scrollOffset);
  };

const indianCasino = ["Aura", "Super Nowa"]

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
          {
            indianCasino?.map((item, id) => {
              return (
                <>
                  <li
                    className={activeClass == id ? "casino_active" : ""}
                    onClick={() => handleCasino(id, item?.filterType)}>
                    {item}
                  </li>
                </>
              );
            })}
          
        </ul>
        {
            hideButton ?"":  <button onClick={() => scroll(20)} className="casino_left_tab">
            <MdKeyboardArrowRight />
          </button>
        }
      </div>
    <SuperNowa/>

    </>
  );
};

export default IndianCasinoTabs;
