import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { useHistory } from "react-router";
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

  const clickHomehandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    history.push('/');
  }

  return (
    <Nav>
      <WrapTitleAction>
        <Title>TGL</Title>
        <ActionButtonHome onClick={clickHomehandler}>Home</ActionButtonHome>
      </WrapTitleAction>
      <Actions>
        <ActionButton>Account</ActionButton>
        <ActionButton>
          Sair <FiArrowRight />
        </ActionButton>
      </Actions>
    </Nav>
  );
}

export default Navbar;
