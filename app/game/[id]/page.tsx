"use client";
import { useSocket } from "@/app/context/socketProvider";
import { useEffect, useRef } from "react";
import { Game } from "../classes/Game";
import { LeaderBoard } from "../components/LeaderBoard";

export const GameSessionPage = ({ params }: { params: { id: string } }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (socket == null || canvas == null || context == null) return;
    const game = new Game({ socket, canvas, context });
    game.init();
  }, [socket]);

  return (
    <div>
      <LeaderBoard />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default GameSessionPage;
