import { Box, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect } from "react";
import "./casinoGame.css";
import { useNavigate, useParams } from "react-router-dom";
import HomeLayout from "../../layout/homeLayout";
import { UserContext } from "../../../App";

const CasinoGame = () => {
  const matches = useMediaQuery("(max-width: 580px)");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const { isSignedIn } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !isSignedIn || !id) {
      nav("/");
    }
  }, [id, isSignedIn]);

  return (
    <HomeLayout>
      <Box mt={{ lg: 5 }} height="calc(100vh - 110px)">
        {matches ? (
          <>
            {/* <Box
              right={0}
              top={0}
              width={100}
              height={50}
              position="absolute"
              // zIndex={999999 + 1}
              bgcolor="#0f2327"
            ></Box>
            <Box
              left={10}
              top={0}
              width={50}
              // zIndex={999999 + 1}
              height={44}
              position="absolute"
              bgcolor="#0f2327"
            ></Box> */}
            <iframe
              src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
              height="calc(100vh - 100px)"
              className="mobile_if"
              width="100%"
              title="mobile"
              allowFullScreen={true}
              // webkitAllowFullScreen="true"
              // mozAllowFullScreen="true"
              // oAllowFullScreen="true"
              // msAllowFullScreen="true"
            ></iframe>
          </>
        ) : (
          <>
            {/* <Box
            right={5}
            top={95}
            width={340}
            height={70}
            position="absolute"
            bgcolor="#0f2327"
          ></Box> */}
            <iframe
              src={`https://d2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
              // height="calc(90vh - 10rem)"
              // style={{ height: "2000px", marginTop: -80 }}
              className="desktop_if"
              width="100%"
              title="desktop"
            />
          </>
        )}
      </Box>
    </HomeLayout>
  );
};

export default CasinoGame;
