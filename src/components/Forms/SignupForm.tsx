import { Link, useHistory } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {
  Title,
  Card,
  Input,
  ActionButton1,
  ActionButton2,
} from "../../styles/FormStyledComponents";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { signupUser } from '../../store/auth'
import styled from "styled-components";

const ButtonRegister = styled(ActionButton1)`
  margin-top: 10px;
  margin-bottom: 10px;
`

function SignupForm() {
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const history = useHistory();  
  const { error } = useSelector((state: RootState) => state.auth)

  const signupHandler = () => {
    const regex = /^[\w+.]+@\w+\.[\w^_]{2,}(?:\.\w{1,2})?$/;


    if (
      emailRef.current != null &&
      passwordRef.current != null &&
      nameRef.current != null &&
      passwordConfirmRef.current != null
    ) {
      if (
        regex.test(emailRef.current.value) &&
        passwordRef?.current.value.length > 3 &&
        passwordConfirmRef?.current.value.length > 3 &&
        nameRef.current.value.length > 0
      ) {
        dispatch(
          signupUser({
            username: nameRef?.current.value,
            email: emailRef?.current.value,
            password: passwordRef?.current.value,
            password_confirm: passwordConfirmRef?.current.value,
          })
        );
        if (!error) {
          alert("Cadastro feito com sucesso");
          return history.push("/");
        }
        console.log("ERROR", error);

        return alert(error);
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
        <Input type="password" placeholder="Confirm Password" ref={passwordConfirmRef} />
        <ButtonRegister onClick={signupHandler} >
          Register <FiArrowRight />
        </ButtonRegister>
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
