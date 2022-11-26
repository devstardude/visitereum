export type VisitedArray = {
  id: string;
  address: string;
  description: string;
  lattitude: string;
  longitude: string;
  type:string
}[];

export interface Filter {
  name: string;
  active: boolean;
}
