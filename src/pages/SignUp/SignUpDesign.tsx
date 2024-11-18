import { NavLink } from "react-router-dom";
import { Input, RememberMeInput } from "@/components/Input";
import {
  EmailIconElement,
  EyeIconElement,
  UserIconElement,
} from "@/icons/Icons";
import { Button } from "@/components/Button";

interface SignUpDesignProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SignUpDesign({ handleSubmit }: SignUpDesignProps) {
  return (
    <div className="auth-page">
      <p className="text-white absolute bottom-10 left-10">
        Already have an account?{" "}
        <NavLink to="/auth/signin" className="text-blue-500 underline">
          Sign In
        </NavLink>
      </p>

      <div className="auth-form-wrapper">
        <h4 className="text-lg lg:text-xl font-light">Start your journey</h4>
        <h2 className="text-2xl lg:text-3xl font-bold">Sign Up to the Arcane</h2>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <Input
            id="username"
            type="text"
            placeholder="Username"
            Icon={UserIconElement}
          />

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

          <Button text="Sign Up" />
        </form>
      </div>
    </div>
  );
}
