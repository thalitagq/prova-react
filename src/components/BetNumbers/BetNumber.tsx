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
  background-color: ${(props) => props.color || "#000"};
`;

type BetNumberProps = {
  number: string;
  color: string;
  onClick: () => void
}

const BetNumber: React.FC<BetNumberProps> = (props: BetNumberProps) => {
  const [isActive, setIsActive] = useState(false)
  const {selectedNumbers, selectedGame, isGameCompleted } = useSelector((state: RootState) => state.games)
  const dispatch = useDispatch()

  const onClickNumberHandler = () => {
    if ( selectedNumbers.length ===  selectedGame['max-number'] && !selectedNumbers.includes(props.number)){
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

    console.log('effect number');
    console.log(selectedNumbers.length);
    if (
      (isGameCompleted && !selectedNumbers.includes(props.number)) ||
      selectedNumbers.length === 0
    ) {
      setIsActive(false);
    }
    
    // if (selectedNumbers.length === 0) {
    //   console.log('active false');
      
    //   setIsActive(false);
    // }
    if (selectedNumbers.includes(props.number)) {
      setIsActive(true);
    }
  }, [selectedNumbers, props.number, isGameCompleted]);

  if(isActive)
    return <NumberActive onClick={onClickNumberHandler} color={props.color}>{props.number}</NumberActive>
  return <Number onClick={onClickNumberHandler}>{props.number}</Number>
}

export default BetNumber
