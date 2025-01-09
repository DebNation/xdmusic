"use client";
import { getGlobalSearch } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import Image from "next/image";
// import SearchLayout from "../layout";
import { glboalSearchResult } from "../examples/globalSearch";
import { Dispatch, SetStateAction } from "react";
// import { Song } from "./useAudioPlayer";
export interface SearchSong {
  id: string;
  title: string;
  image: { quality: string; url: string }[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
}

interface PropTypes {
  searchText: string;
  searchClicked: boolean;
  songList: object[];
  setSongList: React.Dispatch<React.SetStateAction<SearchSong[]>>;
  songIndex: number;
  setSongIndex: Dispatch<SetStateAction<number>>;
}

const Search: React.FC<PropTypes> = ({
  searchText,
  searchClicked,
  songList,
  setSongList,
  songIndex,
  setSongIndex,
}) => {
  const { data } = useQuery<typeof glboalSearchResult.data>({
    queryKey: ["searchSongDetails", searchClicked],
    queryFn: async () => {
      const data = await getGlobalSearch(searchText);
      return data.data;
    },
    enabled: !!searchClicked,
  });

  console.log(songList, songIndex);

  return (
    <div>
      {data && (
        <div className="min-h-screen bg-black text-white">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-10">
              Global Search Results
            </h1>

            {/* Top Query */}
            {data.topQuery?.results?.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Top Query
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.topQuery.results.map((result) => (
                    <div
                      key={result.id}
                      className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:bg-zinc-800 transition-all duration-300"
                    >
                      <Image
                        width={300}
                        height={300}
                        alt="top query image"
                        src={result.image[2].url}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2 line-clamp-1">
                          {result.title}
                        </h3>
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Songs */}
            {data.songs?.results?.length > 0 && (
              <section
                className="mb-10"
                onClick={() => setSongList(data?.songs?.results)}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Songs</h2>
                <div className="grid gap-4">
                  {data.songs.results.map((song, index) => (
                    <div
                      key={song.id}
                      onClick={() => setSongIndex(index)}
                      className="group bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden hover:bg-zinc-800 transition-all duration-300 cursor-pointer flex items-center"
                    >
                      <div className="relative flex-shrink-0">
                        <Image
                          width={80}
                          height={80}
                          src={song.image[2].url}
                          alt="song thumbnail"
                          className="w-20 h-20 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="text-base font-semibold mb-1">
                          {song.title}
                        </h3>
                        <p className="text-sm text-zinc-400">{song.singers}</p>
                        {song.album && (
                          <p className="text-xs text-zinc-500 mt-1">
                            Album: {song.album}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Albums */}
            {data.albums?.results?.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {data.albums.results.map((album) => (
                    <div
                      key={album.id}
                      className="group bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:bg-zinc-800 transition-all duration-300"
                    >
                      <div className="relative">
                        <Image
                          width={300}
                          height={300}
                          alt="album cover"
                          src={album.image[2].url}
                          className="w-full aspect-square object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold mb-1 line-clamp-1">
                          {album.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mb-1">
                          Year: {album.year}
                        </p>
                        <p className="text-xs text-zinc-400 line-clamp-1">
                          By {album.artist}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Artists */}
            {data.artists?.results?.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {data.artists.results.map((artist) => (
                    <div
                      key={artist.id}
                      className="group bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:bg-zinc-800 transition-all duration-300"
                    >
                      <div className="relative">
                        <Image
                          width={200}
                          height={200}
                          alt="artist image"
                          src={artist.image[2].url}
                          className="w-full aspect-square object-cover rounded-t-xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="text-sm font-semibold line-clamp-1">
                          {artist.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Playlists */}
            {data.playlists?.results?.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Playlists
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {data.playlists.results.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="group bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:bg-zinc-800 transition-all duration-300"
                    >
                      <div className="relative">
                        <Image
                          width={300}
                          height={300}
                          alt="playlist cover"
                          src={playlist.image[2].url}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold">
                          <a
                            href={playlist.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-400 transition-colors duration-200 line-clamp-1"
                          >
                            {playlist.title}
                          </a>
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
