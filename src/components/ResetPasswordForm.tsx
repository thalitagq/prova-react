import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import {
  Title,
  Card,
  Input,
  ActionButton1,
  ActionButton2,
} from "../styles/FormStyledComponents";

function ResetPasswordForm() {
  return (
    <div>
      <Title>Reset Password</Title>
      <Card>
        <Input type="password" placeholder="Password" />
        <ActionButton1>
          Log in <FiArrowRight />
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
