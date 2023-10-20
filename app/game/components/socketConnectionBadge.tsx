"use client";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useSocket } from "../../context/socketProvider";

export const SocketConnectionBadge = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return <XCircleIcon className="w-10 h-10 text-red-500" />;
  } else {
    return <CheckBadgeIcon className="w-10 h-10 text-green-500" />;
  }
};
