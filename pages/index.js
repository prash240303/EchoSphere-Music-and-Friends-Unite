import Artist from "@/components/views/ArtistView"
import HomeView from "@/components/views/HomeView"
import Library from "@/components/views/LibraryView"
import LikedSongs from "@/components/users/LikedSongs"
import Player from "@/components/Player"
import PlaylistView from "@/components/views/PlaylistView"
import Search from "@/components/views/Search"
import Sidebar from "@/components/Sidebar"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import OtherUsersProfile from "@/components/users/OtherUsersProfile"
import UserProfileView from "@/components/views/UserProfileView"
export default function Home() {
  const [view, setView] = useState("home") // ["search", "library", "playlist", "artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null)
  const [globalArtistId, setGlobalArtistId] = useState(null)
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null)
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false)
  const [userID, setUserID] = useState(null)

  return (
    <>
      <main className="h-screen overflow-hidden bg-black">
        <div className="flex w-full">
          <Sidebar
            view={view}
            setView={setView}
            setGlobalPlaylistId={setGlobalPlaylistId}
          />
          {view === "home" && <HomeView
            setView={setView}
            setGlobalPlaylistId={setGlobalPlaylistId}
          />
          }
          {view === "playlist" && <PlaylistView
            setView={setView}
            setGlobalArtistId={setGlobalArtistId}
            globalPlaylistId={globalPlaylistId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setUserID={setUserID}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          />}
          {view === "search" && <Search
            setView={setView}
            setGlobalPlaylistId={setGlobalPlaylistId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
            setGlobalArtistId={setGlobalArtistId}
          />}
          {view === "library" && <Library
            setView={setView}
            setGlobalPlaylistId={setGlobalPlaylistId}
          />}
          {view === "artist" && <Artist
            setView={setView}
            globalArtistId={globalArtistId}
            setGlobalArtistId={setGlobalArtistId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          />}
          {view === "likedSongs" && <LikedSongs
            setView={setView}
            globalArtistId={globalArtistId}
            setGlobalArtistId={setGlobalArtistId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          />}
          {view === "userProfile" && <UserProfileView
            setView={setView}
            globalArtistId={globalArtistId}
            setGlobalArtistId={setGlobalArtistId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setUserID={userID}
          />}
          {
            view == "otherUsersProfile" && <OtherUsersProfile
              setView={setView}
              globalArtistId={globalArtistId}
              setGlobalArtistId={setGlobalArtistId}
              setGlobalCurrentSongId={setGlobalCurrentSongId}
              userID={userID}
            />}
        </div>

        <div className="sticky z-20 bottom-0 w-full">
          <Player
            globalCurrentSongId={globalCurrentSongId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
            globalIsTrackPlaying={globalIsTrackPlaying}
          />
        </div>
      </main>

    </>
  )
}