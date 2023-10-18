"use client";
import { signIn } from "next-auth/react";
import { Button } from "../components/button";
import { BsDiscord, BsGithub } from "react-icons/bs";

export const SignInWithGithubButton = () => (
  <Button
    color="accent"
    onClick={() => signIn("github", { redirect: true, callbackUrl: "/" })}
  >
    <span>
      <BsGithub />
    </span>{" "}
    Login with Github
  </Button>
);

export const SignInWithDiscordButton = () => (
  <Button
    onClick={() => signIn("discord", { redirect: true, callbackUrl: "/" })}
  >
    <span>
      <BsDiscord />
    </span>{" "}
    Login with Discord
  </Button>
);
