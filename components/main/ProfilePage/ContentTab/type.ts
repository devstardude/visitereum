export type VisitedArray = {
  id: string;
  address: string;
  description: string;
  lattitude: string;
  longitude: string;
  type:number
}[];

export interface Filter {
  name: string;
  active: boolean;
}
