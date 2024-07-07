import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;
const EXPIRES_SECONDS = parseInt(process.env.EXPIRES_SECONDS ?? "3600");

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Session {
  id: number;
  username: string;
  /**
   * Timestamp indicating when the session was created, in Unix milliseconds.
   */
  iat: number;
  /**
   * Timestamp indicating when the session should expire, in Unix milliseconds.
   */
  exp: number;
}

/**
 * Identical to the Session type, but without the `issued` and `expires` properties.
 */
export type PartialSession = Omit<Session, "iat" | "exp">;

export type ExpirationStatus = "expired" | "active" | "grace";

export const encodeSession = (partialSession: PartialSession): string => {
  return jwt.sign(partialSession, SECRET_KEY, { expiresIn: EXPIRES_SECONDS });
};

export const renewSession = (session: Session): string => {
  const newSession: any = { ...session };
  delete newSession.exp;
  delete newSession.iat;
  return jwt.sign(newSession, SECRET_KEY, { expiresIn: EXPIRES_SECONDS });
};

export const decodeSession = (tokenString: string): Session => {
  // Always use HS512 to decode the token
  return jwt.verify(tokenString, SECRET_KEY) as Session;
};

// todo: users in database
const passwordDatabase: { [username: string]: string | undefined } = {};
const adminUsername = process.env.MASTER_USERNAME ?? "chef";
passwordDatabase[adminUsername] = process.env.MASTER_PASSWORD;
export const validatePassword = (username?: string, password?: string): boolean => {
  if (!username || !password) {
    return false;
  }

  if (passwordDatabase[username] && passwordDatabase[username] === password) {
    return true;
  }

  return false;
};
