import { initialMemoryGameState } from "../initialStates";
import { IMemoryGameState, ISquare } from "../interfaces";

type TInitializeCards = {
  type: "INITIALIZE_CARDS";
  payload: ISquare[];
};

type TUpdateMemoryGameState = {
  type: "UPDATE_MEMORY_GAME_STATE";
  payload: IMemoryGameState;
};

export type TMemoryGameReducerAction =
  | TInitializeCards
  | TUpdateMemoryGameState;

// Using a useReducer was an overkill here, but felt of using it rather than using state to keep things organised
export function memoryGameReducer(
  state: IMemoryGameState,
  action: TMemoryGameReducerAction
) {
  switch (action.type) {
    case "INITIALIZE_CARDS": {
      const cards = action.payload;
      return { ...initialMemoryGameState, cards };
    }
    case "UPDATE_MEMORY_GAME_STATE": {
      const updatedState = action.payload;
      return { ...updatedState };
    }
    default:
      return { ...state };
  }
}
