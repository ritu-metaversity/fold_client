import { PROVIDERS_NAME } from "../../../utils/helper";

export const gamesProviders: {
  name: string;
  para: string;
  bg: string;
  url: string;
  prefix: string;
}[] = [
  {
    name: "Q tech games",
    para: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
    dolores ea sapiente eveniet? Nam inventore`,
    bg: "https://wallpapercave.com/wp/wp6481953.jpg",
    url: PROVIDERS_NAME.Q_TECH_GAMES,
    prefix: "/provider",
  },
  {
    bg: "https://wallpapercave.com/wp/wp4813399.jpg",
    name: "Q tech games lobby",
    para: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
    dolores ea sapiente eveniet? Nam inventore`,
    url: "/q-tech-games",
    prefix: "",
  },
  {
    name: "Evolution games",
    para: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
    dolores ea sapiente eveniet? Nam inventore`,
    bg: "https://getwallpapers.com/wallpaper/full/e/6/a/79532.jpg",
    url: PROVIDERS_NAME.EVOLUTION,
    prefix: "/provider",
  },
  {
    name: "Yield guild Games",
    para: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
    dolores ea sapiente eveniet? Nam inventore`,
    bg: "https://wallpaperaccess.com/full/774618.jpg",
    url: PROVIDERS_NAME.YIELD_GUILD,
    prefix: "/provider",
  },
];
