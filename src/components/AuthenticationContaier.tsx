import React from 'react'
import styled from 'styled-components';
import { Route} from "react-router-dom"
import AppDescription from "./UI/AppDescription";
import LoginForm from './Forms/LoginForm'
import ResetPasswordForm from './Forms/ResetPasswordForm';
import SingupForm from './Forms/SignupForm'
import NewPasswordForm from "./Forms/NewPasswordForm";
import Footer from './UI/Footer';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  height: calc(100vh - 80px);
  padding: 2rem 1rem;
`;

const AuthenticationContaier: React.FC = (props) => {
  return (
    <>
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
        <Route path="/new_password">
          <NewPasswordForm />
        </Route>
      </Container>
    <Footer />
    </>
  );
}

export default AuthenticationContaier
