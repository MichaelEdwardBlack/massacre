"use client";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { Input } from "../components/input";
import { Divider } from "../components/divider";
import { Button } from "../components/button";
import {
  SignInWithDiscordButton,
  SignInWithGithubButton,
} from "./signInButtons";
import Link from "next/link";
import { signIn } from "next-auth/react";

const signInWithCredentials = async (formData: FormData) => {
  signIn("credentials", {
    email: formData.get("email")?.valueOf() as String,
    password: formData.get("password")?.valueOf() as String,
    redirect: true,
    callbackUrl: "/",
  });
};

export default function Login() {
  return (
    <div className="flex flex-col pt-44 w-full items-center">
      <div className="grid max-w-sm w-full gap-4 px-4 py-3 border rounded-md bg-slate-100 dark:bg-slate-900 border-accent-500">
        <form className="grid gap-4" action={signInWithCredentials}>
          <div className="text-7xl font-neon text-secondary-500">Login</div>
          <Input
            name="email"
            label="Email"
            type="email"
            labelIcon={<EnvelopeIcon className="w-4 h-4" />}
            labelClassName="flex items-center gap-1"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            labelIcon={<EnvelopeIcon className="w-4 h-4" />}
            labelClassName="flex items-center gap-1"
          />
          <Button color="secondary">Sign In</Button>
          <div>
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-accent-400 hover:animate-flicker"
            >
              Register Here!
            </Link>
          </div>
        </form>
        <Divider text="Or" />
        <SignInWithGithubButton />
        <SignInWithDiscordButton />
      </div>
    </div>
  );
}
