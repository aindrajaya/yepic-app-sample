import React from 'react';

const LoadingOverlay = ({ state }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white opacity-50 z-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-600"></div>
      {state === "process" && <h1 className="mt-4 text-gray-700">Video is processing...</h1>}
    </div>
  );
};

export default LoadingOverlay;
