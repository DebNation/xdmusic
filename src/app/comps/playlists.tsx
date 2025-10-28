"use client";
import React from "react";
import { getPlaylistDetails } from "./../utils/api";
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
import examplePlaylistData from "../examples/exmaplePlaylistData";

interface PropTypes {
  playlistId: number;
  setPlaylistClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaylistPage: React.FC<PropTypes> = ({
  playlistId,
  setPlaylistClicked,
}) => {
  const router = useRouter();
  const [songList, setSongList] = useAtom(songListAtom);
  const [songIndex, setSongIndex] = useAtom(songIndexAtom);
  const [playSong, setPlaySong] = useAtom(playSongAtom);
  const [isChildPage, setIsChildPage] = useAtom(isChildPageAtom);

  if (!playlistId) {
    router.push("/");
  }

  const { data, isFetching } = useQuery<typeof examplePlaylistData.data>({
    queryKey: ["playlistDetails"],
    queryFn: async () => {
      const data = await getPlaylistDetails(playlistId);
      return data.data;
    },
  });
  console.log(data);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div>
        {isFetching && (
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
                    className="flex items-center cursor-pointer hover:bg-accent transition-colors duration-200"
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
      {data && (
        <div>
          {data?.songs?.length < 1 ? (
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {data?.name}
              </h2>
              <Button
                variant="secondary"
                size="icon"
                className="mb-4"
                onClick={() => {
                  setIsChildPage(false);
                  setPlaylistClicked(false);
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
                {data?.name}
              </h2>
              <Button
                variant="secondary"
                size="icon"
                className="mb-4"
                onClick={() => {
                  setIsChildPage(false);
                  setPlaylistClicked(false);
                }}
              >
                <ChevronLeft />
              </Button>
              <div className="grid gap-4">
                {data?.songs?.map((song, index) => (
                  <Card
                    key={song.id}
                    onClick={() => {
                      setSongList(data.songs);
                      setSongIndex(index);
                      setPlaySong(true);
                    }}
                    className="cursor-pointer hover:bg-accent transition-colors duration-200"
                  >
                    <CardContent className="flex items-center">
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
                          {data.artists[0].name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
