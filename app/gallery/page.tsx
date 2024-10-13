'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg',
  '/image4.jpg',
];

export default function Gallery() {
  const { data: session } = useSession();
  const [images, setImages] = useState(galleryImages);
  const [newImage, setNewImage] = useState(''); // Handle new image URL

  // Only allow admins to upload images (for example)
  const isAdmin = session?.user?.email === 'admin@pranava.com'; // Change email as needed

  // Handle image upload
  const handleUpload = () => {
    if (newImage) {
      setImages([...images, newImage]);
      setNewImage('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className="relative w-full h-48">
            <Image
              src={src}
              alt={`Gallery Image ${idx + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Upload Section for Admins */}
      {isAdmin && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Enter image URL"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
}