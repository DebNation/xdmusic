"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { formatDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useAudioPlayer, Song } from "./useAudioPlayer";
import { getSongData } from "../utils/api";
import { SearchSong } from "./search";

export interface PlayerProps {
  songList: SearchSong[];
  songIndex: number;
  setSongIndex: React.Dispatch<React.SetStateAction<number>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Player({
  songList,
  songIndex,
  setSongIndex,
  isExpanded,
  setIsExpanded,
}: PlayerProps) {
  const { data: song } = useQuery<Song>({
    queryKey: ["songData", songList[songIndex]?.id, songIndex],
    queryFn: async () => {
      const data = await getSongData(songList[songIndex]?.id);
      return data.data[0];
    },
    enabled: !!songList[songIndex]?.id,
  });
  console.log(songList, songIndex);

  const { isPlaying, togglePlay, progress, seek, currentTime, audioRef } =
    useAudioPlayer(song || null);

  const goToNext = () =>
    setSongIndex((prevIndex) => (prevIndex + 1) % songList.length);
  const goToBack = () =>
    setSongIndex(
      (prevIndex) => (prevIndex - 1 + songList.length) % songList.length,
    );

  if (!song) return null;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card
      className={`fixed bottom-0 left-0 right-0 mx-auto transition-all duration-300 ${
        isExpanded
          ? "w-full h-[70vh] max-h-[500px]"
          : "w-full sm:w-[90%] h-20 max-w-screen-xl"
      }`}
    >
      <CardContent className="p-0 h-full">
        <audio ref={audioRef} />
        {isExpanded ? (
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-end mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8">
              <Image
                width={200}
                height={200}
                src={song.image[2].url}
                alt={`${song.name} cover`}
                className="rounded-md"
              />
              <div className="flex flex-col w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-1">{song.name}</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  {song.artist}
                </p>
                <Slider
                  value={[progress]}
                  max={100}
                  step={0.1}
                  onValueChange={(value) => seek(value[0])}
                  className="cursor-pointer pb-2"
                />
                <div className="flex justify-between w-full text-sm mb-4">
                  <span>
                    {formatTime(
                      Math.floor(
                        typeof currentTime === "string"
                          ? Number(currentTime)
                          : currentTime,
                      ),
                    )}
                  </span>
                  <span>
                    {formatTime(
                      Math.floor(
                        typeof song.duration === "string"
                          ? Number(song.duration)
                          : song.duration,
                      ),
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Button variant="ghost" size="icon" onClick={goToBack}>
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={togglePlay}>
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={goToNext}>
                    <SkipForward className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center p-2">
            <Image
              width={48}
              height={48}
              src={song.image[2].url}
              alt={`${song.name} cover`}
              className="rounded-md mr-3"
            />
            <div className="flex-grow mr-2">
              <h3 className="text-sm font-medium truncate">{song.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {song.artist}
              </p>
            </div>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(value) => seek(value[0])}
              className="w-1/3 mx-4 hidden md:block "
            />
            <Button
              variant="ghost"
              size="icon"
              className="mr-1"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
