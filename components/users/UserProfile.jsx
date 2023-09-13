// import React from 'react'

// function UserProfile() {
//   const { data: session } = useSession()
//   const [hover, setHover] = useState(false)
//   const [opacity, setOpacity] = useState(0)
//   const [textOpacity, setTextOpacity] = useState(0)
//   const [userProfileData, setUserProfileData] = useState(null)
//   const [playlistData, setPlaylistData] = useState(null)
//   const [followersData, setFollowersData] = useState([])
//   const [followingData, setFollowingData] = useState([])


//   return (
//     <div className='flex-grow h-screen'>
//       <header style={{ opacity: opacity }} className='text-white sticky top-0 h-16 z-10 text-3xl bg-neutral-800 p-8 flex items-center font-bold'>
//         <div style={{ opacity: textOpacity }} className='flex items-center'>
//           {/* {playlistData && <Image className='h-8 w-8 mr-6' src={playlistData.images[0].url} />} */}
//           <p>Liked songs</p>
//         </div>
//       </header>
//       <div className='absolute z-20 top-3 right-8 flex items-center justify-center bg-black bg-opacity-70 text-white px-2 pr-3 py-2 gap-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full '>
//         <img className='rounded-full w-7   h-7' src={session?.user.image} alt="profile pic" />
//         <p className='text-sm font-semibold leading-normal'>Logout</p>
//       </div>


//       <div onScroll={(e) => changeOpacity(e.target.scrollTop)} className='relative -top-20 h-screen overflow-y-scroll bg-neutral-900'>
//         <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 from-blue-500 h-80 text-white px-8 pb-8`}>
//           <div>
//             <p className='text-sm font-bold'>Playlist</p>
//             <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold mb-5'>Liked Songs</h1>
//             <span className='text-normal block text-lg mb-2 text-neutral-300'></span>
//             <span className='text-sm font-semibold px-2 hover:underline'>me •</span>
//             <span className='text-sm font-semibold'> 20 songs </span>
//           </div>
//         </section>
//         <div className='flex gap-8  text-white  border-b border-gray-700 mx-10 mb-2 pb-5 '>
//           Top Artists this month
//           <div className="my-10">
//             <h2 className="text-2xl font-bold mb-8 px-8">Related artists</h2>
//             <div className="px-8 w-screen scrollbar-hide  firefox-scrollbar overflow-x-scroll">
//               {/* <div className="flex gap-4">
//               {relatedArtists.map((artist) => (
//                 <div
//                   onClick={() => setGlobalArtistId(artist.id)}
//                   key={artist.id}
//                   className="cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4"
//                 >
//                   <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
//                     <PlayIcon className="h-6 w-6 text-black" />
//                   </div>
//                   <img
//                     className="w-48 h-48 mb-4 rounded-full"
//                     src={artist.images[0].url}
//                   />
//                   <p className="text-base text-white mb-1 w-48 truncate">
//                     {artist.name}
//                   </p>
//                   <p className="text-sm text-neutral-400 mb-8 w-48 truncate">
//                     Artist
//                   </p>
//                 </div>
//               ))}
//             </div> */}
//             </div>
//           </div>

//           <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold mb-5'>Public Playlists</h1>

//         </div>


//       </div>

//     </div>
//   )
// }

// export default UserProfile