"use client";
import { useState, useEffect } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { searchAlbums, getAlbumDetails } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import AlbumLayout from "../layout";
import Player from "@/app/components/player";

interface pageProps {
  params: { albumName: string };
}
export default function AlbumsPage({ params }: pageProps) {
  let [duration, setDuration] = useState();
  const [albumSongList, setAlbumSongList] = useState([]);
  const [albumSongImage, setAlbumSongImage] = useState();
  const [artistName, setArtistName] = useState();
  const [songUrl, setSongUrl] = useState();
  const [index, setIndex] = useState(0);
  const [label, setLabel] = useState();
  const [albumQuery, setAlbumQuery] = useState(params.albumName);

  const { data, isSuccess } = useQuery({
    queryKey: ["trackdetails"],
    queryFn: async () => {
      const data = await searchAlbums(albumQuery);
      const albumId = data.data.results[0].id;
      console.log(albumId);
      const albumData = await getAlbumDetails(albumId);
      setAlbumSongImage(albumData.data.image[2].link);
      setAlbumSongList(albumData.data.songs);
      return albumData;
    },
  });
  useEffect(() => {
    if (isSuccess) {
      setSongUrl(data.data.songs[index].downloadUrl[4].link);
      setDuration(data.data.songs[index].duration);
      setLabel(data.data.songs[index].name);
      setArtistName(data.data.songs[index].primaryArtists);
    }
  }, [data, index, isSuccess]);

  const skipToNext = () => {
    if (index === albumSongList.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const skipBack = () => {
    if (index === 0) {
      setIndex(albumSongList.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <AlbumLayout>
      {songUrl &&
      duration &&
      albumSongImage &&
      albumSongImage &&
      label &&
      artistName ? (
        <Player
          songUrl={songUrl}
          songDuration={duration}
          songList={albumSongList}
          songImage={albumSongImage}
          songName={label}
          songArtist={artistName}
          skipToNext={skipToNext}
          skipBack={skipBack}
        />
      ) : (
        <div className="justify-center flex">
          <CgSpinnerAlt className="animate-spin h-10 w-10 text-white" />
        </div>
      )}
    </AlbumLayout>
  );
}
