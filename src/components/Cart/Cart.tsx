import styled from "styled-components";
import { Card } from "../../styles/FormStyledComponents";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {transformPrice} from "../Game"

const Container = styled(Card)`
  padding: 1rem;
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
  display: flex;
  justify-content: center;
  align-items: inherit;
  flex-direction: column;
  height: inherit;
  margin: 15px 0;
  gap: 10px;
`;

function Cart() {
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);

  const msg = <Title style={{ margin: "auto" }}>Carrinho vazio</Title>;

  return (
    <Container>
      <Title>CART </Title>
      <Body>
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
      </Body>
      <Total>
        <strong>
          <i>CART </i>
        </strong>
        <span>TOTAL: R$ {transformPrice(totalPrice)}</span>
      </Total>
    </Container>
  );
}

export default Cart;
