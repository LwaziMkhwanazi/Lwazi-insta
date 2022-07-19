import React, { useEffect, useState } from 'react'
import {BookmarkIcon,ChatIcon,DotsHorizontalIcon,EmojiHappyIcon, HeartIcon,PaperAirplaneIcon} from "@heroicons/react/outline"
import {useSession} from "next-auth/react"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'


function Post({id,username,img,userImage,caption}) {

  const [comment,setComment] = useState("")
  const [comments,setComments] = useState([])
  const [likes,setLikes] = useState([])
  const {data:session} = useSession()

  // Adding A Comment to The backend
   const sendComment = async(e)=>{
    e.preventDefault()
    const commentToSend = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'),{
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamps: serverTimestamp()
    })
   }

   // Pulling Comments From The Database
  //  useEffect(
  //   ()=>
  //   onSnapshot(
  //     query(collection(db, "posts", id,"comments"),
  //      orderBy("timestamp","desc")), 
  //    (snapshot) => setComments(snapshot.docs)),[db])

  useEffect(()=>{
     onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamps','desc')), snapshot =>{
      setComments(snapshot.docs)
    })
  
  },[db,id])
  useEffect(()=>{
     onSnapshot(query(collection(db,'posts',id,'likes')), snapshot =>{
      setLikes(snapshot.docs)
    })
  
  },[db,id])

  console.log("comments", comments)
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
                <span className=' font-bold mr-6'>{username}</span>
                  {caption}
              </p>
         
 
      {/* comments  */}
      {comments.length > 0 && (
        <div className = "ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map( comment =>(
            <div key={comment.key} className ='flex items-center space-x-2 mb-1' >
                <img className='h-7 rounded-full' src={comment.data().userImage} alt=''/>
                <p className='text-xs flex-1'>
                  <span className='font-bold pr-2 text-blue-600 text-sm'>{comment.data().username}</span>{" "}
                  {comment.data().comment}
                  </p>
                  <Moment fromNow className='pr-5 text-xs text-gray-500'>
                      {comment.data().timestamps?.toDate()}
                  </Moment>
            </div>
          ))}
          
        </div>
      )}
      
      {/* input box */}
      {session && (
        <form className='flex p-4 items-center space-x-2'>
        <EmojiHappyIcon className='h-7'/>
          <input className='flex-1 outline-none focus:ring-0'
            value={comment}
            onChange={e =>setComment(e.target.value)}
          placeholder='Add a Comment' />
          <button 
            className='font-semibold text-blue-400'
            // disabled={!comment.trime()}
            onClick={sendComment}
          >
            Post
            </button>
      </form>
      )}
      
    </div>
  )
}

export default Post
