import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from './Overlay';

const SimpleForm = ({handleGenerateVoiceover, isLoading}) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  return (
    <main className="bg-gray-100 flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading && <LoadingOverlay state={"none"}/>}
      <ToastContainer />
      <div className="min-h-screen flex items-start justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl text-black font-semibold mb-4">Email Video Generator</h1>

          {/* Input for Video Title */}
          <div className="mb-4">
            <label htmlFor="videoTitle" className="block text-gray-600 text-base font-medium">Recipient Name:</label>
            <input
              type="text"
              id="videoTitle"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="border rounded px-3 py-2 w-full text-gray-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-600 text-base font-medium">Recipient Email:</label>
            <input
              type="text"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="border rounded px-3 py-2 w-full text-gray-600"
            />
          </div>

          {/* Button to generate voiceover */}
          {isLoading ? (
            <button className='bg-purple-500 text-white rounded px-4 py-2 w-full cursor-not-allowed' disabled>
              Generating Video...
            </button>
          ): (
            <button
              onClick={() => handleGenerateVoiceover(recipientName, recipientEmail)}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded px-4 py-2 w-full"
            >
              Generate Video
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default SimpleForm