"use client";
import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { HiMenuAlt1 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { albumClickedAction, setSongUrlAction } from "@/actions";

export default function Albums() {
  const [searchText, setSearchText] = useState("");
  let router = useRouter();
  const [menuClicked, setMenuClicked] = useState(false);
  interface RootState {
    albumClicked: boolean;
    setSongUrl: string;
  }

  const album = useSelector((state: RootState) => state.albumClicked);

  const songUrl = useSelector((state: RootState) => state.setSongUrl);
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-800 text-white h-screen">
      <HiMenuAlt1
        className="w-10 h-10 pt-2"
        onClick={() => setMenuClicked(!menuClicked)}
      />
      {menuClicked ? (
        <Sidebar menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
      ) : (
        ""
      )}
      <div>
        <form
          action={`/search/${searchText}`}
          method="get"
          className="flex justify-center"
        >
          <input
            className="bg-gray-600 w-2/4 md:w-1/4 rounded-md text-gray-100 text-xl py-1 px-2.5"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
          />
          <FaSearch
            className="ml-5 w-6 h-6 mt-1 duration-500 hover:text-gray-500"
            onClick={() => {
              console.log("clicked");
              router.push(`/search/${searchText}`);
            }}
            type="submit"
          />
        </form>
      </div>

      <div className="card justify-center gap-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-3">
        <div
          className=" bg-orange-900 rounded-md text-center justify-center flex p-2"
          onClick={() => {
            dispatch(albumClickedAction());
            dispatch(
              setSongUrlAction(
                "https://aac.saavncdn.com/274/aee250c500588f117ae5343688e12b42_320.mp4"
              )
            );
          }}
        >
          <Image
            width={300}
            height={300}
            alt="tumbin album image"
            src="https://c.saavncdn.com/792/Tum-Bin-Hindi-2001-20221206162237-500x500.jpg"
          />
          <p>Tum Bin</p>
        </div>
        <div className=" bg-gray-900 rounded-md text-center justify-center flex p-2">
          <Image
            src="https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg"
            alt="aashique 2 album image"
            width={300}
            height={300}
          />
          <p>Aashique 2</p>
        </div>
        <div className=" bg-gray-900 rounded-md text-center justify-center flex p-2">
          <Image
            src="https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg"
            alt="aashique 2 album image"
            width={300}
            height={300}
          />
          <p>Aashique 2</p>
        </div>
        <div className=" bg-gray-900 rounded-md text-center justify-center flex p-2">
          <Image
            width={300}
            height={300}
            alt="tumbin album image"
            src="https://c.saavncdn.com/792/Tum-Bin-Hindi-2001-20221206162237-500x500.jpg"
          />
          <p>Tum Bin</p>
        </div>
        <div className=" bg-orange-900 rounded-md text-center justify-center flex p-2">
          <Image
            width={300}
            height={300}
            alt="tumbin album image"
            src="https://c.saavncdn.com/792/Tum-Bin-Hindi-2001-20221206162237-500x500.jpg"
          />
          <p>Tum Bin</p>
        </div>
      </div>
    </div>
  );
}
