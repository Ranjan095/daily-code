import { json } from "express";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteOnCloudinaryFile,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { creaateAccessTokenOrRefreshToken } from "../utils/createToken.js";
import jwt from "jsonwebtoken";


// let userRegister = async (req, res) => {
//   try {
//    return res.status(200).json({ message: "Registration successful" });
//   } catch (error) {
//    return res.status(400).json({ message: error.message });
//   }
// };

let userRegister = asyncHandler(async (req, res) => {
  let { userName, email, fullName, password } = req.body;
  let data = [userName, email, fullName, password];

  // Check any fields are empty;
  if (data.some((item) => item?.trim() === "")) {
    return res
      .status(400)
      .json({ Error: "Registration failed please try again" });
  }

  // check existed user wit email or userName
  let existedUser = await User.findOne({
    $or: [{ userName: userName.trim().toLowerCase() }, { email }],
    // $or: [{ userName }, { email }],
  });

  if (existedUser) {
    return (
      res.status(400),
      json({ Error: "already registered with email or userName" })
    );
  }

  // gatting local path of avatar or coverImage
  // console.log(req.files);

  let avatarLocalPath = req.files?.avatar[0]?.path;
  // let coverImagePath = req.files?.coverImage[0]?.path;

  // coverImage is not required so we need to initialize it conditionally otherwise server will break
  let coverImagePath;
  if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
    coverImagePath = req.files.coverImage[0].path;
  }
  // console.log("avatarLoalPath : ", avatarLocalPath);
  // console.log("coverImagePath : ", coverImagePath);

  // /*
  if (!avatarLocalPath) {
    return res
      .status(400)
      .json({ error: "avatar file is required => user.controller--lineNo.49" });
  }

  // */

  let avatarFolderName = "avatar";
  let coverImageFolderName = "coverImage";

  let avatar = await uploadOnCloudinary(avatarLocalPath, avatarFolderName);
  let coverImage = await uploadOnCloudinary(
    coverImagePath,
    coverImageFolderName
  );
  // console.log(avatar);

  let user = await User.create({
    userName: userName.trim().toLowerCase(),
    // userName: userName,
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(400).json({ message: "User not created." });
  }

  return res
    .status(201)
    .json({ message: "User created successfully", createdUser });
});

// Login user
// 1. check if userName or emai is comming from frontend or not
// 2. find the user with email or userName in database
// 3. check password is comming from frontend or not
// 4. compare the password to increpted password
// 5. create access token and refresh token
// 6. save the refresh token in database
// 7. save the access token and refresh token in cookies
// 8. send the response back to frontend

let loginUser = asyncHandler(async (req, res) => {
  try {
    let { userName, email, password } = req.body;
    if (!userName && !email) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check if the user is existing or not with this email or userName;
    let user = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user is not existing with the email or userName" });
    }
    // compare the password with increpted password;
    let isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "password is invalid" });
    }
    // create a access token for and refresh token;
    let { accessToken, refreshToken } = await creaateAccessTokenOrRefreshToken(
      req,
      res,
      user._id
    );
    let loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json({
        message: "logged in successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    return res.status(400).json({ message: "User login failed", error });
  }
});

// For LogOut;
let logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 0, // this removes the field from document
        },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "user logged out successfully" });

    //return res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    return res.status(400).json({ error: "User logOut failed", error });
  }
});

// for refreshAccessToken
let refreshAccessToken = asyncHandler(async (req, res) => {
  let incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(400).json({ error: "unautherized request" });
  }

  try {
    let decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    let user = await User.findById(decodedToken?._id);
    if (!user) {
      return res.status(400).json({ error: "Invalid refreshToken" });
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(400).json({ error: "refreshToken is expired or used" });
    }

    let { accessToken, refreshToken } = await creaateAccessTokenOrRefreshToken(
      req,
      res,
      user._id
    );
    let options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({ message: "AccessToken refreshed", accessToken, refreshToken });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error?.message || "Invalid refreshToke" });
  }
});

// for change current password;

let changeCurrentPassword = asyncHandler(async (req, res) => {
  let { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      error: "please provide oldpassword,newpassword and confirmPassword",
    });
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "new-password and confirm-password is not matched" });
  }

  let user = await User.findById(req.user?._id);
  let isOldPasswordCurrect = await user.isPasswordCorrect(oldPassword);
  if (!isOldPasswordCurrect) {
    return res.status(400).json({ error: "invalid old-password" });
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "password changed successfully" });
});

// get current user
let getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .send({ message: "current user fetched successfully", data: req.user });
});

// update email or fullName
let updateUserEmailOrFullName = asyncHandler(async (req, res) => {
  let { email, fullName } = req.body;
  if (!email || !fullName) {
    return res.status(400).json({ message: "email or full name is required" });
  }
  let userId = req.user?._id;
  let user = await User.findByIdAndUpdate(
    userId,
    // { email, fullName },
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");
  await user.save();
  return res.status(200).json({
    message: "email or full name has been updated successfully",
    data: user,
  });
});

// for update avatar
let updateUserAvatar = asyncHandler(async (req, res) => {
  let avatarFilePath = req.file?.path;
  if (!avatarFilePath) {
    return res.status(400).json({
      error: "Somthing went wrong while uploading avatar flle using multer",
    });
  }

  // delete the existing avatar first;
  let response = await deleteOnCloudinaryFile(req.user.avatar, "avatar");
  console.log(response.deleted);
  let cloudinary = await uploadOnCloudinary(avatarFilePath, "avatar");
  if (!cloudinary) {
    return res.status(400).json({
      error: "Somthing went wrong while uploading avatar on cloudinary",
    });
  }
  let user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: cloudinary?.url,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json({ message: "Avatar has been updated successfully", data: user });
});

// for update coverImage
let updateUserCoverImage = asyncHandler(async (req, res) => {
  let coverImageFilePath = req.file?.path;
  if (!coverImageFilePath) {
    return res.status(400).json({
      error: "Somthing went wrong while uploading coverImage flle using multer",
    });
  }

  // delete coverImage
  if (req.user.coverImage) {
    await deleteOnCloudinaryFile(req.user.coverImage, "coverImage");
  }
  let cloudinary = await uploadOnCloudinary(coverImageFilePath, "coverImage");
  if (!cloudinary) {
    return res.status(400).json({
      error: "Somthing went wrong while uploading coverImage on cloudinary",
    });
  }
  let user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: cloudinary?.url,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json({ message: "coverImage has been updated successfully", data: user });
});

let getUserChannelProfile = asyncHandler(async (req, res) => {
  let { userName } = req.params;

  if (!userName) {
    res.status(404).json({
      message: "Somthing went wrong while getting user channel profile",
    });
  }
  let channelDetails = await User.aggregate([
    {
      $match: {
        userName: userName,
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribeTo",
      },
    },
    {
      $addFields: {
        subscribers: {
          $size: "$subscribers",
        },
        subscribeTo: {
          $size: "$subscribeTo",
        },
        // isSubscribed: {
        //   $cond: {
        //     if: { $in: [req.user?._id, "$subscribers.subscriber"] },
        //     then: true,
        //     else: false,
        //   },
        // },
      },
    },
    {
      $project: {
        fullName: 1,
        email: 1,
        avatar: 1,
        userName: 1,
        coverImage: 1,
        subscribers: 1,
        subscribeTo: 1,
      },
    },
  ]);
  res.status(200).send({ channelDetails });
});

export {
  userRegister,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserEmailOrFullName,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
};
