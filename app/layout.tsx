import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/header";
import { AuthProvider } from "./context/authProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { SocketProvider } from "./context/socketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Massacre",
  description: "Childhood game recreated as a video game",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`flex flex-col items-center min-h-screen ${inter.className}`}
      >
        <AuthProvider session={session}>
          <SocketProvider>
            <Header />
            {children}
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
