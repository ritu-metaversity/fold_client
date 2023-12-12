import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../utils/socket/socket";

const Socket = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const eventId = searchParams.get("match-id");
  useEffect(() => {
    socket.on("OddsUpdated", (...args) => {
      console.log(args, "sockcet");
    });

    socket.emit("JoinRoom", {
      eventId,
    });
  }, []);

  return <div>Socket</div>;
};

export default Socket;
