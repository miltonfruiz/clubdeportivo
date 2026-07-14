const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in' });
  }
}

async function logout(req, res) {
  try {
    req.user = null;
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging out' });
  }
}

module.exports = { register, login, logout };