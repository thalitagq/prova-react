import { useRef } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import {
  Title,
  Card,
  Input,
  ActionButton1,
  ActionButton2,
} from "../styles/FormStyledComponents";

function ResetPasswordForm() {
  const regex = /^[\w+.]+@\w+\.[\w^_]{2,}(?:\.\w{1,2})?$/;
  const emailRef = useRef<HTMLInputElement>(null);
  const history = useHistory()

  const resetPasswordHandler = () => {
    if (emailRef.current != null) {
      if (regex.test(emailRef.current.value)) {
        return history.push("/login");
      }
      alert("Email inválido");
    }
  }

  return (
    <div>
      <Title>Reset Password</Title>
      <Card>
        <Input type="email" placeholder="Email" ref={emailRef}/>
        <ActionButton1 onClick={resetPasswordHandler}>
          Send link <FiArrowRight />
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

export default ResetPasswordForm;
