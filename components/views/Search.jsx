import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import FeaturedPlaylists from '../FeaturedPlaylists';
import SearchResults from './SearchResults';
import Image from 'next/image';

const Search = ({ setView, setGlobalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setGlobalArtistId }) => {
    const { data: session } = useSession()
    const [searchData, setSearchData] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    async function updateSearchResults(query) {
        const response = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
            q: query,
            type: ["artist", "playlist", "track"]
        }), {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        setSearchData(data)
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef])

    return (
        <div className='flex-grow h-screen'>
            <header className='text-white sticky top-0 mb-8  h-20 z-10 text-5xl flex items-center px-8'>
                <MagnifyingGlassIcon className='absolute top-7 left-11 h-6 w-6 text-neutral-500' />
                <input value={inputValue} onChange={async (e) => {
                    setInputValue(e.target.value)
                    await updateSearchResults(e.target.value)
                }} ref={inputRef} className='rounded-full hover:ring-1  hover:ring-gray-400 bg-spotify-gray w-96 pl-12   text-white text-base py-3  flex  font-normal outline-0' placeholder='search songs , playlists , users or artists' />
            </header>
            <div onClick={() => signOut()} className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <Image width={100} height={100} className='rounded-full w-7 h-7' src={session?.user.image} alt="profile pic" />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
            <div>
  {inputValue === '' ? (
    <FeaturedPlaylists
      setView={setView}
      setGlobalPlaylistId={setGlobalPlaylistId}
    />
  ) : searchData === null ? (
    <div>Loading...</div>
  ) : (
    searchData.playlists && searchData.tracks && searchData.artists ? (
      <SearchResults
        playlists={searchData.playlists.items}
        songs={searchData.tracks.items}
        artists={searchData.artists.items}
        setView={setView}
        setGlobalPlaylistId={setGlobalPlaylistId}
        setGlobalCurrentSongId={setGlobalCurrentSongId}
        setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
        setGlobalArtistId={setGlobalArtistId}
      />
    ) : (
      <div>Loading...</div>
    )
  )}
</div>


        </div>
    );
}

export default Search;