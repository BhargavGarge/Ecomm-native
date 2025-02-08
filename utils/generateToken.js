import jwt from "jsonwebtoken";

// Function to generate an access token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Short expiration for access token (e.g., 15 minutes)
  });
};

// Function to generate a refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "30d", // Longer expiration for refresh token (e.g., 30 days)
  });
};

export { generateAccessToken, generateRefreshToken };
