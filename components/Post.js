import React from 'react'
import {BookmarkIcon,ChatIcon,DotsHorizontalIcon,EmojiHappyIcon,HandIcon, HeartIcon,PaperAirplaneIcon} from "@heroicons/react/outline"
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
 import {useSession} from "next-auth/react"


function Post({id,username,img,userImage,caption}) {
  console.log(userImage)
  const {data:session} = useSession()
  return (
    <div className='bg-white border rounded my-7 '>
     
      {/* Header */}
        <div className="flex items-center p-5">
          <img 
            src={userImage}
              className = "rounded-full h-12 w-12 mr-3 border p-1 object-contain"
            alt = "user Image icon"
          />
          <p className='flex-1 font-bold'>{username}</p>

          <DotsHorizontalIcon className='h-5'/>
        </div>

      {/* img */}
      <img src = {img} className =" w-full object-cover px-2" alt = "Post Image"/>

      {/* buttons  */}
          {session && (
             <div className='flex items-center justify-between p-4'>
             <div className='flex space-x-4'>
               <HeartIcon className='btn'/>
               <ChatIcon className='btn'/>
               <PaperAirplaneIcon className='btn'/>
             </div>
           <div>
             <BookmarkIcon className='btn'/>
           </div>
         </div>

          )}
     
      {/* caption  */}
         
              <p className='p-5 truncate'>
                <span className='mr-1 font-bold'>{username}</span>
                  {caption}
              </p>
         

      {/* comments  */}

      {/* input box */}
      {session && (
        <form className='flex p-4 items-center space-x-2'>
        <EmojiHappyIcon className='h-7'/>
          <input className='flex-1 outline-none focus:ring-0' placeholder='Add a Comment' />
          <button className='font-semibold text-blue-400'>Like</button>
      </form>
      )}
      
    </div>
  )
}

export default Post
