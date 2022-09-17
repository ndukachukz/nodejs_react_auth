import { Request, Response } from "express";
import { usersDB } from "../model";

const getUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const foundUser = usersDB.users.find((user) => user.id === id);
    if (!foundUser) return res.status(404).json({ message: "no user found" });

    return res.status(200).json(foundUser);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error?.message || "something went wrong" });
  }
};

export { getUser };
