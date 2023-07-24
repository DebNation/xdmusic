import { AiOutlineHome } from "react-icons/ai";
import { CgMusicNote } from "react-icons/cg";
import { LuListMusic } from "react-icons/lu";
import { MdMenuOpen } from "react-icons/md";
import Link from "next/link";
interface proptypes {
  menuClicked: boolean;
  setMenuClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Sidebar = ({ menuClicked, setMenuClicked }: proptypes) => {
  return (
    <div className=" bg-gray-700 w-2/4 h-screen inset-0 fixed  text-lg p-2 rounded-xl backdrop-blur-md">
      <MdMenuOpen
        className="w-9 h-9"
        onClick={() => setMenuClicked(!menuClicked)}
      />
      <div className="mt-2">
        <div className="flex bg-slate-800 rounded-md p-1">
          <AiOutlineHome className="mt-2 " />
          <Link href={"/"}>
            <ul className="p-1">Home</ul>
          </Link>
        </div>
        <div className="flex bg-slate-800 rounded-md p-1 mt-2 ">
          <CgMusicNote className="mt-2 " />
          <ul className="p-1">Player</ul>
        </div>
        <div className="flex bg-slate-800 rounded-md p-1 mt-2">
          <LuListMusic className="mt-2 " />
          <ul className="p-1">Playlists</ul>
        </div>
      </div>
    </div>
  );
};
