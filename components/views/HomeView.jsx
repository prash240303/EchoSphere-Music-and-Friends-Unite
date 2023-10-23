// import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { signOut, useSession } from 'next-auth/react';
// import React, { useEffect, useRef, useState } from 'react';
// import FeaturedPlaylists from '../FeaturedPlaylists';
// import SearchResults from '../SearchResults';
// import RecentlyPlayedList from '../RecentlyPlayedList';
// // import "../../styles/globals.css"
// import '../../styles/profilebutton.module.css';

// const HomeView = ({ setView, setGlobalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setGlobalArtistId }) => {
//     const { data: session } = useSession()
//     const [searchData, setSearchData] = useState(null)
//     const [inputValue, setInputValue] = useState('')
//     const inputRef = useRef(null)

//     async function updateSearchResults(query) {
//         const response = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
//             q: query,
//             type: ["artist", "playlist", "track"]
//         }), {
//             headers: {
//                 Authorization: `Bearer ${session.accessToken}`
//             }
//         })
//         const data = await response.json()
//         setSearchData(data)
//     }
//     // useEffect(() => {
//     //     inputRef.current.focus()
//     // }, [inputRef])
//     function toggleDropdown() {
//         var dropdownMenu = document.getElementById("dropdownMenu");
//         dropdownMenu.classList.toggle("active");
//     }
//     return (
//         <div className='flex-grow h-screen overflow-y-auto'>
//             <div className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white '>
//                 <div className='dropdown-button flex-grow overflow-y-auto bg-black' onclick={()=>toggleDropdown()}>
//                     <span>&#9776;</span>
//                 </div>
//                <div className="dropdown-menu flex flex-col" id="dropdownMenu">
//                     <a href="#">Option 1</a>
//                     <a href="#">Option 2</a>
//                     <a href="#">Option 3</a>
//                     <a href="#">Option 4</a>
//                     <a href="#">Option 5</a>
//                 </div>
//             </div>
//             {/* <div class="dropdown-container absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ">
//                 <div className='dropdown-button flex-grow h-screen overflow-y-auto' onclick="toggleDropdown()">
//                     <span>&#9776;</span>
//                 </div>
//                 <div class="dropdown-menu" id="dropdownMenu">
//                     <a href="#">Option 1</a>
//                     <a href="#">Option 2</a>
//                     <a href="#">Option 3</a>
//                     <a href="#">Option 4</a>
//                     <a href="#">Option 5</a>
//                 </div>
//             </div> */}
//             <div className='mt-20'>
//                 <RecentlyPlayedList setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} />

//             </div>
//             <div className='mt-10 '>
//                 <FeaturedPlaylists
//                     setView={setView}
//                     setGlobalPlaylistId={setGlobalPlaylistId}
//                 />
//             </div>
//         </div>
//     );
// }
// export default HomeView;

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import FeaturedPlaylists from '../FeaturedPlaylists';
import SearchResults from '../views/SearchResults';
import RecentlyPlayedList from '../RecentlyPlayedList';
import '../../styles/profilebutton.module.css';
import Image from 'next/image';
import Link from 'next/link';
const HomeView = ({ setView, setGlobalPlaylistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, setGlobalArtistId }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const { data: session } = useSession()
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleDropdown = () => {
    setMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  return (
    <div className='flex-grow h-screen overflow-y-auto'>
      <div className={`absolute z-20 top-6 right-12 dropdownContainer `}>
        <div className="dropdown-button hover:scale-110  border-4 rounded-full border-gray-600 dropdownButton text-white" >
          <Image className='rounded-full  w-8 h-8 cursor-pointer' src={session?.user.image} alt="profile pic" onClick={toggleDropdown}  width={100} height={100} />
        </div>
      </div>

      {!isMenuOpen && (
        <div className=" text-white  z-20  absolute top-[74px] right-12  bg-spotify-gray rounded-lg shadow-xl">
          <nav className="flex flex-col p-1 text-base ">
            <Link
              href=""
              onClick={() => setView("userProfile")} // Use a function reference
              className='pl-4  py-3 rounded-lg hover:bg-gray-600'
            >
              Profile
            </Link>

            <Link
              href=""
              className='pl-4  py-3 rounded-lg hover:bg-gray-600'
            >
              Settings
            </Link>
            <Link
              href=""
              className='pl-4 py-3 pr-4 rounded-lg hover:bg-gray-600'

            >
              Upgrade to Premium
            </Link>
            <hr className='border-gray-600' />
            <Link
              href=""
              className='pl-4 py-3  pr-4 rounded-lg hover:bg-gray-600'
            >
              Community
            </Link>

          </nav>
        </div>
      )}
      <div className='mt-24'>
        <RecentlyPlayedList setView={setView} setGlobalPlaylistId={setGlobalPlaylistId} />
      </div>
      <div className='mt-10 '>
        <FeaturedPlaylists
          setView={setView}
          setGlobalPlaylistId={setGlobalPlaylistId}
        />
      </div>
    </div >
  );
}

export default HomeView;
