import { Positions } from "../../types";

export const startSet: Positions = {
    [JSON.stringify(["a", 7])]: {
      type: "rook",
      color: "black",
      id: "rook_black_1",
    },
    [JSON.stringify(["b", 7])]: {
      type: "knight",
      color: "black",
      id: "khight_black_1",
    },
    [JSON.stringify(["f", 7])]: {
      type: "bishop",
      color: "black",
      id: "bishop_black_2",
    },
    [JSON.stringify(["g", 7])]: {
      type: "knight",
      color: "black",
      id: "khight_black_2",
    },
  };