"use client";
import { useSocket } from "@/app/context/socketProvider";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Game } from "../classes/Game";
import { LeaderBoard } from "../components/LeaderBoard";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../classes/Constants";

export const GameSessionPage = ({ params }: { params: { id: string } }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { socket } = useSocket();
  const { data: session } = useSession();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (socket == null || canvas == null || context == null) return;
    const game = new Game({ socket, canvas, context });
    game.init(session?.user?.name);
  }, [socket]);

  return (
    <div>
      <LeaderBoard />
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    </div>
  );
};

export default GameSessionPage;
