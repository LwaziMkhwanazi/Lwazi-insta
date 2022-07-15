import React, { useEffect, useState } from 'react'
import Post from './Post'
import {onSnapshot,query,orderBy,collection} from "@firebase/firestore"

import { db } from '../firebase'

function Posts() {

  // const posts = [
  //   {
  //     id:"123",
  //     username: "Zenane",
  //     userImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/301.jpg",
  //     img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/799.jpg",
  //     caption:"Top Class Software Developer",
  //   },
  //   {
  //     id:"456",
  //     username: "Elton",
  //     userImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/301.jpg",
  //     img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/735.jpg",
  //     caption:"Top of The Class Software Developer",
  //   },
  // ]
const [posts,setPosts] = useState([])

console.log(posts)
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
        userImage = {post.data().userImage}
        caption = {post.data().caption}
        /> 
       
      ))}
    </div>
  )
}

export default Posts
