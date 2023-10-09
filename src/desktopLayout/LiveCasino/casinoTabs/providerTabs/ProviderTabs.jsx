import React, { useState } from 'react'


const ProviderTabs = ({category, setProviderFilter}) => {
    const [activeClass, setActiveClass] = useState(0)

    const handleCasino = (id, val)=>{
        setActiveClass(id);
        setProviderFilter(val);
    }
  return (
    <>
    <div className="peovider_tabs">
        
        <ul>
          {category?.map((item, id) => {
            return (
              <li
                className={activeClass == id ? "casino_active_provider" : ""}
                onClick={() => handleCasino(id, item)}
                >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  )
}

export default ProviderTabs