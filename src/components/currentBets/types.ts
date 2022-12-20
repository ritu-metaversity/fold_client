export interface SearchFiltersCurrentBets {
  category: "sports" | "casino";
  status: "matched" | "deleted";
  type: "all" | "back" | "lay";
  pageSize: number;
  index: number;
  totalPages: number;
}
