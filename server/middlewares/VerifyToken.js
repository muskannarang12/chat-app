import auth from "../config/firebase-config.js";

// Middleware to verify the token for HTTP requests
export const VerifyToken = async (req, res, next) => {
  // Check if authorization header exists
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  // Extract token from 'Bearer <token>' format
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token is missing or malformed" });
  }

  try {
    // Verify the token using Firebase
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue; // Attach user data to the request
      return next(); // Proceed to the next middleware or route
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to verify the token for WebSocket connections
export const VerifySocketToken = async (socket, next) => {
  // Check if token is provided in socket handshake
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authorization token is missing"));
  }

  try {
    // Verify the token using Firebase
    const decodeValue = await auth.verifyIdToken(token);

    if (decodeValue) {
      socket.user = decodeValue; // Attach user data to the socket object
      return next(); // Proceed to the next middleware or socket handler
    } else {
      return next(new Error("Invalid token"));
    }
  } catch (e) {
    return next(new Error("Internal server error"));
  }
};
