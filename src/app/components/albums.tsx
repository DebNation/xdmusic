"use client";
import Link from "next/link";
import Plyr from "../components/plyr";
import { useState } from "react";
export default function Albums() {
  const albumNames = useState(["tum+bin", "aashiqui+2", "aashiqui"]);

  return (
    <div className="bg-slate-900 text-white">
      <Link href="/">Tum Bin</Link>
      <Link href="/"> aashique</Link>

      {/* <Plyr albumNames={albumNames} /> */}
      <div className="text-white ">tum bin</div>
    </div>
  );
}
