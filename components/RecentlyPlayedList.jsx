import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

function RecentlyPlayedList({playlists}) {
  const recentlyPlayedRef = [
    {
      id: 1,
      name: "Liked Songs",
      image: "./artistimage.png",
    },
    {
      id: 1,
      name: "The Weeknd",
      image: "./artistimage.png",
    },
    {
      id: 1,
      name: "The Weeknd",
      image: "./artistimage.png",
    },
    {
      id: 1,
      name: "The Weeknd",
      image: "./artistimage.png",
    },
    {
      id: 1,
      name: "The Weeknd",
      image: "./artistimage.png",
    },
    {
      id: 1,
      name: "The Weeknd",
      image: "./artistimage.png",
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-8 h-screen overflow-y-scroll">
      <div className="flex flex-wrap gap-6">
        {recentlyPlayedRef.map((recentlyPlayed) => (
          <div
            key={recentlyPlayed.id}
            className="cursor-pointer relative group flex flex-row flex-grow flex-wrap gap-6 items-center justify-start bg-neutral-800 hover:bg-neutral-600 rounded-md"
          >
            <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[10px] group-hover:top-[15px] right-3">
              <PlayIcon className="h-6 w-6 text-black" />
            </div>
            <img
              className="w-20 h-fill"
              src={recentlyPlayed.image}
              alt={recentlyPlayed.name}
            />
            <p className="text-base text-white truncate pr-16">
              {recentlyPlayed.name}
            </p>
          </div>
        ))}
      </div>


    </div>
  );
}

export default RecentlyPlayedList;
