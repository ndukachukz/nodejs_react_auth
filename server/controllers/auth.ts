import "dotenv/config";
import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import crypto from "crypto";
import moment from "moment";
import { User } from "../types";
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
  const { email, password, fullName, ...rest } = req.body;
  const date = moment.unix(Date.now()).format("DD MM YYYY, h:mm:ss A");
  console.log({ date });
  // encrypt password

  // check if username exists
  const duplicate = usersDB.users.find((user: User) => user.email === email);

  if (duplicate) return res.sendStatus(409);

  let score = 0;

  try {
    const encrypted = CryptoJS.AES.encrypt(
      password,
      CRYPTOJS_SECRET_KEY
    ).toString();

    const newUser: User = {
      createdAt: date,
      email,
      id,
      password: encrypted,
      updatedAt: date,
      fullName,
      ...rest,
    };

    console.log({ rest });

    if (Number(rest.age) > 18) score + 2;
    if (rest.occupation) score + 2;
    if (rest.address) score + 2;
    if (rest.yrsExp) score + 2;
    if (rest.currentlyEmployed) score + 2;

    usersDB.setUsers([...usersDB.users, { ...newUser, score }]);
    return res.status(201).json({ id: newUser.id });
  } catch (error: any) {
    return res.status(error?.code || 500).json({ message: error?.message });
  }
};
