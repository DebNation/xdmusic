"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import he from "he";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  ArrowDownToLine,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FastAverageColor } from "fast-average-color";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer, Song } from "./useAudioPlayer";
import { getSongData } from "../utils/api";
import {
  songListAtom,
  songIndexAtom,
  playerExpansionAtom,
} from "../atoms/atoms";

const Player: React.FC = () => {
  const [isExpanded, setIsExpanded] = useAtom(playerExpansionAtom);
  const [songList] = useAtom(songListAtom);
  const [songIndex, setSongIndex] = useAtom(songIndexAtom);
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem("volume") || "1.0"),
  );
  const [backgroundColor, setBackgroundColor] = useState("gray");

  // Fetch song data
  const { data: song } = useQuery<Song>({
    queryKey: ["songData", songList[songIndex]?.id, songIndex],
    queryFn: async () => {
      const data = await getSongData(songList[songIndex]?.id);
      return data.data[0];
    },
    enabled: !!songList[songIndex]?.id,
  });

  // Audio player hook
  const { isPlaying, togglePlay, progress, seek, currentTime, audioRef } =
    useAudioPlayer(song || null);

  // Navigation handlers
  const goToNext = () =>
    setSongIndex((prevIndex) => (prevIndex + 1) % songList.length);

  const goToBack = () =>
    setSongIndex(
      (prevIndex) => (prevIndex - 1 + songList.length) % songList.length,
    );

  // Volume handler
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    localStorage.setItem("volume", value.toString());
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // Download handler
  const downloadSong = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Auto-play next song when current ends
  useEffect(() => {
    if (progress === 100) {
      setSongIndex((prevIndex) => (prevIndex + 1) % songList.length);
    }
  }, [progress, songList.length, setSongIndex]);

  // Extract dominant color from album art
  useEffect(() => {
    const fac = new FastAverageColor();
    if (song?.image[2]?.url) {
      fac
        .getColorAsync(song.image[2].url, { crossOrigin: "anonymous" })
        .then((color) => setBackgroundColor(color.hex))
        .catch((error) => console.error("Failed to extract color:", error));
    }
    return () => fac.destroy();
  }, [song?.image]);

  // Utility functions
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getArtistNames = (song: Song): string => {
    const artistNames = song.artists.primary.map((item) => item.name);
    return he.decode(artistNames.join(", "));
  };

  if (!song) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 mx-auto shadow-lg backdrop-blur-md border border-neutral-800/50 bg-neutral-900/70 transition-all duration-300 ${
        isExpanded ? "w-full h-screen" : "w-full max-w-screen-xl"
      } rounded-t-2xl`}
    >
      <div className="p-2 h-full">
        <audio ref={audioRef} />

        {!isExpanded ? (
          <CollapsedPlayer
            song={song}
            backgroundColor={backgroundColor}
            progress={progress}
            isPlaying={isPlaying}
            onExpand={() => setIsExpanded(true)}
            onTogglePlay={togglePlay}
            getArtistNames={getArtistNames}
          />
        ) : (
            <ExpandedPlayer
              song={song}
              isPlaying={isPlaying}
              progress={progress}
              currentTime={currentTime}
              volume={volume}
              onClose={() => setIsExpanded(false)}
              onTogglePlay={togglePlay}
              onSeek={seek}
              onVolumeChange={handleVolumeChange}
              onNext={goToNext}
              onBack={goToBack}
              onDownload={downloadSong}
              formatTime={formatTime}
              getArtistNames={getArtistNames}
            />
        )}
      </div>
    </div>
  );
};

// Collapsed Player Component
interface CollapsedPlayerProps {
  song: Song;
  backgroundColor: string;
  progress: number;
  isPlaying: boolean;
  onExpand: () => void;
  onTogglePlay: () => void;
  getArtistNames: (song: Song) => string;
}

const CollapsedPlayer: React.FC<CollapsedPlayerProps> = ({
  song,
  backgroundColor,
  progress,
  isPlaying,
  onExpand,
  onTogglePlay,
  getArtistNames,
}) => (
  <div
    className="flex items-center justify-between cursor-pointer relative overflow-hidden rounded-xl h-20 px-3 transition-all duration-300"
    onClick={onExpand}
    style={{
      background: `linear-gradient(to right, ${backgroundColor} ${progress}%, rgba(0, 0, 0, 0.8) ${progress}%)`,
      transition: "background 0.3s ease",
      touchAction: "manipulation",
    }}
  >
    <div className="flex items-center flex-grow min-w-0">
      <Image
        width={60}
        height={60}
        src={song.image[2].url}
        alt={`${song.name} cover`}
        className="rounded-lg mr-4 flex-shrink-0 shadow-md"
      />
      <div className="flex flex-col flex-grow overflow-hidden">
        <h3 className="text-base font-semibold truncate text-white drop-shadow-sm">
          {he.decode(song.name)}
        </h3>
        <p className="text-sm text-neutral-300 truncate">
          {getArtistNames(song)}
        </p>
      </div>
    </div>

    <Button
      variant="ghost"
      size="icon"
      className="ml-3 hover:bg-white/10 transition rounded-full p-3"
      onClick={(e) => {
        e.stopPropagation();
        onTogglePlay();
      }}
    >
      {isPlaying ? (
        <Pause className="h-7 w-7 text-white" />
      ) : (
        <Play className="h-7 w-7 text-white" />
      )}
    </Button>
  </div>
);

// Expanded Player Component
interface ExpandedPlayerProps {
  song: Song;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  volume: number;
  onClose: () => void;
  onTogglePlay: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
  onDownload: (url: string, filename: string) => void;
  formatTime: (seconds: number) => string;
  getArtistNames: (song: Song) => string;
}

const ExpandedPlayer: React.FC<ExpandedPlayerProps> = ({
  song,
  isPlaying,
  progress,
  currentTime,
  volume,
  onClose,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onNext,
  onBack,
  onDownload,
  formatTime,
  getArtistNames,
}) => (
  <div className="h-full flex flex-col">
    {/* Header with collapse button */}

    {/* Main content */}
    <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 px-4">
      <div className="flex justify-center items-center mb-4 pt-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full hover:bg-white/10 mt-10"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
      <Image
        width={400}
        height={400}
        src={song.image[2].url}
        alt={`${song.name} cover`}
        className="rounded-md shadow-2xl"
      />

      <div className="flex flex-col w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-1">{he.decode(song.name)}</h2>
        <p className="text-lg text-muted-foreground mb-6">
          {getArtistNames(song)}
        </p>

        {/* Progress slider */}
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={(value) => onSeek(value[0])}
          className="cursor-pointer pb-2"
        />

        {/* Time display */}
        <div className="flex justify-between w-full text-sm mb-6">
          <span>{formatTime(Math.floor(currentTime))}</span>
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

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Volume control */}
          <div className="flex items-center gap-2">
            {volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
            <Slider
              value={[volume]}
              max={1.0}
              step={0.01}
              onValueChange={(value) => onVolumeChange(value[0])}
              className="cursor-pointer w-24"
            />
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-12 w-12 hover:bg-white/10 rounded-full"
            >
              <SkipBack className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onTogglePlay}
              className="h-14 w-14 hover:bg-white/10 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="h-12 w-12 hover:bg-white/10 rounded-full"
            >
              <SkipForward className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDownload(song.downloadUrl[4].url, song.name)}
              className="h-12 w-12 hover:bg-white/10 rounded-full"
            >
              <ArrowDownToLine className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Player;
