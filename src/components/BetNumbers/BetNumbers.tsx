import React from "react";
import styled from "styled-components";
import BetNumber from "./BetNumber";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 45px;
`;

const BetNumbers: React.FC<{ range: number }> = (props) => {
  const numbers = [];

  const onClickNumberHandler = () => {};

  for (let index = 1; index <= props.range; index++) {
    numbers.push(<BetNumber number={index.toString()} onClick={onClickNumberHandler} key={index}/>);
  }

  return <Container>{numbers}</Container>;
};

export default BetNumbers;
