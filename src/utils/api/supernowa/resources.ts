import { ApiResource } from "../apiService";
export const supernowaResourcs: {
  [x: string]: ApiResource;
} = {
  GAME_LIST: {
    URL: `${process.env.REACT_APP_SUPER_NOWA_URL}/api/supernowa/game-list`,
    METHOD: "POST",
  },
  AUTH: {
    URL: `${process.env.REACT_APP_SUPER_NOWA_URL}/api/supernowa/v1/authentication`,
    METHOD: "POST",
  },
};
