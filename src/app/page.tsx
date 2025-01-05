"use client";
import React, { useState } from "react";
import Player from "./comps/player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useQuery } from "@tanstack/react-query";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
  const [songUrl] = useState(
    "https://aac.saavncdn.com/511/0b6fabc337a7418e905ec6223fe9be47_320.mp4",
  );
  const [thumbUrl] = useState(
    "https://c.saavncdn.com/792/Tum-Bin-Hindi-2001-20221206162237-500x500.jpg",
  );
  const handlePlay = () => {};
  const handlePause = () => {};
  const handlePrevious = () => {};
  const handleNext = () => {};

  const { theme, setTheme } = useTheme();
  const [searchInput, setSearchInput] = useState("");
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getSong,
  // });
  //
  //
  console.log(theme);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && typeof window !== "undefined" && (
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-between items-center p-4 gap-5">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Song..."
              type="text"
            />
            <Button>Search</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content Section (Optional: Add your main content here) */}
          <div className="flex-grow"></div>

          {/* Bottom Section: Player */}
          <div className="">
            <Player
              audioUrl={songUrl}
              thumbUrl={thumbUrl}
              handlePlay={handlePlay}
              handlePause={handlePause}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
