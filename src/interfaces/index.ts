import { TMemoryGameReducerAction } from "../reducer/memoryGameReducer";

export interface ISquare {
  id: number;
  character: string;
  isFlipped: boolean;
  cid: number;
  isMatched: boolean;
}

export interface ICardFlipped {
  id: number;
  cid: number;
}

export interface IMemoryGameState {
  moves: number;
  matches: number;
  cards: ISquare[];
  cardsFlipped: ICardFlipped[];
  processing: boolean;
}

export interface IMessageBannerState {
  type: "success" | "error";
  message: string;
}

export interface IShowCardFunc {
  id: number;
  cid: number;
  memoryGameState: IMemoryGameState;
  memoryGameDispatch: React.Dispatch<TMemoryGameReducerAction>;
}
