import { z } from "zod";
import { postSchema } from "../schemas/postSchema";

export type PostDTO = z.infer<typeof postSchema>;
