import faker from "@faker-js/faker"
import Story from "./Story"
import { useEffect } from "react"
import { useState } from "react"
import {useSession} from "next-auth/react"

function Stories() {

    const [users,setUsers] = useState([])
    const {data:session} = useSession()
     
    useEffect(()=> {
        const suggestion = [...Array(20)].map((_,i) =>({
           name: faker.name.findName(),
           avatar: faker.image.avatar(),
            id:i,
           
        }))

       
        setUsers(suggestion)
    },[])


  return (
    <div className="flex space-x-2 p-6 bg-white border border-gray-200 rounded-sm mt-7 overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && <Story img = {session?.user?.image} username = {session?.user?.username}/>}
      {users?.map( profile => (
          <Story key={profile.id} img = {profile.avatar} username = {profile.name} />
      ))}
    </div>
  )
}

export default Stories
