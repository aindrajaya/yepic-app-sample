import React from 'react';

const SpinnerLoading = () => {
  return (
    <div className="items-center justify-center">
      <div className="border-t-4 border-gray-500 border-solid rounded-full h-8 w-8 animate-spin"></div>
    </div>
  );
};

export default SpinnerLoading;