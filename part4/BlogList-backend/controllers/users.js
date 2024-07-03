const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");

  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    return res.status(400).json({ error: "User validation failed" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = userRouter;
