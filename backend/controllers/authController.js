import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByEmail } from "../models/user.js";

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
};

export { login };
