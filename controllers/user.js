const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const {v4: uuidv4} = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!!!",
        success: false,
      });
    }

    const user = await User.findOne({ email });
  
    if (user) {
      return res.status(400).json({
        error: "User already Registered",
        success: false,
      });
    }

    const hashedPWD = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPWD,
    });

    res.render("login");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      status: false,
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required!!!",
      success: false,
    });
  }
  
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.render("login", {
      message: "Incorrect email or password",
      success: false,
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  
  if (!isPasswordMatch) {
    return res.render("login", { message: "Incorrect email or password", success: false });
  }

  const token = setUser(user);

  res.cookie('token', token);
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
