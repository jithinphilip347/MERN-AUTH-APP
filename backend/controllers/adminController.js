import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import adminGenToken from "../utils/adminGentoken.js";
import User from "../models/userModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });

  if (admin && (await admin.matchPassword(password))) {
    adminGenToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("invalid data");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    adminGenToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " admin logout" });
});

const listUserProfile = asyncHandler(async (req, res) => {
  const userList = await User.find();

  res.status(200).json(userList);
});

const editUserProfile = asyncHandler(async (req, res) => {
  const { userId, name, email } = req.body;

  console.log(userId, name, email);
  if (!userId) {
    res.status(404);
    throw new Error("user updation failed");
  }
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("user updation failed");
  }
  user.name = name;
  user.email = email;

  await user.save();
  res.status(200).json({ message: "editUserProfile" });
});

const deleteUserData = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(req.body.userId, "req body");
  const delUser = await User.findByIdAndDelete(userId);
  console.log(delUser, "deluser");
  if (delUser) {
    res.status(200).json({ message: "user deleted sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const blockTrue = {
    isBlocked: true,
  };
  const blockUser = await User.findByIdAndUpdate(userId, blockTrue);
  if (blockUser) {
    res.status(200).json({ message: "user blocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  console.log(req.body.userId, "req.body.userId");
  const unblockFalse = {
    isBlocked: false,
  };
  const blockUser = await User.findByIdAndUpdate(userId, unblockFalse);

  if (blockUser) {
    res.status(200).json({ message: "user unblocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
export {
  authAdmin,
  registerAdmin,
  editUserProfile,
  logoutAdmin,
  listUserProfile,
  deleteUserData,
  blockUser,
  unblockUser,
};
