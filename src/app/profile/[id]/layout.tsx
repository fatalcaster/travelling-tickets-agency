import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nomon.world",
  description:
    "Discover seamless travel planning and connect with friends on WanderHub! Plan unforgettable journeys, invite friends, and share your adventures with this premier travel social network. Join now for an incredible travel experience! #TravelPlanning #AdventureFriends #WanderHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
