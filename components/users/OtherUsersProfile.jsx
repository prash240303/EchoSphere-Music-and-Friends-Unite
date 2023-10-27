"use client"
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { PlayIcon } from '@heroicons/react/24/outline'
import { set, shuffle } from 'lodash';

const colors = [
  'from-blue-500',
]

const OtherUsersProfile = ({ globalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setView, setGlobalArtistId, userID }) => {
  const [hover, setHover] = useState(false)
  const { data: session } = useSession()
  const [color, setColor] = useState(null)

  const [opacity, setOpacity] = useState(0)
  const [userImageURL, setUserImageURL] = useState(null)
  const [userInfo, setUserInfo] = useState(null);
  const [textOpacity, setTextOpacity] = useState(0)

  console.log("user id", userID)
  async function getUserProfileData() {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    )
    const data = await response.json()
    console.log("user data", data)
    return data;
  }

  async function getUserImage() {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if the 'images' property exists and has at least one image
      if (data.images && data.images.length > 0) {
        return data.images[1].url;
      } else {
        // Handle the case where there are no images
        console.warn('No images found for the user.');
        return null; // Or provide a default image URL
      }
    } catch (error) {
      console.error(error);
      return null; // Handle the error gracefully
    }
  }


  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        setUserInfo(await getUserProfileData())
        setUserImageURL(await getUserImage())
      }
    }
    f();
  }, [session]);

  function changeOpacity(scrollPos) {
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
        <Image width={100} height={100} className='rounded-full w-7   h-7' src={session?.user.image} alt="profile pic" />
        <p className='text-sm font-semibold leading-normal'>Logout</p>
      </div>

      <div onScroll={(e) => changeOpacity(e.target.scrollTop)} className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
        <section className={`flex items-center justify-start space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white px-8 pb-8`}>
          {/* {playlistData && <img className='h-44 w-44' src={playlistData.images[0].url} />} */}
          <div className='rounded-full overflow-hidden shadow-lg h-48 w-48 mt-16 '>
            {userImageURL && <Image src={userImageURL} width={5000} height={5000} alt='profile-pic' />}
          </div>
          <div className='flex flex-col items-start h-full mt-52'>
            <div className='font-semibold mb-2'>Profile</div>
            <div className=' font-extrabold mb-6 text-7xl'>{userInfo?.display_name}</div>
            {/* <div className=' font-extrabold mb-6 text-7xl'>{Rhea}</div> */}
            <div className='font-semibold text-sm'>10 Public Playlists &#x22C5; {userInfo?.followers.total} Followers &#x22C5; 89 Following </div>
            {/* <div className='font-semibold text-sm'>10 Public Playlists &#x22C5; 40 Followers &#x22C5; 89 Following </div> */}
          </div>

          <div>

          </div>
        </section>
        <div className='flex gap-8  text-white  border-b border-gray-700  mb-2 pb-5 '>

        </div>
        <h2 className="text-2xl font-bold mb-8 text-white px-8"> Top artist this month</h2>
        {/* <div className="px-8 w-screen scrollbar-hide  firefox-scrollbar overflow-x-scroll">
          <div className="flex gap-4">
            {topArtists && topArtists.map((artist) => (
              <div
                onClick={() => setGlobalArtistId(artist.id)}
                key={artist.id}
                className="cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4"
              >
                <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                  <PlayIcon className="h-6 w-6 text-black" />
                </div>
                <Image
                  width={500}
                  height={500}
                  alt='artist-pic'
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
        <h2 className="text-2xl font-bold mb-8 text-white px-8">Following</h2>
        {/* <div className="px-8 w-screen scrollbar-hide  firefox-scrollbar overflow-x-scroll">
          <div className="flex gap-4">
            {followingArtists && followingArtists.map((artist) => (
              <div
                onClick={() => setGlobalArtistId(artist.id)}
                key={artist.id}
                className="cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4"
              >
                <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                  <PlayIcon className="h-6 w-6 text-black" />
                </div>
                <Image
                  width={500}
                  height={500}
                  alt='artist-pic'
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

export default OtherUsersProfile