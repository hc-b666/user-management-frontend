import { useNavigate } from "react-router-dom";
import { SignInDesign } from "./SignInDesign";
import { signIn } from "@/services";
import { useLoading } from "@/contexts/LoadingContext";

export function SignIn() {
  const navigate = useNavigate();
  const { dispatch } = useLoading();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    signIn(data, navigate, dispatch);
  };

  return <SignInDesign handleSubmit={handleSubmit} />;
}
