import React from 'react'
import Image from 'next/image'
import {SearchIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  MenuIcon,LockOpenIcon} from '@heroicons/react/outline'
import {HomeIcon,} from '@heroicons/react/solid'
import {useSession,signIn,signOut} from "next-auth/react"
import {useRouter} from "next/router"
import { useRecoilState} from 'recoil'
import { modalState } from '../recoilAtoms/ModalAtom'
function Header() {

  const {data: session} = useSession()
  const router = useRouter()
  const [open,setOpen] = useRecoilState(modalState)
 
  return (
    <header className='shadow-sm bg-white border-b sticky top-0 z-50 p-0'>
       <div className='flex  justify-between max-w-6xl mx-5 lg:mx-auto'>
           {/* Left */}
          
           <div onClick={()=> router.push("/")} className='hidden sm:inline-grid relative w-24  cursor-pointer'>
               <Image src="https://links.papareact.com/ocw"
                layout='fill'
                objectFit='contain'
               />
               
           </div>
           <div className='sm:hidden relative w-10 flex-shrink-0 cursor-pointer'
             onClick={()=> router.push("/")}
           >
               <Image src="https://links.papareact.com/jjm"
                layout='fill'
                objectFit='contain'
               />
               
           </div>

     
            {/* Center */}
           <div className="max-w-xs">
              <div className='mt-1 relative p-2 rounded-md '>
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className='h-6 w-6 text-gray-400'/>
                </div>
                <input className='bg-gray-50 w-full pl-10 text-sm border-gray-300 rounded-md
                focus:ring-black focus:border-black' 
                type="text" 
                placeholder='Search'
                  />
              </div>
           </div>


            {/* Right */}
           <div className='flex items-center justify-end space-x-4'>
            

              {session? (
                <>
                  <HomeIcon className='navBtn' onClick={()=> router.push("/")} />
                  <MenuIcon className='h-6 md:hidden cursor-pointer'/>
                  <div className="relative hidden md:block ">
                  <PaperAirplaneIcon className='navBtn rotate-45'/>
                  <div className="absolute text-sm -top-1 -right-2 bg-red-600 rounded-full
                  
                  h-5 w-5  flex items-center justify-center text-white animate-pulse">4</div>
                  </div>
                 
                  <PlusCircleIcon className='navBtn' onClick={()=> setOpen(true)} />
                  <UserGroupIcon className='navBtn'/>
                  <HeartIcon className='navBtn'/>
    
                  <img
                    src={session.user.image}
                     alt ="Profile pic"
  
                    className='h-10 rounded-full '
                    onClick={signOut}
                    layout='fill'
                  /> 
                 
                  
              </>    
              ):(
                <div>
                  <button className=' text-xs font-bold  border py-2 px-3 lg:px-5' onClick={signIn} >
                  SignIn
                  
                  </button>
                  
                  </div>
                
                
              )}
            
              
           </div>
       </div>
    </header>
  )
}

export default Header
