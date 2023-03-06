import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./casinoGame.css";
import { useParams } from "react-router-dom";
import HomeLayout from "../../layout/homeLayout";

const CasinoGame = () => {
  const matches = useMediaQuery("(max-width: 580px)");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [height, setHeight] = useState(0);
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

  // const handleResize = () => {
  //   console.log("p1");
  //   if (!contentRef?.current?.contentWindow?.document) return;
  //   const { body, documentElement } =
  //     contentRef?.current?.contentWindow?.document;
  //   console.log("p12");
  //   const contentHeight = Math.max(
  //     body.clientHeight,
  //     body.offsetHeight,
  //     body.scrollHeight,
  //     documentElement.clientHeight,
  //     documentElement.offsetHeight,
  //     documentElement.scrollHeight
  //   );
  //   if (contentHeight !== height) setHeight(contentHeight);
  // };

  // const onLoad = () => {
  //   contentRef?.current?.contentWindow?.addEventListener(
  //     "resize",
  //     handleResize
  //   );
  //   handleResize();
  // };

  // componentWillUnmount() {
  //   this.container.contentWindow.removeEventListener('resize', this.handleResize);
  // }
  const onLoadHandler = (e: any) => {
    // console.log(e.target.contentWindow.document.body, "loaded");
    // const obj = ReactDOM.findDOMNode(this);
    // setHeight(obj.contentWindow.document.body.scrollHeight);
  };
  return (
    <HomeLayout>
      <Box mt={{ lg: 5 }}>
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
              src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
              height="calc(100vh - 100px)"
              className="mobile_if"
              width="100%"
              title="mobile"
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
              onLoad={onLoadHandler}
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
