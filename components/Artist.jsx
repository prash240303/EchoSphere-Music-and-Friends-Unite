import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Song from "./Songs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { PlayIcon } from "@heroicons/react/24/solid";
import { LuVerified } from "react-icons/lu";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Artist = ({
  setView,
  globalArtistId,
  setGlobalArtistId,
  setGlobalCurrentSongId,
  setGlobalIsTrackPlaying,
}) => {
  const { data: session } = useSession();
  const [color, setColor] = useState(colors[0]);
  const [opacity, setOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [artistData, setArtistData] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const storedIsFollowing = localStorage.getItem('isFollowing');
    setIsFollowing(storedIsFollowing === 'true'); // Convert the string to a boolean
  }, []);
  useEffect(() => {
    localStorage.setItem('isFollowing', isFollowing);
  }, [isFollowing]);

  async function handleFollow(globalArtistId) {
    if (session && session.accessToken) {
      try {
        if (isFollowing) {
          // Unfollow the artist
          await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${globalArtistId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });
          console.log('Unfollowed the artist!');
          setIsFollowing(false); // Update the state to indicate that the user is not following the artist
        } else {
          // Follow the artist
          await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${globalArtistId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });
          console.log('Successfully followed the artist!');
          setIsFollowing(true); // Update the state to indicate that the user is following the artist
        }
      } catch (error) {
        // Handle the error here or show an error message to the user
        console.error('Failed to follow/unfollow the artist:', error);
      }
    } else {
      // Handle the case when the user is not logged in or the session is not available
      console.error('User not logged in or session not available.');
    }
  }
  

  function changeOpacity(scrollPos) {
    // scrollPos = 0 -> opacity = 0
    // scrollPos = 300 -> opacity = 1, textOpacity = 0
    // scrollPos = 310 -> opacity = 1, textOpacity = 1
    const offset = 300;
    const textOffset = 10;
    if (scrollPos < offset) {
      const newOpacity = 1 - (offset - scrollPos) / offset;
      setOpacity(newOpacity);
      setTextOpacity(0);
    } else {
      setOpacity(1);
      const delta = scrollPos - offset;
      const newTextOpacity = 1 - (textOffset - delta) / textOffset;
      setTextOpacity(newTextOpacity);
    }
  }

  async function getArtistData() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${globalArtistId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }

  async function getTopTracks() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${globalArtistId}/top-tracks?` +
        new URLSearchParams({ market: "US" }),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.tracks;
  }



  // fetch related artist


  // fetch related artist
  async function getRelatedArtists() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${globalArtistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.artists;
  }


  // fetch artist ablums

  // fetch artist ablums
  async function getArtistAlbum() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${globalArtistId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.items;
  }

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        setArtistData(await getArtistData());
        setTopTracks(await getTopTracks());
        setRelatedArtists(await getRelatedArtists());
        setArtistAlbums(await getArtistAlbum());
      }
    }
    f();
  }, [session, globalArtistId]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [globalArtistId]);

  return (
    <div className="flex-grow h-screen">
      <header
        style={{ opacity: opacity }}
        className="text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold"
      >
        <div style={{ opacity: textOpacity }} className="flex items-center">
          {artistData && (
            <img className="h-8 w-8 mr-6" src={artistData.images[0].url} />
          )}
          <p>{artistData?.name}</p>
        </div>
      </header>
      <div
        onClick={() => signOut()}
        className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
      >
        <img
          className="rounded-full w-7 h-7"
          src={session?.user.image}
          alt="profile pic"
        />
        <p className="text-sm">Logout</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <div
        onScroll={(e) => changeOpacity(e.target.scrollTop)}
        className="relative -top-20 h-screen overflow-y-scroll bg-neutral-900"
      >
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white py-8`}
        >
          <div className="flex items-center justify-center overflow-y-hidden w-full h-80">
            {artistData && (
              <img
                className="w-full  aspect-auto "
                src={artistData.images[0].url}
              />
            )}
          </div>
          <div className="flex flex-col absolute top-[5.5rem] gap-4">
            <div className="flex gap-2 items-center justify-start">
              <LuVerified className="w-8 h-8 inline text-blue-400 " />
              <p className=" inlinetext-base  font-bold text-gray-100 ">
                Verified Artist
              </p>
            </div>
            <h1 className="text-2xl md:text-3xl  lg:text-5xl  text-gray-100 font-extrabold">
              {artistData?.name}
            </h1>
            <p className="text-lg">
              {artistData?.followers.total.toLocaleString()} monthly listeners
            </p>
          </div>
        </section>

        <div className="space-y-4 flex items-start justify-start gap-10 px-8 mb-4">
          <PlayIcon className=" w-14 h-14 text-black bg-green-500 rounded-full p-2" />
          <div
            onClick={() => {
              handleFollow(globalArtistId);
            }}
            className="px-3 cursor-pointer hover:scale-105 py-1 border w-fit border-gray-400 hover:border-white rounded-full"
          >
            {isFollowing ? "Following" : "Follow"}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold px-8">Top tracks</h2>
          <div className="text-white px-8 flex flex-col space-y-1 pb-6">
            {topTracks.slice(0, 5).map((track, i) => {
              // song component
              return (
                <Song
                  setView={setView}
                  setGlobalArtistId={setGlobalArtistId}
                  setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                  setGlobalCurrentSongId={setGlobalCurrentSongId}
                  key={track.id}
                  sno={i}
                  track={track}
                />
              );
            })}
          </div>
        </div>
        <div className="my-10">
          {/* realted artist : artist card */}
          <h2 className="text-2xl font-bold mb-8 px-8">Related artists</h2>
          <div className="px-8 w-screen scrollbar-hide  firefox-scrollbar overflow-x-scroll">
            <div className="flex gap-4">
              {relatedArtists.map((artist) => (
                <div
                  onClick={() => setGlobalArtistId(artist.id)}
                  key={artist.id}
                  className="cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4"
                >
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                    <PlayIcon className="h-6 w-6 text-black" />
                  </div>
                  <img
                    className="w-48 h-48 mb-4 rounded-full"
                    src={artist.images[0].url}
                  />
                  <p className="text-base text-white mb-1 w-48 truncate">
                    {artist.name}
                  </p>
                  <p className="text-sm text-neutral-400 mb-8 w-48 truncate">
                    Artist
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4 mb-36">
          <h2 className="text-2xl font-bold px-8">Discography</h2>
          <div className="px-8 w-screen scrollbar-hide  firefox-scrollbar overflow-x-scroll">
            <div className="flex gap-4">
              {artistAlbums.map((albums) => (
                <div
                  onClick={() => setGlobalArtistId(albums.id)}
                  key={albums.id}
                  className="cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4"
                >
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                    <PlayIcon className="h-6 w-6 text-black" />
                  </div>
                  <img className="w-48 h-48 mb-4 " src={albums.images[0].url} />
                  <p className="text-base text-white mb-1 w-48 truncate">
                    {albums.name}
                  </p>
                  <p className="text-sm text-neutral-400 mb-8 w-48">
                    {albums.release_date.slice(0, 4)} •{" "}
                    {albums.album_group.charAt(0).toUpperCase() +
                      albums.album_group.slice(1).toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
