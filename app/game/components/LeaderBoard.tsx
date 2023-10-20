import { Player } from "../[id]/classes/Player";

interface LeaderBoardProps {
  players: { [key: string]: Player };
}

export const LeaderBoard = ({ players }: LeaderBoardProps) => {
  const orderedPlayers = Object.values(players).sort((a,b) => a.score - b.score);
  return (
    <div className="absolute p-3">
      <div className="mb-3">Leaderboard</div>
      {orderedPlayers.map((player) => <div>{player.id}: {player.score}</div>)}
    </div>
  );
};
