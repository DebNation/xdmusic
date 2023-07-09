"use client";
import Albums from "./components/albums";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Player from "./components/player";
export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-900 h-screen">
        <Albums />
      </div>
    </QueryClientProvider>
  );
}
