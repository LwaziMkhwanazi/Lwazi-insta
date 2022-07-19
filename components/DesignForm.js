
function DesignForm() {
  return (
    <div className="px-6">
     <div>
     <h3 className='font-semibold text-right pt-9'>step 1 of 4</h3>
      <h1 className='text-5xl font-bold font-roboto text-center mt-36'>Welcome</h1>
      <h4 className='text-center text-sm max-w-xs mx-auto mt-20'>Add a photo so that you can customise your experiance</h4>
      <div className='bg-gray-300 w-48 h-48 rounded-full m-auto mt-20 relative'>
        <UserIcon className='h-20 w-20 bg-gray-300 absolute top-12 left-14'/>
      </div>
      <button className='bg-yellow-300 font-bold w-full py-2 px-4 rounded-3xl mt-36'>Upload photo</button>
      <button className='bg-white font-bold w-full py-2 px-4 rounded-3xl mt-2 text-gray-400'>
        Skip this Action</button>
     </div>
  </div>
  )
}

export default DesignForm
