import { useMediaQuery } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../../layout/homeLayout";

const CasinoGame = () => {
  const matches = useMediaQuery("(max-width: 580px)");
  const { id } = useParams();
  console.log(id);
  return (
    <HomeLayout>
      {matches ? (
        <iframe
          src={
            "https://m2.fawk.app/#/splash-screen/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5nbyIsImV4cCI6MTY3NzU3ODI4MywiaWF0IjoxNjc3NDkxODgzfQ.wKQyFKkCwx59-v-4Mzvdx9DvRqsxXDq-jPrMFu0CK0Y/9482?opentable=" +
            id
          }
          height="1200px"
          width="100%"
        ></iframe>
      ) : (
        <iframe
          src={
            "https://d2.fawk.app/#/splash-screen/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5nbyIsImV4cCI6MTY3NzU3ODI4MywiaWF0IjoxNjc3NDkxODgzfQ.wKQyFKkCwx59-v-4Mzvdx9DvRqsxXDq-jPrMFu0CK0Y/9482?opentable=" +
            id
          }
          height="900px"
          width="100%"
        />
      )}
    </HomeLayout>
  );
};

export default CasinoGame;
