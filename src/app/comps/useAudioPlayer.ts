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
  songList: { id: string }[];
  songIndex: number;
  setSongIndex: React.Dispatch<React.SetStateAction<number>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAudioPlayer(song: Song | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!song) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = song.downloadUrl[4].url;
    audio.load();

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
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

  const togglePlay = () => setIsPlaying(!isPlaying);

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
