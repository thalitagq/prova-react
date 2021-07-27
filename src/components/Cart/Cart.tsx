import styled from "styled-components";
import { Card } from "../../styles/FormStyledComponents";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { cartActions } from '../../store/cart'
import {transformPrice} from "../Game"
import { FiArrowRight } from "react-icons/fi";
import { saveBet } from '../../store/api'

const Container = styled(Card)`
  /* padding: 1rem; */
  height: 100%;
`;

const Title = styled.h1`
  color: #707070;
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
`;

const Total = styled(Title)`
  margin-bottom: 0;
  margin-top: auto;
  font-weight: 300;
  font-style: unset;
`;

const Body = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: inherit;
  flex-direction: column;
  height: inherit;
  margin: 15px 0;
  gap: 10px;
`;

const Footer = styled.div`
  background-color: #f4f4f4;
  height: 95px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  justify-content: center;
`;

const SaveButton = styled.button`
  background: transparent;
  color: #27c383;
  border: 0;
  font-size: 35px;
  font-style: italic;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function Cart() {
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch()
  const msg = <Title style={{ margin: "auto" }}>Carrinho vazio</Title>;

  const saveBetHandler = async() => {
    await dispatch(saveBet())
    dispatch(cartActions.saveGame())
  }

  return (
    <Container>
      <Body>
        <Title>CART </Title>
        {cart.length > 0
          ? cart.map((item) => {
              return (
                <CartItem
                  color={item.color}
                  date={item.date}
                  numbers={item.numbers}
                  price={item.price}
                  type={item.type}
                  key={item.id}
                  id={item.id}
                />
              );
            })
          : msg}
        <Total>
          <strong>
            <i>CART </i>
          </strong>
          <span>TOTAL: R$ {transformPrice(totalPrice)}</span>
        </Total>
      </Body>
      <Footer>
        <SaveButton onClick={saveBetHandler}>
          Save <FiArrowRight />
        </SaveButton>
      </Footer>
    </Container>
  );
}

export default Cart;
