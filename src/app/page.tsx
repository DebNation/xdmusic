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
import Search, { SearchSong } from "./comps/search";

const Home = () => {
  const { setTheme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [songList, setSongList] = useState<SearchSong[]>([]);
  const [songIndex, setSongIndex] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);

  const [isExpanded, setIsExpanded] = useState(true);
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getSong,
  // });
  //
  //
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Song..."
              type="text"
            />
            <Button onClick={() => setSearchClicked(!searchClicked)}>
              Search
            </Button>
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
          <div className="flex-grow">
            <Search
              searchText={searchText}
              searchClicked={searchClicked}
              songList={songList}
              setSongList={setSongList}
              songIndex={songIndex}
              setSongIndex={setSongIndex}
            />
          </div>

          {/* Bottom Section: Player */}

          {songList.length > 0 ? (
            <div className="">
              <Player
                songList={songList}
                songIndex={songIndex}
                setSongIndex={setSongIndex}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <div>No Music is Playing</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
