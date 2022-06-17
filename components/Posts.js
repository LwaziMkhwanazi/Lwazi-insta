import React from 'react'
import Post from './Post'

function Posts() {

  const posts = [
    {
      id:"123",
      username: "Zenane",
      userImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/301.jpg",
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/799.jpg",
      caption:"Top Class Software Developer",
    },
    {
      id:"456",
      username: "Elton",
      userImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/301.jpg",
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/735.jpg",
      caption:"Top of The Class Software Developer",
    },
  ]

  return (
    <div>
      {posts.map( post => (
        <Post
        key={post.id}
        id={post.id}
        username ={post.username}
        img ={post.img}
        userImage = {post.userImage}
        caption = {post.caption}
        /> 
       
      ))}
    </div>
  )
}

export default Posts
