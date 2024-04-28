import { PlayIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FeaturedPlaylists = ({ setView, setGlobalPlaylistId }) => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  function selectPlaylist(playlist) {
    setView("playlist");
    setGlobalPlaylistId(playlist.id);
  }

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists?" +
            new URLSearchParams({
              country: "US",
            }),
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylists(data.playlists?.items);
      }
    }
    f();
  }, [session]);

  function redirectOwner() {
    window.open(playlists[0].owner.external_urls.spotify);
  }

  return (
    <div className="flex flex-col gap-4 px-8 mb-24  overflow-y-scroll scrollbar-hide ">
      <h2 className="text-3xl text-white font-bold">Featured Playlists</h2>
      <div className="grid grid-cols-5 items-stretch gap-8">
        {playlists &&
          playlists.map((playlist) => (
            <div
              onClick={() => selectPlaylist(playlist)}
              key={playlist.id}
              className="cursor-pointer relative group mb-2 hover:bg-neutral-800 rounded-md p-4"
            >
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                <PlayIcon className="h-6 w-6 text-black" />
              </div>
              <Image
                width={500}
                height={500}
                alt="playlist-cover"
                className="xl:w-48 xl:h-48 h-32 w-32 mb-4"
                src={playlist.images[0].url}
              />
              <p className="text-base text-white mb-1 w-48 truncate">
                {playlist.name}
              </p>
              <p
                onClick={redirectOwner}
                className="text-sm hover:underline text-neutral-400 w-48 truncate"
              >
                By {playlist.owner.display_name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedPlaylists;

// <div
// onClick={() => selectPlaylist(playlist)}
// key={playlist.id}
// className="cursor-pointer relative group mb-2 hover:bg-neutral-800 rounded-md p-4"
// >
// <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
//   <PlayIcon className="h-6 w-6 text-black" />
// </div>
// <Image
//   width={500}
//   height={100}
//   alt="playlist-cover"
//   className="w-48 h-48 mb-4"
//   src={playlist.images[0].url}
// />
// <p className="text-base text-white mb-1 w-48 truncate">
//   {playlist.name}
// </p>
// <p
//   onClick={redirectOwner}
//   className="text-sm hover:underline text-neutral-400 w-48 truncate"
// >
//   By {playlist.owner.display_name}
// </p>
// </div>
