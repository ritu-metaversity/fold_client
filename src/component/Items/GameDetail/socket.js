import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://oddsapi.247idhub.com" || "";

export const socket = io(URL);