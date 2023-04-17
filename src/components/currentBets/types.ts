export interface SearchFiltersCurrentBets extends FilterCurrentBets {
  pageSize: number;
  index: number;
  totalPages: number;
}

export interface FilterCurrentBets {
  category: 1 | 2;
  status: "matched" | "deleted";
  type: "all" | "back" | "lay";
}
