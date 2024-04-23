import React from 'react';
import backgroundImage from './highwaydelitewelcome.jpg'; 

const Welcome = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh', 
      }}
    >
      <div className="bg-white p-8 rounded-md ml-auto mr-20 mt-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Website!</h1>
        <p className="mb-4">Thank you for signing up. Your account is now activated.</p>
        <p>Enjoy exploring our website and services!</p>
      </div>
    </div>
  );
};

export default Welcome;
