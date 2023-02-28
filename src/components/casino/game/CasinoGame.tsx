import { useMediaQuery } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../../layout/homeLayout";

const CasinoGame = () => {
  const matches = useMediaQuery("(max-width: 580px)");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  console.log(id);
  return (
    <HomeLayout>
      {matches ? (
        <iframe
          src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
          height="1200px"
          width="100%"
          title="desktop"
        ></iframe>
      ) : (
        <iframe
          src={`https://d2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
          height="900px"
          width="100%"
          title="mobile"
        />
      )}
    </HomeLayout>
  );
};

export default CasinoGame;
