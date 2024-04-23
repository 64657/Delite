import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SignIn.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://delite-krum.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      navigate("/welcome");
    } catch (error) {
      console.error("Error signing in:", error.response.data);
      setErrorMessage("Wrong password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 h-full items-center  bg-[#FFFFFF]  justify-center">
        <img src={SignIn} alt="SignIn" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-3/5 p-8 shadow-lg rounded-lg border border-gray-300">
          <h1 className="text-[#3A244A] text-3xl font-bold mb-4">
            Fill what we know<span className="text-[#D72638]">!</span>
          </h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-10 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            className="w-full bg-[#3A244A] text-white font-bold py-2 rounded-md mt-2 mb-4"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button className="w-full bg-[#FFFFFF]  text-[#3A244A] font-bold border-[#3A244A] border py-2 mb-3 rounded-md ">
            <Link to="/signup" className="block w-full h-full">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
