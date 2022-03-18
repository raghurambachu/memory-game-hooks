import styled from "@emotion/styled";
import { IMemoryGameState } from "../interfaces";
import { TMemoryGameReducerAction } from "../reducer/memoryGameReducer";
import SquareCard from "./SquareCard";

const MemoryGameWrapper = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  .wrapper-title {
    font-size: 2.4rem;
    text-align: center;
    margin: 5rem 0 6.5rem;
  }
`;

const SquareCardContainer = styled.div`
  user-select: none;
  width: 50rem;
  height: 50rem;
  border-radius: 6px;
  background-color: var(--dark-green);
  color: var(--text-pink);
  display: grid;
  gap: 0.001rem;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-around;
  align-items: center;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  font-size: 1.4rem;
  .footer-link {
    text-decoration: none;
    color: var(--text-green);
  }
`;

interface IMemoryGame {
  memoryGameState: IMemoryGameState;
  memoryGameDispatch: React.Dispatch<TMemoryGameReducerAction>;
}

const MemoryGame = ({ memoryGameState, memoryGameDispatch }: IMemoryGame) => {
  const { cards } = memoryGameState;
  return (
    <MemoryGameWrapper>
      <h2 className="wrapper-title">
        Hi fellas 👋, take the <strong className="strong">Leap</strong> to
        enhance your cognitive skills
      </h2>
      <SquareCardContainer>
        {cards.map((card) => {
          return (
            <SquareCard
              memoryGameState={memoryGameState}
              memoryGameDispatch={memoryGameDispatch}
              key={card.id}
              card={card}
            />
          );
        })}
      </SquareCardContainer>
      <Footer>
        <a
          className="footer-link"
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/raghurambachu/"
        >
          &copy;Raghuram
        </a>
      </Footer>
    </MemoryGameWrapper>
  );
};

export default MemoryGame;
