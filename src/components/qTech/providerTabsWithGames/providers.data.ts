export interface ProviderInterface {
  name: string;
  logo: string;
  filterType: string;
  customFilter?: boolean;
  games?: { id: string; images: { url: string }[]; name: string }[];
  type?: string;
  apiUrl?: string;
  providerId?: number;
}

export const casinoProviderList: ProviderInterface[] = [
  {
    name: "AURA GAME",
    logo: "https://auragaming.org/images/supercleanaura%20white.png?crc=7159781",
    filterType: "AURA",
    customFilter: true,
    type: "custom",
    apiUrl:
      "https://admin-api-banners-new.s3.ap-south-1.amazonaws.com/wolf.json",
    providerId: 323334,
  },
  {
    name: "Q Tech",
    customFilter: true,
    logo: "https://11bet24.com/static/media/qtechlogo.97b6c0859adf911c43bb.png",
    filterType: "QTech-Lobby",
    type: "custom",
  },
  {
    name: "SUPER NOWA",
    customFilter: true,
    logo: "https://supernovagamesstudios.com/wp-content/uploads/2021/06/suxnova.png",
    filterType: "NOWA",
    type: "custom",
    providerId: 323335,
  },
  {
    name: "EVOLUTION",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/5.png",
    filterType: "EVO",
  },
  {
    name: "VIVO GAMING",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/21.png",
    filterType: "VGL",
  },
  {
    name: "EZUGI",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/1.png",
    filterType: "EZU",
  },
  // {
  //   name: "BGAMING",
  //   logo: "https://global-uploads.webflow.com/63b2c230b49fa188ad86ffec/63f4c9689497e0d7c32f4a31_BGaming_logo.svg",
  //   filterType: "BGM",
  // },
  {
    name: "SKY WIND",
    logo: "https://skywindgroup.com/assets/site/images/skywind_white.svg",
    filterType: "SWL",
  },
  {
    name: "SA GAMING",
    logo: "https://www.sagaming.com/img/logo.png",
    filterType: "SAG",
  },
  {
    name: "PRAGMATIC",
    logo: "https://www.pragmaticplay.com/wp-content/themes/gp-theme-basic/libs/dist/images/PP-white-logo.svg",
    filterType: "PPL",
  },
  {
    name: "BETTER LIVE",
    logo: "https://live.beter.co/wp-content/themes/artit/assets/images/logo.svg",
    filterType: "BTL",
  },
  {
    name: "BET GAMES",
    logo: "https://www.betgames.tv/api/uploads/BG_Logo_White_Horizontal_Lock_Up_dcca475d41.png",
    filterType: "BTV",
  },
  // {
  //   name: " EBET",
  //   logo: "https://ebet.gg/wp-content/uploads/2022/05/EBET-logo.png",
  //   filterType: "EBT",
  // },
  // {
  //   name: "INTERNATIONAL SLASHERS",
  //   logo: "https://www.worldslashercup.ph/wp-content/themes/wsc/assets/images/sc-logo.png",
  //   filterType: "ISC",
  //   customFilter: true,
  //   games: [
  //     {
  //       id: "ISC-cockfighting",
  //       images: [
  //         {
  //           url: "https://images.pexels.com/photos/5303957/pexels-photo-5303957.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //         },
  //         {
  //           url: "https://images.pexels.com/photos/5303957/pexels-photo-5303957.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //         },
  //       ],
  //       name: "cockfighting",
  //     },
  //   ],
  // },
];

