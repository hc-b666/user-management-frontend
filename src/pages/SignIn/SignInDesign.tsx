import { NavLink } from "react-router-dom";
import { Input, RememberMeInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { EmailIconElement, EyeIconElement } from "@/icons/Icons";

interface SignInDesignProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SignInDesign({ handleSubmit }: SignInDesignProps) {
  return (
    <div className="auth-page">
      <p className="text-white absolute bottom-10 left-10">
        Don't have an account?{" "}
        <NavLink to="/auth/register" className="text-blue-500 underline">
          Sign Up
        </NavLink>
      </p>

      <div className="auth-form-wrapper">
        <h4 className="text-lg lg:text-xl font-light">Start your journey</h4>
        <h2 className="text-2xl lg:text-3xl font-bold">Sign In to the Arcane</h2>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            Icon={EmailIconElement}
          />

          <Input
            id="password"
            type="password"
            placeholder="Password"
            Icon={EyeIconElement}
          />

          <RememberMeInput />

          <Button text="Sign In" />
        </form>
      </div>
    </div>
  );
}
