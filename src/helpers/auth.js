import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

// hash password
export const hashPassword = async (password) => {
  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND, 10)
  );
  return hashedPassword;
};

// sign a token
export const signToken = (userTokenData) => {
  return Jwt.sign(userTokenData, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
};

// decode token
export const decodeToken = (token) => {
  try {
    return Jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
};
