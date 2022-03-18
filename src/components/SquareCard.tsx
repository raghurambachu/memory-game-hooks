import styled from "@emotion/styled";
import { IMemoryGameState, ISquare } from "../interfaces";
import { TMemoryGameReducerAction } from "../reducer/memoryGameReducer";
import { showCard } from "../utils";

interface ISquareCardWrapper {
  hasShadow?: boolean;
}

const SquareCardWrapper = styled.div`
  width: 12.3rem;
  height: 12.3rem;
  background-color: var(--base-green);
  justify-self: center;
  align-self: center;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid var(--dark-green);
  box-shadow: ${({ hasShadow }: ISquareCardWrapper) =>
    hasShadow && "inset 0 4px 8px rgba(var(--border-grey), 0.2);"};
  &.show-character {
    border: 1px solid var(--border-grey);
  }
`;

interface ISquareCard {
  card: ISquare;
  memoryGameState: IMemoryGameState;
  memoryGameDispatch: React.Dispatch<TMemoryGameReducerAction>;
}

const SquareCard = ({
  card,
  memoryGameState,
  memoryGameDispatch,
}: ISquareCard) => {
  const { isFlipped, character, id, cid } = card;
  const { processing, cardsFlipped } = memoryGameState;

  const style = {
    transform: isFlipped ? "perspective(5cm) rotateY(360deg)" : "",
    transition: "transform 200ms ease",
  };

  return isFlipped ? (
    <SquareCardWrapper className="show-character" hasShadow style={style}>
      {character}
    </SquareCardWrapper>
  ) : (
    <SquareCardWrapper
      style={style}
      onClick={() => {
        !processing &&
          cardsFlipped.length < 2 &&
          showCard({ id, cid, memoryGameState, memoryGameDispatch });
      }}
    />
  );
};

export default SquareCard;
