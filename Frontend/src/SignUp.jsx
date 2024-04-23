import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css";
import SignUpImage from "./SignUp.jpg";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [contactMode, setContactMode] = useState("email");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [accountActivated, setAccountActivated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (password !== retypePassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
          contactMode,
        }
      );
      console.log(response.data);
      setShowOtpPopup(true);
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        "https://delite-krum.onrender.com/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      console.log(response.data);
      setShowOtpPopup(false);
      setAccountActivated(true);
    } catch (error) {
      console.error("Error verifying OTP:", error.response.data);
      setErrorMessage(error.response.data.error);
    }
  };

  const handleWelcomeClick = () => {
    navigate("/welcome");
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-1/2 h-full bg-gray-200">
        <img
          src={SignUpImage}
          alt="SignUp"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-3/5 p-8 shadow-lg rounded-lg border border-gray-300">
          <h1 className="text-[#3A244A] text-3xl font-bold mb-4 ml-3 relative">
            Let us Know
            <span className="text-[#D72638]">!</span>
            <span className="text-sm absolute right-0 mt-3">
              <a
                href="/signin"
                className="text-[#3A244A] underline hover:no-underline"
              >
                Sign In
              </a>
            </span>
          </h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
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

          <div className="mb-4 relative">
            <input
              type={showRetypePassword ? "text" : "password"}
              placeholder="Retype Password"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowRetypePassword(!showRetypePassword)}
            >
              {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="mb-4">
            <select
              placeholder="Contact Mode"
              className="w-full px-4 py-2 border-b border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={contactMode}
              onChange={(e) => setContactMode(e.target.value)}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <button
            className="w-full bg-[#3A244A] text-white font-bold py-2 rounded-md mt-2 mb-4"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          {/* AccountActivated popup */}
          {accountActivated && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-md">
                <h2 className="text-lg font-bold mb-4">Account Activated!</h2>
                <p>Your account has been successfully activated.</p>
                <button
                  className="w-full bg-[#3A244A] text-white py-2 rounded-md mt-4 hover:bg-[#2E1D2C]"
                  onClick={handleWelcomeClick}
                >
                  Welcome
                </button>
              </div>
            </div>
          )}

          {/* OTP verification popup */}
          {showOtpPopup && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-md">
                <h2 className="text-lg font-bold mb-4">Enter OTP Code</h2>
                <input
                  type="text"
                  placeholder="Enter OTP code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-4"
                />
                <button
                  className="w-full bg-[#3A244A] text-white py-2 rounded-md hover:bg-[#2E1D2C]"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </button>
                {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
