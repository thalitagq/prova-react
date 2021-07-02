import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Title,
  Card,
  Input,
  ActionButton1,
  ActionButton2,
} from "../../styles/FormStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { newPassword } from "../../store/auth";
import { RootState } from "../../store";

function NewPasswordForm() {
  const dispatch = useDispatch();
  const passworConfirmRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { error } = useSelector((state: RootState) => state.auth);

  const saveHandler = async() => {
    if (passwordRef.current != null && passworConfirmRef.current != null) {
      if (
        passwordRef?.current.value.length > 3 &&
        passworConfirmRef?.current.value.length > 3
      ) {
        await dispatch(
          newPassword({
            password: passwordRef?.current.value,
            password_confirmation: passworConfirmRef?.current.value,
          })
        );
        if (!error) {
          alert('Senha alterada com sucesso')
          return history.push("/");
        }
        return alert(error);
      }
      alert("Senha inválida");
    }
  };

  return (
    <div>
      <Title>New Password</Title>
      <Card>
        <Input type="password" placeholder="Password" ref={passwordRef} />
        <Input
          type="password"
          placeholder="Confirm Password"
          ref={passworConfirmRef}
        />
        <ActionButton1 onClick={saveHandler}>
          Save <FiArrowRight />
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

export default NewPasswordForm;
