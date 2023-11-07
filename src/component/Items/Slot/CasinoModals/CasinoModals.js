import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../../apis/gameAPI";

const CasinoModals = ({type}) => {
    const [singleUserValue, setSingleUserValue] = useState();
    const [nowaValue, setNowaValue] = useState();
    const [liveCasino, setLiveCasino] = useState();
// console.log(type,"jkhghfv");
    useEffect(()=>{
        GameAPI.SINGLE_USER_VALUE().then((res)=>{
          console.log(res?.data[type],type, "dsfsfdsf")
          setSingleUserValue(res?.data[type])
          // setNowaValue(res?.data?.supernowa);
          // setLiveCasino(res?.data?.qtech);
        })
    }, [])

    console.log(nowaValue, "sdassd")

  return (
    <>
      <div className="main_casino_modals">
        <div className="casino_images_modals">
          <img src="/images/casino.png" alt="" />
        </div>
        <div className="casino_message">
          <p className="please_note">Please Note</p>
          {/* <p className="points">(1 Points = ₹{type === 1? singleUserValue : type === 2? liveCasino : nowaValue})</p> */}
          <p className="points">(1 Points = ₹{singleUserValue})</p>

          <div className="casino_dis">
            <p>
              <span>For Example:</span> If you place ₹100 your bet will be ₹
              {100 * singleUserValue} Win or Loss according to the above
              calculation.
            </p>
            <p>
            यदि आप ₹100 लगाते हैं तो उपरोक्त गणना के अनुसार आपकी शर्त जीत या हार ₹ {100 * singleUserValue} होगी।
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasinoModals;
