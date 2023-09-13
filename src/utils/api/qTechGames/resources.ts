import { ApiResource } from "../apiService";
export const qTechGamesResourcs: {
  [x: string]: ApiResource;
} = {
  Q_TECH_AUTH: {
    URL: `${process.env.REACT_APP_Q_TECH_DEMO_URL}/api/qtech/authentication`,
    METHOD: "POST",
  },
  Q_GAME_LISTS: {
    URL: `${process.env.REACT_APP_Q_TECH_DEMO_URL}/api/qtech/gamelist`,
    METHOD: "POST",
  },
  Q_TECH_GAME_LOBBY: {
    URL: `${process.env.REACT_APP_Q_TECH_DEMO_URL}/api/qtech/gamelobby`,
    METHOD: "POST",
  },
  Q_TECH_SINGLE_GAME: {
    URL: `${process.env.REACT_APP_Q_TECH_DEMO_URL}/api/qtech/gamelink`,
    METHOD: "POST",
  },
};
