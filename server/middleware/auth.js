import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret_key = process.env.SECRETE_KEY;

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const verify = jwt.verify(token, secret_key);
    if (verify) {
      next();
    } else {
      return res.status(401).json({ msg: "not valid user" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("invalid token");
  }
};
export default auth;
