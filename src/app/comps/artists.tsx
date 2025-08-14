"use client";
import React, { useEffect, useState } from "react";
import { getArtistDetails, getArtistSongs } from "./../utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useAtom } from "jotai";
import {
  songListAtom,
  songIndexAtom,
  playSongAtom,
  isChildPageAtom,
} from "./../atoms/atoms";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import exampleArtistData from "../examples/exmapleArtistData";
import exampleArtistDetails from "../examples/exampleArtistDetails";
import useScrollToBottom from "../hooks/useScrollToBottom";
import { useInfiniteQuery } from "@tanstack/react-query";

interface PropTypes {
  artistId: number;
  setArtistClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArtistPage: React.FC<PropTypes> = ({ artistId, setArtistClicked }) => {
  const router = useRouter();
  const [songList, setSongList] = useAtom(songListAtom);
  const [songIndex, setSongIndex] = useAtom(songIndexAtom);
  const [playSong, setPlaySong] = useAtom(playSongAtom);
  const [isChildPage, setIsChildPage] = useAtom(isChildPageAtom);
  const [artistSongsData, setArtistSongsData] = useState<
    typeof exampleArtistData.data.songs
  >([]);
  const [artistSongsPageNo, setArtistSongsPageNo] = useState(0);

  if (!artistId) {
    router.push("/");
  }

  const { data, isFetching, isRefetching } = useQuery<
    typeof exampleArtistData.data.songs
  >({
    queryKey: ["artistSongs", artistId, artistSongsPageNo], // Include dependencies
    queryFn: async () => {
      const response = await getArtistSongs(artistId, artistSongsPageNo);
      const songs = response.data.songs;
      setArtistSongsData([...artistSongsData, ...songs]);
      if (artistSongsPageNo > 0 && playSong) {
        setSongList(artistSongsData);
      }
      return songs;
    },
  });
  console.log(songList);

  // const isBottom = useScrollToBottom();
  //
  // const [cooldown, setCooldown] = useState(false);
  // useEffect(() => {
  //   if (isBottom && !cooldown) {
  //     setArtistSongsPageNo((prev) => prev + 1);
  //     setCooldown(true);
  //     const timeout = setTimeout(() => {
  //       setCooldown(false);
  //     }, 1000); // 2 seconds
  //
  //     return () => clearTimeout(timeout); // cleanup in case isBottom changes quickly
  //   }
  // }, [isBottom, artistSongsPageNo, cooldown]);

  const { data: artist, isFetching: isArtistFetching } = useQuery<
    typeof exampleArtistDetails.data
  >({
    queryKey: ["artistDetails"],
    queryFn: async () => {
      const data = await getArtistDetails(artistId);
      return data.data;
    },
  });

  // console.log(artist);

  if (artistSongsData.length > 0) {
    console.log("artist", artistSongsData);
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div>
        {isArtistFetching && isFetching && (
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div>
              {/* Title Skeleton */}
              <Skeleton className="h-8 w-1/3 mb-4" />

              {/* Back Button Skeleton */}
              <Skeleton className="h-10 w-10 mb-4" />

              {/* Songs List Skeleton */}
              <div className="grid gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center p-0 cursor-pointer hover:bg-accent transition-colors duration-200"
                  >
                    {/* Image Skeleton */}
                    <Skeleton className="w-20 h-20 rounded-l-lg flex-shrink-0" />

                    {/* Content Skeleton */}
                    <div className="p-4 flex-grow space-y-2">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {artist && artistSongsData && (
        <div>
          {artistSongsData.length < 1 ? (
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {artist.name}
              </h2>
              <Button
                variant="secondary"
                size="icon"
                className="mb-4"
                onClick={() => {
                  setIsChildPage(false);
                  setArtistClicked(false);
                }}
              >
                <ChevronLeft />
              </Button>
              <h2 className="text-2xl md:text-2xl text-gray-400 mb-4 text-center font-serif">
                No Song found!
              </h2>
            </section>
          ) : (
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {artist.name}
              </h2>
              <Button
                variant="secondary"
                size="icon"
                className="mb-4"
                onClick={() => {
                  setIsChildPage(false);
                  setArtistClicked(false);
                }}
              >
                <ChevronLeft />
              </Button>
              <div className="grid gap-4">
                {artistSongsData?.map((song, index) => (
                  <Card
                    key={song.id}
                    onClick={() => {
                      setSongList(artistSongsData);
                      setSongIndex(index);
                      setPlaySong(true);
                    }}
                    className="cursor-pointer hover:bg-accent transition-colors duration-200"
                  >
                    <CardContent className="p-0 flex items-center">
                      <div className="relative flex-shrink-0">
                        <Image
                          width={80}
                          height={80}
                          src={song.image[2].url}
                          alt={song.name}
                          className="w-20 h-20 object-cover rounded-l-lg"
                        />
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="text-base font-semibold mb-1">
                          {song.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {song.artists.primary[0].name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div>
                <div>
                  {
                    <Button
                      onClick={() => {
                        setArtistSongsPageNo((prev) => prev + 1);
                      }}
                    >
                      Load More
                    </Button>
                  }
                </div>
                {isRefetching ? (
                  <div className="container mx-auto px-4 py-6 md:py-8">
                    <div>
                      {/* Title Skeleton */}
                      <Skeleton className="h-8 w-1/3 mb-4" />

                      {/* Back Button Skeleton */}
                      <Skeleton className="h-10 w-10 mb-4" />

                      {/* Songs List Skeleton */}
                      <div className="grid gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center p-0 cursor-pointer hover:bg-accent transition-colors duration-200"
                          >
                            {/* Image Skeleton */}
                            <Skeleton className="w-20 h-20 rounded-l-lg flex-shrink-0" />

                            {/* Content Skeleton */}
                            <div className="p-4 flex-grow space-y-2">
                              <Skeleton className="h-5 w-2/3" />
                              <Skeleton className="h-4 w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
