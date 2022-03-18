import styled from "@emotion/styled";
import { IMemoryGameState, IMessageBannerState, ISquare } from "../interfaces";
import reset from "../assets/images/reset.svg";
import { TMemoryGameReducerAction } from "../reducer/memoryGameReducer";
import { generateCardData, randomize } from "../utils";
import { useEffect } from "react";
import MessageBanner from "./MessageBanner";
import { appConfig } from "../appConfig";

const {
  cardsToBeDisplayed,
  uiLabels: {
    common: {
      messageBannerMessages: {
        allCardsFlipped,
        allCardsFlippedInLeastMoves,
        resetState,
      },
    },
  },
} = appConfig;

const RightSidebarWrapper = styled.aside`
  margin-top: 12rem;
  padding: 2rem 4.5rem 2rem 0;
  .score-board {
    border: 1px solid var(--light-border-grey);
    border-radius: 0.5rem;
    background: var(--base-white);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    .score-board-title {
      font-size: 1.4rem;
      font-weight: 700;
      padding: 1rem;
      border-bottom: 1px solid var(--light-border-grey);
    }
    .user-icon {
      font-size: 1.9rem;
    }
    .row {
      display: flex;
      border-bottom: 1px solid var(--light-border-grey);
      &:last-of-type {
        border-bottom: 0;
      }
    }
    .column {
      width: 33.3%;
      border-right: 1px solid var(--light-border-grey);
      padding: 1rem;
      text-align: center;
      font-weight: 600;
      font-size: 1.3rem;
      &:nth-of-type(3) {
        border-right: 0;
      }

      &.first-field {
        text-align: left;
      }
    }
  }
  .reset {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    & > img {
      width: 5rem;
      height: 5rem;
      cursor: pointer;
      transition: opacity 0.2s ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

interface IRightSidebar {
  memoryGameState: IMemoryGameState;
  memoryGameDispatch: React.Dispatch<TMemoryGameReducerAction>;
  messageBannerState: IMessageBannerState | null;
  setMessageBannerState: React.Dispatch<
    React.SetStateAction<IMessageBannerState | null>
  >;
}

const RightSidebar = ({
  memoryGameState,
  memoryGameDispatch,
  messageBannerState,
  setMessageBannerState,
}: IRightSidebar) => {
  const { moves, matches } = memoryGameState;

  // For changing the message banner state and displaying info to the user.
  useEffect(() => {
    if (matches === 8 && moves === 8) {
      setMessageBannerState({
        type: "success",
        message: allCardsFlippedInLeastMoves,
      });
    } else if (matches === 8) {
      setMessageBannerState({
        type: "success",
        message: allCardsFlipped,
      });
    } else if (moves !== 0) {
      // This is to ensure that when the things are resetted, reset message is not lost due to state update
      setMessageBannerState(null);
    }
  }, [moves, matches]);

  return (
    <RightSidebarWrapper className="right-sidebar">
      <div className="score-board">
        <h3 className="score-board-title">
          Scoreboard <span className="user-icon">🙋‍♀️</span>
        </h3>
        <div className="score-board-info row">
          <div className="column first-field">Score info</div>
          <div className="column">Moves</div>
          <div className="column">Matches</div>
        </div>
        <div className="row">
          <div className="column first-field">Howdy, User</div>
          <div className="column">{moves}</div>
          <div className="column">{matches}</div>
        </div>
      </div>
      <div className="reset">
        <img
          onClick={() => {
            memoryGameDispatch({
              type: "INITIALIZE_CARDS",
              payload: randomize(
                generateCardData(cardsToBeDisplayed)
              ) as ISquare[],
            });
            setMessageBannerState({
              type: "success",
              message: resetState,
            });
          }}
          src={reset}
          alt="Reset"
        />
      </div>

      {messageBannerState && (
        <MessageBanner messageBannerState={messageBannerState} />
      )}
    </RightSidebarWrapper>
  );
};

export default RightSidebar;
