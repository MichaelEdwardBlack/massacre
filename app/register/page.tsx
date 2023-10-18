"use client";
import {
  CheckBadgeIcon,
  EnvelopeIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { registerUser } from "@/app/register/registerUser";
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const initialState = {
  error: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="secondary" aria-disabled={pending}>
      Create Account
    </Button>
  );
};

export default function Register() {
  const [state, formAction] = useFormState(registerUser, initialState);

  return (
    <div className="flex flex-col pt-44 w-full items-center">
      <div className="grid max-w-sm w-full gap-4 px-4 py-3 border rounded-md bg-slate-100 dark:bg-slate-900 border-accent-500">
        <form className="grid gap-4" action={formAction}>
          <div className="text-7xl font-neon text-secondary-500">Sign Up</div>
          <Input
            name="email"
            label="Email"
            type="email"
            labelIcon={<EnvelopeIcon className="w-4 h-4" />}
            labelClassName="flex items-center gap-1"
            required
          />
          <Input
            name="password"
            label="Password"
            type="password"
            labelIcon={<KeyIcon className="w-4 h-4" />}
            labelClassName="flex items-center gap-1"
            required
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            labelIcon={<CheckBadgeIcon className="w-4 h-4" />}
            labelClassName="flex items-center gap-1"
            required
          />
          <SubmitButton />
          <div className="text-red-500">{state?.error}</div>
        </form>
      </div>
    </div>
  );
}
