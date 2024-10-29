const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const saltRounds = 10;
const jwtSecret =
  "4001457b1a2ec6918db5cb03956d6053e9aa11a525759a0d7f3df56769018fa8";

if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: "1d",
  });
}

router.post("/signup", async (req, res) => {
  const { name, email, number, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const existingUser1 = await User.findOne({
      where: { number },
    });

    if (existingUser1) {
      return res
        .status(400)
        .json({ message: "Mobile Number is already registered" });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      number: number,
      password: hashedPassword,
    });

    console.log("New user created:", newUser);
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to log in after registration" });
      }

      const token = generateToken(newUser);

      res.status(200).json({
        message: "Registration and login successful",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          number: newUser.number,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(400).json({ message: "Invalid email" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      number: user.number,
    },
  });
});

module.exports = router;
