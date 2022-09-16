import "dotenv/config";
import { Request, Response } from "express";
import { User } from "../types";
import { Users } from "../model/";
import CryptoJS from "crypto-js";
import crypto from "crypto";
import fsPromises from "fs/promises";
import path from "path";

const id = crypto.randomBytes(16).toString("hex");

export const LoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  try {
    let foundUser = Users.find((user) => user.email === email);
    if (!foundUser) return res.sendStatus(401);

    // Check if email is in DB
    for (let i = 0; i < Users.length; i++) {
      const user = Users[i];
      if (email !== user.email || password !== user.password)
        return res.status(401).json({ message: "invalid credentials" });
      foundUser = user;
    }
    return res.status(200).json(foundUser);
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
  let newUser: User | undefined = undefined;
  // encrypt password

  // check if username exists
  const duplicate = Users.find(
    (user: User) => user.username === username || user.email === email
  );

  if (duplicate) return res.sendStatus(400);

  try {
    const encrypted = CryptoJS.AES.encrypt(
      password,
      String(process.env.CRYPTOJS_SECRET_KEY)
    ).toString();

    // save user on db
    newUser = {
      createdAt: date,
      email,
      id,
      password: encrypted,
      updatedAt: date,
      username,
    };

    await fsPromises.writeFile(
      path.join(__dirname, "../", "model", "Users.json"),
      JSON.stringify([...Users, newUser])
    );
    console.log({ newUser });
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(error?.code || 500).json({ message: error?.message });
  }
};
