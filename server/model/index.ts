import { User } from "../types";

export const usersDB: { users: User[]; setUsers(users: User[]): void } = {
  users: require("./users.json"),
  setUsers(users: User[]) {
    this.users = users;
  },
};
