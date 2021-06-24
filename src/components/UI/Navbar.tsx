import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router";
import { useDispatch } from 'react-redux'
import { authActions } from "../../store/auth";
import { cartActions } from '../../store/cart'
import { Route } from 'react-router-dom'
import React from "react";

const Nav = styled.nav`
  height: 75px;
  border-bottom: 2px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.h1`
  color: #707070;
  font-size: 44px;
  display: flex;
  flex-direction: column;
  font-style: italic;
  line-height: 55px;
  margin-bottom: -18px;

  &::after {
    content: "";
    height: 7px;
    background: #b5c401;
    border-radius: 6px;
  }
`;

const ActionButton = styled.a`
  font-size: 20px;
  color: #707070;
  font-style: italic;
  font-weight: 600;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Actions = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionButtonHome = styled(ActionButton)`
  margin-left: 4rem;
`

const WrapTitleAction = styled.div`
  display: flex;

  align-items: center;
`

function Navbar() {
  const history = useHistory()
  const dispatch = useDispatch()

  const clickHomehandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    history.push('/');
  }

  const logoutHandler = () => {
    dispatch(authActions.logout())
    dispatch(cartActions.resetSavedGames())
    history.push('/login')
  }

  return (
    <Nav>
      <WrapTitleAction>
        <Title>TGL</Title>
        <Route path='/new-bet'>
          <ActionButtonHome onClick={clickHomehandler}>Home</ActionButtonHome>
        </Route>
      </WrapTitleAction>
      <Actions>
        <ActionButton>Account</ActionButton>
        <ActionButton onClick={logoutHandler}>
          Sair <FiArrowRight />
        </ActionButton>
      </Actions>
    </Nav>
  );
}

export default Navbar;
