import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import { gamesActions } from "../store/games";

const Button = styled.button`
  border: 2px solid;
  border-color: ${(props) => props.color || "#000"};
  color: ${(props) => props.color || "#000"};
  height: 35px;
  border-radius: 100px;
  background: #fff;
  padding: 0 25px;
  font-size: 14px;
  font-weight: 600;
  font-style: italic;
  cursor: pointer;
  margin-right: 10px;
`;

const ButtonActive = styled(Button)`
  background: ${(props) => props.color || "#000"};
  color: #fff;
`;

type ButtonProps = {
  color: string;
  text: string;
  onClick: () => void;
};

const GameButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const selectedGame = useSelector((state: RootState) => state.games.selectedGame);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    setIsActive(true)
    dispatch(gamesActions.selectGame(props.text))
    dispatch(gamesActions.clearGame())
  }

  useEffect(() => {
    if (selectedGame.type === props.text) {
      setIsActive(true);
    }
  }, [props.text, selectedGame.type]);

  if(isActive && (selectedGame.type === props.text)){
    return <ButtonActive color={props.color} >{props.text}</ButtonActive>
  }

  return <Button color={props.color} onClick={onClickHandler}>{props.text}</Button>
};

export default GameButton;
