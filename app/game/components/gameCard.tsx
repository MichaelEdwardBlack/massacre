"use client";
import { useRouter } from "next/navigation";

const mockGame = {
  id: "1",
  name: "Demo Game",
  map: {
    id: "FirstMap",
    name: "Demo Map",
    previewImage:
      "https://img.itch.zone/aW1nLzc2OTY0NTMucG5n/original/RUderv.png",
  },
  hostedBy: "Admin",
};
export const GameCard = () => {
  const router = useRouter();
  return (
    <div
      className="border border-secondary-400 rounded-md hover:animate-borderGlow px-4 py-2 grid gap-2 hover:cursor-pointer from-secondary-500 to-secondary-800"
      id={mockGame.id}
      onClick={() => router.push("/game/" + mockGame.id)}
    >
      <div className="text-7xl font-neon animate-glow text-primary-300 from-primary-400 to-accent-500">
        {mockGame.name}
      </div>
      <div className="relative border max-w-sm w-full">
        <img src={mockGame.map.previewImage} className="opacity-50" />
        <div className="absolute right-4 bottom-2">{mockGame.map.name}</div>
      </div>
      <div>
        Hosted by:{" "}
        <span className="text-secondary-500">{mockGame.hostedBy}</span>
      </div>
    </div>
  );
};
