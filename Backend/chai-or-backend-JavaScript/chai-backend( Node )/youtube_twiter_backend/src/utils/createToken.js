import { User } from "../models/user.model.js";

let creaateAccessTokenOrRefreshToken = async (req, res, userId) => {
  try {
    let user = await User.findById(userId);
    let accessToken = await user.genrateAccessToken();
    let refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while creating access token or refresh token",
      error,
    });
  }
};

export { creaateAccessTokenOrRefreshToken };
