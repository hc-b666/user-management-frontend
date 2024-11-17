import { useNavigate } from "react-router-dom";
import { SignUpDesign } from "./SignUpDesign";
import { signUp } from "@/services";

export function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    signUp(data, navigate);
  };

  return <SignUpDesign handleSubmit={handleSubmit} />;
}
