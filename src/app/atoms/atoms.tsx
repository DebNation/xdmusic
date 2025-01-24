import { atom } from "jotai";
// import albumData from "../examples/exmapleAlbumData";
import { searchSongData } from "../examples/songData";

// type SongList = typeof albumData.data.songs;

export const songListAtom = atom<typeof searchSongData.data>([]);
export const songIndexAtom = atom(0);
export const playerExpansionAtom = atom(true);
export const playSongAtom = atom(false);
