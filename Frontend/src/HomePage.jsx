import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImage from './SignUP.png';
import SignInImage from './SignIN.png';
import './index.css'

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to SignUp page
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <div className="h-screen flex flex-col bg-[#FFFFFF]">
      <h1 className="text-4xl font-bold pl-20 pt-20 pb-4 ">Illustrate which you can use</h1>
      <div className="flex justify-around h-full">
        <div className='imgContainer' >
          <img src={SignUpImage} alt="SignUp" onClick={handleSignUpClick} className="w-30  cursor-pointer " />
        </div>
        <div className='imgContainer'>
          <img src={SignInImage} alt="SignIn"  onClick={handleSignInClick} className="w-30 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;



