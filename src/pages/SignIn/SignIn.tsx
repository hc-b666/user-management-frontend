import { useNavigate } from "react-router-dom";
import { SignInDesign } from "./SignInDesign";
import { signIn } from "@/services";

export function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    signIn(data, navigate);
  };

  return <SignInDesign handleSubmit={handleSubmit} />;
}
