import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom"
import {
  Title,
  Card,
  Input,
  ForgetPasswordLink,
  ActionButton1,
  ActionButton2,
} from "../styles/FormStyledComponents";


function LoginForm() {
  return (
    <div>
      <Title>Authentication</Title>
      <Card>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <ForgetPasswordLink>
          <Link to="/reset-password">I forget my password</Link>
        </ForgetPasswordLink>
        <ActionButton1>
          Log in <FiArrowRight />
        </ActionButton1>
      </Card>
      <ActionButton2>
        <Link to="/signup">
          Sing up <FiArrowRight />
        </Link>
      </ActionButton2>
    </div>
  );
}

export default LoginForm;
