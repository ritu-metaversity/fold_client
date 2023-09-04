export interface CurrenciesInterface {
  id: string;
  name: string;
}
export interface ImagesInterface {
  type: string;
  url: string;
}
export interface GameListInterface {
  id: string;
  name: string;
  currencies: CurrenciesInterface[];
  clientTypes: string[];
  images: ImagesInterface[];
  category: string;
}
