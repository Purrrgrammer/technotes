const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const blankController = asyncHandler(async (req, res) => {});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find(users).select("-password").lean(); //no password return //give only json data (no extras)
  if (!users) {
    return res.status(400).json({ message: "no users found" }); //safety feature // no no repeatly calling
  }
  res.status(200).json({ data: users }); //no need else to end the function //larger function =>
});
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  //confirming data
  if (!username || !password || !Array.isArray(rolse) || !roles.length) {
    // rejecting what we have received from req
    //specific response send back for specific situation
    //which if => other error occurs => error handling middleware will take place => dont always want =>show frontend to help the user
    return res
      .status(400)
      .json({ message: "All fields are required (Bad Request)" });
  }

  const userDupe = await User.findOne({ username }).lean().exec(); //exex => if you use promise awiat and want promise back

  if (userDupe) {
    return res.status(409).json({ message: "duplicate username" });
  }

  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds
  const userObject = { username, password: hashedPwd, roles };

  //create and store new user
  const user = await User.create(userObject);
  if (user) {
    //created // at the end
    res.status(201).json({ data: `welcome ${username}` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
  // => you need exex =>
});
const getUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  res.status(200).json({ data: `this is data for ${userId}` });
});
const updateUser = asyncHandler(async (req, res) => {
  const { userId, username, roles, active, password } = req.body;

  //confirming data
  if (
    !userId ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required (Bad Request)" });
  }

  const user = await User.findById(id).exec(); //exec since -> we are passing values here we need to receive promise => or not it will not calling lean
  //not calling lean +saved in to other method
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  //check for dupe
  const duplicate = await User.findOne({ username }).lean().exec();
  //allow updates to the original user
  //aviod current user catching
  if (duplicate && duplicate?._id.toString() !== userId) {
    //_id = id that is created by mongodb
    return res
      .status(409)
      .json({ message: "chance username that exist (existed username)" });
  } //finding user that were working with
  //change in db
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    //hasing password
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();
  // res.status(200).json({ data: `this is data for ${userId}` });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  res.status(200).json({ data: `this is data for ${userId}` });
});

// create new user

module.exports = {
  getAllUser,
  createNewUser,
  getUserId,
  updateUser,
  deleteUser,
};
