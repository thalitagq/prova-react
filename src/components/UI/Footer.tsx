import React from 'react'
import styled from 'styled-components'

const NavFooter = styled.footer`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #ebebeb;
  /* position: sticky; */
  bottom: 0;
`;

const Text = styled.p`
  font-size: 15px;
  color: #707070;
`;

function Footer() {
  return (
    <NavFooter>
      <Text>Copyright 2020 Luby Software</Text>
    </NavFooter>
  );
}

export default React.memo(Footer)
