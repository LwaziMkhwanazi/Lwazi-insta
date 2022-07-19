import {Snapshot, useRecoilState} from "recoil"
import {modalState} from "../recoilAtoms/ModalAtom"
import {Transition,Dialog} from "@headlessui/react"
import { Fragment, useRef, useState } from "react"
import {CameraIcon} from '@heroicons/react/outline'
import {db,storage} from "../firebase"
import {addDoc, collection, doc, serverTimestamp, updateDoc} from "@firebase/firestore"
import {getDownloadURL, ref,uploadString} from "@firebase/storage"
import {useSession} from "next-auth/react"
import { async } from "@firebase/util"

function Modal() {
    const [open,setOpen] = useRecoilState(modalState)
    const [selectedFile,setSelectedfile] = useState()
    const [loading,setLoading] = useState(false)
    const filePickerRef = useRef(null)
    const captionRef = useRef(null)
    const {data: session} = useSession()

    const addImageToPost = (e) => {
        const reader = new FileReader()
        if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) =>{
          setSelectedfile(readerEvent.target.result)
        }
    }

 const uploadPost = async()=>{
                        if(loading) return;
                        
                        setLoading(true)

                        //1. Create a Post and add it to firestore
                        //2. Get the Post Id for the newly created Post
                        //3. Upload the image to firestore storage with the post Id
                        //4. get the download url from fb storage and update the original post with the Image
                          const docRef = await addDoc(collection(db,'posts'),{
                              username: session.user.username,
                              caption: captionRef.current.value,
                              profileImg: session.user.image,
                              timestamps: serverTimestamp()
                          })

                          console.log("New Post Created with Id", docRef.id)

                          const imageRef = ref(storage,`posts/${docRef.id}/image`);
                          console.log("New image ref created", imageRef)

                            await uploadString(imageRef,selectedFile,"data_url").then( async Snapshot =>{
                              const downloadUrl = await getDownloadURL(imageRef)

                              console.log("New download url created", downloadUrl)

                              await updateDoc(doc(db,'posts', docRef.id), {
                                image:downloadUrl
                              })
                            })
                        
                            setOpen(false)
                            setLoading(false)
                            setSelectedfile(null)
 }

  return  <Transition appear show={open} as={Fragment}>
  <Dialog as="div" className="relative z-10" onClose={()=>setOpen(false)}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-75" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >


          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 align-middle shadow-xl transition-all">
               {selectedFile? (
                <img src={selectedFile} alt="post image" 
                  className="w-full object-contain cursor-pointer"
                  onClick={()=>setSelectedFile(null)}
                />
               ):( 
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer mb-4"
                  onClick={()=> filePickerRef.current.click()}
                >
                 
                   <CameraIcon
                    className="h-6 w-6 text-red-600 self-center"
                    aria-hidden="true"
                   />
                </div>)}
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 text-center mb-3"
            >
              Upload a Photo
            </Dialog.Title>
            <div className="mt-3">

              <div className="mt-2">
              <input 
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange = {addImageToPost}
                  />
              </div>
              <div className="mt-2">
                  <input 
                    type="text"
                    className="border-none focus:ring-0 w-full text-center"
                    placeholder="Please enter caption..."
                    ref={captionRef}
                  />
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                disabled={!selectedFile}
                className="inline-flex justify-center w-full  rounded-md border border-transparent 
                 px-4 py-2 text-sm shadow-sm  font-medium text-white bg-red-600 hover:bg-red-700 
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:bg-gray-300"
                onClick={uploadPost}
              >
               {loading? "Uploading..." : "Upload Post"}
              </button>
            </div>
          </Dialog.Panel>


        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>
  
}

export default Modal
