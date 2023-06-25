"use client";
import Link from "next/link";
export default function Albums() {
  return (
    <div className="bg-slate-900 text-white">
      <Link href="/albums/tumbin">Tum Bin</Link>
      <Link href="/albums/aashique"> aashique</Link>
    </div>
  );
}
