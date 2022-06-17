import Stories from "./Stories"
import Posts from "./Posts"
import MiniProfile from "./MiniProfile"
import Suggestions from "./Suggestions"
import {useSession} from "next-auth/react"

function Feed() {

  const {data: session} = useSession()
  return (
    <main className={`grid space-x-5 grid-cols-1 md:grid-cols-3 md:max-w-3xl  xl:max-w-6xl mx-auto ${ !session && "!grid-cols-1 !max-w-2xl"}`}>
      {/* section */}
      <section className="col-span-2">
               {/* stories */}
               <Stories/>
               <Posts/>
      </section>

     {session && (
       <section className="hidden md:inline-grid">       
       <div className="fixed top-20">
                 {/* mini profile */}
             <MiniProfile/>
             {/* seggestions */}
             <Suggestions/>
       </div>
  </section>
     )}
     

     
    </main>
  )
}

export default Feed
