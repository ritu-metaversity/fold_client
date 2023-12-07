export interface ProviderObject {
  name: string;
  logo: string;
  gameCode: string;
  gameCodeName?: string;
  filter: string;
  PageUrl: string;
}

export type key =
  | "Indian Casino"
  | "Internation Casino"
  | "Fantasy Games"
  | "Slot Games"
  | "Lottery";

export type AllCasinoProviderNameType = {
  [x in key]: ProviderObject[];
};
export const AllCasinoProviderName: AllCasinoProviderNameType = {
  "Indian Casino": [
    {
      name: "Super nowa",
      logo: "https://supernovagamesstudios.com/wp-content/uploads/2021/06/suxnova.png",
      gameCode: "NOWA",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "Aura",
      logo: "https://auragaming.org/images/supercleanaura%20white.png?crc=7159781",
      gameCode: "AURA",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
  ],
  "Internation Casino": [
    {
      name: "EVOLUTION",
      logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/5.png",
      gameCodeName: "EVO-dhp",
      gameCode: "EVO",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "VIVO GAMING",
      logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/21.png",
      gameCodeName: "VGL-bulgariaroulette",
      gameCode: "VGL",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "EZUGI",
      logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/1.png",
      gameCodeName: "EZU-32cards",
      gameCode: "EZU",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    // {
    //   name: "BGAMING",
    //   logo: "https://global-uploads.webflow.com/63b2c230b49fa188ad86ffec/63f4c9689497e0d7c32f4a31_BGaming_logo.svg",
    //   gameCode: "Qtech",
    //   gameCode: "BGM",
    // },
    {
      name: "SKY WIND",
      logo: "https://skywindgroup.com/assets/site/images/skywind_white.svg",
      gameCodeName: "SWL-atomroulette",
      gameCode: "SWL",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "SA GAMING",
      logo: "https://www.sagaming.com/img/logo.png",
      gameCodeName: "SAG-lobby",
      gameCode: "SAG",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "PRAGMATIC PLAY",
      logo: "https://www.pragmaticplay.com/wp-content/themes/gp-theme-basic/libs/dist/images/PP-white-logo.svg",
      gameCodeName: "PPL-livecasinolobby",
      gameCode: "PPL",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "BETTER LIVE",
      logo: "https://live.beter.co/wp-content/themes/artit/assets/images/logo.svg",
      gameCodeName: "BTL-lobby",
      gameCode: "BTL",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "BET GAMES",
      logo: "https://www.betgames.tv/api/uploads/BG_Logo_White_Horizontal_Lock_Up_dcca475d41.png",
      gameCodeName: "BTV-lobby",
      gameCode: "BTV",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "AVIATOR",
      logo: "https://sitethemedata.com/casino_icons/fantasy/aviator.png",
      gameCodeName: "SPB-aviator",
      gameCode: "SPB",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
    {
      name: "Q Tech",
      logo: "/assets/img/qtech.png",
      gameCode: "QTech-Lobby",
      PageUrl: "/casino",
      filter: "LIVECASINO",
    },
  ],
  "Fantasy Games": [
    {
      name: "Aviator",
      logo: "https://sitethemedata.com/casino_icons/fantasy/aviator.png",
      gameCode: "SPB",
      PageUrl: "/fantasy",
      filter: "FANTASY",
    },
    {
      name: "Relex",
      logo: "https://cf-cdn.relax-gaming.com/static/img/logo.svg",
      gameCode: "RLX",
      PageUrl: "/fantasy",
      filter: "FANTASY",
    },
    {
      name: "Thunder Kick",
      logo: "https://www.thunderkick.com/wp-content/uploads/2021/04/thunderkick-logo-horizontal-white.svg",
      gameCode: "TK",
      PageUrl: "/fantasy",
      filter: "FANTASY",
    },
    {
      name: "Nolimit City",
      logo: "https://www.nolimitcity.com/img/site-img/nolimit-city.png",
      gameCode: "NLC",
      PageUrl: "/fantasy",
      filter: "FANTASY",
    },
  ],
  "Slot Games": [
    {
      name: "YUILD",
      logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/1.png",
      gameCode: "YGG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "1X2 GAMING",
      logo: "https://www.1x2gaming.com/img/logo@2x.png",
      gameCode: "1x2",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "AVATAR UX",
      logo: "https://avatarux.com/wp-content/uploads/2021/06/AUX-logo.svg",
      gameCode: "AUX",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "BIG TIME",
      logo: "https://images.squarespace-cdn.com/content/v1/60aedd95a74c4c4033f9d064/1623895434956-BV0PANOPBDWZ2FMFV53V/BTG_Logo_White.png?format=1500w",
      gameCode: "BTG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "BLUE PRINT",
      logo: "https://blueprintgaming.com/wp-content/uploads/2017/07/web-logo.png",
      gameCode: "BPG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "BOOONGO",
      logo: "https://bng.games/static/img/logo_full.svg",
      gameCode: "BNG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "CQ9",
      logo: "https://www.cq9gaming.com/eng/html/img/layout/LOGO.png",
      gameCode: "CQC",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "DRAGOON SOFT",
      logo: "https://www.dragoonsoft.com/img/ds_header_logo.31834161.png",
      gameCode: "DS",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "ELK GAMING",
      logo: "https://www.elk-studios.com/app/themes/elkstudios/assets/img/logo-new.svg",
      gameCode: "ELK",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "EVOPLAY",
      logo: "https://evoplay.games/wp-content/themes/evoplay/assets/img/logo.svg",
      gameCode: "EVP",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "FANTASMA",
      logo: "https://www.fantasmagames.com/wp-content/uploads/2020/05/Fantasma_logo_Vector.png",
      gameCode: "FNG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "FUGASO",
      logo: "https://fugaso.com/images/logo.svg",
      gameCode: "FUG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "GAMEART",
      logo: "https://gameart.net/wp-content/uploads/2022/12/prikazna_YS_web.jpg",
      gameCode: "GA",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      name: "GAME FISH",
      logo: "https://nuxgame.com/img/logo_Nuxgame_2023.webp",
      gameCode: "GFG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      logo: "https://www.yggdrasilgaming.com/w/files/2022/02/logo-header.svg",
      name: "YGGDRASIL",
      gameCode: "YGG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      logo: "https://www.woohoogames.com/themes/woohoo/images/logo.svg",
      name: "WOOHOO",
      gameCode: "WOO",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      logo: "https://www.triple-pg.com/wp-content/uploads/2023/05/logo-wh.svg",
      name: "TRIPLE",
      gameCode: "TPG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      logo: "https://www.thunderkick.com/wp-content/uploads/2021/04/thunderkick-logo-horizontal-white.svg",
      name: "THUNDER",
      gameCode: "TPG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    // {
    //   logo: "https://www.thunderkick.com/wp-content/uploads/2021/04/thunderkick-logo-horizontal-white.svg",
    //   name: "Splitrock Gaming",
    //   gameCode: "TPG",
    // PageUrl: "/slot"
    // },
    // {
    //   logo: "https://wazdan.com/wp-content/themes/wazdan/assets/images/logo.svg",
    //   name: "WAZDAN",
    //   gameCode: "WAZ",
    // PageUrl: "/slot"
    // },
    {
      logo: "https://www.gamblerspick.com/uploads/set_resources_3/84c1e40ea0e759e3f1505eb1788ddf3c_logo.png",
      name: "SPLITROCK",
      gameCode: "SPR",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://spearheadstudios.com/wp-content/themes/spearheadstudios/assets/img/logo.svg?v=1",
      name: "SPEAR HEAD",
      gameCode: "SHS",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://slotmill.com/wp-content/themes/slotmill-v2/assets/img/slotmill-logo-header.svg",
      name: "SLOT MILL",
      gameCode: "SM",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://www.skywindgroup.com/assets/site/images/skywind_white.svg",
      name: "SKYWIND",
      gameCode: "SWC",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://revolvergaming.com/wp-content/themes/RevolverGames/images/logo-middle.png",
      name: "REVOLVER",
      gameCode: "RG",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://www.reloadedgaming.com/rel-230217/images/logo2.png",
      name: "RELOADED",
      gameCode: "RLG",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://cf-cdn.relax-gaming.com/static/img/logo.svg",
      name: "RELAX",
      gameCode: "RLX",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://uploads-ssl.webflow.com/5ad9ea8824e99a21e272dacd/5ae73184a9e2a25942fb74a1_Tiger.svg",
      name: "RED TIGER",
      gameCode: "RED",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://rtgslots.com/wp-content/uploads/2020/09/RTG-SLOTS-logo.png",
      name: "RTG SLOT",
      gameCode: "RTG",
      PageUrl: "/slot",

      filter: "SLOT",
    },
    {
      logo: "https://quickspin.com/wp-content/themes/quickspin/img/quickspin-logo.svg",
      name: "QUICK SPIN",
      gameCode: "QS",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      logo: "https://www.pushgaming.com/i/logo-v2-light.png",
      name: "PUSH",
      gameCode: "PUG",
      PageUrl: "/slot",
      filter: "SLOT",
    },
    {
      logo: "https://www.pragmaticplay.com/wp-content/themes/gp-theme-basic/libs/dist/images/PP-white-logo.svg",
      name: "PRAGMATIC",
      gameCode: "PPC",
      PageUrl: "/slot",
      filter: "SLOT",
    },
  ],
  Lottery: [
    {
      name: "BET GAMES",
      logo: "https://www.betgames.tv/api/uploads/BG_Logo_White_Horizontal_Lock_Up_dcca475d41.png",
      gameCode: "BTV",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "EVOLUTION",
      logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/5.png",
      gameCode: "EVO",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "EVOPLAY",
      logo: "https://evoplay.games/wp-content/themes/evoplay/assets/img/logo.svg",
      gameCode: "EVP",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "GALAXSYS",
      logo: "https://galaxsys.co/wp-content/uploads/2022/02/Galaxsys.svg",
      gameCode: "GLX",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "PLAY GO",
      logo: "https://static.wixstatic.com/media/dad1c6_ef8a09e283c54aa9863a02228afb9852~mv2.png/v1/fill/w_272,h_74,al_c,q_95,enc_auto/playngo_logo_on_black.png",
      gameCode: "PNG",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "S4",
      logo: "https://media.licdn.com/dms/image/C4E0BAQGMnMvRWUcOsA/company-logo_200_200/0/1519900555706?e=1703116800&v=beta&t=ezkTp_NYg2wcB5L2JADuOxm2SyH77pKxl6aYnJ0Vuzs",
      gameCode: "S4G",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "SPEARHEAD",
      logo: "https://spearheadstudios.com/wp-content/themes/spearheadstudios/assets/img/logo.svg?v=1",
      gameCode: "SHS",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "SPRIBE",
      logo: "https://spribe.co/spribe-logo.b13289b5f5fab437.svg",
      gameCode: "SPB",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "TRIPLE",
      logo: "https://www.triple-pg.com/wp-content/uploads/2023/05/logo-wh.svg",
      gameCode: "TPG",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "KIRON",
      logo: "https://kironinteractive.com/wp-content/uploads/2022/03/Kiron-Logo-Flat-white.png",
      gameCode: "KIR",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    {
      name: "TURBO",
      logo: "https://turbogames.io/images/home/home-logo.png",
      gameCode: "TRB",
      PageUrl: "/lottery",
      filter: "LOTTERY",
    },
    // {
    //   logo: "https://wazdan.com/wp-content/themes/wazdan/assets/images/logo.svg",
    //   name: "WAZDAN",
    //   gameCode: "WAZ",
    // },
  ],
};
