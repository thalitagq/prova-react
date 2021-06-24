import { useDispatch, useSelector } from "react-redux";
import BetNumbers from "../components/BetNumbers/BetNumbers";
import { RootState } from "../store";
import GameButton from "../components/GameButton";
import { gamesActions } from "../store/games";
import { cartActions } from "../store/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";
import Cart from "../components/Cart/Cart";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  min-height: 100%;
`;

const Title = styled.h1`
  color: #707070;
  font-size: 24px;
  font-style: italic;
  font-weight: 300;
  margin-bottom: 30px;
`;

const Paragraph = styled.p`
  color: #868686;
  font-size: 17px;
  line-height: 22px;
`;

const ActionButtonsGames = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const BetWraper = styled.div`
  max-width: 70%;
`;

const ButtonGameAction = styled.button`
  background: #fff;
  color: #27c383;
  height: 52px;
  border: 1px solid #27c383;
  font-size: 16px;
  border-radius: 10px;
  padding: 0 20px;
  margin-right: 25px;
  cursor: pointer;
`;

const AddButton = styled(ButtonGameAction)`
  background: #27c383;
  color: #fff;
  display: flex;
  align-items: center;
  margin-right: 0 & svg {
    font-size: 25px;
    margin-right: 15px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px
`;

function Bet() {
  const { games, selectedGame, selectedNumbers } = useSelector(
    (state: RootState) => state.games
  );

  const dispatch = useDispatch();

  const clearGameHandler = () => {
    dispatch(gamesActions.clearGame());
  };

  const completeGameHandler = () => {
    dispatch(gamesActions.completeGame());
  };

  const addToCartHandler = () => {
    if (selectedNumbers.length < selectedGame["max-number"]) {
      return alert("Jogo incompleto");
    }
    dispatch(
      cartActions.addToCart({
        id: 0,
        type: selectedGame.type,
        date: new Date().toLocaleDateString(),
        numbers: selectedNumbers,
        price: selectedGame.price,
        color: selectedGame.color,
      })
    );
    dispatch(gamesActions.clearGame());
  };

  return (
    <Container>
      <BetWraper>
        <Title>
          <strong>NEW BET FOR </strong>
          {selectedGame.type}
        </Title>
        <Paragraph style={{ marginBottom: "20px" }}>
          <strong>Choose a game</strong>
        </Paragraph>
        <ActionButtonsGames>
          {games.map((game) => (
            <GameButton color={game.color} key={game.type} text={game.type} />
          ))}
        </ActionButtonsGames>
        <Paragraph style={{ marginBottom: "30px" }}>
          <strong>Fill your bet</strong>
          <br />
          {selectedGame.description}
        </Paragraph>
        <BetNumbers range={selectedGame.range} />
        <Actions>
          <div style={{ display: 'flex', gap: "5px", flexWrap: 'wrap' }}>
            <ButtonGameAction onClick={completeGameHandler}>
              Complete Game
            </ButtonGameAction>
            <ButtonGameAction onClick={clearGameHandler}>
              Clear Game
            </ButtonGameAction>
          </div>
          <AddButton onClick={addToCartHandler}>
            <AiOutlineShoppingCart /> Add to cart
          </AddButton>
        </Actions>
      </BetWraper>
      <Cart />
    </Container>
  );
}

export default Bet;
