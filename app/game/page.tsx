"use client";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useSocket } from "../context/socketProvider";

const SocketConnectionBadge = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return <XCircleIcon className="w-10 h-10 text-red-500" />;
  } else {
    return <CheckBadgeIcon className="w-10 h-10 text-green-500" />;
  }
};

export default function Game() {
  return (
    <div>
      You made it! <SocketConnectionBadge />
    </div>
  );
}
