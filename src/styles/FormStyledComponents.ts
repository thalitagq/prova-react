import styled from "styled-components";

export const Title = styled.h1`
  font-size: 35px;
  font-weight: 600;
  color: #707070;
  margin-bottom: 30px;
  text-align: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #dddddd;
  width: 350px;
  height: 335px;
  margin-bottom: 30px;
  box-shadow: 0px 3px 25px #00000014;
`;

export const Input = styled.input`
  border: 0;
  border-bottom: 2px solid #ebebeb;
  height: 70px;
  font-size: 17px;
  font-weight: 600;
  color: #9d9d9d;
  outline: none;
  margin-top: 10px;
  padding: 0 10px;
`;

export const ForgetPasswordLink = styled.div`
  margin-left: auto;
  margin-top: 20px;
  margin-right: 20px;
  
  & a{
    color: #c1c1c1;
    font-size: 17px;
    text-decoration: none;
    font-style: italic;
  }
`;

export const ActionButton1 = styled.button`
  border: 0;
  font-size: 35px;
  font-weight: 600;
  display: flex;
  align-items: center;
  font-style: italic;
  margin: auto;
  background-color: transparent;
  color: #b5c401;
  text-decoration: none;
`;

export const ActionButton2 = styled(ActionButton1)`
  color: #707070;
  & a {
    color: #707070;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
`;


