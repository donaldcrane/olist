import { MiddleWare, unauthorizedError, unknownServerError } from "../utils";
import { findUser } from "../repos";

export const isAuthenticated: MiddleWare = async (req, res, next) => {
  if (!req.get("Authorization"))
    return res.status(401).send({ message: unauthorizedError });
  try {
    const header = req.headers.authorization || ""; // get the auth header
    const token = header.split(/\s+/).pop() || "";
    const auth = Buffer.from(token, "base64").toString();
    const parts = auth.split(/:/);
    const username = parts.shift();
    const password = parts.join(":");
    if (!username || !password)
      return res.status(409).send({
        message: "username or password incorrect",
      });
    const { data: userData, error } = await findUser(username, password);
    if (error || !userData)
      return res.status(500).send({
        message: error ?? unknownServerError,
      });

    const user = userData;
    req.user = user;
    return next();
  } catch (e) {
    return res.status(500).send({ message: unknownServerError });
  }
};
