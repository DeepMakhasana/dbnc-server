import jwt from "jsonwebtoken";
import config from "../config";
import createHttpError from "http-errors";

export interface userDetails {
  id: number;
  email: string;
  name: string | null;
  number: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// export interface TokenType extends userDetails {
//   roles: string[];
// }

export const generateToken = (user: userDetails, role: string[]) => {
  return jwt.sign({ ...user, roles: role }, config.jwtSecret as string); // last parameter of sign function {expiresIn: "30d",}
};

export const verifyToken = (token: string): userDetails => {
  if (!config.jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.jwtSecret) as userDetails;

    return decoded; // Return the validated payload
  } catch (error: any) {
    // Handle token errors
    if (error.name === "TokenExpiredError") {
      throw createHttpError(401, "Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw createHttpError(403, "Invalid token");
    }
    throw createHttpError(500, "An error occurred during token verification");
  }
};