export const slotProviderList: ProviderInterface[] = [
  {
    name: "YUILD",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/1.png",
    filterType: "YGG",
  },
  {
    name: "1X2 GAMING",
    logo: "/assets/Icon/slot/1X2.png",
    filterType: "1x2",
  },
  {
    name: "AVATAR UX",
    logo: "https://avatarux.com/wp-content/uploads/2021/06/AUX-logo.svg",
    filterType: "AUX",
  },
  {
    name: "BIG TIME",
    logo: "https://images.squarespace-cdn.com/content/v1/60aedd95a74c4c4033f9d064/1623895434956-BV0PANOPBDWZ2FMFV53V/BTG_Logo_White.png?format=1500w",
    filterType: "BTG",
  },
  {
    name: "BLUE PRINT",
    logo: "https://blueprintgaming.com/wp-content/uploads/2017/07/web-logo.png",
    filterType: "BPG",
  },
  {
    name: "BOOONGO",
    logo: "https://bng.games/static/img/logo_full.svg",
    filterType: "BNG",
  },
  {
    name: "CQ9",
    logo: "https://www.cq9gaming.com/eng/html/img/layout/LOGO.png",
    filterType: "CQC",
  },
  {
    name: "DRAGOON",
    logo: "https://www.dragoonsoft.com/img/ds_header_logo.31834161.png",
    filterType: "DS",
  },
  {
    name: "ELK GAMING",
    logo: "https://www.elk-studios.com/app/themes/elkstudios/assets/img/logo-new.svg",
    filterType: "ELK",
  },
  {
    name: "EVOPLAY",
    logo: "https://evoplay.games/wp-content/themes/evoplay/assets/img/logo.svg",
    filterType: "EVP",
  },
  {
    name: "FANTASMA",
    logo: "https://www.fantasmagames.com/wp-content/uploads/2020/05/Fantasma_logo_Vector.png",
    filterType: "FNG",
  },
  {
    name: "FUGASO",
    logo: "https://fugaso.com/images/logo.svg",
    filterType: "FUG",
  },
  {
    name: "GAMEART",
    logo: "https://gameart.net/wp-content/uploads/2022/12/prikazna_YS_web.jpg",
    filterType: "GA",
  },
  {
    name: "GAME FISH",
    logo: "https://nuxgame.com/img/logo_Nuxgame_2023.webp",
    filterType: "GFG",
  },
  {
    logo: "https://www.yggdrasilgaming.com/w/files/2022/02/logo-header.svg",
    name: "YGGDRASIL",
    filterType: "YGG",
  },
  {
    logo: "https://www.woohoogames.com/themes/woohoo/images/logo.svg",
    name: "WOOHOO",
    filterType: "WOO",
  },
  {
    logo: "https://www.triple-pg.com/wp-content/uploads/2023/05/logo-wh.svg",
    name: "TRIPLE",
    filterType: "TPG",
  },
  {
    logo: "https://www.thunderkick.com/wp-content/uploads/2021/04/thunderkick-logo-horizontal-white.svg",
    name: "THUNDER",
    filterType: "TPG",
  },
  // {
  //   logo: "https://www.thunderkick.com/wp-content/uploads/2021/04/thunderkick-logo-horizontal-white.svg",
  //   name: "Splitrock Gaming",
  //   filterType: "TPG",
  // },
  // {
  //   logo: "https://wazdan.com/wp-content/themes/wazdan/assets/images/logo.svg",
  //   name: "WAZDAN",
  //   filterType: "WAZ",
  // },
  {
    logo: "https://www.gamblerspick.com/uploads/set_resources_3/84c1e40ea0e759e3f1505eb1788ddf3c_logo.png",
    name: "SPLITROCK",
    filterType: "SPR",
  },
  {
    logo: "https://spearheadstudios.com/wp-content/themes/spearheadstudios/assets/img/logo.svg?v=1",
    name: "SPEAR HEAD",
    filterType: "SHS",
  },
  {
    logo: "https://slotmill.com/wp-content/themes/slotmill-v2/assets/img/slotmill-logo-header.svg",
    name: "SLOT MILL",
    filterType: "SM",
  },
  {
    logo: "https://www.skywindgroup.com/assets/site/images/skywind_white.svg",
    name: "SKYWIND",
    filterType: "SWC",
  },
  {
    logo: "https://revolvergaming.com/wp-content/themes/RevolverGames/images/logo-middle.png",
    name: "REVOLVER",
    filterType: "RG",
  },
  {
    logo: "https://www.reloadedgaming.com/rel-230217/images/logo2.png",
    name: "RELOADED",
    filterType: "RLG",
  },
  {
    logo: "https://cf-cdn.relax-gaming.com/static/img/logo.svg",
    name: "RELAX",
    filterType: "RLX",
  },
  {
    logo: "https://uploads-ssl.webflow.com/5ad9ea8824e99a21e272dacd/5ae73184a9e2a25942fb74a1_Tiger.svg",
    name: "RED TIGER",
    filterType: "RED",
  },
  {
    logo: "https://rtgslots.com/wp-content/uploads/2020/09/RTG-SLOTS-logo.png",
    name: "RTG SLOT",
    filterType: "RTG",
  },
  {
    logo: "https://quickspin.com/wp-content/themes/quickspin/img/quickspin-logo.svg",
    name: "QUICK SPIN",
    filterType: "QS",
  },
  {
    logo: "https://www.pushgaming.com/i/logo-v2-light.png",
    name: "PUSH",
    filterType: "PUG",
  },
  {
    logo: "https://www.pragmaticplay.com/wp-content/themes/gp-theme-basic/libs/dist/images/PP-white-logo.svg",
    name: "PRAGMATIC",
    filterType: "PPC",
  },
];

export const lotteryprovidersList: ProviderInterface[] = [
  {
    name: "BET GAMES",
    logo: "https://www.betgames.tv/api/uploads/BG_Logo_White_Horizontal_Lock_Up_dcca475d41.png",
    filterType: "BTV",
  },
  {
    name: "EVOLUTION",
    logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/5.png",
    filterType: "EVO",
  },
  {
    name: "EVOPLAY",
    logo: "https://evoplay.games/wp-content/themes/evoplay/assets/img/logo.svg",
    filterType: "EVP",
  },
  {
    name: "GALAXSYS",
    logo: "https://galaxsys.co/wp-content/uploads/2022/02/Galaxsys.svg",
    filterType: "GLX",
  },
  {
    name: "PLAY GO",
    logo: "https://static.wixstatic.com/media/dad1c6_ef8a09e283c54aa9863a02228afb9852~mv2.png/v1/fill/w_272,h_74,al_c,q_95,enc_auto/playngo_logo_on_black.png",
    filterType: "PNG",
  },
  {
    name: "S4",
    logo: "https://s4game.eu/wp-content/uploads/2019/09/cropped-s4game-log%C3%B3-7.jpg",
    filterType: "S4G",
  },
  {
    name: "SPEARHEAD",
    logo: "https://spearheadstudios.com/wp-content/themes/spearheadstudios/assets/img/logo.svg?v=1",
    filterType: "SHS",
  },
  {
    name: "SPRIBE",
    logo: "https://spribe.co/spribe-logo.b13289b5f5fab437.svg",
    filterType: "SPB",
  },
  {
    name: "TRIPLE",
    logo: "https://www.triple-pg.com/wp-content/uploads/2023/05/logo-wh.svg",
    filterType: "TPG",
  },
  {
    name: "KIRON",
    logo: "https://kironinteractive.com/wp-content/uploads/2022/03/Kiron-Logo-Flat-white.png",
    filterType: "KIR",
  },
  {
    name: "TURBO",
    logo: "https://turbogames.io/images/home/home-logo.png",
    filterType: "TRB",
  },
  // {
  //   logo: "https://wazdan.com/wp-content/themes/wazdan/assets/images/logo.svg",
  //   name: "WAZDAN",
  //   filterType: "WAZ",
  // },
];
