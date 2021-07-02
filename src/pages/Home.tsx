import styled from "styled-components";
import GameTag, { GameProps } from "../components/Game";
import { RootState } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { ActionButton1 } from "../styles/FormStyledComponents";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import GameButton from "../components/GameButton";
import { useEffect, useState } from "react";
import { getGames } from '../store/games'

const Title = styled.h1`
  color: #707070;
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
  margin-right: 45px;
  margin-bottom: 20px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 20px;
  gap: 20px;
  flex: 1;
  align-items: flex-start;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  & p {
    color: #868686;
    font-size: 17px;
    font-style: italic;
    margin-right: 15px;
  }
`;

const ActionButton = styled(ActionButton1)`
  margin: 0;
  & a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
`;

function Home() {
  const { games, selectedGame } = useSelector(
    (state: RootState) => state.games
  );
  const { gamesSaved } = useSelector((state: RootState) => state.cart);
  const [filteredGames, setFilteredGames] = useState<GameProps[]>([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    for (const bet of gamesSaved) {
      setFilteredGames(bet.filter((game) => game.type === selectedGame.type));
    }
  }, [selectedGame, gamesSaved]);

  return (
    <Container>
      <div>
        <Title>Recent Games</Title>
        {filteredGames.map((game) => (
          <div style={{ marginBottom: "10px" }}>
            <GameTag
              date={game.date}
              price={game.price}
              color={game.color}
              key={game.id}
              id={game.id}
              numbers={game.numbers}
              type={game.type}
            />
          </div>
        ))}
      </div>
      <Nav>
        <Filters>
          <p>Filters</p>
          {games.map((game) => (
            <GameButton text={game.type} color={game.color} key={game.type} />
          ))}
        </Filters>
        <ActionButton>
          <Link to="/new-bet">
            New Bet <FiArrowRight />
          </Link>
        </ActionButton>
      </Nav>
    </Container>
  );
}

export default Home;
