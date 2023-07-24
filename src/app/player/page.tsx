"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaStepBackward,
  FaStepForward,
  FaVolumeMute,
  FaSearch,
} from "react-icons/fa";
import formatDuration from "format-duration";
import { Item } from "./item";

export default function Player({
  songUrl,
  songName,
  songArtist,
  songImage,
  songDuration,
  skipToNext,
  skipBack,
  songList,
}: PropTypes) {
  const [songUrl, SetSongUrl] = useState(localStorage.getItem("songUrl"));
  const [songName, SetSongName] = useState(localStorage.getItem("songUrl"));
  const [songUrl, SetSongUrl] = useState(localStorage.getItem("songUrl"));
  const [songUrl, SetSongUrl] = useState(localStorage.getItem("songUrl"));
  const [songUrl, SetSongUrl] = useState(localStorage.getItem("songUrl"));

  const [isPlaying, setIsPlaying] = useState(false);
  const audioEl = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formatDurationTime, setFormatDurationTime] = useState("");

  useEffect(() => {
    //convert second to time
    setFormatDurationTime(formatDuration(songDuration * 1000));
    console.log(songList);
    // if (currentTime && songDuration) {
    //   if (isNaN(currentTime)) {
    //     setCurrentTime(0);
    //   } else {
    //     setCurrentTime((currentTime / songDuration) * 100);
    //   }
    // }

    const updateProgress = () => {
      if (audioEl) {
        const currentTime = audioEl?.current?.currentTime;
        if (currentTime && songDuration) {
          const newProgress = (currentTime / songDuration) * 100;

          setProgress(newProgress);
        }
      }
    };
    if (isPlaying) {
      audioEl?.current?.play();

      const interval = setInterval(updateProgress, 100);

      return () => {
        clearInterval(interval);
      };
    } else {
      audioEl?.current?.pause();
    }
  }, [isPlaying, progress, currentTime, songDuration, formatDurationTime]);

  const onScrub = (value: number) => {
    const audioElement = document.getElementById(
      "audio"
    ) as HTMLAudioElement | null;

    if (audioElement && songDuration) {
      audioElement.currentTime = (value * songDuration) / 100;
    }
    if (progress !== currentTime) {
      if (!isPlaying) {
        setIsPlaying(!isPlaying);
      }
    }
  };

  return (
    <div className="p-10 lg:px-80 bg-gray-900">
      <div className="font-poppins">
        <div className="flex justify-center">
          {songImage ? (
            <Image
              width={600}
              height={500}
              src={songImage}
              alt="image"
              className="rounded-md"
            />
          ) : (
            <Image
              width={600}
              height={500}
              src="someimage.jpg"
              alt="image"
              className="rounded-md"
            />
          )}
        </div>
        <div className="justify-center ">
          <audio
            id="audio"
            ref={audioEl}
            src={songUrl}
            onEnded={() => {
              skipToNext();
              setCurrentTime(0);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          ></audio>
        </div>
        <div className="md:px-32 lg:px-80">
          <p className="text-white mt-2 text-2xl">{songName}</p>
          <p className="text-gray-400 text-sm">
            {songArtist.length > 50
              ? songArtist.slice(0, 50) + "..."
              : songArtist}
          </p>
        </div>
        <div className="flex justify-center mt-5">
          <input
            type="range"
            value={progress}
            ref={progressBar}
            max={100}
            onChange={(e) => {
              e.preventDefault;
              onScrub(parseInt(e.target.value));
            }}
            className="w-full md:w-1/4 shadow-xl rounded-full"
          />
        </div>

        <div className="text-white flex justify-between md:px-72 lg:px-96 bg-gray-900">
          {audioEl.current?.currentTime ? (
            <p>{formatDuration(audioEl.current?.currentTime * 1000)}</p>
          ) : (
            "0:00"
          )}
          <p>{formatDurationTime}</p>
        </div>
        <div className="flex justify-center p-10 gap-10 bg-gray-900">
          <FaStepBackward
            className="text-white h-10 w-10 active:text-gray-400"
            onClick={() => skipBack()}
          />
          {isPlaying ? (
            <FaPauseCircle
              className="text-white  h-12 w-12 active:text-gray-400"
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <FaPlayCircle
              className="text-white  h-12 w-12 active:text-gray-400"
              onClick={() => setIsPlaying(true)}
            />
          )}
          <FaStepForward
            className="text-white  h-10 w-10 active:text-gray-400"
            onClick={() => skipToNext()}
          />
          {/* <FaVolumeMute className="text-white  h-10 w-10" /> */}
        </div>
        <div className="text-white bg-gray-900">
          {songList.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
