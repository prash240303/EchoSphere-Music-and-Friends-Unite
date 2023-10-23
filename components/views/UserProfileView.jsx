"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { shuffle } from 'lodash';

const colors = [
  'from-blue-500',

]

export default function UserProfileView({ userID, globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId }) {
  const { data: session } = useSession()

  const [color, setColor] = useState(null)
  const [opacity, setOpacity] = useState(0)
  const [textOpacity, setTextOpacity] = useState(0)
  const [topArtists, setTopArtists] = useState([]);


  async function getTopArtist() {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?limit=6&offset=1`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log("data",   data.artists)
    return data.artists;
  }

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        setTopArtists(await getTopArtist());
      }
    } 
    f();
  }, [session]);


  function changeOpacity(scrollPos) {
    // scrollPos = 0 -> opacity = 0 
    // scrollPos = 300 -> opacity = 1, textOpacity = 0
    // scrollPos = 310 -> opacity = 1, textOpacity = 1
    const offset = 300
    const textOffset = 10
    if (scrollPos < offset) {
      const newOpacity = 1 - ((offset - scrollPos) / offset)
      setOpacity(newOpacity)
      setTextOpacity(0)
    } else {
      setOpacity(1)
      const delta = scrollPos - offset
      const newTextOpacity = 1 - ((textOffset - delta) / textOffset)
      setTextOpacity(newTextOpacity)
    }
  }

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [globalPlaylistId])

  return (
    <div className='flex-grow h-screen'>
      <header style={{ opacity: opacity }} className='text-white sticky top-0 h-16 z-10 text-3xl bg-neutral-800 p-8 flex items-center font-bold'>
        <div style={{ opacity: textOpacity }} className='flex items-center'>
          {/* {playlistData && <img className='h-8 w-8 mr-6' src={playlistData.images[0].url} />} */}
          {/* <p>{playlistData?.name}</p> */}
        </div>
      </header>

      <div className='absolute z-20 top-3 right-8 flex items-center justify-center bg-black bg-opacity-70 text-white px-2 pr-3 py-2 gap-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full '>
        <img className='rounded-full w-7   h-7' src={session?.user.image} alt="profile pic" />
        <p className='text-sm font-semibold leading-normal'>Logout</p>
      </div>

      <div onScroll={(e) => changeOpacity(e.target.scrollTop)} className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
        <section className={`flex items-center justify-start space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white px-8 pb-8`}>
          {/* {playlistData && <img className='h-44 w-44' src={playlistData.images[0].url} />} */}
          <div className='rounded-full border border-white h-48 w-48 mt-16 '>profile image</div>
          <div className='flex flex-col items-start justify-evenly h-full mt-16'>
            <div className='font-semibold'>Profile</div>
            <div className=' font-extrabold text-7xl'>Prashant</div>
            <div className='font-semibold text-base'>21 Public Playlists   44 Followers    6969 Following</div>
          </div>

          <div>

          </div>
        </section>
        <div className='flex gap-8  text-white  border-b border-gray-700  mb-2 pb-5 '>
         
        </div>
        {/* <h2 className="text-2xl font-bold mb-8 px-8"> Top artist this month</h2>
          <div className="px-8 w-screen scrollbar-hide  firefox-scrollbar overflow-x-scroll">
            <div className="flex gap-4">
              {topArtists&& topArtists.map((artist) => (
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
          </div> */}

      </div>
    </div>
  )
}
