"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/Header';
import LoadingOverlay from './components/Overlay';
import Dropdown from './components/Dropdown';
import AvatarListModal from './components/AvatarListModal';
import ContactForm from './components/Transform';
import SimpleForm from './components/SimpleForm';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //Request body to sent
  const [script, setScript] = useState('');
  const [videoTitle, setVideoTitle] = useState('');  
  const [avatarId, setAvatarId] = useState('');
  const [voiceId, setVoiceId] = useState('');
  const [result, setResult] = useState(null)

  //Data listed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voiceData, setVoiceData] = useState(null);
  const [avatarData, setAvatarData] = useState(null);
  const [onSelectImage, setOnSelectImage] = useState(null);

  const handleRemoveImage = () => {
    // Clear the selected image and its preview
    setOnSelectImage(null)
  };

  const handleGenerateVoiceover = async (nama, email) => {
    // if (!videoTitle || videoTitle === '') {
    //   // You can add validation or display an error message if the title is empty
    //   toast("You must enter a video title");
    //   return;
    // }
    // if (!onSelectImage ) {
    //   //You can add validation or display an error message if the title is empty
    //   toast("You must select an image");
    //   return;
    // }
    // if (!script || script === '') {
    //   // You can add validation or display an error message if the title is empty
    //   toast("You must enter some text");  
    //   return;
    // }
    setIsLoading(true);

    const requestBody = {
      // avatarId,
      // voiceId,
      // script,
      // videoTitle,
      nama,
      // company
      email
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    // console.log(options, "data dari form")

    try {
      const response = await fetch('/api/express/create', options);

      if (response.ok) {
        const data = await response.json();
        setResult(data)
        setIsLoading(false);
        // setResultVideoURL(data.id)
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
    }
  }
  
  const gotoResultPage = (id) => {
    router.push(`/pages/results/${id}`)
  }

  // To check data is picked on parent component
  const handlePickedList = (item) => {
    alert(item)
  }

  //Get voices data
  useEffect(() => {
    // async function fetchVoiceData(){
    //   const response = await fetch('/api/voices/');
    //   const data = await response.json();
    //   setVoiceData(data)
    // }
    // fetchVoiceData()
  }, []);

  //Get avatar data
  useEffect(() => {
    // async function fetchAvatarData(){
    //   const response = await fetch('/api/avatars/');
    //   const data = await response.json();
    //   setAvatarData(data)
    // }
    // fetchAvatarData()
  }, []);

  const avatarList = [
    'avatar1.jpg',
    'avatar2.jpg',
    'avatar3.jpg',
    'avatar4.jpg',
    'avatar5.jpg',
    // Add more avatar URLs as needed
  ];

  return (
    <div>
      <Header />
      {result ? (
        <main className="bg-gray-100 flex min-h-screen flex-col items-center justify-start p-24">
          <div className="bg-white rounded shadow-md p-6 text-center">
            <h1 className="text-2xl text-black font-semibold mb-10">Success to input your data, your Id is {result.id}</h1>
            <button 
              onClick={() => gotoResultPage(result.id)}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded px-4 py-2 w-full"
              >
              Click here to see the result
            </button>
          </div>
        </main>
      ):(
        // <main className="bg-gray-100 flex min-h-screen flex-col items-center justify-between p-24">
        //   {isLoading && <LoadingOverlay state={"none"}/>}
        //   <ToastContainer />
        //   <div className="min-h-screen flex items-start justify-center">
        //   {avatarData && (
        //     <AvatarListModal
        //       isOpen={isModalOpen}
        //       onRequestClose={() => setIsModalOpen(false)}
        //       avatarList={avatarData}
        //       onSelectImage={setOnSelectImage}
        //       setAvatarId={setAvatarId}
        //     />
        //   )}
        //     <div className="bg-white p-8 rounded shadow-md w-96">
        //       <h1 className="text-2xl text-black font-semibold mb-4">Image Voiceover Generator</h1>

        //       {/* This is the feature to upload image -> Maybe can be implemented later on */}
        //       {/* <div className="mb-4 relative" id="file-input-container">
        //         Input for image selection
        //         <input
        //           type="file"
        //           id="image"
        //           onChange={handleImageChange}
        //           className="border rounded px-3 py-2 w-full opacity-0 absolute cursor-pointer"
        //         />
        //         <label htmlFor="image" className="bg-purple-500 hover:bg-purple-600 text-white text-lg rounded px-4 py-2 w-full cursor-pointer">
        //           Choose Image to Generate
        //         </label>
        //       </div> */}
        //       <button
        //         onClick={() => setIsModalOpen(true)}
        //         className="bg-purple-500 hover:bg-purple-600 text-white rounded px-4 py-2 w-full"
        //       >
        //         Choose Avatar to Generate
        //       </button>

        //       {/* Display image preview if available */}
        //       {onSelectImage && (
        //         <div className="mb-4">
        //           <label className="block text-base font-medium text-gray-600">Image Preview:</label>
        //           <img src={onSelectImage.menuImageUrl} alt="Image Preview" className="border rounded px-3 py-2 w-full mr-4 my-3" />
        //           <button
        //             onClick={handleRemoveImage}
        //             className="bg-red-500 hover-bg-red-600 text-white rounded px-4 py-2 w-full"
        //           >
        //             Remove Image Preview
        //           </button>
        //         </div>
        //       )}

        //       <Dropdown menuDatas={voiceData} setPickdata={setVoiceId}/>

        //       {/* Input for Video Title */}
        //       <div className="mb-4">
        //         <label htmlFor="videoTitle" className="block text-gray-600 text-base font-medium">Video Generated Title:</label>
        //         <input
        //           type="text"
        //           id="videoTitle"
        //           value={videoTitle}
        //           onChange={(e) => setVideoTitle(e.target.value)}
        //           className="border rounded px-3 py-2 w-full text-gray-600"
        //         />
        //       </div>

        //       <div className="mb-4">
        //         <label htmlFor="text" className="block text-gray-600 text-base font-medium">Script Text:</label>
        //         <textarea
        //           id="text"
        //           value={script}
        //           onChange={(e) => setScript(e.target.value)}
        //           className="border rounded px-3 py-2 w-full text-gray-600"
        //           rows="4"
        //         ></textarea>
        //       </div>

        //       {/* Button to generate voiceover */}
        //       {isLoading ? (
        //         <button className='bg-purple-500 text-white rounded px-4 py-2 w-full cursor-not-allowed' disabled>
        //           Generating Voiceover...
        //         </button>
        //       ): (
        //         <button
        //           onClick={handleGenerateVoiceover}
        //           className="bg-purple-500 hover:bg-purple-600 text-white rounded px-4 py-2 w-full"
        //         >
        //           Generate Voiceover
        //         </button>
        //       )}
        //     </div>
        //   </div>
        // </main>
        <main>
          {isLoading && <LoadingOverlay state={"none"}/>}
          <div className="bg-gray-100 min-h-screen flex items-start justify-center">
            {/* <ContactForm handleGenerateVoiceover={handleGenerateVoiceover}/> */}
            <SimpleForm handleGenerateVoiceover={handleGenerateVoiceover} isLoading={isLoading}/>
          </div>
        </main>
      )}
    </div>
    
  );
}
