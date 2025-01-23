"use client";
import React from "react";
import { getAlbumDetails } from "../../utils/api";
import albumData from "../../examples/exmapleAlbumData";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useAtom } from "jotai";
import { songListAtom, songIndexAtom } from "../../atoms/atoms";
import Player from "@/app/comps/player";

const AlbumPage: React.FC = () => {
  const path = usePathname();
  console.log(path);
  const albumId = path.split("/")[2];
  const router = useRouter();
  // const albumId = router.query.albumId as string;
  const [songList, setSongList] = useAtom(songListAtom);
  const [songIndex, setSongIndex] = useAtom(songIndexAtom);

  if (!albumId) {
    router.push("/");
  }

  const { data } = useQuery<typeof albumData.data>({
    queryKey: ["albumDetails"],
    queryFn: async () => {
      const data = await getAlbumDetails(parseInt(albumId));
      return data.data;
    },
  });

  console.log(songList, songIndex);

  return (
    <div>
      {data && (
        <div>
          {data?.songs?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Songs</h2>
              <div className="grid gap-4">
                {data.songs.map((song, index) => (
                  <Card
                    key={song.id}
                    onClick={() => {
                      setSongList(data.songs);
                      setSongIndex(index);
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

              <div className="">
                <Player />
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
