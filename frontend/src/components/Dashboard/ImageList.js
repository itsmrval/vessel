import React, { useState } from 'react';
import api from '../../api/api';

const ImageList = ({ images, fetchImages }) => {
  const [newImage, setNewImage] = useState('');

  const handlePull = async (e) => {
    e.preventDefault();
    try {
      await api.post('/images/pull', { image: newImage });
      fetchImages();
    } catch (error) {
      console.error('Error pulling image', error);
    }
  };

  return (
    <div>
      <h2>Images</h2>
      <ul>
        {images.map(image => (
          <li key={image.image}>{image.image}:{image.version}</li>
        ))}
      </ul>
      <form onSubmit={handlePull}>
        <input type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="Image name" required />
        <button type="submit">Pull Image</button>
      </form>
    </div>
  );
};

export default ImageList;
