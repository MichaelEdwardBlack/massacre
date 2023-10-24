import { useSocket } from "@/app/context/socketProvider";
import { Player } from "../classes/Player";
import { useEffect, useState } from "react";

export const LeaderBoard = () => {
  const { socket } = useSocket();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (socket != null) {
      console.log("test");
      socket.on("updatePlayers", (backendPlayers: { [key: string]: Player }) => {
        let sortedPlayers = Object.values(backendPlayers).sort((a, b) => b.score - a.score);
        setPlayers(sortedPlayers);
      });
    }
  }, [socket]);

  return (
    <div className="absolute p-3">
      <div className="mb-3">Leaderboard</div>
      {players.map((player) => (
        <div key={player.id}>
          {player.name}: {player.score}
        </div>
      ))}
    </div>
  );
};
