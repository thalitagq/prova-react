import { useRef } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import {
  Title,
  Card,
  Input,
  ActionButton1,
  ActionButton2,
} from "../../styles/FormStyledComponents";
import { forgotPassword } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/index'

function ResetPasswordForm() {
  const regex = /^[\w+.]+@\w+\.[\w^_]{2,}(?:\.\w{1,2})?$/;
  const emailRef = useRef<HTMLInputElement>(null);
  const history = useHistory()
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth)

  const resetPasswordHandler = async() => {
    if (emailRef.current != null) {
      if (regex.test(emailRef.current.value)) {
        await dispatch(forgotPassword(emailRef.current.value));
        if (!error) {
          return history.push("/new_password");
        }
        return alert(error)
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
