import React from "react";
import styled from "styled-components";

const Numbers = styled.p<{ fontSize?: string }>`
  color: #868686;
  font-size: ${(props) => props.fontSize || "20px"};
  font-weight: 600;
  font-style: italic;
`;

const Container = styled.div`
  display: flex;
  height: 95px;

  &::before {
    content: "";
    display: block;
    min-width: 6px;
    height: inherit;
    border-radius: 6px;
    background: ${(props) => props.color || "#000"};
    margin-right: 15px;
  }
`;

const Info = styled.p<{ fontSize?: string }>`
  color: #868686;
  font-size: ${(props) => props.fontSize || "17px"};
`;

const Wraper = styled.div`
  display: grid;
  align-items: center;
`;

const GameName = styled.div<{ color: string; fontSize?: string }>`
  color: ${(props) => props.color || "#000"};
  font-size: ${(props) => props.fontSize || "20px"};
  font-style: italic;
  font-weight: 600;
`;

export type GameProps = {
  color: string,
  fontSize?: string,
  numbers: string[],
  type: string,
  date: string,
  price: number
  id: number
}

export const transformPrice = (price: number) => {
  return price.toFixed(2).toString().replace(".", ",")
}

const Game: React.FC<GameProps> = (props: GameProps) => {

  return (
    <Container color={props.color}>
      <Wraper>
        <Numbers fontSize={props.fontSize|| undefined}>{props.numbers.join(', ')}</Numbers>
        <Info fontSize={props.fontSize|| undefined}>{props.date} - {`(R$${transformPrice(props.price)})`}</Info>
        <GameName color={props.color} fontSize={props.fontSize || undefined}>
          {props.type}
        </GameName>
      </Wraper>
    </Container>
  );
};

export default Game;
