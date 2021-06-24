import styled from "styled-components";
import Game from "../components/Game";
import { RootState } from "../store/index";
import { useSelector } from "react-redux";
import { ActionButton1 } from "../styles/FormStyledComponents";
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom'
import GameButton from "../components/GameButton";

const Title = styled.h1`
  color: #707070;
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
  margin-right: 45px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

function Home() {
  const games = useSelector((state: RootState) => state.games.games);

  const filterHandler = () =>{

  }

  return (
    <>
      <Nav>
        <Title>Recent Games</Title>
        <Filters>
          <p>Filters</p>
          {games.map((game) => (
            <GameButton text={game.type} onClick={filterHandler} color={game.color} key={game.type}/>
          ))}
        </Filters>
        <ActionButton>
          <Link to="/new-bet">
            New Bet <FiArrowRight />
          </Link>
        </ActionButton>
      </Nav>
      {/* <Game color="#7F3992" /> */}
    </>
  );
}

export default Home;
