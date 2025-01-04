"use client";
import { SearchSong } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import SearchLayout from "../layout";
import Player from "@/app/components/player";

interface PropTypes {
  params: { searchText: string };
}
export default function Search({ params }: PropTypes) {
  const [searchQuery, setSearchQuery] = useState(params.searchText);

  const [songClicked, setSongClicked] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ["searchSongDetails"],
    queryFn: async () => {
      const data = await SearchSong(searchQuery);
      return data.data.results;
    },
  });

  console.log(songIndex);

  const skipToNext = () => {
    if (index === data[songIndex].length - 1) {
      setSongIndex(0);
    } else {
      if (songIndex + 1 === data.length) {
        setSongIndex(0);
      } else {
        setSongIndex(songIndex + 1);
      }
    }
  };

  const skipBack = () => {
    if (index === 0) {
      setSongIndex(data[songIndex].length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  };

  return (
    <>
      {data ? (
        <div>
          {!songClicked ? (
            <SearchLayout>
              <div>
                {data.map((item: any, index: number) => {
                  return (
                    <div
                      key={item.id}
                      className="list justify-center gap-5  p-3 text-white"
                    >
                      <div
                        className="bg-slate-800 active:bg-slate-700 rounded-md flex m-2 p-2"
                        onClick={() => {
                          setSongClicked(true);
                          setSongIndex(index);
                        }}
                      >
                        <Image
                          width={100}
                          height={100}
                          alt="first song image"
                          src={item.image[2].url}
                        />
                        <div className="block m-5">
                          <p>{item.name}</p>
                          <p className="text-gray-400 text-sm">
                            {item.artists.primary[0].name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SearchLayout>
          ) : (
            <Player
              songName={data[songIndex].name}
              songImage={data[songIndex].image[2].url}
              songUrl={data[songIndex].downloadUrl[4].url}
              songArtist={data[songIndex].artists.primary
                .map((item: any) => item.name)
                .join(", ")}
              songDuration={data[songIndex].duration}
              songList={data}
              skipBack={skipBack}
              skipToNext={skipToNext}
            />
          )}
        </div>
      ) : (
        <>LOading</>
      )}
    </>
  );
}
