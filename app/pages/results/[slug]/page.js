"use client"
import Header from "@/app/components/Header"
import LoadingOverlay from "@/app/components/Overlay"
import { useEffect, useState } from "react"

export default function Page({ params }) {
  const id = params.slug
  const [data, setData] = useState()

  async function fetchData(){
    try {
      const response = await fetch(`/api/express/video?id=${id}`)
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
 
  useEffect(() => {
    fetchData()
  }, [data])

  if (!data) {
    return <LoadingOverlay state={"process"}/>
  }
  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-start justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96 mt-10">
          <h1 className="text-2xl text-gray-700 font-semibold mb-4">Title is:  {data.videoTitle}</h1>
          <div className="bg-gray-300 p-4 rounded-md mb-4">
            <video controls className="w-full">
              <source src={data.videoUrl} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
          <div className="text-gray-500 text-sm">
            <p className="mb-2">Share this voiceover:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={data.videoUrl}
                className="flex-1 p-2 rounded-l-md border"
                readOnly
              />
              <button className="bg-purple-500 text-white p-2 rounded-r-md">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>    
 );
}
