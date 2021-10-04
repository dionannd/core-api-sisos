import jwt from "jsonwebtoken";
import { JWT } from "../lib/secretKey";

export const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization || "";
    let jwtPayload;
    // pengecekan token jwt valid atau tidak
    try {
      jwtPayload = jwt.verify(token, JWT.secretKey);
      req.user = jwtPayload;
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Not authorized" });
    }

    const newToken = jwt.sign(jwtPayload, JWT.secretKey, {
      expiresIn: "12h",
    });
    res.setHeader("token", newToken);
    next();
    return;
  } catch (err) {
    return err;
  }
};
