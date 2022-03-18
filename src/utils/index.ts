import { IShowCardFunc, ISquare } from "../interfaces";

export function randomize(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function generateCardData(squareCount: number = 16): ISquare[] {
  let generatedSquares = [];
  let cidStart = 100;
  const baseCharacterCode = "A".charCodeAt(0);
  for (let i = 0; i < squareCount; i++) {
    const square: ISquare = {
      id: i,
      character: String.fromCharCode(baseCharacterCode + Math.floor(i / 2)),
      isFlipped: false,
      cid: cidStart + Math.floor(i / 2),
      isMatched: false,
    };
    generatedSquares.push(square);
  }
  return generatedSquares;
}

export function showCard({
  id,
  cid,
  memoryGameState,
  memoryGameDispatch,
}: IShowCardFunc) {
  const { cards, cardsFlipped } = memoryGameState;
  const updatedCardsFlipped = [...cardsFlipped, { id, cid }];
  const modifiedCardsPostSelection = cards.map((card) =>
    card.id === id ? { ...card, isFlipped: true } : { ...card }
  );
  const processing = cardsFlipped.length === 2 ? true : false;
  memoryGameDispatch({
    type: "UPDATE_MEMORY_GAME_STATE",
    payload: {
      ...memoryGameState,
      cards: modifiedCardsPostSelection,
      cardsFlipped: updatedCardsFlipped,
      processing,
    },
  });
}
