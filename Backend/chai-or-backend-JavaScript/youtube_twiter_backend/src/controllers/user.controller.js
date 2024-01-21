import { asyncHandler } from "../utils/asyncHandler.js";

// let userRegister = async (req, res) => {
//   try {
//     res.status(200).json({ message: "Registration successful" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

let userRegister = asyncHandler(async (req, res) => {
  let data = req.body;
  res.status(200).json(data);
});

export { userRegister };
