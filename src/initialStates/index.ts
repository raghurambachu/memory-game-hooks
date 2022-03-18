import { IMemoryGameState } from "../interfaces";

export const initialMemoryGameState: IMemoryGameState = {
  moves: 0,
  matches: 0,
  cards: [],
  cardsFlipped: [],
  processing: false,
};
