"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/Header';
import LoadingOverlay from './components/Overlay';

export default function Home() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [voiceover, setVoiceover] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Request body to sent
  const [script, setScript] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [resultVideoURL, setResultVideoURL] = useState('');
  const [result, setResult] = useState(null)

  console.log(resultVideoURL)

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Create a preview URL for the selected image
    const previewURL = URL.createObjectURL(selectedImage);
    setImagePreview(previewURL);
  };

  const handleRemoveImage = () => {
    // Clear the selected image and its preview
    setImage(null);
    setImagePreview(null);
  };

  const handleGenerateVoiceover = async () => {
    if (!videoTitle || videoTitle === '') {
      // You can add validation or display an error message if the title is empty
      toast("You must enter a video title");
      return;
    }
    // if (!image ) {
      // You can add validation or display an error message if the title is empty
      // toast("You must select an image");
      // return;
    // }
    if (!script || script === '') {
      // You can add validation or display an error message if the title is empty
      toast("You must enter some text");  
      return;
    }
    setIsLoading(true);

    const requestBody = {
      // avatarId,
      // voiceId,
      script,
      videoTitle,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

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

    // setTimeout(() => {
    //   setIsLoading
    //   // router.push(`/pages/results/${videoTitle}`);
    //   router.push(`/pages/results/${videoTitle}/${script}`)
    // }, 2000);
  }
  
  const gotoResultPage = (id) => {
    router.push(`/pages/results/${id}`)
  }

  return (
    <div>
      <Header />
      {result ? (
        <main className="bg-gray-100 flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="text-2xl text-black font-semibold">Success to input your data, your Id is {result.id}</h1>
          <button 
            onClick={() => gotoResultPage(result.id)}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded px-4 py-2 w-full"
            >
            Click here to see the result
          </button>
        </main>
      ):(
        <main className="bg-gray-100 flex min-h-screen flex-col items-center justify-between p-24">
          {isLoading && <LoadingOverlay state={"none"}/>}
          <ToastContainer />
          <div className="min-h-screen flex items-start justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
              <h1 className="text-2xl text-black font-semibold mb-4">Image Voiceover Generator</h1>

              <div className="mb-4 relative" id="file-input-container">
                {/* Input for image selection
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="border rounded px-3 py-2 w-full opacity-0 absolute cursor-pointer"
                />
                <label htmlFor="image" className="bg-purple-500 hover:bg-purple-600 text-white text-lg rounded px-4 py-2 w-full cursor-pointer">
                  Choose Image to Generate
                </label> */}
              </div>

              {/* Display image preview if available */}
              {imagePreview && (
                <div className="mb-4">
                  <label className="block text-gray-600">Image Preview:</label>
                  <img src={imagePreview} alt="Image Preview" className="border rounded px-3 py-2 w-full mr-4 my-3" />
                  <button
                    onClick={handleRemoveImage}
                    className="bg-red-500 hover-bg-red-600 text-white rounded px-4 py-2 w-full"
                  >
                    Remove Image Preview
                  </button>
                </div>
              )}

              {/* Input for Video Title */}
              <div className="mb-4">
                <label htmlFor="videoTitle" className="block text-gray-600">Video Generated Title:</label>
                <input
                  type="text"
                  id="videoTitle"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="border rounded px-3 py-2 w-full text-gray-600"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="text" className="block text-gray-600">Voiceover Text:</label>
                <textarea
                  id="text"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="border rounded px-3 py-2 w-full text-gray-600"
                  rows="4"
                ></textarea>
              </div>

              {/* Button to generate voiceover */}
              {isLoading ? (
                <button className='bg-purple-500 text-white rounded px-4 py-2 w-full cursor-not-allowed' disabled>
                  Generating Voiceover...
                </button>
              ): (
                <button
                  onClick={handleGenerateVoiceover}
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded px-4 py-2 w-full"
                >
                  Generate Voiceover
                </button>
              )}

              {voiceover && (
                <div className="mt-4">
                  <p className="text-gray-600">Generated Voiceover:</p>
                  <audio controls>
                    <source src={voiceover} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
    
  );
}
