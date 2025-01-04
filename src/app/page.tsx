"use client";
import React, { useState } from "react";
import Player from "./comps/player";
// import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [songUrl] = useState("");
  const [thumbUrl] = useState("");
  const handlePlay = () => {};
  const handlePause = () => {};
  const handlePrevious = () => {};
  const handleNext = () => {};

  const [searchInput, setSearchInput] = useState("");
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getSong,
  // });

  return (
    <div>
      <div className="flex justify-center">
        <input
          className="bg-black text-white  border-2 m-5 w-auto"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <Player
        audioUrl={songUrl}
        thumbUrl={thumbUrl}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
      ;
    </div>
  );
};

export default Home;
