import { ApiResource } from "../apiService";
export const qTechGamesResourcs: {
  [x: string]: ApiResource;
} = {
  Q_TECH_AUTH: {
    URL: `${import.meta.env.VITE_Q_TECH_DEMO_URL}/api/qtech/authentication`,
    METHOD: "POST",
  },
  Q_GAME_LISTS: {
    URL: `${import.meta.env.VITE_Q_TECH_DEMO_URL}/api/qtech/gamelist`,
    METHOD: "POST",
  },
  Q_TECH_GAME_LOBBY: {
    URL: `${import.meta.env.VITE_Q_TECH_DEMO_URL}/api/qtech/gamelobby`,
    METHOD: "POST",
  },
  Q_TECH_SINGLE_GAME: {
    URL: `${import.meta.env.VITE_Q_TECH_DEMO_URL}/api/qtech/gamelink`,
    METHOD: "POST",
  },
  Q_TECH_PROVIDER_LIST: {
    URL: `${import.meta.env.VITE_Q_TECH_DEMO_URL}/api/qtech/provider`,
    METHOD: "POST",
  },
};
