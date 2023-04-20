import bcrypt from "bcrypt";

import UserModel from "../models/User.js";
import {
  generateRefreshToken,
  generateAccessToken,
  isAdmin,
} from "../middlewares/verifyToken.js";

export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

export const getUsers = async () => {
  try {
    const users = await UserModel.find();
    if (!users) throw new Error("Users not found");
    return users;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get users: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    const resq = await UserModel.findOne({ email });
    if (!resq) throw new Error("User is not found");

    const isPasswordValid = await bcrypt.compare(password, resq.password);
    if (!isPasswordValid) throw new Error("Password is not correct");

    if (resq && isPasswordValid) {
      const { password, isAdmin, refreshToken, ...userData } = resq.toObject();
      const accessToken = generateAccessToken({
        _id: resq._id,
        firstname: resq.firstname,
        lastname: resq.lastname,
        email: resq.email,
        isAdmin: resq.isAdmin,
      });

      const newRefreshToken = generateRefreshToken(resq._id);

      await UserModel.findByIdAndUpdate(
        resq._id,
        { refreshToken: newRefreshToken },
        { new: true }
      );

      return {
        ...userData,
        accessToken,
      };
    }
  } catch (error) {
    throw new Error(`Failed to login user: ${error.message}`);
  }
};

export const register = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  try {
    const registeredUser = await UserModel.findOne({ email: user.email });
    if (registeredUser) throw new Error("User has existed");
    const newUser = await UserModel.create({
      ...user,
      password: hashedPassword,
    });

    if (!newUser) throw new Error("User not create");

    return {
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateAccessToken({
        _id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      }),
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
};
