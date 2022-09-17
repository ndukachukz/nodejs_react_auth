import { z } from "zod";
export default z.object({
  body: z.object({
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
