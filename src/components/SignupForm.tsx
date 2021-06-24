import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {
  Title,
  Card,
  Input,
  ActionButton1,
  ActionButton2,
} from "../styles/FormStyledComponents";

function SignupForm() {
  return (
    <div>
      <Title>Registration</Title>
      <Card>
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <ActionButton1>
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
