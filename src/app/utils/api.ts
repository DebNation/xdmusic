import axios from "axios";

const saavnApi = axios.create({
  baseURL: "https://saavn.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function searchAlbums(query: string) {
  const response = await saavnApi.get("/api/search/albums?query=" + query);
  return response.data;
}
export async function getAlbumDetails(id: number) {
  const response = await saavnApi.get("/api/albums?id=" + id);
  return response.data;
}

export async function getArtistSongs(id: number) {
  const response = await saavnApi.get(`/api/artists/${id}/songs`);
  return response.data;
}

export async function searchArtists(query: string) {
  const response = await saavnApi.get("/api/search/artists?query=" + query);
  return response.data;
}

export async function getArtistDetails(id: number, pageNo: number) {
  const response = await saavnApi.get(
    `/api/artists/${id}/songs?page=${pageNo}`,
  );
  return response.data;
}

export async function SearchSong(query: string) {
  const response = await saavnApi.get(
    `/api/search/songs?query=${query}&page=1&limit=10`,
  );
  return response.data;
}

export async function getGlobalSearch(query: string) {
  const response = await saavnApi.get(`/api/search?query=${query}`);
  return response.data;
}

export async function getSongData(songId: string) {
  const response = await saavnApi.get(`/api/songs/${songId}`);
  return response.data;
}
