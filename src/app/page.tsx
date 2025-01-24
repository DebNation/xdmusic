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
import Search from "./comps/search";

const Home = () => {
  const { setTheme } = useTheme();
  const [searchText, setSearchText] = useState("");
  // const [searchSongList, setSearchSongList] = useState<SearchSong[]>([]);
  // const [searchSongIndex, setSearchSongIndex] = useState(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 md:py-4">
      {isClient && typeof window !== "undefined" && (
        <div className="flex flex-col min-h-screen overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          <div className="flex justify-between items-center p-4 gap-2">
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Song..."
              type="text"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
                  <Moon className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
          <div className="flex-grow overflow-auto">
            {" "}
            {/* Ensure overflow is handled here */}
            <Search searchText={searchText} />
          </div>
          {/* Bottom Section: Player */}
          <div className="">
            <Player />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
