import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'

export default function Home() {

  const handleClick = () =>{

  }
  return (
    <div className="p-0 sm:px-6 bg-gray-50 h-screen overflow-y-scroll scrollbar-hide mx-auto">
      <Head>
        <title>Instagram 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    {/* Header */}
    <Header/>
     {/* Feed */}
      <Feed/>
      <Modal/>
      {/* Posts */}
     
    </div>
  )
}
