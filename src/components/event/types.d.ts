export interface ProfitObjectInterface {
  Odds: { [x: string]: ProfitInterface[] };
  Bookmaker: ProfitInterface[];
  Fancy: ProfitInterface[];
}

export interface CreateProfitProps {
  fancyOdds: any;
  rechange?: boolean;
  pnl: Pnl[] | null;
  betDetails: BetDetailsInterface | null;
  fancyPnl: FancyPnl[] | null;
  setProfits: Dispatch<
    SetStateAction<{
      Odds: ProfitInterface[];
      Bookmaker: ProfitInterface[];
      Fancy: ProfitInterface[];
    }>
  >;
  winnerPnl: PnlObj[] | null;
}

interface BetsInterface {
  [x: string]: {
    nation: string;
    rate: number;
    amount: number;
    priveValue: number;
    marketName: string;
    back: boolean;
  }[];
}

export interface MarketInterface {
  type: string;
  marketId: string;
}
export interface BetDetailsInterface {
  isBack: boolean;
  odds: number;
  stake: number;
  selectionId: number | string;
  marketId: string | number;
  matchId: string;
  marketName?: string;
  placeTime: Date;
  priceValue: number;
  isFancy: boolean;
  name?: string;
  t?: string;
}
export interface FancyOddsInterface {
  mid: string;
  sid: string;
  t: string;
  nation: string;
  b1: number;
  bs1: number;
  l1: number;
  ls1: number;
  gstatus: string;
  maxBetRate: number;
  minBetRate: number;
  betDelay: number;
  maxBet: number;
  minBet: number;
  display_message: string | null;
  ball?: string;
}

export interface ProfitInterface {
  value: number;
  sid?: string | number;
  mid?: string;
  title: string;
}

export interface Pnl {
  marketId: string;
  pnl1: number;
  pnl2: number;
  pnl3: number;
  selection1: string | number;
  selection2: string | number;
  selection3: string | number;
}
export interface FancyPnl {
  marketId: string;
  pnl: number;
}

export interface WinnerPnl {
  selctionId: string;
  liability: number;
}
export interface PnlObj {
  selectionId: string;
  pnl: number;
}