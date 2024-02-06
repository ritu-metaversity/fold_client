import CardComp from "../CardComp/CardComp";
import "./resultModalContent.css";


const ResultModal2CardContent= ({ result }) => {
  return (
    <div className="p-3 w-100">
      <div className="w-100 text-end">Round Id: {result.mid.split(".")[1]}</div>
      <div className="w-100 single-card-result-container gap-2 d-flex p-3 m-3">
        <CardComp shown={true} card={result.cards.split(",")[0]} />
        <CardComp shown={true} card={result.cards.split(",")[1]} />
      </div>
      <div className="w-100 text-center">
        <span className="text-success">Result: </span>
        {result.desc.split("*")[0]}
      </div>{" "}
      <div className="w-100 text-center">
        <span className="text-success">Dragon: </span>
        {result.desc.split("*")[1]}
      </div>
      <div className="w-100 text-center">
        <span className="text-success">Tiger: </span>
        {result.desc.split("*")[2]}
      </div>
    </div>
  );
};

export default ResultModal2CardContent;
