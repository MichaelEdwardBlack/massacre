"use client";
import { useSocket } from "@/app/context/socketProvider";
import { useEffect, useRef } from "react";
import { Player } from "./Player";
import gsap from "gsap";
const TICK_RATE = 15;
const MOVE_SPEED = 3;

export const GameSessionPage = ({ params }: { params: { id: string } }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    console.log("how many times does this run");
    if (socket == null || canvas == null || context == null) return;
    socket.connect();
    canvas.width = 1024 * devicePixelRatio;
    canvas.height = 576 * devicePixelRatio;
    const frontendPlayers: { [key: string]: Player } = {};
    const playerInputs: { sequenceNumber: number; dx: number; dy: number }[] = [];
    let sequenceNumber = 0;

    socket.on("updatePlayers", (backendPlayers) => {
      // remove disconnected players
      for (const id in frontendPlayers) {
        if (!backendPlayers[id]) {
          delete frontendPlayers[id];
        }
      }

      for (const id in backendPlayers) {
        const backendPlayer = backendPlayers[id];
        // add new players
        if (!frontendPlayers[id]) {
          frontendPlayers[id] = new Player({
            x: backendPlayer.x,
            y: backendPlayer.y,
            radius: 10,
            color: backendPlayer.color,
          });
        }
        // update players
        else {
          frontendPlayers[id].x = backendPlayer.x;
          frontendPlayers[id].y = backendPlayer.y;

          // server reconciliation (fix lag for us the player)
          if (id === socket.id) {
            const lastBackendInputIndex = playerInputs.findIndex((input) => {
              return backendPlayer.sequenceNumber === input.sequenceNumber;
            });

            if (lastBackendInputIndex > -1) {
              playerInputs.splice(0, lastBackendInputIndex + 1);
            }

            playerInputs.forEach((input) => {
              frontendPlayers[id].x += input.dx;
              frontendPlayers[id].y += input.dy;
            });
          }
          // interpolation (fix lag for other players)
          else {
            gsap.to(frontendPlayers[id], {
              x: backendPlayer.x,
              y: backendPlayer.y,
              duration: TICK_RATE / 1000,
            });
          }
        }
      }
    });

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      context.fillStyle = "rgba(0,0,0,0.1)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (const id in frontendPlayers) {
        const player = frontendPlayers[id];
        player.draw(context);
      }
    };

    animate();

    const keys = {
      w: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };

    setInterval(() => {
      if (keys.w.pressed) {
        sequenceNumber++;
        playerInputs.push({ sequenceNumber, dx: 0, dy: -MOVE_SPEED });
        socket.emit("keydown", { keycode: "KeyW", sequenceNumber });
      }

      if (keys.a.pressed) {
        sequenceNumber++;
        playerInputs.push({ sequenceNumber, dx: -MOVE_SPEED, dy: 0 });
        socket.emit("keydown", { keycode: "KeyA", sequenceNumber });
      }

      if (keys.s.pressed) {
        sequenceNumber++;
        playerInputs.push({ sequenceNumber, dx: 0, dy: MOVE_SPEED });
        socket.emit("keydown", { keycode: "KeyS", sequenceNumber });
      }

      if (keys.d.pressed) {
        sequenceNumber++;
        playerInputs.push({ sequenceNumber, dx: MOVE_SPEED, dy: 0 });
        socket.emit("keydown", { keycode: "KeyD", sequenceNumber });
      }
    }, TICK_RATE);

    const onKeyDown = (e: KeyboardEvent) => {
      if (!frontendPlayers[socket.id]) return;
      switch (e.code) {
        case "KeyW":
          keys.w.pressed = true;
          break;
        case "KeyA":
          keys.a.pressed = true;
          break;
        case "KeyS":
          keys.s.pressed = true;
          break;
        case "KeyD":
          keys.d.pressed = true;
          break;
        default:
          break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (!frontendPlayers[socket.id]) return;
      switch (e.code) {
        case "KeyW":
          keys.w.pressed = false;
          break;
        case "KeyA":
          keys.a.pressed = false;
          break;
        case "KeyS":
          keys.s.pressed = false;
          break;
        case "KeyD":
          keys.d.pressed = false;
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
  }, [socket]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default GameSessionPage;
