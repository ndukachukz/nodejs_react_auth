import { z } from "zod";
export default z.object({
  body: z.object({
    username: z.string({
      required_error: "username is required",
      invalid_type_error: "username is of type string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "email is of type string",
      })
      .email("Not a valid email"),
    password: z.string({
      required_error: "password is required",
      invalid_type_error: "password is of type string",
    }),
  }),
});
