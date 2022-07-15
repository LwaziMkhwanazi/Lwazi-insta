import React from 'react'
import {useSession,signIn,signOut} from "next-auth/react"
function MiniProfile() {
  const {data:session} = useSession()



  return (
    <div className = "flex items-center mt-7 justify-between">
        <img 
          className='w-16 h-16 rounded-full border p-[2px] '
          src={session?.user?.image}
          alt='mini profile image'
        />

          <div className='flex-1 mx-4'>
              <h2 className='font-bold'>
                {session?.user?.username}
              </h2>
              <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
          </div>

          <button className='text-blue-400 text-sm font-semibold' onClick={signOut}>Sign out</button>
        </div>
  )
}

export default MiniProfile