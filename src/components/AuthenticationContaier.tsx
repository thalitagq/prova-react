import React from 'react'
import styled from 'styled-components';
import { Route } from "react-router-dom"
import AppDescription from "./UI/AppDescription";
import LoginForm from './LoginForm'
import ResetPasswordForm from './ResetPasswordForm';
import SingupForm from './SignupForm'

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
  padding: 2rem 1rem;
`;

const AuthenticationContaier: React.FC = (props) => {

  console.log('AUTH');
   
  return (
    <Container>
      <AppDescription />
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/reset-password">
        <ResetPasswordForm />
      </Route>
      <Route path="/signup">
        <SingupForm />
      </Route>
    </Container>
  );
}

export default AuthenticationContaier
