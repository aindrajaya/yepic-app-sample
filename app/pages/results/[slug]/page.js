"use client"
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import LoadingOverlay from "@/app/components/Overlay";

export default function Page({ params }) {
  const id = params.slug;
  const [data, setData] = useState();
  const [notReady, setNotReady] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  console.log(notReady, "notReady status");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/express/video?id=${id}`);
        const data = await response.json();
        setData(data);
        setVideoUrl(data.videoWatermarkedUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    fetch(videoUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load video: ${response.status}`);
        }
      })
      .catch((error) => {
        setNotReady(error.message); // Set the error message
      });
  }, [videoUrl]);

  const handleCopyClick = () => {
    if (data) {
      // Create a temporary input element to copy the URL
      const tempInput = document.createElement("input");
      tempInput.value = data.videoWatermarkedUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      // Set copySuccess to true to indicate a successful copy
      setCopySuccess(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-start justify-center">
        {!data && <LoadingOverlay state={"process"} />}
        {data && (
          <div className="bg-white p-8 rounded shadow-md w-96 mt-10">
            <h1 className="text-2xl text-gray-700 font-semibold mb-4">
              Title is: {data.videoTitle}
            </h1>
            <div className="bg-gray-300 p-4 rounded-md mb-4">
              {notReady ? (
                <h1>Video is not ready yet!</h1>
              ) : (
                <video controls className="w-full">
                  <source src={data.videoWatermarkedUrl} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              )}
            </div>
            <div className="text-gray-500 text-sm">
              <p className="mb-2">Share this voiceover:</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={data.videoWatermarkedUrl}
                  className="flex-1 p-2 rounded-l-md border"
                  readOnly
                />
                <button
                  className={`bg-purple-500 text-white p-2 rounded-r-md ${
                    copySuccess ? "bg-green-500" : ""
                  }`}
                  onClick={handleCopyClick}
                >
                  {copySuccess ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
