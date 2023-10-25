import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal-root'); // Set the root element for accessibility

const AvatarListModal = ({ isOpen, onRequestClose, avatarList, onSelectImage, setAvatarId }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(selectedImage, "selectedImage")

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleConfirm = () => {
    // Send the selected image to the parent component
    setAvatarId(selectedImage.id)
    onSelectImage(selectedImage);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Avatar List Modal"
      style={{
        content: {
          top: '50%', // Center vertically
          left: '50%', // Center horizontally
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)', // Center modal
          width: '80%', // Adjust the width as needed
          maxWidth: '400px', // Limit the maximum width
          maxHeight: '80%', // Limit the maximum height
          padding: '20px', // Add padding
        },
      }}
    >
      <h2 className="text-lg font-semibold mb-4">Avatar List</h2>
      <div className="flex flex-wrap">
        {avatarList.slice(6, 11).map((avatar) => (
          <img
            key={avatar.id}
            src={avatar.menuImageUrl}
            alt={`Avatar ${avatar.id}`}
            className={`w-20 h-20 m-2 cursor-pointer ${avatar === selectedImage ? 'border-4 border-blue-500' : ''}`}
            onClick={() => handleImageSelect(avatar)}
          />
        ))}
      </div>
      <button onClick={handleConfirm} className="mt-4 bg-blue-500 text-white rounded-md p-2">
        Confirm
      </button>
    </Modal>
  );
};

export default AvatarListModal;
