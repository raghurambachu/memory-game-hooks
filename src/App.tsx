import styled from "@emotion/styled";
import { useEffect, useReducer, useState } from "react";
import { appConfig } from "./appConfig";
import LeftSidebar from "./components/LeftSidebar";
import MemoryGame from "./components/MemoryGame";
import RightSidebar from "./components/RightSidebar";
import { useBeforeUnload } from "./hooks";
import { initialMemoryGameState } from "./initialStates";
import { IMessageBannerState, ISquare } from "./interfaces";
import { memoryGameReducer } from "./reducer/memoryGameReducer";
import { generateCardData, randomize } from "./utils";

const { cardsToBeDisplayed } = appConfig;

const Main = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 40rem 1fr 35rem;
  grid-template-areas: "left-sidebar main right-sidebar";
  background-color: var(--light-green);
  .left-sidebar {
    grid-area: left-sidebar;
  }
  .right-sidebar {
    grid-area: right-sidebar;
  }
`;

/*
  1. On left sidebar I have made text justified for making things look consistent, usually we avoid using text-align justify.
  2. Have'nt made it responsive(not asked for)
  3. Have used useReducer, may seem overkill but fell like it would make things more clear.
  
*/

function App() {
  const [messageBannerState, setMessageBannerState] =
    useState<null | IMessageBannerState>(null);
  const [memoryGameState, memoryGameDispatch] = useReducer(
    memoryGameReducer,
    initialMemoryGameState
  );

  // To show message prior to closing the tab accidentially. Custom message not supported for beforeunload event
  useBeforeUnload(
    "Are you sure you want to leave? to prevent accidental page close."
  );

  useEffect(() => {
    memoryGameDispatch({
      type: "INITIALIZE_CARDS",
      payload: randomize(generateCardData(cardsToBeDisplayed)) as ISquare[],
    });
  }, []);

  useEffect(() => {
    const { cardsFlipped, cards, moves, matches } = memoryGameState;
    let modifiedCardsPostSelection = cards.slice();

    // At a time either two of the cards are flipped or one of the card is flipped or none of them are flipped
    if (cardsFlipped.length === 2) {
      const updatedMovesCount = moves + 1;
      const [firstFlippedCard, secondFlippedCard] = cardsFlipped;
      if (firstFlippedCard.cid === secondFlippedCard.cid) {
        const updatedMatchesCount = matches + 1;
        // update the cards post selection( to show that those cards should be open)
        modifiedCardsPostSelection = modifiedCardsPostSelection.map((card) =>
          card.id === firstFlippedCard.id || card.id === secondFlippedCard.id
            ? { ...card, isFlipped: true, isMatched: true }
            : { ...card }
        );
        memoryGameDispatch({
          type: "UPDATE_MEMORY_GAME_STATE",
          payload: {
            cards: modifiedCardsPostSelection,
            cardsFlipped: [],
            moves: updatedMovesCount,
            processing: false,
            matches: updatedMatchesCount,
          },
        });
      } else {
        setTimeout(() => {
          const updatedMovesCount = moves + 1;
          modifiedCardsPostSelection = modifiedCardsPostSelection.map(
            (card) => {
              if (
                cardsFlipped.some((flippedCard) => flippedCard.id === card.id)
              )
                return { ...card, isFlipped: false, isMatched: false };
              return card;
            }
          );
          memoryGameDispatch({
            type: "UPDATE_MEMORY_GAME_STATE",
            payload: {
              cards: modifiedCardsPostSelection,
              cardsFlipped: [],
              moves: updatedMovesCount,
              processing: false,
              matches,
            },
          });
        }, 1000);
      }
    }
  }, [memoryGameState.cardsFlipped]);

  return (
    <Main>
      <LeftSidebar />
      <MemoryGame
        memoryGameState={memoryGameState}
        memoryGameDispatch={memoryGameDispatch}
      />
      <RightSidebar
        memoryGameState={memoryGameState}
        memoryGameDispatch={memoryGameDispatch}
        messageBannerState={messageBannerState}
        setMessageBannerState={setMessageBannerState}
      />
    </Main>
  );
}

export default App;
