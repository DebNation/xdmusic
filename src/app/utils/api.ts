import axios from "axios";

const saavnApi = axios.create({
  baseURL: "https://saavn.me",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function searchAlbums(query: string) {
  const response = await saavnApi.get("/search/albums?query=" + query);
  return response.data;
}
export async function getAlbumDetails(id: number) {
  const response = await saavnApi.get("/albums?id=" + id);
  return response.data;
}
