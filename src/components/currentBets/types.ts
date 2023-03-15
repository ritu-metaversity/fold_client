export interface SearchFiltersCurrentBets {
  category: 1 | 2;
  status: "matched" | "deleted";
  type: "all" | "back" | "lay";
  pageSize: number;
  index: number;
  totalPages: number;
}
