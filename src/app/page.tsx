"use client";
import { useState } from "react";
import Albums from "./components/albums";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function Home() {
  const queryClient = new QueryClient();
  const [albumNames, setAlbumNames] = useState([
    "tum+bin",
    "aashiqui+2",
    "aashiqui",
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-900 h-screen">
        <Albums albumNames={albumNames} setAlbumNames={setAlbumNames} />
      </div>
    </QueryClientProvider>
  );
}
