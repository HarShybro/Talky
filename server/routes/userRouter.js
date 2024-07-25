const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../lib/jwt");

router
  .post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        return res.status(401).json({ error: "Name is required" });
      }
      if (!email) {
        return res.status(401).json({ error: "Email is required" });
      }
      if (!password) {
        return res.status(401).json({ error: "Password is required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, hashedPassword });

      return res.status(200).json({ user, msg: "User Created Successfully" });
    } catch (error) {
      console.log("USERS[SIGNUP]:", error);
      return res.json({ error: error.message }).status(500);
    }
  })
  .post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(401).json({ error: "Email is required" });
      }
      if (!password) {
        return res.status(402).json({ error: "Password is required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      const pass = await bcrypt.compare(password, user.hashedPassword);

      if (!pass) {
        return res.status(403).json({ error: "Incorrect Password" });
      }

      const token = generateToken(user);

      return res.status(200).json({ msg: "Login Successfull", user, token });
    } catch (error) {
      console.log("USERS[LOGIN]:", error);
      return res.status(500).json({
        error: error,
      });
    }
  })
  .post("/me", async (req, res) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(401).json({ error: "Token Not Provided" });
      }

      const payload = verifyToken(token);

      if (!payload) {
        return res.status(404).json({ error: "Incorrect Token" });
      }

      const user = await User.findById(payload._id);

      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      return res.status(200).json({ msg: "User Found", user });
    } catch (error) {
      console.log("USER[ME]", error);
      return res.status(500).json({ error: error });
    }
  });

module.exports = router;
