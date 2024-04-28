import { PlayIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const Song = ({
  sno,
  track,
  setGlobalCurrentSongId,
  setGlobalIsTrackPlaying,
  setView,
  setGlobalArtistId,
}) => {
  const { data: session } = useSession();
  const [hover, setHover] = useState(false);

  async function playSong(track) {
    setGlobalCurrentSongId(track.id);
    setGlobalIsTrackPlaying(true);

    if (session && session.accessToken) {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/play",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            uris: [track.uri],
          }),
        }
      );
      console.log("on play", response.status);
    }
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function selectArtist(artist) {
    setView("artist");
    setGlobalArtistId(artist.id);
  }

  function renderArtists() {
    const maxArtistsToShow = 4;
    const artists = track.artists.slice(0, maxArtistsToShow);
    const moreArtistsCount = track.artists.length - maxArtistsToShow;

    return (
      <div>
        {artists &&
          artists.map((artist, i) => (
            <div key={artist.id} className="inline">
              <p
                onClick={() => selectArtist(artist)}
                className="hover:underline inline"
              >
                {artist.name}
              </p>
              {i !== artists.length - 1 && <p className="inline">, </p>}
            </div>
          ))}
        {moreArtistsCount > 0 && <p> ...</p>}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDoubleClick={async () => await playSong(track)}
      className="grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default"
    >
      <div className="flex items-center space-x-4">
        {hover ? (
          <PlayIcon
            className="h-5 w-5 text-white cursor-pointer"
            onClick={async () => await playSong(track)}
          />
        ) : (
          <p className="w-5">{sno + 1}</p>
        )}
        {track?.album?.images[0]?.url && (
          <Image
            width={500}
            height={500}
            alt="song-art"
            className="h-10 w-10"
            src={track.album.images[0].url}
          />
        )}
        <div>
          <p className="w-36 lg:w-64 truncate text-white text-base">
            {track.name}
          </p>
          <div className="w-50 cursor-pointer">{renderArtists()}</div>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 truncate hidden md:inline">{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
