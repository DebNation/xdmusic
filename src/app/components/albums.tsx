"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Albums() {
  const [searchText, setSearchText] = useState("");
  let router = useRouter();
  return (
    <div className="bg-slate-800 text-white h-screen">
      <div className="flex justify-center pt-5">
        <input
          className="bg-gray-600 w-2/4 md:w-1/4 rounded-md text-gray-100 text-xl py-1 px-2.5"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FaSearch
          className="ml-5 w-6 h-6 mt-1 duration-500 hover:text-gray-500"
          onClick={() => {
            console.log("clicked");
            router.push(`/search/${searchText}`);
          }}
        />
      </div>

      <div className="card justify-center gap-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-3">
        <div className=" bg-orange-900 rounded-md text-center justify-center flex p-2">
          <Link href="/albums/tumbin">
            <Image
              width={300}
              height={300}
              alt="tumbin album image"
              src="https://c.saavncdn.com/792/Tum-Bin-Hindi-2001-20221206162237-500x500.jpg"
            />
            <p>Tum Bin</p>
          </Link>
        </div>
        <div className=" bg-gray-900 rounded-md text-center justify-center flex p-2">
          <Link href="/albums/aashique2">
            <Image
              src="https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg"
              alt="aashique 2 album image"
              width={300}
              height={300}
            />
            <p>Aashique 2</p>
          </Link>
        </div>
        <div className=" bg-gray-900 rounded-md text-center justify-center flex p-2">
          <Link href="/albums/aashique2">
            <Image
              src="https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg"
              alt="aashique 2 album image"
              width={300}
              height={300}
            />
            <p>Aashique 2</p>
          </Link>
        </div>
        <div className=" bg-gray-900 rounded-md text-center justify-center flex p-2">
          <Link href="/albums/tumbin">
            <Image
              width={300}
              height={300}
              alt="tumbin album image"
              src="https://c.saavncdn.com/792/Tum-Bin-Hindi-2001-20221206162237-500x500.jpg"
            />
            <p>Tum Bin</p>
          </Link>
        </div>
        <div className=" bg-orange-900 rounded-md text-center justify-center flex p-2">
          <Link href="/albums/tumbin">
            <Image
              width={300}
              height={300}
              alt="tumbin album image"
              src="https://c.saavncdn.com/792/Tum-Bin-Hindi-2001-20221206162237-500x500.jpg"
            />
            <p>Tum Bin</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
