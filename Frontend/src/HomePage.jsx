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


// import React from 'react';
// import SignUpImage from './SignUp.jpg';
// import SignInImage from './SignIn.jpg';

// const HomePage = () => {
//   return (
//     <div className="container mx-auto px-4">
//         <div>
//       <h1 className="text-4xl font-bold mb-8">Welcome to Your App</h1>
//       </div>
//       <div className="flex">
//         <div className="w-1/2 pr-4">
//           <img src={SignUpImage} alt="SignUp" className="w-1/2" />
//         </div>
//         <div className="w-1/2 pl-4">
//           <img src={SignInImage} alt="SignIn" className="w-1/2" />
//         </div>
//       </div>
//      </div>
//   );
// };

// export default HomePage;
