import React, { useState } from 'react';
import SpinnerLoading from './SpinnerLoading';

const DropdownMenu = ({ menuDatas, setPickdata, process }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    setPickdata(item);
    // process(item);
    toggleMenu();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center py-4 text-base font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={toggleMenu}
      >
        Pick Voice
        <svg
          className={`ml-2 h-4 w-4 transition-transform transform ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {menuDatas ? (
        <span className="text-base font-medium text-gray-700 hover:text-gray-900">
          {selectedItem ? (
            <span title={selectedItem}>{selectedItem.length > 30 ? `${selectedItem.slice(0, 20)}...` : selectedItem}</span>
          ) : (
            'Your voice will be here'
          )}
        </span>
      ) : (
        <span>
          <SpinnerLoading />
        </span>
      )}

      {isOpen && (
        <div className="origin-top-center absolute right-0 mt-2 w-48 max-h-40 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {menuDatas.slice(0, 50).map((item, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleMenuItemClick(item.voiceId)}
              >
                {item.voiceId}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
