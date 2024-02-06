import CardComp from "../CardComp/CardComp";
import "./resultModalContent.css";

const ResultModalContent= ({ result }) => {
  return (
    <div className="p-3 w-100">
      <div className="w-100 text-end">Round Id: {result.mid.split(".")[1]}</div>
      <div className="w-100 single-card-result-container">
        <CardComp shown={true} card={result.cards} />
      </div>
      <div className="w-100 text-center">
        <span className="text-success">Result: </span>
        {result.desc}
      </div>
    </div>
  );
};

export default ResultModalContent;
