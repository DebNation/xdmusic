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
  const [artistSongList, setArtistSongList] = useState([]);
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
      const artistData = await getArtistDetails(artistId, pageNo);
      console.log(artistData);
      return artistData;
    },
  });
  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log(data);
  //     console.log(index);
  //     if (index === 9) {
  //       async () => await fetchNextPage();
  //     }
  //     setArtistSongList(data.pages[0].data);
  //     setSongUrl(data.pages[0].data.results[index].downloadUrl[4].link);
  //     setDuration(data.pages[0].data.results[index].duration);
  //     setLabel(data.pages[0].data.results[index].name);
  //     setArtistName(data.pages[0].data.results[index].primaryArtists);
  //     setSongImage(data.pages[0].data.results[index].image[2].link);
  //     // if (!data.data.results[index]) {
  //     //   console.log("error");
  //     //   setPageNo(pageNo + 1);
  //     //   queryClient.invalidateQueries();
  //     // }
  //   }
  // }, [data, index, isSuccess, pageNo]);
  //

  // useEffect(() => {
  //   if (isSuccess) {
  //     // if (data.data.results[index] !== undefined) {
  //     //   setPageNo(pageNo + 1);
  //     // }
  //     if (data.data.results[index]) {
  //       console.log(data.data.results[index]);
  //     } else {
  //       setPageNo(pageNo + 1);
  //       queryClient.invalidateQueries();
  //     }
  //   }
  // }, [isSuccess, data, index, setPageNo, pageNo]);
  const skipToNext = () => {
    if (index === artistSongList.length - 1) {
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
      setIndex(artistSongList.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <ArtistsLayout>
      {data ? (
        <Player
          songUrl={data.data.results[index].downloadUrl[4].link}
          songDuration={data.data.results[index].duration}
          songList={data.data}
          songImage={data.data.results[index].image[2].link}
          songName={data.data.results[index].name}
          songArtist={data.data.results[index].primaryArtists}
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
