"use client";
import Albums from "./components/albums";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Player from "./components/player";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { albumClickedAction, setSongUrlAction } from "@/actions";
import { New } from "./components/new";
export default function Home() {
  const queryClient = new QueryClient();
  const [albumClicked, setAlbumClicked] = useState(false);
  const [songName, setSongName] = useState("");
  const [songList, setSongList] = useState([]);
  const [songArtist, setSongArtist] = useState("");
  const [songImage, setSongImage] = useState("");
  const [songDuration, setSongDuration] = useState(0);
  const [index, setIndex] = useState(1);
  interface RootState {
    albumClicked: boolean;
    setSongUrl: string;
  }

  const album = useSelector((state: RootState) => state.albumClicked);
  const songUrl = useSelector((state: RootState) => state.setSongUrl);
  const dispatch = useDispatch();

  const skipToNext = () => {
    if (index === songList.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const skipBack = () => {
    if (index === 0) {
      setIndex(songList.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-900 h-screen">
        <div className="text-white">helmo</div>
        <New />
        <button
          className="text-white rounded-md bg-amber-600 p-2.5"
          onClick={() => dispatch(albumClickedAction())}
        >
          Change state
        </button>
        {album ? (
          <div>
            <h1 className="text-white">Hello</h1>
            <audio autoPlay controls src={songUrl} />
            <button
              className="text-white rounded-md bg-green-600 p-2"
              onClick={() =>
                dispatch(
                  setSongUrlAction(
                    "https://aac.saavncdn.com/274/aee250c500588f117ae5343688e12b42_320.mp4"
                  )
                )
              }
            >
              Change songUrl
            </button>
          </div>
        ) : (
          ""
        )}
        <Albums />
        {albumClicked ? (
          <Player
            songUrl={songUrl}
            songName={songName}
            songList={songList}
            songArtist={songArtist}
            songImage={songImage}
            songDuration={songDuration}
            skipBack={skipBack}
            skipToNext={skipToNext}
          />
        ) : (
          ""
        )}
      </div>
    </QueryClientProvider>
  );
}
