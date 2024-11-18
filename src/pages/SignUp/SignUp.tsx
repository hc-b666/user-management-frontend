import { useNavigate } from "react-router-dom";
import { SignUpDesign } from "./SignUpDesign";
import { signUp } from "@/services";
import { useLoading } from "@/contexts/LoadingContext";

export function SignUp() {
  const navigate = useNavigate();
  const { dispatch } = useLoading();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    signUp(data, navigate, dispatch);
  };

  return <SignUpDesign handleSubmit={handleSubmit} />;
}
