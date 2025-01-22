import React from "react";
import { useParams } from "react-router-dom";

const AuraCasino = () => {
  const token = localStorage.getItem("token");
  const {id} = useParams()
  return (
    <iframe
      src={`https://aura.fawk.app/${token}/9677/${id}`}
      className="desktop_if"
      width="100%"
      title="desktop"
      // onLoad={finishLoading}
    />
  );
};

export default AuraCasino;
