
import React from 'react'
import {getProviders,signIn as SignIntoProviders} from "next-auth/react"
import Header from '../../components/Header'
import Image from 'next/image'

function signin({providers}) {


  return (
   
    <>
    <Header/>
    <div className=" flex flex-col items-center justify-center min-h-screen py-2  px-14 text-center">
        <img className='w-72 h-52' src="https://links.papareact.com/ocw" alt='intsagram image'   />
      <p className='font-sm italic text-sm md:text-lg lg:text-2xl pb-6'>
        This is Not a Real App, Its Only For Lwazi Mkhwanazi's Portfolio purposes
      </p>
          <div className="mt-16">
                {Object?.values(providers).map((provider) =>(
                    <div key={provider.name}>
                        <button className='py-2 px-3 bg-blue-500 rounded-sm text-white text-xs' onClick={()=> SignIntoProviders(provider.id,{callbackUrl:"/"})}>
                          Sign In With {provider.name}
                        </button>
                    </div>
                  ))

          }
        
        </div>
    </div>
  
      
    </>
  )
}

export default signin

export async function getServerSideProps(){

  const providers = await getProviders()

  return{
    props:{
      providers,
    }
  }
}

