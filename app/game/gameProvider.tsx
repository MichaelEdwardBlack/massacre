// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { Player } from "./[id]/classes/Player";

// type GameContextType = {
//   players: { [key: string]: Player };
// };

// const GameContext = createContext<GameContextType>({
//   players: {}
// });

// export const useGame = () => {
//   return useContext(GameContext);
// };

// export const GameProvider = ({ children }: { children: React.ReactNode }) => {
//   const [players, setPlayers] = useState<any>({});

//   useEffect(() => {
//     const socketInstance = ClientIO("http://localhost:3001", {
//       autoConnect: false,
//     });

//     socketInstance.on("connect", () => {
//       setIsConnected(true);
//     });

//     socketInstance.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <GameContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </GameContext.Provider>
//   );
// };
