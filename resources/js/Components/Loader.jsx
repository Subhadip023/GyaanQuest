import React from 'react'

function Loader() {
  return (
    <div className='fixed w-screen h-screen bg-white/80  z-50 flex flex-col gap-y-2 items-center justify-center'>
          <div className="loader"></div>
          <div className="loader2"></div>

    </div>
  )
}

export default Loader