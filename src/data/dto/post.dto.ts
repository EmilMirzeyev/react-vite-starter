import { z } from "zod";
import { postSchema } from "../schemas/dtoValidations/postSchema";

export type PostDTO = z.infer<typeof postSchema>;
