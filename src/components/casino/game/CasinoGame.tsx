import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./casinoGame.css";
import { useParams } from "react-router-dom";
import HomeLayout from "../../layout/homeLayout";

const CasinoGame = () => {
  const matches = useMediaQuery("(max-width: 580px)");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const contentRef = useRef<HTMLIFrameElement | null>(null);
  // const mountNode = contentRef?.current;
  // const headNode = contentRef?.current?.contentWindow?.document?.head;

  // useEffect(() => {
  //   if (mountNode) {
  //     console.log("m", mountNode);
  //     mountNode.innerHTML = document?.head?.innerHTML;
  //   }
  // }, [mountNode]);

  // useEffect(() => {
  //   if (
  //     document
  //       ?.querySelector("iframe")
  //       ?.contentWindow?.document?.querySelector(".toggleable-list-title")
  //       ?.style?.color
  //   ) {
  //     document
  //       ?.querySelector("iframe")
  //       ?.contentWindow?.document?.querySelector(
  //         ".toggleable-list-title"
  //       )?.style?.color = "red";
  //   }

  //   return () => {};
  // }, []);

  // console.log(window.frames["desktop_if"]?.contentWindow.document, "if");
  // console.log(id);

  const onLoadHandler = (e: any) => {
    console.log(e, "loaded");
  };
  return (
    <HomeLayout>
      {matches ? (
        <>
          <Box
            right={10}
            top={100}
            width={100}
            height={44}
            position="absolute"
            bgcolor="#0f2327"
          ></Box>
          <Box
            left={10}
            top={100}
            width={50}
            height={44}
            position="absolute"
            bgcolor="#0f2327"
          ></Box>
          <iframe
            ref={contentRef}
            onLoad={onLoadHandler}
            src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
            height="1200px"
            width="100%"
            title="desktop"
            id="desktop_if"
            // contentEditable
          ></iframe>
        </>
      ) : (
        <>
          <Box
            right={5}
            top={95}
            width={340}
            height={70}
            position="absolute"
            bgcolor="#0f2327"
          ></Box>
          <iframe
            ref={contentRef}
            src={`https://d2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
            onLoad={onLoadHandler}
            height="1080px"
            width="100%"
            title="mobile"
            contentEditable
          />
        </>
      )}
    </HomeLayout>
  );
};

export default CasinoGame;
