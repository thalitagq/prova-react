import React from "react";
import styled from "styled-components";

const TopTitle = styled.h1`
  background: transparent;
  color: #707070;
  text-align: center;
  font-size: 65px;
  font-weight: 600;
  max-width: 245px;
  margin-bottom: 30px;
`;

const StyledParagraph = styled.p`
  background-color: #b5c401;
  color: #fff;
  font-size: 22px;
  border-radius: 100px;
  font-weight: 600;
  width: 145px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 30px;
`;

const BottomTitle = styled(TopTitle)`
  font-size: 83px;
  max-width: 380px;
`;

const WrapTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function AppDescription() {
  
  return (
    <WrapTitle>
      <TopTitle>The Greatest App</TopTitle>
      <StyledParagraph>for</StyledParagraph>
      <BottomTitle>LOTTERY</BottomTitle>
    </WrapTitle>
  );
}

export default React.memo(AppDescription)
