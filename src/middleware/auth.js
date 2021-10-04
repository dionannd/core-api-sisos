import jwt from "jsonwebtoken";
import { JWT } from "../lib/generateToken";

export const verify = (res, req, next) => {
  try {
    const token = req.headers.authorization || "";
    let jwtPayload;
    try {
      jwtPayload = jwt.verify(token, JWT.secretKey);
      req.user = jwtPayload;
      next();
    } catch (error) {
      return res.status(400).send({ message: "Not Authorized" });
    }
    const newToken = jwt.sign(jwtPayload, JWT.secretKey, {
      expiresIn: "12h",
    });
    return res.setHeader("token", newToken);
    next();
    return;
  } catch (error) {
    return error;
  }
};
