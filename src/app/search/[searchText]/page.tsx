"use client";
import { SearchSong } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import SearchLayout from "../layout";
import Player from "@/app/components/player";

interface PropTypes {
  params: { searchText: string };
}
export default function Search({ params }: PropTypes) {
  const [searchQuery, setSearchQuery] = useState(params.searchText);
  const [firstImageLink, setFirstImageLink] = useState("");
  const [secondImageLink, setSecondImageLink] = useState("");
  const [thirdImageLink, setThirdImageLink] = useState("");
  const [fourthImageLink, setFourthImageLink] = useState("");
  const [fifthImageLink, setFifthImageLink] = useState("");

  const [firstSongName, setFirstSongName] = useState("");
  const [secondSongName, setSecondSongName] = useState("");
  const [thirdSongName, setThirdSongName] = useState("");
  const [fourthSongName, setFourthSongName] = useState("");
  const [fifthSongName, setFifthSongName] = useState("");

  const [firstArtistName, setFirstArtistName] = useState("");
  const [secondArtistName, setSecondArtistName] = useState("");
  const [thirdArtistName, setThirdArtistName] = useState("");
  const [fourthArtistName, setFourthArtistName] = useState("");
  const [fifthArtistName, setFifthArtistName] = useState("");

  const [songClicked, setSongClicked] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const { data, isSuccess } = useQuery({
    queryKey: ["searchSongDetails"],
    queryFn: async () => {
      const data = await SearchSong(searchQuery);
      console.log(data.data.results);
      return data;
    },
  });
  useEffect(() => {
    if (isSuccess) {
      setFirstImageLink(data.data.results[0].image[2].link);
      setSecondImageLink(data.data.results[1].image[2].link);
      setThirdImageLink(data.data.results[2].image[2].link);
      setFourthImageLink(data.data.results[3].image[2].link);
      setFifthImageLink(data.data.results[4].image[2].link);

      setFirstSongName(data.data.results[0].name);
      setSecondSongName(data.data.results[1].name);
      setThirdSongName(data.data.results[2].name);
      setFourthSongName(data.data.results[3].name);
      setFifthSongName(data.data.results[4].name);

      setFirstArtistName(data.data.results[0].primaryArtists);
      setSecondArtistName(data.data.results[1].primaryArtists);
      setThirdArtistName(data.data.results[2].primaryArtists);
      setFourthArtistName(data.data.results[3].primaryArtists);
      setFifthArtistName(data.data.results[4].primaryArtists);
    }
  }, [isSuccess, data]);
  const skipToNext = () => {
    if (index === data.data.results[index].length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const skipBack = () => {
    if (index === 0) {
      setIndex(data.data.results[index].length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <SearchLayout>
      {!songClicked ? (
        <div className="list justify-center gap-5  p-3 text-white">
          <div
            className="bg-slate-800 active:bg-slate-700 rounded-md flex m-2 p-2"
            onClick={() => {
              setSongClicked(true);
              setSongIndex(0);
            }}
          >
            <Image
              width={100}
              height={100}
              alt="first song image"
              src={firstImageLink}
            />
            <div className="block m-5">
              <p>{firstSongName}</p>
              <p className="text-gray-400 text-sm">{firstArtistName}</p>
            </div>
          </div>
          <div
            className=" bg-slate-800 active:bg-slate-700 rounded-md flex m-2 p-2"
            onClick={() => {
              setSongClicked(true);
              setSongIndex(1);
            }}
          >
            <Image
              width={100}
              height={100}
              alt="second song image"
              src={secondImageLink}
            />
            <div className="block m-5">
              <p>{secondSongName}</p>
              <p className="text-gray-400 text-sm">{secondArtistName}</p>
            </div>
          </div>
          <div
            className=" bg-slate-800 active:bg-slate-700 rounded-md flex m-2 p-2"
            onClick={() => {
              setSongClicked(true);
              setSongIndex(2);
            }}
          >
            <Image
              width={100}
              height={100}
              alt="third song image"
              src={thirdImageLink}
            />
            <div className="block m-5">
              <p>{thirdSongName}</p>
              <p className="text-gray-400 text-sm">{thirdArtistName}</p>
            </div>
          </div>
          <div
            className=" bg-slate-800  active:bg-slate-700 rounded-md flex p-2 m-2"
            onClick={() => {
              setSongClicked(true);
              setSongIndex(3);
            }}
          >
            <Image
              width={100}
              height={100}
              alt="fourth song image"
              src={fourthImageLink}
            />
            <div className="block m-5">
              <p>{fourthSongName}</p>
              <p className="text-gray-400 text-sm">{fourthArtistName}</p>
            </div>
          </div>
          <div
            className=" bg-slate-800 active:bg-slate-700 rounded-md  m-2 flex p-2"
            onClick={() => {
              setSongClicked(true);
              setSongIndex(4);
            }}
          >
            <Image
              width={100}
              height={100}
              alt="fifth song image"
              src={fifthImageLink}
            />
            <div className="block m-5">
              <p>{fifthSongName}</p>
              <p className="text-gray-400 text-sm">{fifthArtistName}</p>
            </div>
          </div>
        </div>
      ) : data ? (
        <Player
          songName={data.data.results[songIndex].name}
          songImage={data.data.results[songIndex].image[2].link}
          songUrl={data.data.results[songIndex].downloadUrl[4].link}
          songArtist={data.data.results[songIndex].primaryArtists}
          songDuration={data.data.results[songIndex].duration}
          songList={data.data.results}
          skipBack={skipBack}
          skipToNext={skipToNext}
        />
      ) : (
        ""
      )}
    </SearchLayout>
  );
}
