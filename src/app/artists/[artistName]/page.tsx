"use client";
import { useState, useEffect } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { searchArtists, getArtistDetails } from "../../utils/api";
import { useQuery, QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import Player from "@/app/components/player";
import ArtistsLayout from "../layout";

interface pageProps {
  params: { artistName: string };
}
export default function ArtistsPage({ params }: pageProps) {
  // let [duration, setDuration] = useState();
  const [artistSongList, setArtistSongList] = useState();
  // const [songImage, setSongImage] = useState();
  // const [artistName, setArtistName] = useState();
  // const [songUrl, setSongUrl] = useState();
  const [index, setIndex] = useState(0);
  // const [label, setLabel] = useState();
  const [artistQuery, setArtistQuery] = useState(params.artistName);
  const [pageNo, setPageNo] = useState(1);
  const queryClient = new QueryClient();

  const { data, isSuccess, isFetching, status, refetch } = useQuery({
    queryKey: ["artistSongs"],
    queryFn: async () => {
      const data = await searchArtists(artistQuery);
      const artistId = data.data.results[0].id;
      console.log(index);
      if (index >= 9) {
        setPageNo(pageNo + 1);
        refetch();
      }
      let result: Array<object> = [];
      for (let i = 1; i <= 10; i++) {
        const response = await getArtistDetails(artistId, i);
        for (let j = 0; j < 10; j++) {
          result = [...result, response.data.results[j]];
        }
      }
      console.log(result.length);
      return result;
    },
  });
  const skipToNext = () => {
    if (index === data.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
      if (index === 9) {
        console.log("last index  reached");
        queryClient.invalidateQueries();
      }
    }
  };

  const skipBack = () => {
    if (index === 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <ArtistsLayout>
      {data ? (
        <Player
          songUrl={data[index].downloadUrl[4].link}
          songDuration={data[index].duration}
          songList={data}
          songImage={data[index].image[2].link}
          songName={data[index].name}
          songArtist={data[index].primaryArtists}
          skipToNext={skipToNext}
          skipBack={skipBack}
        />
      ) : (
        <div className="justify-center flex">
          <CgSpinnerAlt className="animate-spin h-10 w-10 text-white" />
        </div>
      )}
    </ArtistsLayout>
  );
}
