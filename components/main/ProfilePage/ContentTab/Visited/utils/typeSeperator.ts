import { VisitedArray } from "./../../type";
export const typeSeperator = (array: VisitedArray) => {
  return {
    Urban: array.filter((item) => item.type == 0),
    Nature: array.filter((item) => item.type == 1),
    Sea: array.filter((item) => item.type == 2),
    Other: array.filter((item) => item.type == 3),
  };
};
