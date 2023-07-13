import React from 'react'

export default function Player() {
  return (
    <div className='flex w-full items-center justify-between shrink-0 border-t bg-black h-full text-white border-white md:inline-flex'>
      <div>image</div>
      <div className='flex flex-col gap-1 items-center justify-center'>
        <div>pause play</div>
        <div>progress</div>
      </div>
      <div>audio settings</div>
    </div>
  )
}
