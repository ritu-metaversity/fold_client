import CardComp from "../CardComp/CardComp";

const ResulTModalContent3Card = ({ result }) => {
  const cardArr = result.cards.split(",");
  return (
    <div className="p-3 w-100">
      <div className="w-100 text-end">Round Id: {result.mid.split(".")[1]}</div>
      <div className="d-flex py-4">
        <div className="w-50 three-card-result-container">
          <div className="text-center">Player A</div>
          
          <div className="w-100 three-card-result">
            <CardComp shown={true} card={cardArr[0]} />
            <CardComp shown={true} card={cardArr[2]} />
            <CardComp shown={true} card={cardArr[4]} />
          </div>
          <div>
          {result.win === "1" && (
            <i className="fa fa-trophy trophyIcon" aria-hidden="true"></i>
          )}
          </div>
          
        </div>
        <div className="w-50 three-card-result-container">
          <div className="text-center">Player B</div>
        
          <div className="w-100 three-card-result">
            <CardComp shown={true} card={cardArr[1]} />
            <CardComp shown={true} card={cardArr[3]} />
            <CardComp shown={true} card={cardArr[5]} />
          </div>
          <div>
          {result.win === "2" && (
            <i className="fa fa-trophy trophyIcon" aria-hidden="true"></i>
          )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ResulTModalContent3Card;
