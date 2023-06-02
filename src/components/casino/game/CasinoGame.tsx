import { Box, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./casinoGame.css";
import { useNavigate, useParams } from "react-router-dom";
import HomeLayout from "../../layout/homeLayout";
import { UserContext } from "../../../App";

const CasinoGame = () => {
  const matches = useMediaQuery("(max-width: 580px)");
  const [wait, setWait] = useState(false);
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

  useEffect(() => {
    setWait(true);
    const timer = setTimeout(() => setWait(false), 5);
    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  return (
    <HomeLayout>
      <Box mt={{ lg: 0 }} height="calc(100vh - 110px)">
        {matches ? (
          <>
            <Box
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
            ></Box>
            {id && token && !wait && (
              <iframe
                src="http://teenpati.s3.ap-northeast-1.amazonaws.com/index.html"
                // src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
                height="calc(100vh - 100px)"
                className="mobile_if"
                width="100%"
                title="mobile"
                allowFullScreen={true}
              ></iframe>
            )}
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
              src="http://teenpati.s3.ap-northeast-1.amazonaws.com/index.html"
              // src={`https://d2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
              height="calc(90vh - 10rem)"
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
