"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { shuffle } from 'lodash';
import he from 'he';
import { LuClock3 } from "react-icons/lu"

import Song from '../Songs';
import Image from 'next/image';
import Link from 'next/link';
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
]

export default function Playlistveiw({ globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId, setUserID }) {
  const { data: session } = useSession()
  const [hover, setHover] = useState(false)
  const [playlistData, setPlaylistData] = useState(null)
  const [color, setColor] = useState(null)
  const [opacity, setOpacity] = useState(0)
  const [textOpacity, setTextOpacity] = useState(0)

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

    async function f() {
      if (session && session.accessToken) {
        const res = await fetch(`https://api.spotify.com/v1/playlists/${globalPlaylistId}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        })
        const data = await res.json()
        setPlaylistData(data)
      }
    }
    f()
  }, [session, globalPlaylistId])

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [globalPlaylistId])

  console.log("playlistData", playlistData?.owner.id)


  const processDesc = he.decode(playlistData?.description || " ")


  const userID = playlistData?.owner.id;
  return (
    <div className='flex-grow h-screen'>
      <header style={{ opacity: opacity }} className='text-white sticky top-0 h-16 z-10 text-3xl bg-neutral-800 p-8 flex items-center font-bold'>
        <div style={{ opacity: textOpacity }} className='flex items-center'>
          {playlistData && <Image className='h-8 w-8 mr-6' src={playlistData.images[0].url} width={100} height={100} alt='playlistimage' />}
          <p>{playlistData?.name}</p>
        </div>
      </header>

      <div className='absolute z-20 top-3 right-8 flex items-center justify-center bg-black bg-opacity-70 text-white px-2 pr-3 py-2 gap-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full '>
        <Image className='rounded-full w-7   h-7' src={session?.user.image} width={100} height={100} alt="profile pic" />
        <p className='text-sm font-semibold leading-normal'>Logout</p>
      </div>

      <div onScroll={(e) => changeOpacity(e.target.scrollTop)} className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white px-8 pb-8`}>
          {playlistData && <Image width={500} height={500} alt='playlist-image' className='h-44 w-44' src={playlistData.images[0].url} />}
          <div>
            <p className='text-sm font-bold'>Playlist</p>
            <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold mb-5'>{playlistData?.name}</h1>
            <span className='text-normal block text-lg mb-2 text-neutral-300'> {processDesc}</span>
            <span onClick={() => { setView("otherUsersProfile"); setUserID(userID) }} className='text-sm font-semibold px-2 hover:underline'>{playlistData?.owner.display_name}•</span>
            <span className='text-sm font-semibold'>{playlistData?.followers.total} {playlistData?.followers.total > 1 ? "Likes" : "Like"} • </span>
            <span className='text-sm font-semibold'>{playlistData?.tracks.total} songs </span>
          </div>
        </section>
        <div className='flex gap-8  text-white  border-b border-gray-700 mx-10 mb-2 pb-5 '>
          <p>#</p>
          <p className=' mr-[30rem]'>Title</p>
          <p className=' mr-[30rem]'>Album</p>
          <p><LuClock3 /></p>
        </div>
        <div className='text-white px-8 flex flex-col space-y-1  pb-28'>
          {playlistData?.tracks.items.map((track, i) => {
            // song component
            return <Song
              setView={setView}
              setGlobalArtistId={setGlobalArtistId}
              setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
              setGlobalCurrentSongId={setGlobalCurrentSongId}
              key={track.track.id}
              sno={i}
              track={track.track}
            />
          })}
        </div>
      </div>
    </div>
  )
}
