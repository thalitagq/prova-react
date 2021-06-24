import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { gamesActions } from '../../store/games'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';

const Number = styled.button`
  background-color: #adc0c4;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  border: 0;
  border-radius: 50%;
  width: 63px;
  height: 63px;
  cursor: pointer;
`;

const NumberActive = styled(Number)`
  filter: brightness(80%);
`;

type BetNumberProps = {
  number: string;
  onClick: () => void
}

const BetNumber: React.FC<BetNumberProps> = (props: BetNumberProps) => {
  const [isActive, setIsActive] = useState(false)
  const {selectedNumbers, selectedGame } = useSelector((state: RootState) => state.games)
  const dispatch = useDispatch()

  const onClickNumberHandler = () => {
    if ( selectedNumbers.length ===  selectedGame['max-number']){
      return
    }

    if(isActive){
      dispatch(gamesActions.removeNumber(props.number))
    }
    else{
      dispatch(gamesActions.addNumber(props.number));
    }
    setIsActive(prevState => !prevState)
  }

  useEffect(() => {

    if (selectedNumbers.length === 0) {
      setIsActive(false);
    }
    if (selectedNumbers.includes(props.number)) {
      setIsActive(true);
    }
  }, [selectedNumbers, props.number]);

  if(isActive)
    return <NumberActive onClick={onClickNumberHandler}>{props.number}</NumberActive>
  return <Number onClick={onClickNumberHandler}>{props.number}</Number>
}

export default BetNumber
