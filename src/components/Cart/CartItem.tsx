import Game from "../Game";
import { IoTrashOutline } from "react-icons/io5";
import styled from "styled-components";
import { GameProps } from "../Game";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const Container = styled.div`
  display: flex;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 25px;
  color: #888888;
  margin-right: 15px;
`;

const CartItem: React.FC<GameProps> = (props: GameProps) => {
  const dispatch = useDispatch()
  
  const deleteGameHandler = () => {
    dispatch(cartActions.removeFromCart(props.id));
  }

  return (
    <Container>
      <DeleteButton>
        <IoTrashOutline />
      </DeleteButton>
      <Game
        color={props.color}
        date={props.date}
        numbers={props.numbers}
        price={props.price}
        type={props.type}
        id={props.id}
        key={props.id}
      />
    </Container>
  );
};

export default CartItem;
