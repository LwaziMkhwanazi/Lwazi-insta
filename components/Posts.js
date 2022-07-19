import React, { useEffect, useState } from 'react'
import Post from './Post'
import {onSnapshot,query,orderBy,collection} from "@firebase/firestore"

import { db } from '../firebase'

function Posts() {

  
const [posts,setPosts] = useState([])

useEffect(()=>{
  const unsubcribe = onSnapshot(query(collection(db,'posts'),orderBy('timestamps','desc')), snapshot =>{
    setPosts(snapshot.docs)
  })

  return unsubcribe
},[db])

  return (
    <div>
      {posts.map( post => (
        
        <Post
        key={post.id}
        id={post.id}
        username ={post.data().username}
        img ={post.data().image}
        userImage = {post.data().profileImg}
        caption = {post.data().caption}
        /> 
       
      ))}
    </div>
  )
}

export default Posts
