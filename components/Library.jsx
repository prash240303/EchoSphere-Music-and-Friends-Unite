import React , {useState, useEffect}from 'react'
import {  useSession } from 'next-auth/react'

export default function Library() {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        })
        const data = await response.json()
        setPlaylists(data.items)
        console.log(playlists)
      }
    }
    f()
  }, [session])
  return (
    <div className='flex-grow h-screen'>
      <header className='text-white sticky top-0 h-16 z-10 text-3xl bg-neutral-800 p-8 flex items-center font-bold'>

      </header>
      <div className='absolute z-20 top-3 right-8 flex items-center justify-center bg-black bg-opacity-70 text-white px-2 pr-3 py-2 gap-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full '>
        <img className='rounded-full w-7   h-7' src={session?.user.image} alt="profile pic" />
        <p className='text-sm font-semibold leading-normal'>Logout</p>
      </div>
      <div className="flex flex-col gap-4 px-8 h-screen overflow-y-screen">
        <h2 className='text-xl font-bold'>Playlists</h2>
        <div className="flex flex-wrap gap-6 mb-48">
          {playlists?.map((playlist) => {
            return <div key={playlist.id} className='cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
