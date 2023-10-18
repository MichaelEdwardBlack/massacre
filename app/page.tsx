"use client";
import { useRouter } from "next/navigation";
import { Button } from "./components/button";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="text-center cursor-default text-primary-400 pt-36 pb-24 px-8 text-7xl lg:text-9xl animate-glow from-primary-600 to-primary-500 font-neon hover:animate-flicker">
        Massacre
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button color="primary" onClick={() => router.push("/game")}>
          Create Game
        </Button>
        <Button color="secondary" onClick={() => router.push("/game")}>
          Join Game
        </Button>
      </div>
    </div>
  );
}
