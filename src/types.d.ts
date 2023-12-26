type AllocatedCasinoKey =
  | "Aura"
  | "Super Nova"
  | "QTech"
  | "Virtual"
  | "SportBook";

type AllocatedCasino = {
  [x in AllocatedCasinoKey]?: CasinoAllocItem;
};

interface CasinoAllocItem {
  name: string;
  casinoId: number;
  active: boolean;
}
