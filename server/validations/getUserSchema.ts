import { z } from "zod";
export default z.object({
  params: z.object({
    id: z.string({
      required_error: "id is required",
      invalid_type_error: "id is of type string",
    }),
  }),
});
