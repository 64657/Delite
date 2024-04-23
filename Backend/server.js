const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require("dotenv");
const User = require('./models/User'); // User model

const app = express();
dotenv.config();

const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cors());

mongoose
  .connect(DB_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Signup with email OTP verification
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

        // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP (you can implement this logic)

    // const newUser = new User({ firstName, lastName, email, password });
    // await newUser.save();

    // Send OTP to user's email (nodemailer)
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Verification OTP for Signup',
      text: `Your OTP for signup is ${otp}`,
    };
    
    const newUser = new User({ firstName, lastName, email, password: hashedPassword,otp,isUserVerified : false});
    await newUser.save();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send OTP' });
      } else {
        res.status(201).json({ message: 'User created successfully. OTP sent to your email to activate the account' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify OTP endpoint (after email confirmation)
// Verify OTP endpoint
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (otp !== user.otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    // Update user's isUserVerified status to true
    await User.updateOne({ email }, { isUserVerified: true });

    res.status(200).json({ message: 'OTP verified successfully. Account activated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Login with password verification and JWT
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // if(password !== user.password){
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '300d' });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
