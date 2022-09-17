import "dotenv/config";
import { Request, Response } from "express";
import { User } from "../types";
import CryptoJS from "crypto-js";
import crypto from "crypto";
import { usersDB } from "../model";

const id = crypto.randomBytes(16).toString("hex");
const CRYPTOJS_SECRET_KEY = String(process.env.CRYPTOJS_SECRET_KEY);

export const LoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  try {
    let foundUser = usersDB.users.find((user) => user.email === email);

    if (!foundUser) return res.sendStatus(401);

    // decrypt password and check
    const decrypted = CryptoJS.AES.decrypt(
      foundUser.password,
      CRYPTOJS_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (password !== decrypted) return res.status(401);

    return res.status(200).json({ id: foundUser.id });
  } catch (error: any) {
    return res.status(error?.code || 500).json({ message: error?.message });
  }
};

export const RegisterController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, username } = req.body;
  const date = Date.now().toString();
  // encrypt password

  // check if username exists
  const duplicate = usersDB.users.find(
    (user: User) => user.username === username
  );

  if (duplicate) return res.sendStatus(409);

  try {
    const encrypted = CryptoJS.AES.encrypt(
      password,
      CRYPTOJS_SECRET_KEY
    ).toString();

    const newUser = {
      createdAt: date,
      email,
      id,
      password: encrypted,
      updatedAt: date,
      username,
    };

    usersDB.setUsers([...usersDB.users, newUser]);
    console.log(usersDB.users);

    return res.status(201).json({ id: newUser.id });
  } catch (error: any) {
    return res.status(error?.code || 500).json({ message: error?.message });
  }
};
