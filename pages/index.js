"use client"
import Player from '@/components/Player'
import Playlistveiw from '@/components/Playlistveiw'
import Sidebar from '@/components/Sidebar'
import Library from '@/components/Library'
import Artist from "@/components/Artist"
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'


export default function Home() {

  const [view, setView] = useState("search");  //default is set to the search lib
  const [globalPlaylistId, setGlobalPlaylistId] = useState()
  const [globalArtistId, setGlobalArtistId] = useState(null)
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null)
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false)
  return (
    <main className='h-screen overflow-hidden'>
      <div className='flex w-full h-screen overflow-hidden no-scrollbar bg-black' >

        <Sidebar
          view={view}
          setView={setView}
          setGlobalPlaylistId={setGlobalPlaylistId}
        />
        {view === "playlist" && <Playlistveiw
          setView={setView}
          setGlobalArtistId={setGlobalArtistId}
          globalPlaylistId={globalPlaylistId}
          setGlobalCurrentSongId={setGlobalCurrentSongId}
          setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
        />}

        {view === "library" && <Library
          setView={setView}
          setGlobalPlaylistId={setGlobalPlaylistId}
        />}
        {view === "artist" && <Artist
          setView={setView}
          globalArtistId={globalArtistId}
          setGlobalArtistId={setGlobalArtistId}
        // setGlobalCurrentSongId={setGlobalCurrentSongId}
        // setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
        />}
      </div>
      <div className="sticky z-20 bottom-0 w-full">
        <Player
          globalCurrentSongId={globalCurrentSongId}
          setGlobalCurrentSongId={setGlobalCurrentSongId}
          setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          globalIsTrackPlaying={globalIsTrackPlaying}
        />
      </div>    </main>
  )
}

{/* {playlists.map((playlists) => <div key={playlists.id}> {playlists.name} </div>)} */ }

