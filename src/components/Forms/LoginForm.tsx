import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Title,
  Card,
  Input,
  ForgetPasswordLink,
  ActionButton1,
  ActionButton2,
} from "../../styles/FormStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../store/auth'
import { RootState } from "../../store";

function LoginForm() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useHistory()
  const { error } = useSelector((state: RootState) => state.auth);

  const loginHandler = () => {
    const regex = /^[\w+.]+@\w+\.[\w^_]{2,}(?:\.\w{1,2})?$/;
    if (emailRef.current != null && passwordRef.current != null) {
      if(regex.test(emailRef.current.value) && passwordRef?.current.value.length > 3){
        dispatch(
          loginUser({email: emailRef?.current.value, password: passwordRef?.current.value})
        )
        if (error) {
          return alert(error);
        }
        history.push("/");
      }
      else{
        alert('Email ou senha inválidos')
      }
    }
  };

  return (
    <div>
      <Title>Authentication</Title>
      <Card>
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          min={4}
        />
        <ForgetPasswordLink>
          <Link to="/reset-password">I forget my password</Link>
        </ForgetPasswordLink>
        <ActionButton1 onClick={loginHandler}>
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
