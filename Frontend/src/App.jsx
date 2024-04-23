import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInForm from './SignIn';
import SignUpForm from './SignUp';
import Welcome from './Welcome';
import HomePage from './HomePage';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
    </Router>
  );
};

export default App;
