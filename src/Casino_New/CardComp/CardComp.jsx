import "./card.css";
const CardComp = ({ shown, card }) => {
  return (
    <>
      <div className={`flip-card ${shown}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img className="card_back" src="/img/cardBack.png" alt=""/>
          </div>
          <div className="flip-card-back">
            <img
              className="card_front"
              src={`http://admin.kalyanexch.com/images/cards/${card}.png`} alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComp;
