import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import {useSession} from "next-auth/react"
import { data } from "autoprefixer";

function Suggestions() {
  const {data: session} = useSession()
  const [suggestions, setSuggestions] = useState([]);

    console.log(data)
  useEffect(() => {
    const users = [...Array(5)].map((_, i) => ({
      name: faker.name.findName(),
      company: faker.company.companyName(),
      avatar: faker.image.avatar(),
      id: i,
    }));
    setSuggestions(users);
  }, []);
  return (
    <div className='mt-4'>
      <div className='flex items-center justify-between text-sm mb-5'>
        <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
        <button className='text-gray-600 font-bold'>See All</button>
      </div>

      <div>
        {suggestions.map((profile) => (
          <div
            key={profile.id}
            className='flex items-center justify-between mt-3'
          >
            <img
              className='w-10 h-10 rounded-full border p-[2px]'
              src={profile.avatar}
            />
            <div className='flex-1 ml-4'>
              <h2 className='text-sm font-semibold'>{profile.name}</h2>
              <h3 className='text-sm text-gray-400'>
                Works at {profile.company}
              </h3>
            </div>

            <button className='text-sm text-blue-400 font-semibold'>
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
