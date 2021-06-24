import { Link, useHistory } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {
  Title,
  Card,
  Input,
  ActionButton1,
  ActionButton2,
} from "../styles/FormStyledComponents";
import { useRef } from "react";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function SignupForm() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const history = useHistory();  

  const signupHandler = () => {
    const regex = /^[\w+.]+@\w+\.[\w^_]{2,}(?:\.\w{1,2})?$/;

    if (emailRef.current != null && passwordRef.current != null && nameRef.current != null) {
      if (
        regex.test(emailRef.current.value) &&
        passwordRef?.current.value.length > 3 &&
        nameRef.current.value.length > 0

      ) {
        dispatch(
          authActions.login({
            email: emailRef?.current.value,
            password: passwordRef?.current.value,
          })
        );
        return history.push("/");
      }
      alert("Dados inválidos");
    }
  };

  return (
    <div>
      <Title>Registration</Title>
      <Card>
        <Input type="text" placeholder="Name" ref={nameRef} />
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
        <ActionButton1 onClick={signupHandler}>
          Register <FiArrowRight />
        </ActionButton1>
      </Card>
      <ActionButton2>
        <Link to="/login">
          <FiArrowLeft /> Back
        </Link>
      </ActionButton2>
    </div>
  );
}

export default SignupForm;
