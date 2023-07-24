import React from "react";
import { useSelector } from "react-redux";

export const New = () => {
  const album = useSelector((state) => state.albumClicked);

  return (
    <div>
      {album ? <div className="text-white">Hi there state changed!</div> : ""}
    </div>
  );
};
