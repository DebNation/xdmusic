"use client";
import { useState, useEffect, useRef } from "react";

export interface Song {
  id: string;
  name: string;
  artist: string;
  duration: number;
  image: { url: string }[];
  downloadUrl: { url: string }[];
}

export interface PlayerProps {
  songList: Song[];
  songIndex: number;
  setSongIndex: React.Dispatch<React.SetStateAction<number>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAudioPlayer(song: Song | null) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!song) return;

    const audio = audioRef.current;
    if (!audio) return;

    // Set the new song's source
    audio.src = song.downloadUrl[4].url;
    audio.load();

    // Reset progress and play the song
    setProgress(0);
    setCurrentTime(0);
    audio.play();

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => setIsPlaying(false);

    // Add event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      // Clean up event listeners
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (value / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress(value);
      setCurrentTime(newTime);
    }
  };

  return { isPlaying, togglePlay, progress, seek, currentTime, audioRef };
}
